import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Routes from './routes';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = Routes;

const router = new VueRouter({
  routes,
});

export default router;
