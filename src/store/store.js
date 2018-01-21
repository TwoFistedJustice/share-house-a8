import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/authModule.js';
import user from './modules/userModule.js';
import house from './modules/houseModule.js';
import memberManagement from './modules/memberModule.js';
Vue.use(Vuex);


// const store = new Vuex.Store({
// export default new Vuex.Store({
export const store = new Vuex.Store({
  state:{},
  getters:{},
  mutations:{},
  actions:{},
  modules: {
    auth,
    house,
    memberManagement,
    user
  }

}); // END STORE

// export {store};
