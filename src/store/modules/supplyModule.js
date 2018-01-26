// import * as types from '../../store/types.js'

import globalAxios from 'axios';
import router from '../../router.js';
import {APIkey, gObj_hasRoot} from '../../config.js';


const state = {
  //displayHaveSwitch only affects the display,not the supply object
  displayHaveSwitch: null,
  // supply: supplyData,
  supplies: [],
  //will be used to check for changes to prompt user to save
  //should be false until supply are changed, set back when saved
  changed: false

}; //END STATE


/***
 *  a supply item looks like:
 *  {item: 'Paper Towels', have: true}
 *  change to:
 *  *  {item: 'Paper Towels', have: true, inCart: false}
 * ***/


const getters = {

  GetDisplayHaveSwitch (state) {
    return state.displayHaveSwitch;
  },

  GetSupplies (state) {
    console.log(state.supplies);
    return state.supplies;
  }
}; //END GETTERS

const mutations = {
  ADD_SUPPLY (state, supply) {
    //expects a supply object {item:, have: }
    console.log(supply.item);
    // Capitalize each word of input
    //this makes it easier to read and helps to prevent duplicates
    supply.item = supply.item.replace(/\b\w/g, (l) => {
      return l.toUpperCase()
    });

    //If isSame is false, add the item
    //prevents exact duplicates
    let isSame = true;

    for (let i = 0, n = state.supplies.length; i < n; i++) {
      if (supply.item === state.supplies[i].item) {
        isSame = false;
      }
    }

    if (isSame === true) {
      state.supplies.push(supply);
    }

  },
  //NOT NEEDED - CAN BE DONE IN COMPONENT WITH ONE LINE OF CODE
  // Deprecated in A6

  // [types.MUTATE_FLIP_ITEM_BOOL]: (state, payload) => {
  //   // console.log("payload.have ", payload);
  //   //expects a supply object and a string {item:, have: },
  //   // string: which bool to set, either "have" or "inCart"
  //   try {
  //     if (payload.bool === 'have') {
  //       payload.supply.have = !payload.supply.have;
  //     } else {
  //       payload.supply.inCart = !payload.supply.inCart;
  //     }
  //   }
  //   catch (e) {
  //     console.error(e, "MUTATE_FLIP_ITEM_BOOL: ", "You must specify a bool to flip in the supply item");
  //   }
  //
  //
  // },

  // [types.MUTATE_SUPPLY_CONFIRM_CHANGE]: (state) => {
  //   console.log('MUTATE_SUPPLY_CONFIRM_CHANGE');
  //
  // },

  DELETE_ITEM (state, index) {
    //expects the array index of the item to be deleted
    //Deletes a supply object at that index
    state.supplies.splice(index, 1);
  },
  SET_CHANGED (state, name) {
    // name is the name of the calling action,
    // it helps to find which of the 40 gazillion calls is causing a problem
    // console.log('MUTATE_SET_CHANGED: ', name);
    // state.changed starts as false, once changed to true, it is always true until destroyed
    state.changed = true;
  },

  DISPLAY_HAVE_SWITCH(state, payloadBool) {
    //receives a boolean and sets central displayHaveSwitch to that boolean
    state.displayHaveSwitch = payloadBool;
  },

  SWITCH_ALL_HAVE_STATUS (state) {
    //switches all the supply objects have bools to be the same
    state.displayHaveSwitch = !state.displayHaveSwitch;

    // for(let i = 0; i < state.supply.length; i++){
    //     state.supply[i].have = state.displayHaveSwitch;
    // }

    state.supplies.forEach((arrayMember) => {
      arrayMember.have = state.displayHaveSwitch;
    })

  },

  TOGGLE_HAVE_STATUS (state) {
    state.displayHaveSwitch = !state.displayHaveSwitch;
  },

  // DATABASE MUTATIONS

  FETCH_SUPPLY (state) {
    let houseId = localStorage.getItem('houseId');
    let token = localStorage.getItem('token');
      globalAxios.get('houses/' + houseId + '/supplies.json?auth=' + token)
      .then(response => {
        console.log('FETCH_SUPPLY', response);
        return response.data;
      })
      .then(data => {
        console.log('2nd fetch data', data);
        //axios converts to array automagically! :-)
        //must use slice or it makes reference copies
        state.supplies = data.slice(0, data.length);
      })
      .catch(error => {
        let record = [];
        for (let key in error) {
          record.push(error[key]);
        }

        if (record[0].maxContentLength === -1) {
          console.error("FETCH_SUPPLY:", "No response from database.");
        }
        // console.error('MUTATE_FETCH_SUPPLY', record)
      });
  },

  SAVE_SUPPLY (state) {
    let houseId = localStorage.getItem('houseId');
    let token = localStorage.getItem('token');

    globalAxios.put('houses/' + houseId + '/supplies.json?auth=' + token, state.supplies)
      .then(response => {
        console.log('SAVE_SUPPLY', response)
      })
      .catch(error => {
        console.error('SAVE_SUPPLY', error)
      });
  },


};// END MUTATIONS


const actions = {
  AddSupply ({commit}, supply) {
    //expects a supply object {item:, have: }
    commit('ADD_SUPPLY', supply);
    commit('SET_CHANGED', 'AddSupply');
  },



  confirmChange ({state, commit}) {

    if (state.changed === true) {
      if (confirm("Save changes?")) {
        // console.log("s******ave");
        commit('SAVE_SUPPLY');
        state.changed = false;
      }
    }
  },

  deleteItem ({commit}, index) {
    //expects the array index of the item to be deleted
    commit('DELETE_ITEM', index);
    commit('SET_CHANGED', 'deleteItem');
  },

  fetchSupply ({commit}) {
    commit('FETCH_SUPPLY');
  },

  flipItemBool ({commit}, payload) {
    //expects a supply object {item:, have: }
    commit('FLIP_ITEM_BOOL', payload);
    commit('SET_CHANGED', 'flipItemBool');
  },

  saveSupply ({commit}) {
    commit('SAVE_SUPPLY');
  },


  setDisplayHaveSwitch ({commit}, payloadBool) {
    //expects a boolean
    commit('SET_DISPLAY_HAVE_SWITCH', payloadBool);

  },

  switchAllHaveStatus ({commit}) {
    //changes all the bools in the supply array to same
    commit('SWITCH_ALL_HAVE_STATUS');
    commit('SET_CHANGED', 'switchAllHaveStatus');
  },

  toggleHaveStatus ({commit}) {
    //toggles the bool in a single supply object {item:, have: }
    commit('TOGGLE_HAVE_STATUS');
    commit('SET_CHANGED', 'SUPPLY_TOGGLE_HAVE_SWITCH');
  },


}; // END ACTIONS


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
