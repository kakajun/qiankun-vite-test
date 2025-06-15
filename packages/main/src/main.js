import { createApp } from 'vue'
import App from './App.vue'
import  '@/assets/index.scss';
import { registerMicroApps, start,setDefaultMountApp } from 'qiankun';
import microApps from "./micro-app";
import "nprogress/nprogress.css";

const instance= createApp(App).mount('#app')


// 定义loader方法，loading改变时，将变量赋值给App.vue的data中的isLoading
function loader(loading) {
  if (instance.isLoading) {
    instance.isLoading = loading
  }
  }
// 给子应用配置加上loader方法
const apps = microApps.map(item => {
    return {
      ...item,
      loader
    };
  });
registerMicroApps(apps, {
    beforeLoad: app => {
      console.log("before load app.name====>>>>>", app.name);
    },
    beforeMount: [
      app => {
        console.log("[LifeCycle] before mount %c%s", "color: green;", app.name);
      }
    ],
    afterMount: [
      app => {
        console.log("[LifeCycle] after mount %c%s", "color: green;", app.name);
      }
    ],
    afterUnmount: [
      app => {
        console.log("[LifeCycle] after unmount %c%s", "color: green;", app.name);
      }
    ]
  });
  setDefaultMountApp("/vue3Vite");
  start();
