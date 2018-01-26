<template>
  <div class="container ">

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
    data: function () {
      return {}

    },
    components: {

      appHeader: Header

    },
    created() {
      //       console.log('*****************created*******************');
      let thing1 = 'loginOmatic';
      let thing2 = 'fetchSupply';
      // this.$store.dispatch('initChores');
      //      this.$store.dispatch('initData');
      this.$store.dispatch('supply/fetchSupply', null, gObj_hasRoot);
      this.$store.dispatch('auth/loginOmatic', null, gObj_hasRoot);

    },


  }
</script>

