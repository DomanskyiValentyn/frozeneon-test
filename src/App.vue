<template>
  <div class="container">
    <Header />

    <PopularPackage v-if="!search" />

    <SearchResult v-else />

    <Footer />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapState } from 'vuex';

import Header from '@/layouts/Header.vue';
import Footer from '@/layouts/Footer.vue';

import PopularPackage from '@/sections/PopularPackage.vue';
import SearchResult from '@/sections/SearchResult.vue';

@Options({
  components: {
    Header,
    Footer,
    PopularPackage,
    SearchResult,
  },
  computed: {
    ...mapState(['search']),
  },
})
export default class App extends Vue {

}
</script>
