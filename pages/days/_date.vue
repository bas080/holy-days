<template>
  <article>
    <dl>
      <dt>Date</dt>
      <dd>{{toLocaleDateString(day.date)}}</dd>
      <dt>Season</dt>
      <dd>{{day.season}}</dd>
      <dt>Celebrations</dt>
      <dd>
      <ul class="list-none">
        <li v-for="celebration in day.celebrations" :style="{color: celebrationColor(celebration.colour)}" >
          {{celebration.title}}
          <span class="text-gray-500 text-sm">{{celebration.rank}}</span>
        </li>
      </ul>
      </dd>
    </dl>

  </article>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import { toLocaleDateString } from '../../utils.js'

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
      toLocaleDateString,
    },

    asyncData({store, route}) {
      if (process.client)
        window.scrollTo(0, 0);
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
