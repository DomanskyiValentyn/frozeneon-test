<template>
  <div class="search-result">
    <ModalPackageDetail :package="selectPackage" />

    <h2 class="mt-5">Result search: <small>{{ search }}</small></h2>

    <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Version</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(p, index) in list" :key="index">
          <tr @click="selectPackage = p" data-bs-toggle="modal" data-bs-target="#package-detail">
            <th scope="row">{{ getNumberPosition(index) }}</th>
            <td>{{ p.package.name }}</td>
            <td>{{ p.package.version }}</td>
            <td>{{ p.package.description }}</td>
          </tr>
        </template>
      </tbody>
    </table>

    <Pagination :records="result?.objects.length" :perPage="perPage" @paginate="currentPage = $event"/>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { WatchStopHandle } from 'vue';
import { mapState } from 'vuex';

import ModalPackageDetail from '@/modals/PackageDetail.vue';

import Pagination from '@/common/Pagination/Pagination.vue';

import { SearchPackage, SearchPackageObjects } from '@/interfaces/other.interface';

@Options({
  components: {
    Pagination,
    ModalPackageDetail,
  },
  computed: {
    ...mapState(['search']),
  },
})
export default class SearchResult extends Vue {
  public result: SearchPackage | null = null;

  public selectPackage: SearchPackageObjects | null = null;

  public currentPage = 1;

  public perPage = 10;

  private watchStopHandle!: WatchStopHandle;

  get list(): SearchPackageObjects[] {
    if (this.result?.objects) {
      const list = [...this.result.objects];

      const start = this.perPage * this.currentPage - this.perPage;
      const end = start + this.perPage;

      return list.slice(start, end);
    }

    return [];
  }

  public getNumberPosition(index: number): number {
    return index + 1 + this.perPage * this.currentPage - this.perPage;
  }

  public startSearch(): void {
    fetch(`https://registry.npmjs.com/-/v1/search?text=${this.$store.state.search}`)
      .then((res) => res.json())
      .then((data: SearchPackage) => {
        this.result = data;
      });
  }

  created(): void {
    this.startSearch();

    this.watchStopHandle = this.$store.watch((state) => state.search, this.startSearch);
  }

  unmounted(): void {
    this.watchStopHandle();
  }
}
</script>

<style lang="scss">
.search-result {
  table {
    tbody {
      tr {
        cursor: pointer;
      }
    }
  }
}
</style>
