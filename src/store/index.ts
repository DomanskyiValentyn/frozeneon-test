import { createStore } from 'vuex';

export default createStore({
  state: {
    search: '',
  },
  mutations: {
    search(state, payload: string): void {
      state.search = payload;
    },
  },
  getters: {
  },
  actions: {
  },
  modules: {
  },
});
