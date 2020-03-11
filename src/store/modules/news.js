import API from '@/api/index'

const state = () => ({
  news: null,
  newsMy: null
})

const getters = {
  isNews: state => state.news,
  isMyNews: state => state.newsMy,
  statusMyNews: state => idNews => {
    return state.newsMy.length ? state.newsMy.find(item => item.id === idNews).status : 0
  }
}

const actions = {
  getMyNews({ commit }) {
    return new Promise((resolve, reject) => {
      API.news.my().then(response => {
        commit('SET_MY_NEWS', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getNews({ commit }) {
    return new Promise((resolve, reject) => {
      API.news.list().then(response => {
        commit('SET_NEWS', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

const mutations = {
  SET_MY_NEWS(state, news) {
    state.newsMy = news
  },
  SET_NEWS(state, news) {
    state.news = news
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
