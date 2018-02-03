import globalAxios from 'axios';
import router from '../../router.js';
import {APIkey, gObj_hasRoot} from '../../config.js';


const state = {

  houseId: null, //used when creating a new house - prolly same as activeHouse.houseId, but for now keep separate

  /* activeHouse properties are set from several different places
  *  There is not just one setter                                 */
  activeHouse:
    { //pull it from db based houseId - found in userModule.name
      houseName: '',
      members: []
      // member looks like [ {id: userId, name: firstLast, idAdmin: t/f, role: ''} ]
    }


  //this object is just for easy visualization. It is NEVER used in the code
  // houseObjectLooksLike: {
  //   houseId: '',
  //   houseName: '',
  //
  //   members: [
  //     {id: 'userId0', isAdmin: true}, /* automatically set admin: true at house creation*/
  //     {id: 'userId1', isAdmin: false}, /* automatically set admin: false at house join*/
  //     {id: 'userId2', isAdmin: false}
  //   ],
  // }

};

const getters = {

  getActiveHouse(state) {
    return state.activeHouse;
  },

  getHouseId(state) {
    return state.houseId;
  },

  getMembers(state) {
    return state.activeHouse.members;
  },

  };
const mutations = {

  CLEAR_HOUSE_DATA(state) {
    state.activeHouse.houseName = '';
    state.activeHouse.members = null;
    state.houseId = '';
  },

  SET_HOUSE_ID(state, houseId) {
    state.houseId = houseId;
  },

  SET_HOUSE_NAME(state, name) {
    state.activeHouse.houseName = name;
  },

  SET_HOUSE_MEMBERS(state, members) {
    state.activeHouse.members = members;
  },

};

const actions = {

    addCreatorAsMember({commit, dispatch}, pushId) {
      let token = localStorage.getItem('token');
      let userId = localStorage.getItem('userId');

      let memberBlob = {
        id: userId,
        isAdmin: true
      }

      globalAxios.patch('houses/' + pushId + '/members/' + userId + '.json/?auth=' + token, memberBlob)
        .then(resp => {
          return resp;
        })
        .catch(err => console.error('addCreatorAsMember', err));
    },

    clearHouseData({dispatch, commit}) {
      console.log(' action clearHouseData');
      localStorage.setItem('belongsToHouse', "false");
      localStorage.removeItem('houseId');
      commit('CLEAR_HOUSE_DATA');
      // localStorage.removeItem('belongsToHouse');

    },


    changeHouseName({commit, dispatch}, formData) {

      let token = localStorage.getItem('token');
      let houseId = localStorage.getItem(('houseId'));

      globalAxios.patch('/houses/' + houseId + '.json/?auth=' + token, formData)
        .then(resp => {
          console.log(resp);
          if (resp.data.houseName === formData.houseName) {
            alert('house name changed successfully to ' + resp.data.houseName);
          }
          return resp;
        })
        .then(function () {
          dispatch('fetchActiveHouse');
        })
        .catch(err => console.error('changeHouseName', err));

    },


    createNewHouse({commit, dispatch}, formData) {
      /* dispatched from AdminHouse.vue.onSubmit() */
      /* house table will store creator as admin */
      let token = localStorage.getItem('token');
      let houseBlob = {
        houseName: formData.houseName,
      };
      /* set house and admin in houses node,
      *  fetched in fetchActiveHouse()
      * */
      globalAxios.post('houses.json/?auth=' + token, houseBlob)
        .then(resp => {
          console.log(houseBlob, resp);
          return resp.data;
        })
        .then(data => {
          /* pushId is the firebase unique key */
          let pushId = data.name;
          dispatch('addCreatorAsMember', pushId);
          return pushId;
        })
        .then(pushId => {
          commit('SET_HOUSE_ID', pushId);
          dispatch('instantiateHouse', pushId);
          dispatch('fetchActiveHouse');
          // commit('user/SET_BELONGS_TO_HOUSE', true, gObj_hasRoot)
        })
        .catch(err => {
          console.error('house/createNewHouse', err);
        });

    },  // END createNewHouse

    deleteHouse({ dispatch, commit, state}) {
      /* this gets fired when the last member (who must be an admin) is deleted
       * There must be only one member left to delete a house
        * */
      // let memberCount = getters.GetMemberCount;
      let memberCount = state.activeHouse.members.length;


        let userId = localStorage.getItem('userId');

      console.log('meausure: ', memberCount);

      if (memberCount === 1) {

        let isReallySure = false;

        if (confirm('This will delete the house and all its data.\n Do you want to proceed?')) {
          isReallySure = confirm("This cannot be undone.\n" +
            "Are you really super sure you want to do this?\n" +
            "You can still turn back!");
        }

        if (isReallySure) {
          let token = localStorage.getItem('token');
          let houseId = localStorage.getItem('houseId');

          globalAxios.delete('/houses/' + houseId + '.json?auth=' + token)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp);
                dispatch('membership/removeHouseFromMember', userId, gObj_hasRoot);
                dispatch('clearHouseData');
                commit('user/SET_BELONGS_TO_HOUSE', false, gObj_hasRoot);

                }
              })
            .catch(err => console.error(err));

        }
      } else {
        alert('You must remove all other members before you can delete the house.');
      }

    },

    fetchActiveHouse({commit, dispatch}) {

      /*
      * get the  user id from local storage - don't pass it as an arg!!!!
        get the user's house
        get the house's member objects
              - id and isAdmin
              - set active house member {id, isAdmin}
        use the memberIds to get the member's names
            - use for loop to set member name in house obj* */

      let token = localStorage.getItem('token');
      let userId = localStorage.getItem('userId');
      let houseId = null;


      let houseBlob = {
        members: null
      };
      /* ***************************
        OUTSIDE GET REQUEST
        gets the houseId from the users entry in the users table
      ****************************/
      globalAxios.get('/users/' + userId + '/house.json' + '?auth=' + token)
        .then((response) => {

          if (response.data.active === true) {
            // console.log('response.data.active ', typeof(response.data.active));
            houseId = response.data.houseId;
            localStorage.setItem('houseId', houseId);
            let thing1 = 'SET_BELONGS_TO_HOUSE';
            let thing2 = 'SET_HOUSE_ID';

            /* commit setter true for belongs to house */
            commit('user/SET_BELONGS_TO_HOUSE', true, gObj_hasRoot);
            commit('SET_HOUSE_ID', houseId);


          } else {
            commit('house/SET_BELONGS_TO_HOUSE', false, gObj_hasRoot);
            return;
          }
          /* ***************************
              INSIDE GET REQUEST, DEPENDENT ON OUTSIDE
              uses the houseId from the outside request to
              get house-data from houses node in firebase
              sets house
           ****************************/

          globalAxios.get('/houses/' + houseId + '.json?auth=' + token)
            .then(response => {
              /* return the data node, pass it to each succeeding then() */
              return response.data;
            })
            .then(data => {
              /* get the list of house members*/
              dispatch('fetchMembers', data);
            })
            .catch(err => console.error('inside get fetchActiveHouse houses ', err));
        })
        .catch(error => {
          /*if user isn't in a house, pass null to setUserInfo*/
          // console.error('outside get fetchActiveHouse outside catch ', error);
          dispatch('user/setUserInfo', null, gObj_hasRoot);
          // router.replace('/adminHouse');

        });
    }, //END fetchActiveHouse


    fetchMembers({commit, dispatch}, data) {

      let token = localStorage.getItem('token');
      let userId = localStorage.getItem('userId');
      /* convert the member node object into a usable
       * array to be used to fetch user names and such
       * */
      let memberArray = [];

      for (let memberId in data.members) {
            /* memberId is just the node id*/
        let userId = memberId;
        /* must use [] bracket notation for this to work*/
        memberArray.push(data.members[userId]);
      }
      // console.log('memberArray', memberArray);
      /*
      * call db for each member
      * get names, push onto new array
      * pass that array to a mutation to set house members in state*/
      let members = [];

      for (let i = 0, ln = memberArray.length; i < ln; i++) {

        globalAxios.get('/users/' + memberArray[i].id + '.json?auth=' + token)
          .then(response => {
            console.log('fetchMembers GET', response);
            let memberBlob = {
              id: memberArray[i].id,
              isAdmin: memberArray[i].isAdmin,
              email: response.data.email,
              name: response.data.name.first + ' ' + response.data.name.last,
              role: ''
            };
            /* explicit is better than implicit
            *  only change role value if user is admin
            */

            if (memberArray[i].isAdmin === true) {
              memberBlob.role = 'Admin';
            }
            members.push(memberBlob);

            if (memberArray[i].id === userId) {
              let thing3 = 'setUserInfo';
              dispatch('user/setUserInfo', memberBlob, gObj_hasRoot);
            }
            // return 0;
            return members;
          })
          .then(members => {
            /* sets admin and member count in memberModule */
            // dispatch('membership/setAdminInfo', members, gObj_hasRoot);
            let thing4 = 'setAdmin_and_MemberCount';
            dispatch('membership/setAdmin_and_MemberCount', members, gObj_hasRoot);
          })
          .catch(err => console.log('fetchMembers for loop ', err));


      } //end for-i loop

      let thing1 = 'SET_HOUSE_MEMBERS';
      let thing2 = 'SET_HOUSE_NAME';

      commit('house/SET_HOUSE_MEMBERS', members, gObj_hasRoot);

      /* set the house name */
      commit('house/SET_HOUSE_NAME', data.houseName, gObj_hasRoot);


    },// TO HERE


    instantiateHouse({commit, dispatch}, pushId) {

      /* this is the unique key generated by firebase for the house node name */
      // let pushId = localStorage.getItem('houseId');
      let token = localStorage.getItem('token');
      let houseBlob = {
        houseId: pushId,
      }
      let thing = 'addHouseToUser';
      dispatch('user/addHouseToUser', houseBlob, gObj_hasRoot);

      //these will get moved into their appropriate modules as helpers then get dispatched when user adds data

      globalAxios.patch('houses/' + pushId + '/supplies.json?auth=' + token, {0: {have: false, inCart: false, item: 'Stuff & Things'}})
        .then(response => {
          console.log('houses/supplies node created')
        })
        .catch(err => console.error('instantiateHouse supplies', err));


      globalAxios.patch('houses/' + pushId + '/chores.json?auth=' + token, {0: 'get shit done'})
        .then(response => {
          console.log('houses/chores node created')
        })
        .catch(err => console.error('instantiateHouse chores', err));
    }

  }
;


/*TODO There is NO POINT in creating empty data sets,
 It just clutters up the DB make it so no node is created
 until someone adds a supply or chore

 Also doing it the way it is here is self-defeating
 if a user deletes all the supply or whatnot, then the node goes away!

 */


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
