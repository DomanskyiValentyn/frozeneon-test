<template>
  <footer class="d-flex align-items-center mb-3 mt-5">
    <a href="https://github.com/DomanskyiValentyn" target="_blank">
      <IconGitHub class="me-2" />Valentyn Domanskyi
    </a>
  </footer>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import IconGitHub from '@/common/icons/IconGitHub.vue';

@Options({
  components: {
    IconGitHub,
  },
  props: {

  },
})
export default class Footer extends Vue {
}
</script>
