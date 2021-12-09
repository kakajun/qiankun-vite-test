import store from "./store";
const microApps = [
  {
    name: "bigdata1",
    entry: "//localhost:7301/bigdata1",
    activeRule: "/bigdata1",
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
    name: "bigdata",
    entry:"//localhost:7800/bigdata",
    activeRule: "/bigdata",
  },
];

const apps = microApps.map((item) => {
  return {
    ...item,
    container: "#cnbi-viewport", // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState, // 下发getGlobalState方法
    },
  };
});

export default apps;
