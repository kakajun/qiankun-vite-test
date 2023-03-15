import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Services from '../views/Services.vue';
import SubServiceDetail from '../views/SubServiceDetail.vue';
import ServiceDetail from '../views/ServiceDetail.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
   {
    path: '/about',
    name: 'about',
    component: () => import( '../views/About.vue'),
    children: [ {
      path: '/about/text',
      // 二级路由
      component: () => import('../views/Text.vue'),
    }
    ]
  },
 {
      path: '/services/:serviceId',
      name: 'services',
      component: Services,
      props: true,
      children: [
        {
          path: ':subServiceId',
          name: 'sub-service-detail',
          component: SubServiceDetail,
          props: true
        },
        {
          path: ':subServiceId/:id',
          name: 'service-detail',
          component: ServiceDetail,
          props: true
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
