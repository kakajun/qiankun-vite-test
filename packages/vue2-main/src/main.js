/* 这里考虑用vue2做基座,因为基座一般都是老技术 */
import "./public-path";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "./router";
import store from "./store";

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
// require('./bb')
