<template>

<div>
    <div class="row">
        <h1>AdministrateSupplies.vue</h1>
       <h3>Features and Breakdown of this component</h3>
        <p>Edit chores here, displays in chore wheel </p>
        <p>this is where you will set them up</p>


    </div>
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
                >Add Supply Item</button>
        <h3>Global this.$store.state.supply Supplies List</h3>
      <ul>
            <li class="list-group-item"
                v-for="(supply, index) in getSupplies" >{{supply.item}}
                <button class="btn btn-danger" @click="deleteItem(index)">Delete</button>
                </li>
      </ul>

      </div>
      </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import * as t from '../../store/types.js';

export default {

    data: function(){
        return {
            supplyToAdd: ''
        };
    },
    computed: {
        ...mapGetters({
            getSupplies: types.GetSupplies
        }),
    }, //END COMPUTED

    methods: {
        ...mapActions({
            addSupply: types.AddSupply,
            deleteItem: types.deleteItem
        }),

        addToSuppliesList(){
            // console.log("ljlk");
            let supply = {item: this.supplyToAdd, have: false};
            // this.suppliesAddSupply(this.supplyToAdd);
            this.addSupply(supply);
        }

    } // END METHODS



}
</script>

<style scoped>

</style>
