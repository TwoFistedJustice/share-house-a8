import chores from '../../components/chores/choreData.js';
import names from '../../components/chores/names.js';
import globalAxios from 'axios';
import router from '../../router.js';
import {APIkey, gObj_hasRoot} from '../../config.js';


const state = {

  //{key: 'A', task: 'Trash', description: 'Lorum ipsum'}
  chores: [],

  //{id: 1,name: 'Russ', color:'Yellow', trash: true }
  names: [],

  //rotation is the final object as in "chores rotation"
  // {task: 'Trash', name: 'Russ',completed: false},
  rotation: [],
};

const getters = {

  GetRotation (state) {
    return state.rotation;
  },

  testGetter(state){
    return "flartybartfast";
  }

};

const mutations = {
  //loads data from files at App.vue create hook
  SET_CHORES (state, {chores}) {
    console.log('set chores', chores);
    state.chores = chores;
  },

  SET_CHORE_KEY (state, name) {

    let currentKey = state.names.findIndex(element => element.choreKey === true);

    let newKey = state.names.findIndex(element => element.name === name);

    state.names[currentKey].choreKey = false;
    state.names[newKey].choreKey = true;

  },

  SET_ROTATION (state) {
    state.rotation = [];

    //this depends on names and chores array being same length!!!
    if( state.chores.length != state.names.length){
      console.error('FIX IT!- choreModule chores and names array are different lengths - FIX IT!');
    }
    let length = state.chores.length;

    for(let i = 0; i < length; i++){
      let obj = {
        task: state.chores[i].task,
        description: state.chores[i].description,
        name: state.names[i].name,
        completed: false
      };
      state.rotation.push(obj);
    }

  },
  SORT_NAMES (state) {
      console.log('sort nameses', names);

    //find index of person with trash (choreKey) duty
    //sort the names so 'choreKey: true' is at index 0
    let index = names.findIndex(element => element.choreKey === true);
    let length = names.length;
    //push elements from choreKey = true through end of array
    for (let i = index; i < length; i++) {
      state.names.push(names[i]);
    }
    //push the elements preceding choreKey = true
    for (let z = 0; z < index; z++) {
      state.names.push(names[z]);
    }
    //changing the choreKey causes the names.array to grow by 5
    //this removes the old elements
    if(state.names.length > 5){
      state.names = state.names.splice(5, 10);
    }


  }
};

const actions = {
  setChoreKey ({commit}, name) {
    commit('SET_CHORE_KEY', name);
    commit('SORT_NAMES');
    commit('SET_ROTATION');
  },
  sortNames ({commit}) {
    commit('SORT_NAMES');
  },
  // leave initChores as a standard action - called in the created hook in app.vue
  initChores ({commit}) {
    console.log('*************init');
    commit('SET_CHORES', {chores});
    commit('SORT_NAMES');
    commit('SET_ROTATION');
  },

};



export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
