<template>
  <section class="p-me">
    <bread-crumbs/>
    <div class="container">
      <h1 class="g-caption-inner">Личный кабинет</h1>
      <div class="course-tools" v-if="startCourse && startCourse.progress !== startCourse.lessons.length">
        <div class="col-desc">
          <p class="g-caption-element g-caption-element--static">Рады снова вас видеть, {{profile.login}}!</p>
          <p class="desc">Для того, чтобы начать строить бизнес вместе с нами - изучите данный курс. Он поможет вам разобраться со всеми инструментами платформы и пригласить своих первых партнеров</p>
        </div>
        <div class="col-course" v-if="startCourse">
          <router-link :to="`/knowledge/21`" class="course-start" >
            <div class="img" :style="{backgroundImage: `url(${startCourse.img})`}"></div>
            <div class="content">
              <h3 class="g-caption-element">{{startCourse.title}}</h3>
              <p class="lesson">
                <icon-book class="g-icon"/>
                <span class="text">уроков:</span>
                {{startCourse.lessons.length}}
              </p>
              <p class="description">
                {{startCourse.snippet}}
              </p>
            </div>

          </router-link>
        </div>
      </div>
      <div class="menu">
        <panel-admin-menu v-for="item in menu" :key="item.name" :item="item" />
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
import API from '@/api/index'

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
      ],
      startCourse: null
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
  },
  mounted () {
    API.courses.courses.info({ url: 21 }).then(response => {
      this.startCourse = response
    })
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/_importants";
  .p-me {
    .course-tools {
      display: flex;
      margin-bottom: 30px;
      .default-panel-style(40px);
      .lg-block({
        flex-direction: column;});
      .col-desc {
        margin-right: 50px;
        .lg-block({
          margin-right: 0;
          margin-bottom: 30px;});
        .sm-block({
          margin-bottom: 20px;});
        .desc {
          margin-top: 30px;
          line-height: 1.5;
          font-size: 1.6rem;
          .sm-block({
            margin-top: 20px;});
        }
      }
      .col-course {
        min-width: 600px;
        .lg-block({min-width: auto;});
        .course-start {
          display: flex;
          color: #000;
          .default-panel-style(40px);
          &:hover {
            .g-caption-element {
              text-decoration: none;
            }
          }
          .img {
            margin-right: 40px;
            height: 240px;
            width: 240px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            flex-shrink: 0;
            .lg-block({
              height: 200px;
              width: 200px;
            });
            .md-block({
              height: 210px;
            });
            .sm-block({
              width: 70px;
              height: 70px;
              margin-right: 30px;
            });
            .xs-block({
              width: 40px;
              height: 40px;
            });
          }
          .content {
            .g-caption-element {
              margin-bottom: 25px;
              .sm-block({margin-bottom: 15px; padding-top: 5px});
            }
            .lesson {
              display: flex;
              align-items: center;
              margin-bottom: 15px;
              .sm-block({margin-bottom: 10px;});
              .g-icon {
                width: 30px;
                height: 30px;
                .sm-block({
                  width: 20px;
                  height: 20px;});
              }
              .text {
                margin: 0 15px;
              }
            }
            .description {
              margin-bottom: 15px;
              line-height: 1.4;
            }
          }

        }
      }
    }
    .menu {
      /*.row-flex();
      justify-content: flex-start;
      .sm-block({
        justify-content: center;
      });*/
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 30px;
      .lg-block({grid-template-columns: repeat(3, 1fr);});
      .sm-block({grid-template-columns: 1fr; grid-gap: 20px;});
      .xs-block({grid-gap: 10px;});
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
