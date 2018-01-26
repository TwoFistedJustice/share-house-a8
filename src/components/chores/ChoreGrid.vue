<template>

  <div>

    <div class="row">
      <app-chore v-for="chore in rotation" :chore="chore"></app-chore>
    </div>


    <div class="row" v-if="notesBool">
      <h1>components/chores/ChoreGrid.vue</h1>
      <h3>Features and Breakdown of this component</h3>
      <p>There should be one component to display the task list and one to edit it.</p>
      <p>A task should comprise:</p>
      <a href="https://vuejs.org/v2/style-guide/#Keyed-v-for-essential" target ='blankd'>Re-format v-for, See style guide </a>
      <ul>
        <li v-for="feature in componentFeatures"><p><b>{{feature}}</b></p></li>
      </ul>


      <!--<p><b>Anticipated:Techniques</b> </p>-->
      <!--<ul v-for="tech in techExpected">-->
      <!--<li><p>{{tech}}</p></li>-->
      <!--</ul>-->

    </div>

  </div>
</template>

<script>

  import appChore from './Chore.vue';
  import { mapGetters } from 'vuex';
  import * as types from '../../store/types.js';



  export default {
    computed: {
      ...mapGetters({
        rotation: types.GET_ROTATION
      }),

    },
    components: {
      appChore
    },
    data: function(){
      return {
        notesBool: false,
        componentFeatures: [


//                'description',

//                'Add a way to change who is on trash - something simple but not obnoxious',
          'Chore div is that persons color???',
          'meh... Completed button, all same color, change color when complete (all use same two colors)',

          '*** LATER VERSIONS BELOW ***',
          'a few photos (separate component)',
          'anonymous confirmation and feedback - only another use can mark complete',
          'Eventually link to online calendar for automatic update and alert if someone is not signed up'
        ],
        techExpected: [


          '',
          'will need to import data from profiles',
          'should mainly be a display page',

        ]

      };

    }


  }
</script>

<style scoped>

</style>
