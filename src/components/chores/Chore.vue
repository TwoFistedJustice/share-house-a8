<template>
  <div class="col-sm-6 col-md-6">
    <div class="panel panel-success">
      <div class="flex panel-heading"
           @click="assignKeyChore(chore.name)">
        <h2>{{chore.task}} : {{chore.name}} </h2>
        <!--<h2>{{chore.name}}: {{chore.task}}</h2>-->
        <!--<button class="btn btn-info">Completed</button>-->
      </div>
      <div class="panel-body">
        <p>{{chore.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>

  import {mapActions} from 'vuex';
  export default {
    props: ['chore'],
    methods: {
      ...mapActions({
        assignKeyChore: 'chores/setChoreKey'
      })
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

  .flex-right {

  }


</style>
