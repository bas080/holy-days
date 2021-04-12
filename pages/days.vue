<template>
  <div class="m-4">
    <form class="text-4xl mb-10">
      <select @change="dayChange" v-model="day" class="p-3">
        <option :value="null">Select a day</option>
        <option v-for="day in days"
                :value="day">
        <template v-for="i in day.celebrations.length">
          &#127881;
        </template>
                {{day.date}} [{{day.celebrations.length}}] {{day.celebrations[0].title}}</option>
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
    day: null
  }),

  computed: mapState({
    days: ({days}) => days
  }),

  methods: {
    dayChange() {
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

</script>
