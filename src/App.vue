<template>
  <div id="app">
    <notifications position="bottom right" classes="my-noty" :width="widthNoty"/>
    <router-view/>
    <modal-ticket-success/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    ModalTicketSuccess: () => import('@/components/modal/ModalTicketSuccess')
  },
  data () {
    return {
      widthNoty: 400
    }
  },
  mounted () {
    this.$store.dispatch('user/login')
    this.$store.dispatch('user/setCookieSponsor')
    if (window.innerWidth < 500) {
      this.widthNoty = 300
    }
  },
  methods: {
    beforeEnter () {
      this.$root.$emit('scrollBeforeEnter')
    },
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
