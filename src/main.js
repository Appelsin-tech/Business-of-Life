import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import VueModal from 'vue-js-modal'
import VueTheMask from 'vue-the-mask'
import Vuelidate from 'vuelidate'
import vSelect from 'vue-select'
import VTooltip from 'v-tooltip'
import store from './store/index'

import VCalendar from 'v-calendar'
import Deselect from './components/Dselect'

import VueCookies from 'vue-cookies'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faPuzzlePiece, faSignal, faWallet, faStar, faNewspaper as fasNewspapper, faUser, faUserFriends, faBook } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt, faNewspaper as farNewspapper, faCheckSquare } from '@fortawesome/free-regular-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

library.add(
  faHome,
  faCalendarAlt,
  faTwitter,
  faPuzzlePiece,
  faSignal,
  faWallet,
  faStar,
  fasNewspapper,
  farNewspapper,
  faUser,
  faCheckSquare,
  faUserFriends,
  faBook,
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

Vue.use(VueCookies)
Vue.use(VCalendar)

const moment = require('moment')
require('moment/locale/ru')

Vue.use(require('vue-moment'), {
  moment
})

Vue.use(VueModal, {dialog: true, dynamic: true, injectModalsContainer: true})
Vue.use(VueTheMask)
Vue.use(Vuelidate)
Vue.component('v-select', vSelect)
Vue.use(VTooltip, {
  defaultPlacement: 'left',
  delay: { show: 0, hide: 0 }
})

vSelect.props.components.default = () => ({
  Deselect,
  OpenIndicator: {
    render: createElement => createElement('span', '')
  }
})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
