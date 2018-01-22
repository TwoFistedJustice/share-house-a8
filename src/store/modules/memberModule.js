/*
* memberModule controls data that can affect users as they relate to a house
* this can affect any user, logged in or not
* if something can only affect the user who is using the interface, look in userModule
* */


import globalAxios from 'axios';
import router from '../../router.js';
import {APIkey, gObj_hasRoot} from '../../config.js';

const state = {
  adminCount: 2,
  memberCount: 0

};

const getters = {
  GetAdminCount(state) {
    return state.adminCount;
  },
  GetMemberCount(state) {
    return state.memberCount;
  }
};

const mutations = {
  SET_ADMIN_COUNT(state, count) {
    state.adminCount = count;
  },
  SET_MEMBER_COUNT(state, count) {
    state.memberCount = count;
  }
};

const actions = {

  //payload needs to get changed so it includes isAdmin: t/f
  addMember({dispatch, commit}, payload) {
    // console.log('adding member');

    /* ****************************
       GET the member data as an array
       modify it
       then PUT it back

       payload expects {houseId: pushId of house}
    *   expects the pushId of the house
    *   provided to the user who pastes it into the join house input field
    *   in AdminHouse.Vue
    *   Yes, this is probably not secure. But it's alpha software.
    *   I'll find a secure way later, maybe like firebase invitations with dynamic URLs.
    *   That's another project for another day
    *****************************/
    //what if they are already a member?
    let houseId = payload.houseId;
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');

    globalAxios.get('/houses/' + houseId + '/members/' + userId + '.json?auth=' + token)
      .then(response => {
        if (response.data != null) {
          return data;
        } else {
          let blob = {id: userId, isAdmin: false};
          /* add the new member */
          globalAxios.patch('houses/' + houseId + '/members/' + userId + '.json' + '?auth=' + token, blob)
            .then(
              /* after adding the user to the house, add the house to the user */
              function () {
                let thing = 'addHouseToUser';
                dispatch('user/addHouseToUser', {houseId: houseId}, gObj_hasRoot);
              }
            )
            .catch(err => console.error('member/addMember-put', err));
          return 0;
        }
      })
      .catch(err => {
        console.error('member/addMember-get', err);
      })
  },

  removeMember({dispatch, commit, getters}, memberData) {
    /* receives memberId from calling function
    *  if # admins is less than two, and member is admin, cannot delete
    *  payload looks like:
    *  {id: userId, name: firstLast, idAdmin: t/f, role: ''}
    * */
    let canRemove = false;
    let adminCount = getters.GetAdminCount;
    let memberCount = getters.GetMemberCount;
    let memberId = memberData.id;
    let isAdmin = memberData.isAdmin;
    let houseId = localStorage.getItem('houseId');
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');

    /* if member is not an admin, it's okay to remove them */
    /* if admins & members both count at least two, removal is okay */
    if (isAdmin === false || (adminCount >= 2 && memberCount >= 2)) {

      canRemove = true;
    }
   /* Remove the member if canRemove is true */
    if (canRemove) {
      globalAxios.delete('/houses/' + houseId + '/members/' + memberId + '.json?auth=' + token)
        .then(resp => {
          return resp;
        })
        .then(function () {
          let thing1 = 'removeHouseFromMember';
          let thing2 = 'fetchActiveHouse';
          let thing3 = 'clearUserData';
          let thing4 = 'CLEAR_HOUSE_DATA';

          dispatch('memberManagement/removeHouseFromMember', memberId, gObj_hasRoot);

          /* if user is removing someone else, refresh the active house */
          if(memberId != userId) {
            dispatch('house/fetchActiveHouse', null, gObj_hasRoot);
          }else {
            /* if member is removing self, clear house and user data*/
            commit('user/CLEAR_USER_DATA', null, gObj_hasRoot);
            commit('house/CLEAR_HOUSE_DATA', null, gObj_hasRoot);
          }
        })
        .catch(err => console.error(err));
    }
  },

  removeMemberOLD({dispatch, commit, getters, rootGetters}, userData) {
    /* receives memberId from calling function
    *  checks DB if member is admin
    *  deletes them if they are not
    * */
    let memberId = userData.userId;
    let token = localStorage.getItem('token');
    let houseId = localStorage.getItem('houseId');

    globalAxios.get('/houses/' + houseId + '/members/' + memberId + '.json?auth=' + token)
      .then(resp => {
        console.log(resp);
        return resp.data;
      })
      .then(data => {
        if (data.isAdmin === false) {
          globalAxios.delete('/houses/' + houseId + '/members/' + memberId + '.json?auth=' + token)
            .then(resp => {
              // console.log('delete response', resp);
              return resp;
            })
            .then(function () {
              let thing1 = 'removeHouseFromMember';
              let thing2 = 'fetchActiveHouse';
              dispatch('memberManagement/removeHouseFromMember', memberId, gObj_hasRoot);
              dispatch('house/fetchActiveHouse', null, gObj_hasRoot);
            })
            .catch(err => console.error(err));
        } else {
          console.log('Admins must remove themselves');
        }
      })
      .catch(err => console.error(err));
  },

  removeHouseFromMember({commit, dispatch}, userId) {
    /* receives userId from calling function
    * deletes the house node in that user's DB entry*/
    let token = localStorage.getItem('token');
    globalAxios.delete('/users/' + userId + '/house.json?auth=' + token)
    // .then(response => console.log('delete', response))
      .catch(err => console.error('member/removeHouseFromMember', err));
  },

  setAdmin_and_MemberCount({dispatch, commit}, members) {
    /* dispatched from house/fetchMembers */
    let adminCount = 0;
    let memberCount = members.length;


    for (let i = 0; i < memberCount; i++) {
      if (members[i].isAdmin === true) {
        adminCount++;
      }

      commit('SET_ADMIN_COUNT', adminCount);
      commit('SET_MEMBER_COUNT', memberCount);


    }
  }
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
