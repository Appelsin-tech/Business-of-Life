<template>
  <section class="p-me">
    <bread-crumbs/>
    <div class="container">
      <h1 class="g-caption-inner">Личный кабинет</h1>
<!--      <div class="course-tools">-->
<!--        <div class="col-wrapper">-->
<!--          <div class="col-desc">-->
<!--            <p class="g-caption-element g-caption-element&#45;&#45;static">Рады снова вас видеть, {{profile.login}}!</p>-->
<!--            <p class="desc">Для того, чтобы начать строить бизнес вместе с нами - изучите данный курс. Он поможет вам разобраться со всеми инструментами платформы и пригласить своих первых партнеров</p>-->
<!--          </div>-->
<!--          <div class="col-course">-->
<!--            <panel-knowledge-menu/>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <div class="menu">
          <div class="item" v-for="item in menu" :key="item.name">
            <panel-admin-menu :item="item" />
          </div>
      </div>
      <router-link to="/" class="back-btn">Назад</router-link>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '../BreadCrumbs.vue'
import { mapGetters, mapState } from 'vuex'
import PanelAdminMenu from './common/PanelAdminMenu'
import PanelKnowledgeMenu from '@/components/knowledge/components/PanelKnowledgeMenu'

export default {
  name: 'AdminMenu',
  components: {
    BreadCrumbs,
    PanelAdminMenu,
    PanelKnowledgeMenu
  },
  data() {
    return {
      // статус 0 для обычного пользователя
      // статус 1 для обычного пользователя, который является проверяющим
      // статус 2 для админа, показываются все, кроме разработки
      // статус 3 для разработки, показываются все
      menuItem: [
        {
          to: '/calendar',
          title: 'Календарь мероприятий',
          name: 'calendar',
          status: 0
        },
        {
          to: '/admin/event-control',
          title: 'Управление мероприятиями',
          name: 'event-control',
          status: 1
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
          to: '/knowledge/menu',
          title: 'База знаний',
          name: 'knowledge-package',
          status: 0
        },
        {
          to: '/admin/course-control',
          title: 'Редактор курсов',
          name: 'course-control',
          status: 3
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
          status: 0
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
      'statusDev',
      'relationEditors'
    ]),
    ...mapState('user', [
      'profile'
    ]),
    menu() {
      if (this.statusDev) {
        return this.menuItem
      } else if (this.status === 2) {
        return this.menuItem.filter(item => item.status < 3)
      } else if (this.relationEditors) {
        return this.menuItem.filter(item => item.status < 2)
      } else if (this.status === 1) {
        return this.menuItem.filter(item => item.status < 1)
      }
    },
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/_importants";
  .p-me {
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
