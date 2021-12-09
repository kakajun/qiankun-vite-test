<template>
  <div class="layout-wrapper">
    <div id="cnbi-viewport"></div>
  </div>
</template>

<script>
import NProgress from "nprogress";
import microApps from "./micro-app";
import store from "@/store";
export default {
  name: "App",
  data() {
    return {
      isFirst: true,
      isLoading: true,
      microApps,
      current: "/vue/",
    };
  },
  computed: {
    user() {
      return store.getGlobalState("user");
    },
  },
  watch: {
    isLoading(val) {
      if (val) {
        NProgress.start();
      } else {
        this.$nextTick(() => {
          NProgress.done();
        });
      }
    },
  },
    created() {
    this.bindCurrent();
    NProgress.start();
  },
mounted() {
  console.log(store,"storestore");
  /* 这里模拟主程序更改了全局变量 */
  setTimeout(() => {
  store.setGlobalState({
      ignore: '***********main',
      user: {
        name: '**********main',
      },
    });
  }, 4000);
},
  methods: {
    goto(item) {
      history.pushState(null, item.activeRule, item.activeRule);
      // this.current = item.name
    },
    bindCurrent() {
      const path = window.location.pathname;
      console.info("xxxxxxxx");
      if (this.microApps.findIndex((item) => item.activeRule === path) >= 0) {
        this.current = path;
      }
    },

  },


};
</script>

<style lang="scss">
html,
body {
  margin: 0 !important;
  padding: 0;
}
.layout-wrapper {
  width: 100%;
}
</style>
