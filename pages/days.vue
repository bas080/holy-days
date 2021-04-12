<template>
  <div>
    <form class="text-4xl my-4">
      <label>Day:</label>
      <select @change="dayChange" v-model="day" class="
        bg-transparent
        border-black border-b-2">
        <option :value="undefined">Select a day</option>
        <option v-for="day in days"
                :selected="daySelected(day)"
                :value="day">
                {{day.date}}
                <template v-for="i in day.celebrations.length">&#127881;</template>
                {{day.celebrations[0].title}}</option>
      </select>
    </form>

    <NuxtChild></NuxtChild>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({

  data: () => ({
    day: undefined
  }),

  computed: mapState({
    days: ({days}) => days,
  }),

  methods: {
    daySelected(day) {
      return day.date === this.$route.params.date
    },

    dayChange() {
      if (isNil(this.day)) {
        return this.$router.push({ name: 'days', })
      }

      this.$router.push({
        name: 'days-date',
        params: {date: this.day.date}
      })
    },
  },

  ...beforeRoute((to, from, next) =>  {
    next(vm => {
      vm.day = vm.days.find(day => day.date === to.params.date)
    })
  }),
})

function beforeRoute(cb) {
  return {
    beforeRouteEnter: cb,
    beforeRouteUpdate(to, from, next) {
      const n = next.bind(null, this)
      cb(to, from, n)
    },
  }
}

function isNil(a) {
  return !(a != null)
}

</script>
