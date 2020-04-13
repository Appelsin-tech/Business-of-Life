<template>
  <a href="" :class="{'closed-course': closeCourse}" class="menu-item" @click.prevent="routerPush">
    <div class="img-wrapper">
      <div class="img" :style="{backgroundImage: `url(${item.img})`}">
        <font-awesome-icon :icon="['fas', 'lock']" class="fa-icon" v-if="closeCourse"/>
      </div>
      <h3 class="g-caption-element">{{item.title}}</h3>
    </div>
    <p class="lesson">
      <img class="svg-icon" svg-inline src="@/assets/img/icon/book.svg" alt="">
      <span>уроков:</span>
      {{item.lessons}}
    </p>
    <p class="description">
      {{item.snippet}}
    </p>
    <div class="author">
      <div class="g-icon-circle">
        BoL
      </div>
<!--      <div class="img"></div>-->
      <span class="name">Business of Life</span>
    </div>
  </a>
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
    routerPush () {
      // если не бесплатный курс
      if (!this.item.free) {
        // если у пользователя нет доступа к платному курсу
        if (this.accessKnowledge.exp === null || this.accessKnowledge.exp * 1000 < new Date().getTime()) {
          this.$router.push('/knowledge-package')
        } else {
          this.$router.push(`/knowledge/${this.item.url}`)
        }
      } else {
        this.$router.push(`/knowledge/${this.item.url}`)
      }
    }
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
    color: #000;
    flex-grow: 1;
    &:hover {
      .g-caption-element {
        text-decoration: none;
      }
    }
    &.closed-course {
      .img-wrapper {
        .img {
          background: none !important;
          &::after {
            position: absolute;
            content: '';
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: #ccc;
            z-index: 1;
          }
          .fa-icon {
            position: absolute;
            width: 50px;
            height: 50px;
            z-index: 2;
            color: #303030;
            .sm-block({
              width: 25px;
              height: 25px;});
            .xs-block({
              width: 18px;
              height: 18px;});
          }
        }
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
    .lesson {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      .sm-block({margin-bottom: 10px;});
      .svg-icon {
        width: 30px;
        height: 30px;
        .sm-block({
          width: 20px;
          height: 20px;});
        * {
          fill: @colorMain;
        }
      }
      span {
        margin: 0 15px;
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
      .g-icon-circle {
        .xs-block({
          font-size: 1.2rem;});
      }
    }
  }
</style>
