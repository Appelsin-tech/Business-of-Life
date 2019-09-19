<template>
  <section class="p-control-event p-default p-default-inner">
    <bread-crumbs/>
    <div class="container page">
      <h1 class="g-caption g-caption-inner">Управление мероприятиями</h1>
      <div class="btn-wrapper">
        <a href="#" class="g-btn g-btn--icon-left">
          <span>
            <img svg-inline class="svg-icon" src="../assets/img/icon/plus-circle.svg" alt="">
            Добавить мероприятие
          </span>
        </a>
      </div>
      <div class="event">
        <div class="event__item" v-for="(event, index) in eventArr" :key="index">
          <div class="event__img" :style="background(event.img)">
            <a href="#" class="img-link img-link--add" v-if="!event.img">
              <img svg-inline class="img-link__icon" src="../assets/img/icon/camera.svg" alt="">
              <span class="img-link__text">Загрузить фото</span>
            </a>
            <a href="#" class="img-link img-link--change" v-if="event.img">
              <img svg-inline class="img-link__icon" src="../assets/img/icon/camera.svg" alt="">
              <span class="img-link__text">Сменить фото</span>
            </a>
          </div>
          <a href="#" class="event__title">{{event.name}}</a>
          <div class="event__ticket-sold">
            <div class="event__ticket-sold-wrapper">
              <span class="event__ticket-sold-text">Продано билетов:</span>
              <span class="event__ticket-sold-number">{{event.ticket}}</span>
            </div>
            <control-icon/>
          </div>
        </div>
      </div>
      <h2 class="g-caption-section">Прошедшие мероприятия</h2>
      <div class="event">
        <div class="event__item event__item--past" v-for="(event, index) in eventArrSmal" :key="index" >
          <div class="event__img" :style="background(event.img)">
            <a href="#" class="img-link img-link--add" v-if="!event.img">
              <img svg-inline class="img-link__icon" src="../assets/img/icon/camera.svg" alt="">
              <span class="img-link__text">Загрузить фото</span>
            </a>
            <a href="#" class="img-link img-link--change" v-if="event.img">
              <img svg-inline class="img-link__icon" src="../assets/img/icon/camera.svg" alt="">
              <span class="img-link__text">Сменить фото</span>
            </a>
          </div>
          <a href="#" class="event__title">{{event.name}}</a>
          <div class="event__ticket-sold">
            <div class="event__ticket-sold-wrapper">
              <span class="event__ticket-sold-text">Продано билетов:</span>
              <span class="event__ticket-sold-number">{{event.ticket}}</span>
            </div>
            <control-icon/>
          </div>
        </div>
      </div>
      <a href="#" class="g-btn g-btn--icon-left g-btn--event-pasts">
        <span>
          <img svg-inline class="svg-icon" src="../assets/img/icon/eye.svg" alt="">
          Смотреть все
        </span>
      </a>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '../components/BreadCrumbs.vue'
import ControlIcon from '../components/ControlIcon.vue'

export default {
  name: 'TheEventControl',
  components: { BreadCrumbs, ControlIcon },
  data() {
    return {
      eventArr: [
        {
          name: 'Тренинг “искусство продаж”',
          ticket: 60
        },
        {
          name: 'Тренинг “искусство продаж”',
          img: 'event',
          ticket: 2
        },
        {
          name: 'Тренинг “искусство продаж”',
          ticket: 13
        },
        {
          name: 'Тренинг “искусство продаж”',
          img: 'qr',
          ticket: 26
        },
        {
          name: 'Тренинг “искусство продаж”',
          ticket: 8
        },
        {
          name: 'Тренинг “искусство продаж”',
          ticket: 0
        }
      ]
    }
  },
  methods: {
    getImgUrl(src) {
      const image = require(`../assets/img/${src}.png`)
      return image
    },
    background(img) {
      if (img !== undefined) {
        return { backgroundImage: `url(${this.getImgUrl(img)}` }
      } else {
        return { backgroundImage: 'none' }
      }
    }
  },
  computed: {
    eventArrSmal () {
      return this.eventArr.slice(0, 3)
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .p-control-event {
    .btn-wrapper {
      margin-left: 50px;
      margin-bottom: 60px;
      .sm-block({ margin-left: 0; margin-bottom: 40px;});
    }
    .event {
      .row-flex();
      margin-bottom: 80px;
      .lg-block({ justify-content: center;});
      &__item {
        .col();
        .size(4);
        .size-lg(5);
        .size-md(6);
        .size-sm(10);
        .size-xs(12);
        margin-bottom: 35px;
        display: flex;
        flex-direction: column;
        padding: 50px 3vw;
        box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        .md-block({ padding-top: 3vw;});
        .sm-block({padding: 20px 20px; margin-bottom: 15px;});
        &--past {
          box-shadow: none;
          background: none;
          border-radius: 0;
        }
      }
      &__img {
        position: relative;
        margin-bottom: 40px;
        height: 400px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        transition: 0.3s;
        .to(1400px, { height: 350px;});
        .md-block({ height: 300px;});
        .xs-block({ height: 250px; margin-bottom: 20px;});
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
            background-color: #f3f3f3;
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
        margin-bottom: 60px;
        font-weight: 800;
        font-size: 2rem;
        text-transform: uppercase;
        text-decoration: underline;
        color: #000;
        .md-block({ margin-bottom: 45px; font-size: 1.6rem;});
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
