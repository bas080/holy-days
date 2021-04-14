<template>
  <div class="m-1">
    <section>
      <form class="text-2xl my-4">
        <input type="date" :value="$route.params.date" @change="onDate"></input>
      </form>
    </section>

    <section>
      <NuxtChild></NuxtChild>
    </section>

    <section>
      <h2 class="text-3xl my-4">This Month</h2>
      <ol>
        <li v-for="day in days">
          <NuxtLink
            class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            :to="{name: 'days-date', params: {date: day.date}}">
          {{toLocaleDateString(day.date)}},
          <template v-for="i in day.celebrations.length">
            🎉
          </template>
          {{day.celebrations[0].title,}}
          </NuxtLink>
        </li>
      </ol>
    </section>

  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import { toLocaleDateString } from '../utils.js'

  // :selected="daySelected(day)"

  export default Vue.extend({
    data: () => ({
      date: null
    }),

    computed: mapGetters([
      'days',
      'day'
    ]),

    methods: {
      toLocaleDateString,
      onDate({target: {value: date}}) {
        return this.$router.push({name: 'days-date', params: {date}})
      },
      daySelected(day) {
        return day.date === this.$route.params.date
      },

      dayChange({target: {value: date}}) {
        if (isEmpty(date)) {
          return this.$router.push({ name: 'days', })
        }

        this.$router.push({
          name: 'days-date',
          params: {date}
        })
      },
    },
  })

  function isEmpty(a) {
    return isNil(a) || a.length === 0
  }

  function isNil(a) {
    return !(a != null)
  }
</script>
