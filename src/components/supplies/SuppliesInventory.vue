<template>

  <div>

    <div class="row">
      <h1>SuppliesInventory.vue</h1>
    </div>
    <div class="row">

      <span><button class="btn btn-primary"
                    @click="switchAllHaveStatus"
                    style="margin: 20px">We {{haveNeedText}} it all</button>
      </span>
    </div>

    <div class="row">
      <app-inventory-item
        v-for="supply in getSupplies"
        :key="supply.item"
        :supply="supply"></app-inventory-item>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';
  import {gObj_hasRoot} from "../../config";
  import appInventoryItem from './InventoryItem.vue';

  export default {
    data: function () {
      return {};
    },
    computed: {
      //Vuex namespacing require object syntax in mapWhatever
      ...mapGetters({
        getSupplies: 'supply/GetSupplies',
        getHaveSwitch: 'supply/GetDisplayHaveSwitch'
      }),

      haveNeedText() {
        /* changes the switch button text to match functionality
        *  sets the central supply bool in vuex */

        // this.setDisplayHaveSwitch(this.checkArrayBools());
        // this.$store.dispatch('supply/setDisplayHaveSwitch', this.checkArrayBools(), gObj_hasRoot);
        this.$store.dispatch('supply/setDisplayHaveSwitch', null, gObj_hasRoot);

        if (this.getHaveSwitch === true) {
          return 'Need';
        } else {
          return 'Have';
        }
      },
    },//end computed

    methods: {
      ...mapActions({
        changeItemHaveStatus: 'supply/flipBool',
        saveSupplies: 'supply/saveSupply',
        // setDisplayHaveSwitch: 'supply/setDisplayHaveSwitch',
        switchAllHaveStatus: 'supply/switchAllHaveStatus'
      }),
      // checkArrayBools() {
      //   /* This fn sets the buttonHaveSwitch property to govern the switch-all button text
      //   *  check boolean contents of getSupplies[], if all are same
      //   *  it changes the button value  */
      //   let holdingBool = false;
      //
      //   /* convert the have bools to zero or one and add them up
      //   *  if the sum is equal to zero or to the length of the array
      //   *  set the holding bool to false if zero, and true if length */
      //   let sum = 0;
      //   /* add one or zero to val */
      //   for (let i = 0; i < this.getSupplies.length; i++) {
      //     let val = this.getSupplies[i].have ? 1 : 0;
      //     sum += val;
      //   }
      //   if (sum === 0) {
      //     holdingBool = false;
      //   } else if (sum === this.getSupplies.length) {
      //     holdingBool = true;
      //   } else {
      //     holdingBool = this.buttonHaveSwitch;
      //   }
      //   return holdingBool;
      // }, //end checkArrayBools

    }, //END METHODS
    components: {
      appInventoryItem
    },

    beforeDestroy() {
      let thing = 'saveSupply';
      this.saveSupplies('suppliesInventory.vue beforeDestroy');
    },


  }
</script>
