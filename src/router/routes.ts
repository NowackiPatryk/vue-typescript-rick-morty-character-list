import { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Results from '../views/Results.vue';

const Routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/results',
    name: 'Results',
    component: Results,
  },
];

export default Routes;
