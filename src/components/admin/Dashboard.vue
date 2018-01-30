<template>

<div>
    <div class="row">
        <h4>Dashboard.vue</h4>
      <h2>{{getUserInfo.name}} </h2>
      <h3> {{getUserInfo.role}} of {{getActiveHouse.houseName}}</h3>

        <h3>{{getUserInfo.email}}</h3>

      <h3>Your house job this week is: </h3>

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
