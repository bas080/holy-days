// API
import axios from 'axios';

const api = {
  base: 'http://calapi.inadiutorium.cz/api/v0/en',
  get(path) {
    return axios.get(`${this.base}/${path}`)
  },
}

export const state = () => ({
  days: []
})

export const mutations = {
  setDays(state, days) {
    Object.assign(state, {days})
  }
}

export const getters = {
  getDays: state => state.days,
  getDay: state => date => {
    if (typeof date === 'string')
      date = new Date(date)

    const str = dateToString(date)

    return state.days.find(({date}) => date === str)
  }
}

export const actions = {
  nuxtServerInit({dispatch}) {
    return dispatch('getDays')
  },

  getDays({commit}, date) {
    date = date || new Date()

    return api.get(`/calendars/default/${date.getFullYear()}/${date.getMonth() + 1}`)
      .then(({data}) => commit('setDays', data))
  },
}

// Helpers
function zero(n) {
  return `0${n}`.slice(-2)
}

const dateToString = date =>
  `${date.getFullYear()}-${zero(date.getMonth() + 1)}-${zero(date.getDate())}`

