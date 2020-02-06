import API from '@/api/index'

const state = () => ({
  eventsMy: []
})

const getters = {
}

const actions = {
  getMyEvents({ commit }) {
    return new Promise((resolve, reject) => {
      API.events.my().then(response => {
        commit('SET_MY_EVENT', response.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

const mutations = {
  SET_MY_EVENT(state, events) {
    state.eventsMy = events
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
