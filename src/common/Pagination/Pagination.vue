<template>
  <pagination
    v-if="$props.records && $props.perPage"
    v-model="page"
    :records="$props.records"
    :options="options"
    :per-page="$props.perPage"
    @paginate="paginate"
  />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { markRaw } from 'vue';

import pagination from 'v-pagination-3';

import TemplatePagination from './TemplatePagination.vue';

@Options({
  components: {
    pagination,
  },
  props: {
    records: Number,
    perPage: Number,
  },
  emits: {
    paginate: Number,
  },
})
export default class Pagination extends Vue {
  public page = 1;

  public options = {
    template: markRaw(TemplatePagination),
    chunk: 7,
    chunksNavigation: 'scroll',
  }

  public paginate(page: number): void {
    this.$emit('paginate', page);
  }
}
</script>
