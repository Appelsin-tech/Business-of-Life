<template>
  <div class="layout-default">
    <app-header/>
    <main-nav/>
    <main>
      <transition mode="out-in" name="fade" @before-enter="beforeEnter">
        <router-view/>
      </transition>
    </main>
    <app-footer/>
  </div>
</template>

<script>
import MainNav from '@/components/MainNav.vue'
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'
export default {
  name: 'default',
  components: {
    MainNav,
    AppHeader,
    AppFooter
  },
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
    beforeEnter () {
      this.$root.$emit('scrollBeforeEnter')
    }
  }
}
</script>

<style scoped>

</style>
