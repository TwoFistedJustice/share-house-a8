<template>

  <div>
    <!--<h3>Global this.$store.state.supplies Supplies List</h3>-->
    <div class="row">
      <div class="form-group">
        <label for="supplyAdd"></label>
        <input type="text"
               id="supplyAdd"
               class="form-control"
               v-on:keyup.enter="addToSuppliesList"
               v-model='supplyToAdd'>

        <button class="btn btn-primary"
                @click="addToSuppliesList"
        >Add Supply Item
        </button>
      </div>

      <div class="row">

        <h1>Add or Delete</h1>

        <p>Edit supplies here, displays in inventory and shopping list</p>
        <!--:key prevents a bug where the checkbox re-renders pre-checked-->
        <app-admin-item v-for="(supply, index) in getSupplies"
                        :key="supply.item"
                        :supply="supply"
                        :index="index"></app-admin-item>

      </div>

    </div>
  </div>
</template>

<script>
  /***
   *  a supply item looks like:
   *  {item: 'Paper Towels', have: true, inCart: false}
   * ***/

  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';
  import * as types from '../../store/types.js';
  import appAdminItem from './SupplyItemAdmin.vue';


  export default {

    data: function () {
      return {
        supplyToAdd: ''
      };
    },
    computed: {
      ...mapGetters({
        getSupplies: types.GET_SUPPLIES
      }),
    }, //END COMPUTED

    methods: {
      ...mapActions({
        addSupply: types.SUPPLY_ADD_SUPPLY,
        saveSupplies: types.SUPPLY_SAVE_SUPPLY,
//            deleteItem: types.SUPPLY_DELETE_ITEM
      }),

      addToSuppliesList() {
        // console.log("ljlk");
        let supply = {item: this.supplyToAdd, have: false, inCart: false};
        // this.suppliesAddSupply(this.supplyToAdd);
        this.addSupply(supply);
        this.supplyToAdd = '';
      },
      fetchData(){
        console.log('fetch');
      }


    }, // END METHODS
    components: {
      appAdminItem
    },
    beforeDestroy() {
//      this.confirmChanges();
      this.saveSupplies();
    }


  }
</script>

<style scoped>

</style>
