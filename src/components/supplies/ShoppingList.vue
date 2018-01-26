<template>

  <div>
    <div class="row">
      <h1>ShoppingList.vue alpha 6 MVP</h1>

      <div class="form-group">
      </div>

    </div>
    <div class="row">

      <p>Click an item when you add it to your shopping cart</p>
    </div>
    <div class="row">
      <a href="https://vuejs.org/v2/style-guide/#Keyed-v-for-essential" target ='blank'>Re-format v-for, See style guide </a>
      <app-shopping-item v-for="supply in getSupplies"
                         :supply="supply"
                         v-if="!supply.have"></app-shopping-item>
    </div>

  </div>
</template>

<script>

  /***
   *  a supply item looks like:
   *  {item: 'Paper Towels', have: true},
   * ***/


  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';
  import * as types from '../../store/types.js';

  import appShoppingItem from './ShoppingItem.vue';


  export default {

    computed: {
      ...mapGetters({
        getSupplies: types.GetSupplies,
      })
    },//end computed
    components: {
      appShoppingItem
    },
    methods: {
      ...mapActions({
        confirmChanges: types.confirmChange,
        saveSupplies: types.saveSupply

      })
    },
    beforeDestroy() {
//      this.confirmChanges();
      this.saveSupplies();
    },

  }
</script>

<style scoped>

</style>
