<template>
  <div class="layout-wrapper">
    <div>我是主应用的头部, 看看下面我的状态, 是不是能变化</div>
    <div>{{user.name}}</div>
    <!-- 可以放到这里,也可以放到对应子路由的页面里面位置不重要 -->
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
      current: "/appvue/",
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
    NProgress.done();
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
