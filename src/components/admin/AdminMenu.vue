<template>
  <section class="p-me">
    <div class="container">
      <div class="course-tools" v-if="startCourse && startCourse.progress !== startCourse.lessons.length">
        <div class="col-desc">
          <p class="g-caption-element g-caption-element--static" v-if="profile">Рады снова вас видеть, {{profile.login}}!</p>
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
        <panel-admin-menu v-for="item in filterMenu" :key="item.to" :item="item" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import PanelAdminMenu from './common/PanelAdminMenu'
import API from '@/api/index'
import appMenuList from '@/mixins/appMenuList'

export default {
  name: 'AdminMenu',
  mixins: [appMenuList],
  components: {
    PanelAdminMenu
  },
  data() {
    return {
      startCourse: null
    }
  },
  computed: {
    ...mapGetters('user', [
      'relationEditors'
    ]),
    ...mapState('user', [
      'profile'
    ]),
    filterMenu () {
      return this.menuListFilterUserLogged.filter(item => item.name !== 'home' && item.name !== 'coronanamillion')
    }
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
            .xxl-block({
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
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 30px;
      .xxl-block({grid-template-columns: repeat(3, 1fr);});
      .sm-block({grid-template-columns: 1fr; grid-gap: 20px;});
      .xs-block({grid-gap: 10px;});
    }
  }
</style>
