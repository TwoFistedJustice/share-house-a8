/*
*
* Supplies Feature
* Supplies feature should save on every change
* The only exception is the shopping list, which must be able to work primarily offline
* because many grocery stores or warehouse stores lack connectivity.
*
* */

import globalAxios from 'axios';
import router from '../../router.js';
import {APIkey, gObj_hasRoot} from '../../config.js';


const state = {

  /*  buttonHaveSwitch only affects the display,not the supply object   */
  buttonHaveSwitch: null,

  supplies: [],
  //will be used to check for changes to prompt user to save
  //should be false until supplies are changed, set back when saved
  changed: false

}; //END STATE


/* ***************************************
 *  a supply item looks like:
 *
 *  {item: 'Paper Towels', have: true, inCart: false}
 *
 * *********************************************************** */


const getters = {

  GetDisplayHaveSwitch (state) {
    return state.buttonHaveSwitch;
  },

  GetSupplies (state) {
    return state.supplies;
  }
}; //END GETTERS

const mutations = {
  ADD_SUPPLY (state, supply) {
    /* expects a supply object {item:, have: }
    * Capitalize each word of input
    * this makes it easier to read and helps to prevent duplicates */
    supply.item = supply.item.replace(/\b\w/g, (l) => {
      return l.toUpperCase()
    });

    /* If isSame is false, add the item
    * prevents exact duplicates */
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

  FLIP_IN_CART_BOOL (state, payload) {
    /* expects a supply object and a string {item:, have: },
    *  string: which bool to set, either "have" or "inCart" */
    try {
      if (payload.bool === 'have') {
        payload.supply.have = !payload.supply.have;
      } else {
        payload.supply.inCart = !payload.supply.inCart;
      }
    }
    catch (err) {
      console.error(err, "MUTATE_FLIP_ITEM_BOOL: ", "You must specify a bool to flip in the supply item");
    }
  },


  DELETE_ITEM (state, index) {
    /* expects the array index of the item to be deleted
    * Deletes a supply object at that index */
    state.supplies.splice(index, 1);
  },
  SET_CHANGED (state) {
    /*  name is the name of the calling action,
    * it helps to find which of the 40 gazillion calls is causing a problem
    * console.log('MUTATE_SET_CHANGED: ', name);
    * state.changed starts as false, once changed to true, it is always true until destroyed */
    state.changed = true;
  },

  SET_DISPLAY_HAVE_SWITCH(state, payloadBool) {
    /* receives a boolean and sets central buttonHaveSwitch to that boolean */
    state.buttonHaveSwitch = payloadBool;
  },

  SWITCH_ALL_HAVE_STATUS (state) {
    /* switches all the supply objects have bools to be the same */
    state.buttonHaveSwitch = !state.buttonHaveSwitch;

    // for(let i = 0; i < state.supply.length; i++){
    //     state.supply[i].have = state.buttonHaveSwitch;
    // }

    state.supplies.forEach((arrayMember) => {
      arrayMember.have = state.buttonHaveSwitch;
    })

  },

  TOGGLE_HAVE_STATUS (state) {
    state.buttonHaveSwitch = !state.buttonHaveSwitch;
  },

  // DATABASE MUTATIONS

  FETCH_SUPPLY (state) {
    let houseId = localStorage.getItem('houseId');
    let token = localStorage.getItem('token');

      globalAxios.get('houses/' + houseId + '/supplies.json?auth=' + token)
      .then(response => {
        return response.data;
      })
      .then(data => {
        /* axios converts to array automagically! :-)
         * must use slice or it makes reference copies */
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
      });
  },

  SAVE_SUPPLY (state) {
    let houseId = localStorage.getItem('houseId');
    let token = localStorage.getItem('token');

    globalAxios.put('houses/' + houseId + '/supplies.json?auth=' + token, state.supplies)
      .then(response => {
        console.log('putting supplies');
      })
      .catch(error => {
        console.error('SAVE_SUPPLY', error)
      });
  },


};// END MUTATIONS


const actions = {
  AddSupply ({commit}, supply) {
    /*  expects a supply object {item:, have: } */
    commit('ADD_SUPPLY', supply);
    commit('SAVE_SUPPLY');
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
    /* expects the array index of the item to be deleted */
    commit('DELETE_ITEM', index);
    commit('SAVE_SUPPLY');
  },

  fetchSupply ({commit}) {
    commit('FETCH_SUPPLY');
  },

  flipInCartBool ({commit}, payload) {
    /* expects a supply object {item:, have: } */
    commit('FLIP_IN_CART_BOOL', payload);
    commit('SAVE_SUPPLY');
  },

  // saveSupply ({commit}) {
  //   commit('SAVE_SUPPLY');
  // },

  setDisplayHaveSwitch ({commit}, payloadBool) {
    /* expects a boolean */
    commit('SET_DISPLAY_HAVE_SWITCH', payloadBool);
    commit('SAVE_SUPPLY');

  },

  switchAllHaveStatus ({commit}) {
    /* changes all the bools in the supply array to same */
    commit('SWITCH_ALL_HAVE_STATUS');
    commit('SAVE_SUPPLY');
  },

  toggleHaveStatus ({commit}) {
    /* toggles the bool in a single supply object {item:, have: } */
    commit('TOGGLE_HAVE_STATUS');
    commit('SAVE_SUPPLY');
  },


}; // END ACTIONS


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
