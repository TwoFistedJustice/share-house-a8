import Vue from 'vue';
import VueRouter from 'vue-router';
import {store} from './store/store';
// import store from './store/store.js'; // for use with export default
Vue.use(VueRouter);


import Home from './Home.vue';
import SignUp from './components/auth/SignUp.vue';
import SignIn from './components/auth/SignIn.vue';
import Dashboard from './components/admin/Dashboard.vue';
import AdminHouse from './components/admin/AdminHouse.vue';
import TEST from './components/TEST.vue';

// import ChoreWheel from './components/chores/ChoreGrid.vue';
// import CostSplit from './components//CostSplit.vue';
// import EventPlan from './components/EventPlanning.vue';
// import Messenger from './components/Messenger.vue';
// import GuestBoard from './components/GuestBoard.vue';
// import Profiles from './components/Profiles.vue';
import ShoppingList from './components/supplies/ShoppingList.vue';
import SuppliesInventory from './components/supplies/SuppliesInventory.vue';


//**Administration **/
import AdminSupplies from './components/admin/SuppliesAdmin.vue';


//** children of Profiles **/
// import HomeProfile from './components/shared/HomeProfile.vue';
// import PotentialRoommates from './components/shared/PotentialRoommates.vue';
// import RoommatesProfiles from './components/shared/RoommatesProfiles.vue';
// import ProfilesMenu  from './components/shared/ProfilesMenu.vue';


// export const routes = [
const routes = [
  {path: '', component: Home},
  {path: '/', component: Home},

  //Administration

  //Features
  // {path: '/choreWheel', component: ChoreWheel, name: 'choreWheel'},
  // {path: '/costSplit', component: CostSplit, name: 'costSplit'},
  // {path: '/eventPlanning', component: EventPlan, name: 'eventPlan'},
  // {path: '/messenger', component: Messenger, name: 'messenger'},
  // {path: '/guestBoard', component: GuestBoard , name: 'guestBoard'},
  // {path: '/shoppingList', component: ShoppingList, name: 'shoppingList'},
  // {path: '/suppliesInventory', component: SuppliesInventory, name: 'suppliesInventory'},

  {path: '/TEST', component: TEST, name: 'TEST'},


  {
    path: '/signup', component: SignUp, name: 'signup',
    //if logged in go straight to dashboard
    beforeEnter(to, from, next) {
      if (store.state.auth.idToken) {
        next('/dashboard');
      } else {
        next();
      }
    }
  },

  {
    path: '/signin', component: SignIn, name: 'signin',
    //if logged in go straight to dashboard
    beforeEnter(to, from, next) {
      if (store.state.auth.idToken) {
        next('/dashboard');
      } else {
        next();
      }
    }
  },

  {
    path: '/dashboard', component: Dashboard, name: 'dashboard',
    //if NOT logged in go straight to sign-in
    beforeEnter(to, from, next) {
      if (store.state.auth.idToken) {
        // next('/adminSupplies');

        next();
      } else {
        next('/signin');
      }
    }// end method
  },

  {
    path: '/adminHouse', component: AdminHouse, name: 'adminHouse',
    //if NOT logged in go straight to sign-in
    beforeEnter(to, from, next) {
      if (store.state.auth.idToken) {
        next();
      } else {
        next('/signin');
      }
    }// end method
  },

  {
    path: '/adminSupplies', component: AdminSupplies, name: 'adminSupplies',
    //if NOT logged in go straight to sign-in
    beforeEnter(to, from, next) {
      if (store.state.auth.idToken) {
        next();
      } else {
        next('/signin');
      }
    }// end method
  },

  /* FEATURE ROUTES*/
  {
    path: '/shoppingList', component: ShoppingList, name: 'shoppingList',
    //if NOT logged in go straight to sign-in
    beforeEnter(to, from, next) {
      if (store.state.auth.idToken) {
        next();
      } else {
        next('/signin');
      }
    }// end method
  },

  {path: '/suppliesInventory', component: SuppliesInventory, name: 'suppliesInventory',
    //if NOT logged in go straight to sign-in
    beforeEnter(to, from, next) {
      if (store.state.auth.idToken) {
        next();
      } else {
        next('/signin');
      }
    }// end method
  },


  // {path: '/profiles', components: {default: Profiles
  //                                     }, children: [
  //                                         // {path: '', component: ProfilesMenu, name: 'profilesMenu.'},
  //                                         {path: '', component: ProfilesMenu, name: 'profilesMenu.'},
  //                                         {path: '/homeProfile', component: HomeProfile, name: 'homeProfile'},
  //                                         {path: '/potentialRoommates', component: PotentialRoommates, name: 'potentialRoommates'},
  //                                         {path: '/roommateProfiles', component: RoommatesProfiles, name: 'roommateProfiles'}
  //                                                                     ]}


];

export default new VueRouter({mode: 'history', routes});
