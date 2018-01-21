import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import axios from 'axios';
import router from './router.js'
import { store } from  './store/store.js';
import {dataBaseUrl} from './config.js';

Vue.use(VueRouter);
axios.defaults.baseURL = dataBaseUrl;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})



//***********VUE ROUTER CONFIG *********/
// const router  = new VueRouter({
//   routes,
//   mode: 'history'
// });
//***********END VUE ROUTER CONFIG *********/
