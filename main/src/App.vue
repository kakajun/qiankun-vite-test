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
    // listenRouterChange() {
    //   console.info("listenRouterChange");
    //   const _wr = function (type) {
    //     const orig = history[type];
    //     return function () {
    //       const rv = orig.apply(this, arguments);
    //       const e = new Event(type);
    //       e.arguments = arguments;
    //       window.dispatchEvent(e);
    //       return rv;
    //     };
    //   };
    //   history.pushState = _wr("pushState");

    //   window.addEventListener("pushState", this.bindCurrent);
    //   window.addEventListener("popstate", this.bindCurrent);

    //   this.$once("hook:beforeDestroy", () => {
    //     window.removeEventListener("pushState", this.bindCurrent);
    //     window.removeEventListener("popstate", this.bindCurrent);
    //   });
    // },
  },
  created() {
    this.bindCurrent();
    NProgress.start();
  },
  mounted() {
    // this.listenRouterChange();
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
