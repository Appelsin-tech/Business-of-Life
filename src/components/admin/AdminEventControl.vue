<template>
  <section class="p-control-event p-default p-default-inner">
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class="container page">
      <h1 class="g-caption-inner">Управление мероприятиями</h1>
      <div class="btn-wrapper">
        <router-link to="/admin/event-create" class="g-btn g-btn--icon-left">
          <span>
            <img svg-inline class="svg-icon" src="../../assets/img/icon/plus-circle.svg" alt="">
            Добавить мероприятие
          </span>
        </router-link>
      </div>
      <div class="event" v-if="myParentEvents">
        <router-link class="event__item" v-for="(event, index) in myParentEvents" :key="index" :to="`/admin/event-editing/${event.id}`">
          <div class="event__img" :style="{backgroundImage: `url(${event.img})`}">
            <!--<a href="#" class="img-link img-link&#45;&#45;add">-->
              <!--<img svg-inline class="img-link__icon" src="../../assets/img/icon/camera.svg" alt="">-->
              <!--<span class="img-link__text">Загрузить фото</span>-->
            <!--</a>-->
            <!--<a href="#" class="img-link img-link&#45;&#45;change">-->
              <!--<img svg-inline class="img-link__icon" src="../../assets/img/icon/camera.svg" alt="">-->
              <!--<span class="img-link__text">Сменить фото</span>-->
            <!--</a>-->
          </div>
          <p class="g-caption-element">{{event.title}}</p>
          <div class="event__ticket-sold">
            <!--<div class="event__ticket-sold-wrapper">-->
              <!--<span class="event__ticket-sold-text">Продано билетов:</span>-->
              <!--<span class="event__ticket-sold-number">{{event.ticket}}</span>-->
            <!--</div>-->
            <!--<div class="control">-->
              <!--<button class="control__link control-link control-link&#45;&#45;refractor" v-tooltip.bottom="'Редактировать'" @click="$modal.show('modal-event-edit')">-->
                <!--<img svg-inline class="control-link__icon" src="../../assets/img/icon/pencil.svg" alt="">-->
              <!--</button>-->
            <!--</div>-->
          </div>
        </router-link>
      </div>
      <!--<h2 class="g-caption-section">Прошедшие мероприятия</h2>-->
      <!--<div class="event" >-->
        <!--<div class="event__item event__item&#45;&#45;past" v-for="(event, index) in eventArr" :key="index" >-->
          <!--<div class="event__img" :style="background(event.img)">-->
            <!--<a href="#" class="img-link img-link&#45;&#45;add" v-if="!event.img">-->
              <!--<img svg-inline class="img-link__icon" src="../../assets/img/icon/camera.svg" alt="">-->
              <!--<span class="img-link__text">Загрузить фото</span>-->
            <!--</a>-->
            <!--<a href="#" class="img-link img-link&#45;&#45;change" v-if="event.img">-->
              <!--<img svg-inline class="img-link__icon" src="../../assets/img/icon/camera.svg" alt="">-->
              <!--<span class="img-link__text">Сменить фото</span>-->
            <!--</a>-->
          <!--</div>-->
          <!--<a href="#" class="event__title">{{event.name}}</a>-->
          <!--<div class="event__ticket-sold">-->
            <!--<div class="control">-->
              <!--<button class="control__link control-link control-link&#45;&#45;refractor" v-tooltip.bottom="'Редактировать'" @click="$modal.show('modal-event-edit')">-->
                <!--<img svg-inline class="control-link__icon" src="../../assets/img/icon/pencil.svg" alt="">-->
              <!--</button>-->
              <!--<button class="control__link control-link control-link&#45;&#45;delete" v-tooltip.bottom="'Удалить'">-->
                <!--<img svg-inline class="control-link__icon" src="../../assets/img/icon/basket.svg" alt="">-->
              <!--</button>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<a href="#" class="g-btn g-btn&#45;&#45;icon-left g-btn&#45;&#45;event-pasts">-->
        <!--<span>-->
          <!--<img svg-inline class="svg-icon" src="../../assets/img/icon/eye.svg" alt="">-->
          <!--Смотреть все-->
        <!--</span>-->
      <!--</a>-->
      <router-link to="/admin/me" class="back-btn">Назад</router-link>
    </div>
  </section>
</template>

<script>
import API from '../../api/index'
import BreadCrumbs from '../BreadCrumbs.vue'
import { mapState } from 'vuex'

export default {
  name: 'AdminEventControl',
  components: { BreadCrumbs},
  data() {
    return {
      resposneEvent: [],
      breadCrumbs: [
        {
          path: 'me',
          title: 'Личный кабинет'
        }
      ]
    }
  },
  methods: {
    getImgUrl(src) {
      const image = require(`../../assets/img/${src}.png`)
      return image
    },
    background(img) {
      if (img !== undefined) {
        return { backgroundImage: `url(${this.getImgUrl(img)}` }
      } else {
        return { backgroundImage: 'none' }
      }
    },
  },
  computed: {
    ...mapState('user', [
      'myParentEvents'
    ])
  },
  mounted() {
    if(this.myParentEvents.length === 0) {
      this.$store.dispatch('user/getMyParentEvents')
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/_importants";
  .p-control-event {
    .btn-wrapper {
      margin-bottom: 60px;
      .sm-block({ margin-bottom: 40px;});
    }
    .event {
      .row-flex();
      margin-bottom: 80px;
      .lg-block({ justify-content: center;});
      &__item {
        .col();
        .size(3);
        .size-xl(4);
        .size-sm(10);
        .size-xs(12);
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        padding: 40px;
        box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        .lg-block({padding: 26px; margin-bottom: 20px;});
        .sm-block({
          margin-bottom: 20px;
          padding: 20px;
          flex-direction: row;
          align-items: center;
        });
        .xs-block({
          margin-bottom: 15px;
          padding: 15px;});
        &:hover {
          .g-caption-element {
            text-decoration: none;
          }
        }
        &--past {
          box-shadow: none;
          background: none;
          border-radius: 0;
        }
      }
      .control {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .control-link {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1px solid #d6d6d6;
          transition: 0.3s;
          cursor: pointer;
          .md-block({ width: 40px; height: 40px; });
          &:first-child {
            margin-right: 10px;
          }
          &--refractor {
            &:hover {
              border-color: @colorSuccess;
              .control-link__icon {
                path {
                  fill: @colorSuccess;
                }
              }
            }
          }
          &--delete {
            &:hover {
              border-color: @colorError;
              .control-link__icon {
                path {
                  fill: @colorError;
                }
              }
            }
          }
          &__icon {
            width: 25px;
            height: 25px;
            .md-block({ width: 18px; height: 18px; });
            path {
              transition: 0.3s;
              fill: #d6d6d6;
            }
          }
        }
      }
      .tooltip {
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 5px 10px;
        background: #fff;
        border-radius: 3px;
        &__text {
          &::after {
            content: " ";
            position: absolute;
            bottom: 100%;  /* At the top of the tooltip */
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent black transparent;
          }
        }
      }
      &__img {
        position: relative;
        margin-bottom: 40px;
        height: 240px;
        width: 240px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        transition: 0.3s;
        background-color: @colorBorder;
        .to(1430px, { width: auto;});
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
          margin-right: 20px;
          flex-shrink: 0
        });
        .xs-block({
          width: 40px;
          height: 40px;
        });
        &:hover {
          .img-link--change {
            opacity: 1;
          }
          .img-link--add {
            .img-link__icon {
              path {
                fill: #000;
              }
            }
            .img-link__text {
              color: #000;
            }
          }
        }
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
          transition: 0.3s;
          &--add {
            z-index: 1;
            background-color: @colorBgGray;
            .img-link__icon {
              path {
                fill: #d7d7d7;
              }
            }
            .img-link__text {
              color: #d7d7d7;
            }
          }
          &--change {
            opacity: 0;
            background: rgba(226,58,58,0.8);
            .img-link__icon {
              path {
                fill: #fff;
              }
            }
            .img-link__text {
              color: #fff;
            }
          }
          &__icon {
            margin-bottom: 15px;
            width: 50px;
            height: 50px;
            path {
              transition: 0.3s;
            }
          }
          &__text {
            font-size: 1.6rem;
            font-weight: 400;
            text-decoration: underline;
            transition: 0.3s;
          }
        }
      }
      &__title {
        font-weight: 800;
        font-size: 2rem;
        text-transform: uppercase;
        text-decoration: underline;
        color: #000;
        .md-block({font-size: 1.6rem;});
        &:hover {
          text-decoration: none;
        }
      }
      &__ticket-sold {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &-text {
          display: block;
          margin-bottom: 10px;
          font-weight: 400;
          color: @colorSecondFonts;
        }
        &-number {
          font-size: 2.6rem;
          font-weight: 800;
        }
      }
    }
    .past-events {
      .row-flex();
      .lg-block({ justify-content: center;});
    }
    .g-btn--event-pasts {
      width: 100%;
      justify-content: center;
      span {
        position: relative;
        margin-left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 0;
      }
    }
  }
</style>
