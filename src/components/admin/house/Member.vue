<template>


  <div class="col-sm-6 col-md-6">

    <div class="panel"
         v-bind:class="{'panel-danger': canDelete, 'panel-success': !canDelete}">
      <div class="flex panel-heading">
        <h2>{{member.name}} {{member.role}}</h2>

        <div class="form-group" v-if = "isAdmin">
          <input type="checkbox"
                 id="Remove"
                 v-model="canDelete"
                 value="true">
          <label for="Remove">Remove member from house</label>
          <br><button
          v-if="canDelete"
            @click="bootemIntheHead()">Removinator</button>
        </div>


      </div>
    </div>

  </div>


</template>


<script>
import {gObj_hasRoot} from "../../../config";
import {mapGetters} from 'vuex';

export default {
    props: ['member'],
    data: function () {
      return {
        setClass: true,
        canDelete: false,
        memberData: {
          userId: this.member.id
        }

      };

    },
  computed: {
    ...mapGetters({
          isAdmin: 'user/getIsAdmin'
    })
  },
    methods: {
      bootemIntheHead(){
        let thing = 'removeMember';
        this.$store.dispatch('memberManagement/removeMember', this.memberData, gObj_hasRoot);
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
