<template>
<div class="container">

  <div class="row">
    <div class="md-12">
    <app-header></app-header>
    <router-view></router-view>
    </div>
  </div>
</div>
</template>


<script>
import Header from './Header.vue';
import {gObj_hasRoot} from "./config";
//import {mapActions} from 'vuex';



export default {
  data: function(){
    return {

    }

  },
  components: {

    appHeader: Header

  },
    created(){
      let thing1 = 'loginOmatic';
        // this.$store.dispatch('initChores');
        // this.$store.dispatch(types.SUPPLY_FETCH_SUPPLY);
//      this.$store.dispatch('initData');
//       console.log('*****************created*******************');

      this.$store.dispatch('auth/loginOmatic', null, gObj_hasRoot);
      // this.$store.dispatch('authInit');


    },


}
</script>

