import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  //  {
  //   path: '/vue/*',
  //   component: () => import('vue'),
  // },
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/About.vue'),
    children: [ {
      path: '/about/text',
      // 二级路由
      component: () => import('../views/Text.vue'),
      // children: [{
      //     // 三级路由
      //     path: 'text3',
      //     name: 'text3',
      //     component: () => import('../views/Text3.vue'),
      //       },
      //   ]
    }
    ]
  },
  {
    path: '/about1',
    name: 'about1',
    component: () => import(/* webpackChunkName: "about" */ '../views/About1.vue'),
  },
];

export default routes;
