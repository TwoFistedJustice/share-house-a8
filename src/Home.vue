<template>

<div>
    <div class="row">
        <h4>Home.vue</h4>
      <H2>Alpha Version 8 - IN PROGRESS</H2>
      <h3>Features and Breakdown:</h3>
            <ul>
              <li><h2>Features </h2></li>
              <li>automatic namespacing</li>
              <li>changed members manipulation from array to normal object</li>
              <li>admins can remove anyone</li>
              <li>non-admins can only remove themselves</li>
              <li>admin can change house name</li>
              <li>admin can delete house</li>
              <li>to delete last member, must delete house</li>

            </ul>
            <ul>
              <li><h2>PLAN FOR A8</h2></li>
              <li>Copy A7 straight over as is and begin changes</li>
              <li>DONE - Institute automatic namespacing</li>
              <li>Basic member and account management</li>
              <li> Refactor Chores and supply per A7 db structure</li>
              <li>build member components</li>
              <ol>
                <li>Join or leave house</li>
                <li>Admin can remove member</li>
                <li>shows chore for the week</li>
              </ol>
            </ul>
      <li>Admin can change house name</li>
      <li>Admin can delete house if is last member</li>


        <h3>Alpha 7</h3>
      <p>Implements authentication and multiple instances</p>
      <ul>
        <li>Contains no chore wheel or supply functionality</li>
        <li>User authentication</li>
        <li>house creation</li>
        <li>user can become member of house</li>
        <li>supply and chores child nodes created upon house node creation</li>
        <li>A7 will demonstrate ability to have multiple users using multiple instances of the app</li>
        <li>Example: Purple House and Casa Corazones will each be able to have their own 'instance'</li>
      </ul>

        <h3>To DO in Alpha 6</h3>
        <ul>

            <li>Add simple animation/transitions - see Vue 18 Project App.vue</li>


        </ul>
        <h3>Changelog</h3>
        <h4>Alpha 6</h4>
        <ul>
            <li> Loads data from firebase on startup</li>
            <li>Automatically saves supply to database when you navigate away</li>
            <li>Refactored directory structure</li>
            <li>Changed lists to component arrays</li>
            <li>Added Event Planning component</li>
            <li>Added a bootstrap dropdown menu to Header.vue for routes-links</li>
            <li>Initializing data from from file instead of data() propery - see src/data directory</li>
            <li>Separated List Administration from shared components</li>
            <li>Gave List Administration its own drop down menu </li>
        </ul>
        <h4>Alpha 5</h4>
        <ul>
            <li>Added naming/types to Vuex</li>
            <li>Incorporates vuex modules to distribute actions, mutations, getters across multiple files</li>
            <li>Refactored all supply properties and methods to shorter syntax</li>
            <li>Added Vuex namespacing - manually configured - see types.js</li>
            <li>Disabled most components</li>
            <li>Vuex state passes data between ShoppingList, SuppliesInventory, & AdminstrateLists</li>
        </ul>
        <h4>Alpha 4</h4>
        <ul>
            <li>Added Vuex</li>
            <li>Deprecated NeedHave.vue</li>
        </ul>
        <h4>Alpha 3</h4>
        <ul>
            <li>Added Vue Router</li>
            <li>Set up basic routing</li>
        </ul>

        <h4>Alpha 1 & 2</h4>
        <ul>
            <li>Built basic structure</li>
            <li>Tested Event Bus for state</li>
            <li>Tested Firebase for DB</li>
        </ul>
        <p></p>

        <h3>What this code is built on</h3>
      <p>Vue.js, Vue-Router, Vuex, Axios</p>




</div></div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
