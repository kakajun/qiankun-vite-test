import store from "./store";
const microApps = [
  {
    name: "vue",
    entry: "//localhost:7301/vue",  // 打包到服务器, 这里也不需要动, 让他自己加载本地链接就行了, 只是ngnix 配置的端口保持一致就行了
    activeRule: "/vue",
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
    container: "#cnbi-viewport", // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState, // 下发getGlobalState方法
    },
  };
});

export default apps;
