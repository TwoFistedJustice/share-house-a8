<template>
  <div class="col-sm-6 col-md-6">
    <div class="panel"
         v-bind:class="{'panel-danger': !supply.inCart, 'panel-success': supply.inCart}">
      <!--<div class="flex panel-heading"-->
           <!--@click="changeItemBoolStatus( {supply: supply, bool: 'inCart'} )">-->
        <!--<h2 v-if="supply.inCart"> Added to cart: {{supply.item}}</h2>-->
        <!--<h2 v-if="!supply.inCart">{{supply.item}}</h2>-->
      <!--</div>-->

      <div class="flex panel-heading"
           @click="flipBool">
        <h2 v-if="supply.inCart"> Added to cart: {{supply.item}}</h2>
        <h2 v-if="!supply.inCart">{{supply.item}}</h2>
      </div>


    </div>
  </div>
</template>

<script>

  /* ******************
   *  a supply item looks like:
   *  {item: 'Paper Towels', have: true, inCart: false}
   ********************************************************** */

  import {mapActions} from 'vuex';
  // import {gObj_hasRoot} from "../../config";

  export default {
    props: ['supply'],
    methods: {
      ...mapActions({
        changeItemBoolStatus: 'supply/flipInCartBool',
        saveSupplies: 'supply/saveSupply'
      }),
      flipBool() {
        this.supply.inCart = !this.supply.inCart;
        let thing = 'saveSupply';
        this.saveSupplies();
        // this.$store.dispatch('supply/saveSupply', null, gObj_hasRoot);
      }

    }

  }
</script>

<style scoped>

  .flex {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
  }


</style>
