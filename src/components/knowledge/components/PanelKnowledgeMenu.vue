<template>
  <router-link :class="{'closed-course': closeCourse}" class="menu-item" :to="`/knowledge/${this.item.url}`">
    <div class="img-wrapper">
      <div class="img" :style="{backgroundImage: `url(${item.img})`}"></div>
      <h3 class="g-caption-element">{{item.title}}</h3>
    </div>
    <p class="lesson">
      <icon-book class="g-icon"/>
      <span class="text">уроков:</span>
      {{item.lessons}}
    </p>
    <p class="lock" v-if="closeCourse">
      <icon-lock class="g-icon"/>
      <span class="text">Курс доступен по подписке</span>
    </p>
    <p class="description">
      {{item.snippet}}
    </p>
    <div class="author">
      <div class="logo">
        <template v-if="false">BoL</template>
      </div>
<!--      <div class="img"></div>-->
      <span class="name">Business of Life</span>
    </div>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PanelKnowledgeMenu',
  props: ['item'],
  computed: {
    ...mapGetters('user', [
      'accessKnowledge'
    ]),
    closeCourse () {
      // закрыт курс для этого пользователя или нет
      if (!this.item.free) {
        if (this.accessKnowledge.exp === null || this.accessKnowledge.exp * 1000 < new Date().getTime()) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .menu-item {
    position: relative;
    display: flex;
    flex-direction: column;
    transition: 0.3s;
    color: var(--app_font__color);
    flex-grow: 1;
    &:hover {
      .g-caption-element {
        text-decoration: none;
      }
    }
    .img-wrapper {
      display: flex;
      flex-direction: column;
      position: relative;
      .sm-block({flex-direction: row;
        margin-bottom: 15px;});
      .img {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin-bottom: 40px;
        height: 240px;
        width: 240px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-color: @colorBgGray;
        .to(1430px, {
          width: auto;
        });
        .lg-block({
          height: 220px;
          margin-bottom: 30px;
        });
        .md-block({
          height: 210px;
        });
        .sm-block({
          width: 70px;
          height: 70px;
          margin-bottom: 0;
          flex-shrink: 0
        });
        .xs-block({
          width: 40px;
          height: 40px;
        });
        /*.xs-block({ height: 250px; margin-bottom: 20px; });*/
        .img-link {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }
      .g-caption-element {
        margin-bottom: 25px;
        .sm-block({margin-bottom: 0; margin-left: 20px; padding-top: 5px});
      }
    }
    .lock,
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
    .lock {
      .g-icon {
        color: #000;
      }
    }
    .description {
      margin-bottom: 15px;
      line-height: 1.4;
    }
    .author {
      display: flex;
      align-items: center;
      margin-top: auto;
      .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 30px;
        width: 45px;
        height: 45px;
        .xs-block({
          font-size: 1.2rem;});
      }
    }
  }
</style>
