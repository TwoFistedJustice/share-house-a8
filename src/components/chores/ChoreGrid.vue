<template>

  <div>
    <h2>ChoreGrid.vue</h2>
    <h2>{{testString}}</h2>
    <div class="row">
      <app-chore v-for="chore in rotation" :chore="chore"></app-chore>
    </div>



  </div>
</template>

<script>

  import appChore from './Chore.vue';
  import { mapGetters } from 'vuex';


  export default {
    computed: {
      ...mapGetters({
        rotation: 'chores/GetRotation',
        testString: 'chores/testGetter'
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
