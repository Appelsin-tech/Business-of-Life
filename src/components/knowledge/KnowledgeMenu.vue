<template>
  <section class="p-knowledge-menu p-default-block">
    <preloader v-if="loading"/>
    <bread-crumbs/>
    <div class="container">
      <h1 class="g-caption-inner">База знаний</h1>
      <status-knowledge/>
      <div class="menu" v-if="isCourses && isCourses.length !== 0">
        <div class="item" v-for="item in isCourses" :key="item.name" v-if="checkStatusUser(item.name, item.status)">
          <panel-knowledge-menu :item="item" />
        </div>
      </div>
      <router-link to="/admin" class="back-btn">Назад</router-link>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '@/components/BreadCrumbs'
import { mapGetters, mapState } from 'vuex'
import PanelKnowledgeMenu from './components/PanelKnowledgeMenu'
import StatusKnowledge from './components/StatusKnowledge'
import API from '@/api/index'
import Preloader from '@/components/ui/Preloader'

export default {
  name: 'KnowledgeMenu',
  components: {
    BreadCrumbs,
    PanelKnowledgeMenu,
    StatusKnowledge,
    Preloader
  },
  data() {
    return {
      menuItem: [],
      loading: false
    }
  },
  computed: {
    ...mapGetters('user', [
      'status',
      'statusDev'
    ]),
    ...mapGetters('courses', [
      'isCourses'
    ]),
    ...mapState('user', [
      'profile'
    ]),

  },
  methods: {
    checkStatusUser(name, status) {
      if(this.status > 0) {
        if (this.statusDev) { // показываются все для разработки
          return true
        } else {
          let r = false
          switch (name) {
            case 'event-control':
              r = true
              break
            case 'statistic':
              r = true
              break
            case 'role':
              r = true
              break
          }
          if (status === 3) { // показываются все, кроме тех которые в разработке
            return false
          } else if (r && this.status < 2) { // не показываются для пользователей со статусом ниже 2
            return false
          } else {
            return true
          }
        }
      }
    }
  },
  mounted() {
    if(this.isCourses === null) {
      this.loading = true
      this.$store.dispatch('courses/getCourses').then(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/_importants";
  .p-knowledge-menu {
    .menu {
      .row-flex();
      justify-content: flex-start;
      .sm-block({
        justify-content: center;
      });
      .item {
        .col();
        .size(3);
        .size-xl(4);
        .size-md(6);
        .size-sm(10);
        .size-xs(12);
        display: flex;
        margin-bottom: 20px;
        .default-panel-style(40px);
        .lg-block({margin-bottom: 20px;});
        .sm-block({
          margin-bottom: 15px;
        });
      }
    }
  }
</style>
