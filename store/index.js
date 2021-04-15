// API
import axios from 'axios';

const api = {
  base: 'http://calapi.inadiutorium.cz/api/v0/en',
  get(path) {
    return axios.get(`${this.base}/${path}`)
  },
}

export const state = () => ({
  day: null,
  days: [],
})

export const mutations = {
  setDays(state, days) {
    Object.assign(state, {days})
  },
  setDay(state, day) {
    state.day = day
  },
}

export const getters = {
  days: state => state.days,
  day: state => state.day,
}

export const actions = {
  nuxtServerInit({dispatch}) {
    return dispatch('getDays')
  },

  getDay({commit, getters}, date) {
    const day = getters.days.find(day => day.date === date)

    if (day)
      return Promise.resolve(commit('setDay', day))

    date = date.replace(/-/g, '/')

    return api.get(`/calendars/default/${date}`)
      .then(({data}) => commit('setDay', data))
  },

  getDays({commit}, date) {
    date = date || new Date()

    return api.get(`/calendars/default/${date.getFullYear()}/${date.getMonth() + 1}`)
      .then(({data}) => commit('setDays', data))
  },
}
