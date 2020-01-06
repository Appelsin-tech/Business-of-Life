import API from '../../api/index'

import Vue from 'vue'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

const state = () => ({
  profile: null,
  sponsor: null,
  myParentEvents: []
})

const getters = {
  logged: state => !!state.profile
}

const actions = {
  async auth({ commit }, form) {
    return new Promise((resolve, reject) => {
      if (form !== undefined) {
        API.access.auth(form).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve()
      }
    })
  },
  async login({ dispatch, commit }, form) {
    await dispatch('auth', form)
    await API.users.me().then(response => {
      commit('SET_IDENTITY', response)
    }).catch(error => {
      commit('LOGOUT')
    })
  },
  logout({ commit }) {
    API.access.logout().then(response => {
      commit('LOGOUT')
    }).catch(error => {
      console.log(error)
    })
  },
  getMyParentEvents({ commit }) {
    return new Promise((resolve, reject) => {
      API.events.my().then(response => {
        commit('SET_MY_PARENT_EVENT', response.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  setCookieSponsor({ commit }) {
    if (VueCookies.get('sponsor')) {
      commit('SET_COOKIE', VueCookies.get('sponsor'))
    }
  },
}

const mutations = {
  SET_IDENTITY(state, identity) {
    state.profile = identity
  },
  LOGOUT(state) {
    state.profile = null
  },
  SET_MY_PARENT_EVENT(state, events) {
    state.myParentEvents = events
  },
  SET_COOKIE(state, sponsor) {
    state.sponsor = sponsor
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
