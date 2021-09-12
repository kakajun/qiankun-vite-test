
import { createApp } from 'vue'
import App from './App.vue'
import routes from './router';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import { createRouter, createWebHistory } from 'vue-router';

let router = null;
let instance = null;
let history = null;
function render(props = {}) {
  const { container } = props;
  history = createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/vue3Vite' : '/');
//   console.log(history,qiankunWindow.__POWERED_BY_QIANKUN__ ,"history");
  router = createRouter({
    history,
    routes,
  });

  instance = createApp(App);
  instance.use(router);
//   instance.use(store);
  instance.mount(container ? container.querySelector('#app') :document.getElementById("app"));
  if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    console.log('我正在作为子应用运行')
  }
}

// some code
renderWithQiankun({
    mount(props) {
    console.log("viteapp mount");
    render(props);
    // console.log(instance.config.globalProperties.$route,"444444444");
    },
    bootstrap() {
      console.log('bootstrap');
    },
    unmount(props) {
   console.log("vite被卸载了");
  instance.unmount();
  instance._container.innerHTML = '';
  router = null;  // 不卸载  router 会导致其他应用路由失败
  instance = null;
    },
  });
  
  if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render();
  }


