<template>
  <div id="app">
    <notifications position="bottom right" classes="my-noty" :width="widthNoty"/>
    <app-header/>
    <main-nav/>
    <main>
      <transition mode="out-in" name="fade" @before-enter="beforeEnter">
        <router-view/>
      </transition>
    </main>
    <app-footer/>
    <modal-ticket-purchase/>
    <modal-ticket-success/>
    <modal-ticket-create-editing/>
  </div>
</template>

<script>
import MainNav from './components/MainNav.vue'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import ModalTicketPurchase from './components/modal/ModalTicketPurchase.vue'
import ModalTicketSuccess from './components/modal/ModalTicketSuccess.vue'
import ModalTicketCreateEditing from './components/modal/ModalTicketCreateEditing'
import { mapGetters } from 'vuex'

export default {
  components: {
    MainNav,
    AppHeader,
    AppFooter,
    ModalTicketPurchase,
    ModalTicketSuccess,
    ModalTicketCreateEditing
  },
  data () {
    return {
      showMenu: true,
      widthNoty: 400
    }
  },
  created () {
    this.$store.dispatch('user/login')
    if (window.innerWidth < 500) {
      this.widthNoty = 300
    }
  },
  methods: {
    beforeEnter () {
      this.$root.$emit('scrollBeforeEnter')
    }
  },
  computed: {
    ...mapGetters('user', [
      'logged'
    ])
  },
  watch: {
    logged (newValue, oldValue) {
      if (!newValue && this.$route.matched.some(record => record.meta.auth)) {
        this.$router.push({ path: '/' })
      }
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
