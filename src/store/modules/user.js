import API from '../../api/index'

const state = () => ({
  logged: false,
  profile: [],
  myParentEvents: []
})

const getters = {}

const actions = {
  async auth({ commit }, form) {
    return new Promise((resolve, reject) => {
      if (form !== undefined) {
        API.access.auth(form).then(response => {
          resolve()
        }).catch(error => {
          console.log(error)
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
      console.log(error)
    })
  },
  logout({commit}) {
    API.access.logout().then(response => {
      commit('LOGOUT')
    }).catch(error => {
      console.log(error)
    })
  },
  getMyParentEvents({commit}) {
    return new Promise((resolve, reject) => {
      API.events.my().then(response => {
        commit('SET_MY_PARENT_EVENT', response.data)
        resolve()
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  }
}

const mutations = {
  SET_IDENTITY(state, identity) {
    state.logged = true
    state.profile = identity
  },
  LOGOUT(state) {
    state.logged = false
    state.profile = []
  },
  SET_MY_PARENT_EVENT(state, events) {
    state.myParentEvents = events
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
