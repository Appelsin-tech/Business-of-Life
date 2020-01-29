<template>
  <section class="p-me p-default p-default-inner">
    <bread-crumbs/>
    <div class="container">
      <h1 class="g-caption-inner">Личный кабинет</h1>
      <div class="menu">
          <div class="item" v-for="item in menuItem" :key="item.name" v-if="checkStatusUser(item.name, item.status)">
            <pannel-admin-menu :item="item" />
          </div>
      </div>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '../BreadCrumbs.vue'
import { mapGetters } from 'vuex'
import PannelAdminMenu from './components/PannelAdminMenu'

export default {
  name: 'AdminMenu',
  components: {
    BreadCrumbs,
    PannelAdminMenu
  },
  data() {
    return {
      // статус 3 для разработки
      menuItem: [
        {
          to: '/admin/event-control',
          title: 'Управление мероприятиями',
          name: 'event-control',
          status: 2
        },
        {
          to: '/tickets',
          title: 'Проверить билет',
          name: 'tickets-page',
          status: 0
        },
        {
          to: '/admin/statistic',
          title: 'Статистика продаж',
          name: 'statistic',
          status: 2
        },
        {
          to: '/admin/role',
          title: 'Роли и управление доступом',
          name: 'role',
          status: 2
        },
        {
          to: '/admin/profile',
          title: 'Профиль',
          name: 'profile',
          status: 0
        },
        {
          to: '/knowledge-package',
          title: 'База знаний',
          name: 'knowledge-package',
          status: 0
        },
        {
          to: '/admin/wallet',
          title: 'Кошелек',
          name: 'wallet',
          status: 0
        },
        {
          to: '/admin/partners-program',
          title: 'Партнерская программа',
          name: 'partners-program',
          status: 0
        },
        {
          to: '/news',
          title: 'Новости',
          name: 'news',
          status: 3
        },
        {
          to: '/admin/news-control',
          title: 'Редактор новостей',
          name: 'news-control',
          status: 3
        },
      ]
    }
  },
  computed: {
    ...mapGetters('user', [
      'status',
      'statusDev'
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
    },
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/_importants";
  .p-me {
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
        .size-sm(10);
        .size-xs(12);
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
