import API from '@/api/index'
import Vue from 'vue'

const moment = require('moment')
require('moment/locale/ru')
Vue.use(require('vue-moment'), {moment})

const state = () => ({
  publicRelations: []
})

const getters = {
  filterRelations: state => {
    let finishArr = []
    for (let i = 0; i < 31; i++) {
      finishArr.push({
        date: Vue.moment().startOf('day').add(i, 'days'),
        day: Vue.moment().startOf('day').add(i, 'days').date(),
        weekday: Vue.moment().startOf('day').add(i, 'days').format('dddd'),
        events: []
      })

      state.publicRelations.forEach(item => {
        let parseSec = item.stamp * 1000
        if (Vue.moment(parseSec).isBetween(Vue.moment().startOf('day').add(i, 'days'), Vue.moment().startOf('day').add(i + 1, 'days'))) {
          finishArr[i].stamp = parseSec
          finishArr[i].events.push(item)
        }
      })
    }
    return finishArr
  }
}

const actions = {
  getRelations({commit}, data) {
    API.relations.find(data).then(response => {
      commit('SET_RELATIONS_CALENDAR', response)
    }).catch(error => {
      console.log(error)
    })
  }
}

const mutations = {
  SET_RELATIONS_CALENDAR(state, data) {
    state.publicRelations = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
