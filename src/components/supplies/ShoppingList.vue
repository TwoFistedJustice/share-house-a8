<template>

  <div>
    <div class="row">
      <h1>ShoppingList.vue</h1>

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
  import appShoppingItem from './ShoppingItem.vue';


  export default {

    computed: {
      ...mapGetters({
        getSupplies: 'supply/GetSupplies',
      })
    },//end computed
    components: {
      appShoppingItem
    },
    methods: {
      ...mapActions({
        confirmChanges: 'supply/confirmChange',
        saveSupplies: 'supply/saveSupply'

      })
    },
    beforeDestroy() {
      this.saveSupplies();
    },

  }
</script>

<style scoped>

</style>
