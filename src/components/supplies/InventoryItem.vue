<template>
  <div class="col-sm-6 col-md-6">
      <!--  @click="changeItemBoolStatus( {supply: supply, bool: 'have'} )">        -->
    <div class="panel"
         v-bind:class="{'panel-danger': !supply.have, 'panel-success': supply.have}">
      <div class="flex panel-heading"

        @click="supply.have = !supply.have">

        <h2 v-if="supply.have">{{supply.item}} : We have this.</h2>
        <h2 v-if="!supply.have">{{supply.item}} : We need this.</h2>
      </div>

    </div>
  </div>
</template>

<script>

  /***
   *  a supply item looks like:
   *  {item: 'Paper Towels', have: true, inCart: false}
   * ***/
  import {mapActions} from 'vuex';

  export default {
    props: ['supply'],

    methods:{
      ...mapActions({
        changeItemBoolStatus: 'supply/flipInCartBool'
      }),

      flipBool(){
        this.supply.have = !this.supply.have;

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
