import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import About from '@/views/About.vue';

export const routerHistory = createWebHistory(process.env.BASE_URL);

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/property',
  },
  {
    path: '/property',
    name: 'Property',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../../modules/property/views/PropertyListPage/PropertyListPage.vue'
      ),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../../views/About.vue'),
  },
];

const router = createRouter({
  history: routerHistory,
  routes,
});

export default router;
