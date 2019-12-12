import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import calendar from './modules/calendar'

Vue.use(Vuex)

// const moment = require('moment')
// require('moment/locale/ru')
//
// Vue.use(require('vue-moment'), {
//   moment
// })

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    calendar
  },
  strict: debug,
  plugins: []
})
