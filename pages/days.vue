<template>
  <div>
    <form class="text-4xl my-4">
      <select @input="dayChange" :value="day.date" class="
        bg-transparent
        border-black border-b-2">
        <option :value="undefined">Select a day</option>
        <option v-for="day in days"
                :selected="daySelected(day)"
                :value="day.date">
                {{day.date}}
                <template v-for="i in day.celebrations.length">&#127881;</template>
                {{day.celebrations[0].title}}</option>
      </select>
    </form>

    <NuxtChild></NuxtChild>

  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({

  computed: mapGetters([
    'days',
    'day'
  ]),

  methods: {
    daySelected(day) {
      return day.date === this.$route.params.date
    },

    dayChange({target: {value: date}}) {
      if (isEmpty(date)) {
        return this.$router.push({ name: 'days', })
      }

      this.$router.push({
        name: 'days-date',
        params: {date: date}
      })
    },
  },

  asyncData({store, route}) {
    return store.dispatch('getDay', route.params.date)
  },

})

function isEmpty(a) {
  return isNil(a) || a.length === 0
}

function isNil(a) {
  return !(a != null)
}

</script>
