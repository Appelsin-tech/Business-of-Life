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

import IconMaterial from './libs/icons-material'

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
