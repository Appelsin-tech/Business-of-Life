<template>
  <div class="layout-admin">
    <admin-sidebar/>
    <admin-header layout="admin"/>
    <main class="main-admin">
      <transition mode="out-in" name="fade" @before-enter="beforeEnter">
        <router-view/>
      </transition>
    </main>
    <app-footer/>
  </div>
</template>

<script>
import AdminHeader from '@admin/common/AdminHeader'
import AppFooter from '@/components/AppFooter'
import AdminSidebar from '@admin/common/AdminSidebar'

export default {
  name: 'admin',
  components: {
    AdminHeader,
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
    grid-template-columns: minmax(0px, 320px) 1fr;
    grid-template-rows: 96px 1fr min-content;
    min-height: 100vh;
    @media (max-width: 1700px) {
      grid-template-columns: minmax(10px, 250px) 1fr;
    }
    .xl-block({grid-template-columns: minmax(10px, 220px) 1fr; grid-template-rows: 80px 1fr min-content;});
    .md-block({grid-template-columns: 1fr; grid-template-rows: 80px min-content 1fr min-content;
      grid-template-areas:
        'aside'
        'header'
        'main'
        'footer'
    ;});
    .main-admin {
      grid-area: main;
      display: flex;
      justify-content: center;
      padding-top: 30px;
      padding-bottom: 30px;
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
