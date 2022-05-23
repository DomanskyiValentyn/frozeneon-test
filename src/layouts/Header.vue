<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Frozeneon</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#" @click="clearSearch">TOP-100</a>
          </li>
        </ul>
        <div class="d-flex">
          <input class="form-control me-2" type="text" placeholder="Search" aria-label="Search" v-model="search">
          <button class="btn btn-outline-success" type="submit" @click="startSearch">Search</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {

  },
  props: {

  },
})
export default class Header extends Vue {
  public search = '';

  public startSearch(): void {
    this.$store.commit('search', this.search);
  }

  public clearSearch(): void {
    this.search = '';
    this.$store.commit('search', this.search);
  }
}
</script>
