<template>
  <nav v-show="props.showPagination" aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: props.theme.prev.includes('disabled') }">
        <button class="page-link" href="#" aria-label="Previous" @click="props.setPrevPage">
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>

      <li
        class="page-item"
        v-on="props.pageEvents(page)"
        v-for="page in props.pages"
        :key="page"
        :class="{ 'active': props.pageClasses(page).includes('active') }"
      >
        <button class="page-link" v-bind="props.aProps">{{ page }}</button>
      </li>

      <li class="page-item" :class="{ disabled: props.theme.next.includes('disabled') }" @click="props.setNextPage">
        <button class="page-link" aria-label="Next" v-bind="props.nextProps">
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
  props: ['props'],
})
export default class TemplatePagination extends Vue {
  declare $props: {
    props: any;
  };
}
</script>
