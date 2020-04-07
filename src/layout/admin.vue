<template>
  <div class="layout-admin">
    <admin-sidebar/>
    <app-header layout="admin"/>
    <main class="main-admin">
      <transition mode="out-in" name="fade" @before-enter="beforeEnter">
        <router-view/>
      </transition>
    </main>
    <app-footer/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'
import AdminSidebar from '@/components/admin/common/AdminSidebar'

export default {
  name: 'admin',
  components: {
    AppHeader,
    AppFooter,
    AdminSidebar
  },
  methods: {
    beforeEnter () {
      this.$root.$emit('scrollBeforeEnter')
    },
  },
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .layout-admin {
    display: grid;
    grid-template-areas: 'aside header'
                          'aside main'
                          'aside footer'
    ;
    grid-template-columns: minmax(0px, 350px) 1fr;
    grid-template-rows: min-content 1fr min-content;
    min-height: 100vh;
    @media (max-width: 1700px) {
      grid-template-columns: minmax(10px, 250px) 1fr;
    }
    @media (max-width: 1570px) {
      grid-template-columns: minmax(10px, 70px) 1fr;
    }
    .md-block({grid-template-columns: 1fr;  grid-template-areas:
      'header'
    'main'
    'footer'
    ;});
    .main-admin {
      grid-area: main;
      display: flex;
      justify-content: center;
      padding-top: 50px;
      padding-bottom: 50px;
      .md-block({
        padding-top: 150px;});
      .xs-block({
        padding-top: 100px;});
      .p-inner-admin {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        max-width: 100%;
      }
    }
    .s-footer {
      position: relative;
      grid-area: footer;
    }
  }
</style>
