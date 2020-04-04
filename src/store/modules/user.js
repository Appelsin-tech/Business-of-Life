import API from '../../api/index'

import Vue from 'vue'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

const state = () => ({
  profile: null,
  sponsor: null
})

const getters = {
  // залогинен ли пользователей
  logged: state => !!state.profile,
  // доступ к базе знаний
  access: (state, getters) => getters.logged ? state.profile.access.knowledge : false,
  // мой id
  myId: (state, getters) => getters.logged ? state.profile.id : null,
  // статус пользователя
  status: (state, getters) => getters.logged ? state.profile.status : 0,
  // статус для разработки
  statusDev (state, getters) {
    return getters.logged ? state.profile.login === 'pelkin' || state.profile.login === 'GeneralAdmin' : false
  },
  // является ли обычный пользователь редактором событий
  relationEditors (state, getters) {
    return getters.logged && getters.status === 1 && state.profile.editor.length > 0
  },
  // масив событий где пользователь является редактором
  editor: (state, getters) => getters.logged ? state.profile.editor : []
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
