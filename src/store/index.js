import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import calendar from './modules/calendar'
import wallet from './modules/wallet'
import event from './modules/event'
import courses from './modules/courses'
import news from './modules/news'
import settings from './modules/settings'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    calendar,
    wallet,
    event,
    courses,
    news,
    settings
  },
  strict: debug,
  plugins: []
})
