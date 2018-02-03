<template>
  <div class="col-sm-6 col-md-6">
    <div class="panel"
         v-bind:class="{'panel-danger': !supply.inCart, 'panel-success': supply.inCart}">
      <div class="flex panel-heading"
           @click="changeItemBoolStatus( {supply: supply, bool: 'inCart'} )">
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

  export default {
    props: ['supply'],
    methods: {
      ...mapActions({
        changeItemBoolStatus: 'supply/flipInCartBool'
      }),
      flipBool() {
        this.supply.inCart = !this.supply.inCart;
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
