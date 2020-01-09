import API from '../../api/index'
import Axios from 'axios'
import Vue from 'vue'

const moment = require('moment')
require('moment/locale/ru')
Vue.use(require('vue-moment'), { moment })

const state = () => ({
  balance: [],
  transaction: []
})

const getters = {
  filterTransaction: state => {
    let dateArr = []
    let finishArr = []
    if (state.transaction) {
      state.transaction.forEach(item => {
        dateArr.push(Vue.moment(item.date).startOf('day').valueOf())
      })
      let Uniq = new Set(dateArr)
      let newArr = [...Uniq]
      newArr.sort(function (a, b) {
        return b - a
      })

      newArr.forEach(item => {
        finishArr.push({
          date: item,
          trans: []
        })
      })

      state.transaction.forEach(item => {
        finishArr.forEach(dat => {
          if (Vue.moment(item.date).startOf('day').isSame(Vue.moment(dat.date))) {
            dat.trans.push(item)
          }
        })
      })
    }
    return finishArr
  }
}

const actions = {
  balance ({ commit }) {
    API.wallet.balance().then(response => {
      commit('SET_BALANCE', response)
    })
  },
  history ({ commit }) {
    API.wallet.history().then(response => {
      commit('SET_TRANSACTION', response)
    })
  }
}

const mutations = {
  SET_BALANCE (state, data) {
    state.balance = data
  },
  SET_TRANSACTION (state, data) {
    state.transaction = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
