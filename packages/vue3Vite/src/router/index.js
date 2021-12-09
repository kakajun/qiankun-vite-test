const routes = [
  { path: '/', name: 'home', component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue') },
  { path: '/about', name: 'about', component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue') },
];

export default routes;
