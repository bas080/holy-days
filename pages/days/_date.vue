<template>
  <article>
    <h2 class="text-5xl mb-3">Day</h2>

    <dl>
      <dt>Date</dt>
      <dd>{{prettyDate(day.date)}}</dd>
      <dt>Season</dt>
      <dd>{{day.season}}</dd>
      <dt>Rank</dt>
      <dd>{{day.rank}}</dd>
    </dl>

    <h2 class="text-3xl mb-3">Celebrations</h2>
    <ul class="list-none">
      <li v-for="celebration in day.celebrations" :style="{color: celebrationColor(celebration.colour)}" >
        {{celebration.title}}
        <Subtle>{{celebration.rank}}</Subtle>
      </li>
    </ul>
  </article>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'

  export default Vue.extend({

    computed: {

      ...mapGetters([
        'day'
      ]),
    },


    methods: {
      celebrationColor(c) {
        return celebrationColorMap[c] || false
      },
      prettyDate(d) {
        return new Date(d).toLocaleDateString()
      }
    },

    asyncData({store, route}) {
      return store.dispatch('getDay', route.params.date)
    },

  })

  const celebrationColorMap = {
    white: 'darkgray',
    red: 'red',
  }

</script>

<style scoped>
ul li:before
{
  content: '\1F389';
}

dt {
  font-weight: bold;
}

dd {
  margin-left: 1rem;
}
</style>
