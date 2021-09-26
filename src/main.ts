import Vue from 'vue';
import Notifications from 'vue-notification';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faMinus,
  faStar,
  faLongArrowAltLeft,
  faLongArrowAltRight,
} from '@fortawesome/free-solid-svg-icons';

import App from './App.vue';
import router from './router';

import '@/assets/styles/main.scss';

library.add(
  faStar,
  faMinus,
  faLongArrowAltLeft,
  faLongArrowAltRight,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

const apolloClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.use(Notifications);
Vue.use(VueApollo);

new Vue({
  apolloProvider,
  router,
  render: (h) => h(App),
}).$mount('#app');
