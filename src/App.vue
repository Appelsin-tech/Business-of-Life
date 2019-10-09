<template>
  <div id="app">
    <notifications position="bottom right" classes="my-noty" :width="widthNoty"/>
    <app-header/>
    <main-nav/>
    <main>
      <transition mode="out-in" name="fade">
        <router-view/>
      </transition>
    </main>
    <app-footer/>
    <modal-ticket-purchase/>
    <modal-access/>
    <modal-ticket-success/>
    <modal-event-edit/>
    <modal-parent-event-create/>
    <modal-adv-cash/>
  </div>
</template>

<script>
import MainNav from './components/MainNav.vue'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import ModalTicketPurchase from './components/modal/ModalTicketPurchase.vue'
import ModalAccess from './components/modal/ModalAccess.vue'
import ModalTicketSuccess from './components/modal/ModalTicketSuccess.vue'
import ModalEventEdit from './components/modal/ModalEventEdit.vue'
import ModalAdvCash from './components/modal/ModalAdvCash.vue'
import ModalParentEventCreate from './components/modal/ModalParentEventCreate.vue'
import { RouterMixin } from './mixins/router-mixin.js'

export default {
  components: {
    MainNav,
    AppHeader,
    AppFooter,
    ModalTicketPurchase,
    ModalAccess,
    ModalTicketSuccess,
    ModalEventEdit,
    ModalParentEventCreate,
    ModalAdvCash
  },
  mixins: [RouterMixin],
  data () {
    return {
      showMenu: true,
      widthNoty: 400
    }
  },
  created() {
    if(window.innerWidth < 500) {
      this.widthNoty = 300
    }
  }
}
</script>
<style lang="less">
  @import "./assets/less/main";
  #app {
    position: relative;
  }
  .main-pages-enter-active,
  .main-pages-leave-active {
    transition: all .3s ease;
  }
  .main-pages-enter {
    opacity: 1;
  }
  .main-pages-leave-to {
    opacity: 1;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s linear;
  }
  .fade-enter-to,
  .fade-leave {
    opacity: 1;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
