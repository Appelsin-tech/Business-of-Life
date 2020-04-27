<template>
  <section class='p-profile p-inner-admin'>
    <div class='container page'>
      <app-tabs :dataTabs="btnArr" v-on:change-tab="changeSection"/>
      <keep-alive>
        <component
          v-bind:is="currentTab"
        ></component>
      </keep-alive>
    </div>
  </section>
</template>

<script>
import AdminProfileMain from './inner/AdminProfileMain'
import AdminProfileSecurity from './inner/AdminProfileSecurity'
import AppTabs from '@/components/ui/AppTabs'

export default {
  name: 'AdminProfile',
  components: {
    AdminProfileMain,
    AdminProfileSecurity,
    AppTabs
  },
  data() {
    return {
      btnArr: [
        {
          id: 'AdminProfileMain',
          name: 'Основные'
        },
        {
          id: 'AdminProfileSecurity',
          name: 'Безопасность'
        }
      ],
      currentTab: 'AdminProfileMain'
    }
  },
  methods: {
    changeSection(e) {
      this.currentTab = e
    }
  }
}
</script>

<style scoped lang="less">
  @import '../../assets/less/_importants';
</style>
