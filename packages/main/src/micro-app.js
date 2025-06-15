import store from "./store";
const microApps = [
  {
    name: "appvue",
    entry: "//localhost:7301/appvue",
    activeRule: "/appvue",
  },
  {
    name: "vue3",
    entry:"//localhost:7305/vue3",
    activeRule: "/vue3",
  },
  {
    name: "vue3Vite",
    entry:"//localhost:7316/vue3Vite",
    activeRule: "/vue3Vite",
  },
   {
    name: "vue2-main",
    entry:"http://localhost:7401",
    activeRule: "/vue2-main",
  },
];

const apps = microApps.map((item) => {
  return {
    ...item,
    container: "#cnbi-viewport", // 子应用挂载的div, 也可以是不同的容器,那么久需要container, 写到microApps的对象里面, 看自己应用的需要
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState, // 下发getGlobalState方法
    },
  };
});

export default apps;
