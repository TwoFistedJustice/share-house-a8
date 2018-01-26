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
        :supply="supply"></app-inventory-item>
    </div>


  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';

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
        //changes the switch button text to match functionality
        //sets the central supply bool in vuex

        //TODO this line causes supply.module.changed to get set,it needs to not do that
        //because it fires the changed bool setter in supply module
        //may need to separate the click setting from this one
        this.setDisplayHaveSwitch(this.checkArrayBools());

        if (this.getHaveSwitch === true) {
          return 'Need';
        } else {
          return 'Have';
        }
      }

    },//end computed

    methods: {
      ...mapActions({
        changeItemHaveStatus: 'supply/flipItemBool',
//        confirmChanges: types.confirmChangse,`
        saveSupplies: 'supply/saveSupply',
        setDisplayHaveSwitch: 'supply/setDisplayHaveSwitch',
        switchAllHaveStatus: 'supply/switchAllHaveStatus'
      }),
      checkArrayBools() {
        //This fn sets the displayHaveSwitch property to govern the switch-all button text
        //check boolean contents of getSupplies[], if all are same
        //change the button value
        let holdingBool = false;

        //convert the have bools to zero or one and add them up
        //if the sum is equal to zero or to the length of the array
        //set the holding bool to false if zero, and true if length
        let sum = 0;
        //could use forEach
        for (let i = 0; i < this.getSupplies.length; i++) {
          let val = this.getSupplies[i].have ? 1 : 0;
          sum += val;
        }
        if (sum === 0) {
          holdingBool = false;
        } else if (sum === this.getSupplies.length) {
          holdingBool = true;
        } else {
          holdingBool = this.displayHaveSwitch;
        }
        return holdingBool;
      }, //end checkArrayBools

    }, //END METHODS
    components: {
      appInventoryItem
    },

    beforeDestroy() {
//      this.confirmChanges();
      this.saveSupplies();
    },


  }
</script>
