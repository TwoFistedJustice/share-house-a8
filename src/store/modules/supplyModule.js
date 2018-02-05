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
  changed: false,
  //using this to determine why firebase keeps deleting the supply node
  fireBaseWrites: [],
  /* this must be set to true to allow DB writes to supply node */
  okayToPost: null


}; //END STATE


/* ***************************************
 *  a supply item looks like:
 *
 *  {item: 'Paper Towels', have: true, inCart: false}
 *
 * *********************************************************** */


const getters = {

  GetDisplayHaveSwitch(state) {
    return state.buttonHaveSwitch;
  },

  GetSupplies(state) {
    return state.supplies;
  }
}; //END GETTERS

const mutations = {
  ADD_SUPPLY(state, supply) {
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

  // FLIP_IN_CART_BOOL(state, payload) {
  //   /* expects a supply object and a string {item:, have: },
  //   *  string: which bool to set, either "have" or "inCart" */
  //   try {
  //     if (payload.bool === 'have') {
  //       payload.supply.have = !payload.supply.have;
  //     } else {
  //       payload.supply.inCart = !payload.supply.inCart;
  //     }
  //   }
  //   catch (err) {
  //     console.error(err, "MUTATE_FLIP_ITEM_BOOL: ", "You must specify a bool to flip in the supply item");
  //   }
  // },


  DELETE_ITEM(state, index) {
    /* expects the array index of the item to be deleted
    * Deletes a supply object at that index */
    state.supplies.splice(index, 1);
  },
  SET_CHANGED(state) {
    /*  name is the name of the calling action,
    * it helps to find which of the 40 gazillion calls is causing a problem
    * console.log('MUTATE_SET_CHANGED: ', name);
    * state.changed starts as false, once changed to true, it is always true until destroyed */
    state.changed = true;
  },

  // SET_DISPLAY_HAVE_SWITCH(state, payloadBool) {
  //   /* receives a boolean and sets central buttonHaveSwitch to that boolean */
  //   state.buttonHaveSwitch = payloadBool;
  // },

  SET_BUTTON_HAVE_SWITCH(state){
    //this seems to replace SET_DISPLAY_HAVE_SWITCH
    /* this should do what checkArrayBools did in SuppliesInventory.vue*/

    /* This sums up the have: bool property in each supply object in the array
     *  If the sum of them equal the length of the supply array, then buttonHaveSwtich
     *  is set to true. Otherwise it is set to false.
     *  buttonHaveSwtich controls the value of the switch all button on SuppliesInventory.vue
      * */
    let holdingBool = false;
    let supplies = state.supplies;

    /* convert the have bools to zero or one and add them up
    *  if the sum is equal to zero or to the length of the array
    *  set the holding bool to false if zero, and true if length */
    let sum = 0;
    /* add one or zero to val */
    for (let i = 0; i < supplies.length; i++) {
      let val = supplies[i].have ? 1 : 0;
      sum += val;
    }
    if (sum === 0) {
      holdingBool = false;
    } else if (sum === supplies.length) {
      holdingBool = true;
    } else {
      holdingBool = state.buttonHaveSwitch;
    }

    state.buttonHaveSwitch = holdingBool;

    console.log('haveSwithc = ', state.buttonHaveSwitch);

  },

  SWITCH_ALL_HAVE_STATUS(state) {
    /* switches all the supply objects have bools to be the same */
    state.buttonHaveSwitch = !state.buttonHaveSwitch;

    // for(let i = 0; i < state.supply.length; i++){
    //     state.supply[i].have = state.buttonHaveSwitch;
    // }

    state.supplies.forEach((arrayMember) => {
      arrayMember.have = state.buttonHaveSwitch;
    })

  },

  TOGGLE_HAVE_STATUS(state) {
    state.buttonHaveSwitch = !state.buttonHaveSwitch;
  },

  // FETCH_SUPPLY(state) {
  //   let houseId = localStorage.getItem('houseId');
  //   let token = localStorage.getItem('token');
  //
  //   globalAxios.get('houses/' + houseId + '/supplies.json?auth=' + token)
  //     .then(response => {
  //       return response.data;
  //     })
  //     .then(data => {
  //       /* axios converts to array automagically! :-)
  //        * must use slice or it makes reference copies */
  //       state.supplies = data.slice(0, data.length);
  //     })
  //     .catch(error => {
  //       let record = [];
  //       for (let key in error) {
  //         record.push(error[key]);
  //       }
  //
  //       if (record[0].maxContentLength === -1) {
  //         console.error("FETCH_SUPPLY:", "No response from database.", record);
  //       }
  //     });
  // },

  // SAVE_SUPPLY(state) {
  //
  //   let timeStamp = Date.now();
  //   let now = timeStamp.toString();
  //
  //   let houseId = localStorage.getItem('houseId');
  //   let token = localStorage.getItem('token');
  //
  //     if(state.okayToPost === true){
  //     globalAxios.put('houses/' + houseId + '/supplies.json?auth=' + token, state.supplies)
  //       .then(response => {
  //         state.fireBaseWrites.push(now);
  //         console.log('putting supplies', now);
  //       })
  //       .catch(error => {
  //         console.error('SAVE_SUPPLY', error)
  //       });
  //     } else {
  //       return;
  //     }
  //
  // },


};// END MUTATIONS


const actions = {
  testFn({context}) {

    let houseId = localStorage.getItem('houseId');
    let token = localStorage.getItem('token');

    globalAxios.put('houses/' + houseId + '/supplies.json?auth=' + token, {})
      .then(response => {
        console.log('putting supplies');
      })
      .catch(error => {
        console.error('SAVE_SUPPLY', error)
      });


  },

  AddSupply({dispatch, commit}, supply) {
    /*  expects a supply object {item:, have: } */
    commit('ADD_SUPPLY', supply);
    // commit('SAVE_SUPPLY');
    dispatch('saveSupply', 'AddSupply');
  },

  confirmChange({dispatch, commit, state}) {

    if (state.changed === true) {
      if (confirm("Save changes?")) {
        // commit('SAVE_SUPPLY');
        dispatch('saveSupply', 'confirmChange');
        state.changed = false;
      }
    }
  },

  deleteItem({dispatch, commit}, index) {
    /* expects the array index of the item to be deleted */
    commit('DELETE_ITEM', index);
    // commit('SAVE_SUPPLY');
    // dispatch('saveSupply');
    dispatch('saveSupply', 'deleteItem');
  },

  fetchSupply({dispatch, commit}) {
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
        //make it so if error is not 200,okayToPost gets set to null,
        //then set it back when the server finally responds

        let record = [];
        for (let key in error) {
          record.push(error[key]);
        }

        if (record[0].maxContentLength === -1) {
          console.error("FETCH_SUPPLY:", "No response from database.", record);
        }
      });
  },
  /* for NOW this is to help prevent supply overwrites at startup
  *  if it works, make a general feature and apply it widely
  * */
  initSupply({dispatch, commit, state}) {

    let token = localStorage.getItem('token');
    let houseId = localStorage.getItem('houseId');

    globalAxios.get('houses/' + houseId + '/okayToPost.json?auth=' + token)
      .then(resp => {
        console.log('okay to post set to '+ resp.data);
        state.okayToPost = resp.data;

      })
      .catch(err => console.error(err));
  },

  // flipBool({commit}, payload) {
  //   /* expects a supply object {item:, have: } */
  //   commit('FLIP_IN_CART_BOOL', payload);
  //   commit('SAVE_SUPPLY');
  // },

  /* dispatched from beforeDestroy in supply display components */
  saveSupply({commit, rootGetters}, name) {
    /* if housename convolution is to test whether the okayToPost boolean
    *   will prevent the supply node from getting deleted when I'm not looking
    *   IF it persists in Christmas Town, but not in other houses,then I think
    *   it works
    * */
      //this block of lets is for debugging
    let houseName = rootGetters['house/getActiveHouse'].houseName;
    let timeStamp = Date.now();
    let now = timeStamp.toString();
    // end debug lets

    let houseId = localStorage.getItem('houseId');
    let token = localStorage.getItem('token');


    if (houseName === "Christmas Town") {
      if (state.okayToPost === true) {
        globalAxios.put('houses/' + houseId + '/supplies.json?auth=' + token, state.supplies)
          .then(function () {
            state.fireBaseWrites.push(now);
            console.log('putting supplies from ' + name, now);
          })
          .catch(error => {
            console.error('SAVE_SUPPLY', error)
          });
      } else {
        return;
      }
    } else {
      globalAxios.put('houses/' + houseId + '/supplies.json?auth=' + token, state.supplies)
        .then(function () {
          state.fireBaseWrites.push(now);
          console.log('putting supplies', now);
        })
        .catch(error => {
          console.error('SAVE_SUPPLY', error)
        });
    }


    // commit('SAVE_SUPPLY');
  },

  // setDisplayHaveSwitch({dispatch, commit}, payloadBool) {
  setDisplayHaveSwitch({dispatch, commit}) {
    // the infinite loop passes through here - maybe related to save...
    /* expects a boolean */
    commit('SET_BUTTON_HAVE_SWITCH');
    // commit('SET_DISPLAY_HAVE_SWITCH', payloadBool);
    // commit('SAVE_SUPPLY');
    // dispatch('saveSupply');
    // dispatch('saveSupply', 'setDisplayHaveSwitch');
  },

  switchAllHaveStatus({dispatch, commit}) {
    /* changes all the bools in the supply array to same */
    commit('SWITCH_ALL_HAVE_STATUS');
    // commit('SAVE_SUPPLY');
    dispatch('saveSupply', 'switchAllHaveStatus');
    // dispatch('saveSupply');

  },

  toggleHaveStatus({dispatch, commit}) {
    /* toggles the bool in a single supply object {item:, have: } */
    commit('TOGGLE_HAVE_STATUS');
    // commit('SAVE_SUPPLY');
    dispatch('saveSupply');
  },


}; // END ACTIONS


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
