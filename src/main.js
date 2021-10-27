import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "@/assets/styles/todoApp.scss";
import 'bootstrap';
import $ from 'jquery';
import { Plugin } from "vue-fragment";
import router from './router'
Vue.use(Plugin);
window.$ = $;

Vue.config.productionTip = false;

new Vue({
  // render App.vue to index #app
  render: (h) => h(App),
  router,
  vuetify
}).$mount("#app");