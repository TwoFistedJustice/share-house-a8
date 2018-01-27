<template>

  <div>
    <div class="row">
      <h4>AdminHouse.vue</h4>

      <!--   DISPLAY HOUSE INFO-->
      <div v-if="getBelongsToHouse">
        <h2>House: {{getActiveHouse.houseName}} </h2>
        <p>houseId: {{getHouseId}}</p>

        <h2> Should only be changeable by Admins - check vs firebase</h2>
        <p>below the line is where controls go</p>
        <hr>
        <!--   SUPER ADMIN - CHANGE OR DELETE HOUSE-->
        <div class="form-group" v-if="isAdmin">
          <div>
            <input type="checkbox"
                   name="super-powers"
                   id="super-powers"
                   v-model="superPowers"
                   value="true">
            <label for="super-powers">Change House Details</label>
          </div>

          <div v-if="superPowers">

            <h3>Change the house name</h3>
            <button class="btn btn-primary" @click="changeHouseName">Change House Name</button>
            <input type="text" name="changeHouseName" id="changeHouseName" v-model="newHouseName"
                   placeholder="New house-name">

            <br><br>
            <h3>Destroy everything!!! Mwahahaha!!!</h3>
            <button class="btn btn-danger"
                    @click="deleteHouse">Burn House to Ground
            </button>

          </div>
        </div>
        <!--MEMBER COMPONENT
                              MEMBER COMPONENT-->
        <h2>Housemates: </h2>

        <app-member v-for="member in getActiveHouse.members"
                    :member="member"
                    :key="member.id"></app-member>

      </div>

      <!--   JOIN OR CREATE A HOUSE-->
      <div class="form-group" v-if="!getBelongsToHouse">
        <p>I would like to </p>
        <label for="join">
          <input type="radio" id="join" value="join" v-model="knock">
          JOIN a house</label>
        <br>
        <label for="create">
          <input type="radio" id="create" value="build" v-model="knock">
          CREATE a house</label>


        <form @submit.prevent="createHouse" v-if='knock =="build"'>
          <div class="input">
            <label for="houseName">Name your house: </label>
            <input
              type="text"
              id="lastName"
              v-model="houseName">
            <button class="btn btn-primary" type="submit">Create House</button>
          </div>

        </form>


        <form @submit.prevent="joinHouse" v-if='knock =="join"'>
          <div class="input">
            <label for="houseName">Paste houseId</label>
            <input
              type="text"
              id="lastName"
              v-model="houseId">
            <button class="btn btn-success" type="submit">Join House</button>
          </div>

        </form>

      </div>
      <!--   END END END JOIN OR CREATE A HOUSE-->

    </div>

    <div class="row">
      <br><br><br>
      <ul>
        <li>Adminstrate House</li>
        <li>Show/change name of house</li>
        <li>Delete house by removing all members</li>
        <li>Show featureSet</li>
        <br>
        <li>DONE Show Admins of House</li>
        <li>DONE Show Members of House</li>
        <li> DONE Delete member</li>
      </ul>

    </div>
  </div>
</template>


<script>
  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';
  import {gObj_hasRoot} from "../../config";
  import appMember from './house/Member';

  export default {
    props: [],
    data: function () {
      return {

        houseName: '',
        houseId: '',
        knock: null,
        superPowers: false,
        newHouseName: ''

      };

    },
    components: {
      appMember
    },
    computed: {

      ...mapGetters({
        getActiveHouse: 'house/getActiveHouse',
        getBelongsToHouse: 'user/getBelongsToHouse',
        getHouseId: 'house/getHouseId',
        isAdmin: 'user/getIsAdmin'

      }),

    },
    methods: {
      ...mapActions({
        deleteHouse: 'house/deleteHouse',
      }),

      changeHouseName() {
        const formData = {
          houseName: this.newHouseName
        }
        let thing = 'changeHouseName';
        this.$store.dispatch('house/changeHouseName', formData, gObj_hasRoot);
        this.newHouseName = '';

      },
      createHouse() {
        const formData = {
          houseName: this.houseName
        };
        let thing = 'createNewHouse';
        this.$store.dispatch('house/createNewHouse', formData, gObj_hasRoot);
        this.houseName = '';
      },


      joinHouse() {
        const formData = {
          houseId: this.houseId

        };
        // console.clear();
        // console.log('***********join house button not active yet', this.houseId);
        let thing = 'addMember';
        this.$store.dispatch('membership/addMember', formData, gObj_hasRoot);

        this.houseId = '';

      },
    }


  }
</script>

<style scoped>

</style>
