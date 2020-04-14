import API from '@/api/index'

const state = () => ({
  theme: null
})

const getters = {

}

const actions = {
  setTheme({commit}, data) {
    commit('SET_SETTINGS', data)
  }
}

const mutations = {
  SET_SETTINGS(state, data) {
    state.theme = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
