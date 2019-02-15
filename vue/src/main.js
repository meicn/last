import Vue from 'vue';
import App from './App.vue'
import VueRouter from 'vue-router';
import {routes} from './routes';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(iView);
Vue.use(VueRouter);

const router = new VueRouter({
	routes:routes // 可以直接写成routes
})

new Vue({
  el: '#app',
  router, // router:router
  render: h => h(App)
})