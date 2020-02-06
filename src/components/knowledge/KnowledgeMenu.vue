<template>
  <section class="p-knowledge-menu p-default p-default-inner">
    <bread-crumbs/>
    <div class="container">
      <h1 class="g-caption-inner">База знаний</h1>
      <status-knowledge/>
      <div class="menu" v-if="menuItem.length">
        <div class="item" v-for="item in menuItem" :key="item.name" v-if="checkStatusUser(item.name, item.status)">
          <pannel-knowledge-menu :item="item" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '@/components/BreadCrumbs'
import { mapGetters, mapState } from 'vuex'
import PannelKnowledgeMenu from './components/PannelKnowledgeMenu'
import StatusKnowledge from './components/StatusKnowledge'
import API from '@/api/index'

export default {
  name: 'KnowledgeMenu',
  components: {
    BreadCrumbs,
    PannelKnowledgeMenu,
    StatusKnowledge
  },
  data() {
    return {
      menuItem: []
    }
  },
  computed: {
    ...mapGetters('user', [
      'status',
      'statusDev'
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
    API.courses.courses.list().then(response => {
      this.menuItem = response
    })
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/_importants";
  .p-knowledge-menu {
    .menu {
      .row-flex();
      margin-bottom: 80px;
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
