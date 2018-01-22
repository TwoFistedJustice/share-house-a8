<template>


  <div class="col-sm-6 col-md-6">

    <div class="panel"
         v-bind:class="{'panel-danger': canDelete, 'panel-success': !canDelete}">
      <div class="flex panel-heading">
        <h2>{{member.name}} {{member.role}}</h2>

        <div class="form-group" v-if="canRemove">
          <input type="checkbox"
                 id="Remove"
                 v-model="canDelete"
                 value="true">
          <label for="Remove">Remove member from house</label>
          <br>
          <button
            v-if="canDelete"
            @click="bootemIntheHead()">Removinator
          </button>
        </div>
        <!--<button @click="testFn">Test a Function</button>-->

      </div>
    </div>

  </div>


</template>


<script>
  import {gObj_hasRoot} from "../../../config";
  import {mapGetters} from 'vuex';

  export default {
    props: ['member'],
    // looks like: {id: userId, name: firstLast, idAdmin: t/f, role: ''}
    data: function () {
      return {
        setClass: true,
        canDelete: false,
        memberData: {
          memberId: this.member.id
        }

      };

    },
    computed: {
      ...mapGetters({
        isAdmin: 'user/getIsAdmin',
        getUserId: 'auth/getUserId'
      }),

      canRemove() {
        //allows checkbox is user is admin or box on user's own component instance
        let isAdmin = this.isAdmin;
        let memberId = this.member.id;
        let userId = this.getUserId;

        if(memberId === userId || isAdmin){
          return true;
        } else {
          return false;
        }
      }
    },
    methods: {
      bootemIntheHead() {
        let thing = 'removeMember';
        this.$store.dispatch('memberManagement/removeMember', this.member, gObj_hasRoot);
      },

      testFn() {
        console.log('testFn in Member.vue');

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
