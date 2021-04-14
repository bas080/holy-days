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

  // TODO: check if the parsing to Date instance is necessary.
  getDay({commit, getters}, date) {
    const day = getters.days.find(day => day.date === date)

    if (day)
      return Promise.resolve(commit('setDay', day))

    if (typeof date === 'string')
      date = new Date(date)

    return api.get(`/calendars/default/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)
      .then(({data}) => commit('setDay', data))
  },

  getDays({commit}, date) {
    date = date || new Date()

    return api.get(`/calendars/default/${date.getFullYear()}/${date.getMonth() + 1}`)
      .then(({data}) => commit('setDays', data))
  },
}

// Helpers
const zero = n => `0${n}`.slice(-2)

const dateToString = date =>
  `${date.getFullYear()}-${zero(date.getMonth() + 1)}-${zero(date.getDate())}`

