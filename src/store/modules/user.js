import API from '../../api/index'

import Vue from 'vue'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

const state = () => ({
  profile: null,
  sponsor: null,
})

const getters = {
  logged: state => !!state.profile, // залогинен ли пользователей
  access: state => state.profile.access.knowledge, // доступ к базе знаний
  status: (state, getters) => getters.logged ? state.profile.status : 0, // статус пользователя
  statusDev (state, getters) { // статус для разработки
    if (getters.logged) {
      if (state.profile.login === 'pelkin' || state.profile.login === 'GeneralAdmin') {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  },
  relationEditors (state, getters) { // является ли обычный пользователь редактором событий
    if (getters.logged && getters.status === 1 && state.profile.editor.length > 0) {
      return true
    } else {
      return false
    }
  }
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
