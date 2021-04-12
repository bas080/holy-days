<template>
  <article>
    <h2 class="text-3xl mb-3">Celebrations</h2>
    <ul class="list-none">
      <li v-for='celebration in day.celebrations'>
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

      date() {
        return this.$route.params.date
      },

      day() {
        return this.getDay(this.date)
      },

      ...mapGetters([
        'getDay'
      ]),
    }

  })

</script>

<style scoped>

ul li:before
{
  content: '\1F389';
}
</style>
