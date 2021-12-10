/* 这里考虑用vue2做基座,因为基座一般都是老技术 */
import "./public-path";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "./router";
import store from "./store";
import { registerMicroApps, start } from 'qiankun';
Vue.config.productionTip = false;
Vue.use(ElementUI);

let  router = new VueRouter({
    base: "/",
    mode: "history",
    routes,
  });

new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");

registerMicroApps([
  {
    name: 'dash',
    entry: '//localhost:7802',
    container: '#cnbi-viewport',
    activeRule: '/dash'
    // props: { data: { store, router } }
  }
])

start()