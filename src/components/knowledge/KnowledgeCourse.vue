<template>
  <section class="p-event p-default p-default-inner">
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class="container" >
      <status-preview :idEvent="5" :idStatus="3" :idRelation="10"/>
      <h1 class="g-caption-inner">Техника построения бизнеса</h1>
    </div>
  </section>
</template>

<script>
import StatusPreview from '@/components/StatusPreview'
import BreadCrumbs from '@/components/BreadCrumbs'
import API from '@/api/index'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'KnowledgeCourse',
  components: {
    StatusPreview,
    BreadCrumbs
  },
  data() {
    return {
      breadCrumbs: [
        {
          path: '/knowledge/menu',
          title: 'База знаний'
        }
      ]
    }
  },
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
</style>
