<template>

<div>
    <div class="row">
        <h4>Dashboard.vue</h4>
      <p>This should only be visible if authorized</p>
      <p>Load email</p>
      <p>when a house is created, it get a unique ID (use patch instead of post)- each stuff node gets a child with house id as key</p>
      <h2>Everyone can see a dashboard</h2>
      <!--<h2>{{getUserMember.name}} </h2>-->
      <!--<h3> {{getUserMember.role}} of {{getActiveHouse.houseName}}</h3>-->
      <h2>{{getUserInfo.name}} </h2>
      <h3> {{getUserInfo.role}} of {{getActiveHouse.houseName}}</h3>
      <!--<h1> for 1/1/18 - finish leave house function</h1>-->
      <!--<h2>check if admin</h2>-->
      <!--<h2>if (admin && members) must remove members first</h2>-->
      <!--<h2>make a kick member out function- doesn't work on admins</h2>-->
      <!--<h2>should member management be another module?</h2>-->
      <!--<h2>make leave house a helper that takes uid as arg</h2>-->


    </div>
      <div class="row">

      </div>
</div>
</template>




<script>

  import {mapGetters} from 'vuex';
  import {gObj_hasRoot} from "../../config";

  export default {
  props: [],
  data: function () {
    return {};
  },
  computed: {
    ...mapGetters({

      getUserInfo: 'user/getUserInfo',
      getActiveHouse: 'house/getActiveHouse'
    }),


  }
}
</script>

<style scoped>

</style>
