<template>


  <div class="col-sm-6 col-md-6">

    <div class="panel"
         v-bind:class="{'panel-danger': canDelete, 'panel-success': !canDelete}">
      <div class="flex panel-heading">
        <h2>{{member.name}} {{member.role}}</h2>
        <!--<button @click="testFn">Test a Function</button>-->

        <div class="form-group" v-if="canLeave">
          <input type="checkbox"
                 id="Leave"
                 v-model="canDelete"
                 value="true">
          <label for="Leave">Leave house</label>
          <br>
          <button
            v-if="canDelete"
            @click="bootToRear()">Leave
          </button>
        </div>
        <!--form break -->
        <div class="form-group" v-if="showAdminControls">
          <input type="checkbox"
                 id="showControls"
                 v-model="canSeeAdminControls"
                 value="true">
          <label for="showControls">Show Admin Controls</label>
        </div>
        <!--form break -->
        <div class="form-group" v-if="canSeeAdminControls">
          <button
                @click="bootToRear()">Give Boot
          </button>
          <button
            v-if="!memberData.memberIsAdmin"
            @click="adminPowerGive">Make Admin
          </button>
          <button
            v-if="isSelf"
            @click="adminPowerTake">Give Up Admin Power
          </button>
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
    // looks like: {id: userId, name: firstLast, idAdmin: t/f, role: ''}
    data: function () {
      return {
        setClass: true,
        canDelete: false,
        canSeeAdminControls: false,
        memberData: {
          memberId: this.member.id,
          memberIsAdmin: this.member.isAdmin
        },

      };

    },
    computed: {
      ...mapGetters({
        isAdmin: 'user/getIsAdmin',
        GetAdminCount: 'membership/GetAdminCount',
        getUserId: 'auth/getUserId'
      }),

      canLeave() {
        /*
        * If the user is and admin, but not the only admin
        * or the user is the member and not an admin
        * they can see the leave house button
        * The last admin standing must delete the house to leave
        * */
        let isAdmin = this.isAdmin;
        let memberId = this.member.id;
        let userId = this.getUserId;


        if (memberId === userId && !isAdmin) {
          return true;
        // } else if (memberId === userId && isAdmin && !this.isOnlyAdmin) {
        //   return true;
        } else {
          return false;
        }
      },

      isOnlyAdmin() {
        /* checks to see if the user is the only admin */
        if (this.isAdmin && this.GetAdminCount > 1) {
          return false;
        } else {
          return true;
        }
      },

      isSelf(){
        let memberId = this.member.id;
        let userId = this.getUserId;

        let condition = (memberId === userId && !this.isOnlyAdmin )? true : false;
        return condition;

      },

      showAdminControls(){
        /* user shouldn't see admin controls on their own component
        *  non-admins should never see admin controls ever
        *
        *  maybe have another set of control for self-admin - like give up admin power
        * */
        let isAdmin = this.isAdmin;
        let memberId = this.member.id;
        let userId = this.getUserId;

        // if(memberId === userId){
        //   return false
        // } else
          if (isAdmin && !this.memberData.isAdmin) {
          return true;
        } else {
          return false;
        }
      }


    },
    methods: {
      bootToRear() {
        let thing = 'removeMember';
        this.$store.dispatch('membership/removeMember', this.member, gObj_hasRoot);
      },

      adminPowerGive(){
        let thing = 'adminPowerGive';
        this.$store.dispatch('membership/adminPowerGive', this.member, gObj_hasRoot);
      },

      adminPowerTake(){
        let thing = 'adminPowerTake';
        this.$store.dispatch('membership/adminPowerTake', this.member, gObj_hasRoot);
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
