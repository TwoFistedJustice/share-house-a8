<template>
  <div>
    <nav class="navbar navbar-default">
      <button v-if="isAuthenticated" @click="TestFn" class="btn btn-danger">Test Function</button>

      <div class="container-fluid">
        <div class="navbar-header">
          <router-link to="/"
                       class="navbar-brand">Share House A8 - House & Member Mgt
          </router-link>

          <p>{{getUserInfo.name}} {{getActiveHouse.houseName}} <b>{{getUserInfo.role}}</b></p>

        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">


          </form>
          <ul class="nav navbar-nav navbar-right list-group">

            <li
              @mouseenter="isAdminOpen =!isAdminOpen"
              @mouseleave="isAdminOpen =!isAdminOpen"
              class="dropdown-toggle"
              :class="{open: isAdminOpen}">
              <a href="#"
                 class="dropdown-toggle"
                 data-toggle="dropdown"
                 role="button"
                 aria-haspopup="true"
                 aria-expanded="false">Admin <span class="caret"></span></a>
              <ul class="dropdown-menu">

                <li>
                  <button v-if="isAuthenticated" @click="onLogout" class="btn btn-warning">Logout</button>
                </li>
                <router-link to="/"
                             tag="li"
                             active-class="" exact><a>Home </a></router-link>
                <router-link v-if="!isAuthenticated"
                             to="signup"
                             tag="li"
                             active-class=""
                             class="list-group-item" exact><a>Sign Up</a></router-link>

                <router-link v-if="!isAuthenticated"
                             to="signin"
                             tag="li"
                             active-class=""
                             class="list-group-item" exact><a>Sign In</a></router-link>

                <router-link v-if="isAuthenticated"
                             to="dashboard"
                             tag="li"
                             active-class=""
                             class="list-group-item" exact><a>Dashboard</a></router-link>

                <router-link v-if="isAuthenticated"
                             to="adminHouse"
                             tag="li"
                             active-class=""
                             class="list-group-item" exact><a>House</a></router-link>

                <router-link v-if="isAuthenticated"
                             to="adminSupplies"
                             tag="li"
                             active-class=""
                             class="list-group-item" exact><a>Supplies</a></router-link>


              </ul>
            </li>

            <li v-if="isAuthenticated"
                @mouseenter="isDropDownOpen =!isDropDownOpen"
                @mouseleave="isDropDownOpen =!isDropDownOpen"
                class="dropdown-toggle"
                :class="{open: isDropDownOpen}">
              <a href="#"
                 class="dropdown-toggle"
                 data-toggle="dropdown"
                 role="button"
                 aria-haspopup="true"
                 aria-expanded="false">Components <span class="caret"></span></a>
              <ul class="dropdown-menu">


                <router-link to="TEST"
                             tag="li"
                             active-class=""
                             class="list-group-item" exact><a>TEST </a></router-link>

                <router-link to="shoppingList"
                             tag="li"
                             active-class=""
                             class="list-group-item" exact><a>shoppingList </a></router-link>


                <router-link to="suppliesInventory"
                             tag="li"
                             active-class=""
                             class="list-group-item" exact><a>suppliesInventory</a></router-link>

                <router-link to="choreWheel"
                             tag="li"
                             active-class=""
                             class="list-group-item" exact><a>Chore Wheel</a></router-link>


              </ul>
            </li> <!-- END DROP DOWN -->

          </ul>
        </div><!-- /.navbar-collapse -->

      </div><!-- /.container-fluid -->
    </nav>


    <ul class="nav nav-pills">
      <!-- <li role="presentation" ><routes-link to="/">Home</routes-link></li> -->
      <!-- <li role="presentation"><routes-link to="/weHave">weHave</routes-link></li> -->


    </ul>

  </div>
</template>

<script>

  import {mapActions} from 'vuex';
  import {mapGetters} from 'vuex';
  import {gObj_hasRoot} from "./config";

  export default {
    data() {
      return {
        isAdminOpen: false,
        isDropDownOpen: false
      };
    },
    computed: {
      ...mapGetters({
        isAuthenticated: 'auth/isAuthenticated',
        getActiveHouse: 'house/getActiveHouse',
        getUserInfo: 'user/getUserInfo'
      }),

    },
    methods: {
      ...mapActions({
        // saveSupplies: t.saveSupply,
        // fetchSupplies: t.fetchSupply
      }),
      TestFn() {

        // confirm("Which button would you like to press to blow up the earth?");
        // console.log('test');
        // this.$store.dispatch('supply/testFn', null, gObj_hasRoot);
        this.$store.dispatch('house/testfunction', null, gObj_hasRoot);
      },
      onLogout() {
        this.$store.dispatch('auth/logout', null, gObj_hasRoot);
      }
    }
  }
</script>
<style scoped>


  .logout {
    background-color: transparent;
    border: none;
    font: inherit;
    color: white;
    cursor: pointer;
  }

</style>
