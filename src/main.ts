import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

const APP = createApp(App);

APP
  .use(store)
  .mount('body');
