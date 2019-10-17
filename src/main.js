import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueModal from 'vue-js-modal'
import VueTheMask from 'vue-the-mask'
import Vuelidate from 'vuelidate'
import vSelect from 'vue-select'
import VTooltip from 'v-tooltip'
import store from './store/index'
import Datetime from 'vue-datetime'
import mavonEditor from 'mavon-editor'

Vue.use(mavonEditor)

Vue.config.productionTip = false
Vue.use(VueModal, {dialog: true, dynamic: true, injectModalsContainer: true})
Vue.use(VueTheMask)
Vue.use(Vuelidate)
Vue.component('v-select', vSelect)
Vue.use(VTooltip, {
  defaultPlacement: 'left',
  delay: { show: 0, hide: 0 }
})
Vue.use(Datetime, {
  valueZone: 'ru-RU'
})

vSelect.props.components.default = () => ({
  Deselect: {
    render: createElement => createElement('span', '')
  },
  OpenIndicator: {
    render: createElement => createElement('span', '')
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
