import { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Results from '../views/Results.vue';
import Favourites from '../views/Favourites.vue';

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
  {
    path: '/favourites',
    name: 'Favourites',
    component: Favourites,
  },
];

export default Routes;
