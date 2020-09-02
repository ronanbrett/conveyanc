import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import About from '@/views/About.vue';
import { isAuthenticatedGuard } from './isAuthenticated.guard';

export const routerHistory = createWebHistory(process.env.BASE_URL);

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/listing',
  },
  {
    path: '/listing',
    name: 'Listings',
    beforeEnter: isAuthenticatedGuard,
    components: {
      default: () =>
        import(
          /* webpackChunkName: "propertyListing" */ '../../modules/property/views/PropertyListPage/PropertyListPage.vue'
        ),
      header: () =>
        import(
          /* webpackChunkName: "propertyListing" */ '../../modules/property/views/PropertyListHeader/PropertyListHeader.vue'
        ),
    },
  },
  {
    path: '/listing/create',
    name: 'Create Listing',
    beforeEnter: isAuthenticatedGuard,
    component: () =>
      import(
        /* webpackChunkName: "propertyCreation" */ '../../modules/property/views/PropertyCreatePage/PropertyCreatePage.vue'
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

export const router = createRouter({
  history: routerHistory,
  routes,
});
