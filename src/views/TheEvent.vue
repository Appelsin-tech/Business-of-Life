<template>
  <section class="p-event p-default p-default-inner">
    <div class="container" v-if="activeEvent">
      <event-status :idEvent="responseData.id" :idStatus="activeEvent.status" :idRelation="activeEvent.id" @newStatus="refreshStatus" v-if="myEvent"/>
      <h1 class="g-caption g-caption-inner">{{responseData.title}}</h1>
      <div class="location">
        <p class="location__desc">Город</p>
        <v-select @input="newActiveEvent" :value="activeEvent.city" :multiple="false" :transition="'fade'" :class="'v-select__event'" :searchable="false" selected="" label="name" :options="city"></v-select>
      </div>
      <section class="brief">
        <div class="brief__img" :style="{backgroundImage: `url(${responseData.img})`}"></div>
        <div class="brief__text info">
          <p class="info__description">{{responseData.snippet}}</p>
          <p class="info__item ">
            <strong class="info__item--bold">Дата:</strong>
            <span class="info__item--normal">{{parseDate}}</span>
          </p>
          <p class="info__item">
            <strong class="info__item--bold">Место:</strong>
            <span class="info__item--normal">{{activeEvent.address}}</span>
          </p>
          <p class="info__item" v-if="activeEvent.speakers.length > 0">
            <strong class="info__item--bold">Спикеры:</strong>
            <span class="info__item--normal info__item--speakers" v-for="(speakers, i) in speakersName">{{speakers}}<span class="symb">,</span>&nbsp;</span>
          </p>
          <div class="info__ticket ticket--brief">
            <a href="#" class="g-btn g-btn--no-icon" @click.prevent="scrollMeTo('section-tickets')">
              <span>Купить билет</span>
            </a>
          </div>
        </div>
      </section>
      <section class="description">
        <h2 class="g-caption-section">Описание</h2>
        <div class="text-wrapper editor" v-html="responseData.description"></div>
      </section>
      <section class="speakers" v-if="activeEvent.speakers.length !== 0">
        <h2 class="g-caption-section">Спикеры</h2>
        <div class="speakers__wrapper">
          <div class="speakers__item item" v-for="speaker in activeEvent.speakers">
            <div class="item__img" :style="{backgroundImage: `url(${speaker.img})`}"></div>
            <p class="item__name">{{speaker.name}}</p>
            <p class="item__post">{{speaker.role}}</p>
          </div>
        </div>
      </section>
      <section class="org-info">
        <h2 class="g-caption-section">Организационная информация</h2>
        <div class="org-info__wrapper">
          <div class="org-info__item item">
            <p class="item__name">Дата:</p>
            <p class="item__info">{{parseDate}}</p>
          </div>
          <div class="org-info__item item">
            <p class="item__name">Место проведения:</p>
            <p class="item__info">{{activeEvent.address}}</p>
          </div>
          <div class="org-info__item item">
            <p class="item__name">Контактная информация:</p>
            <a href="mailto: info@businessof.life" class="item__info item__info--link">info@businessof.life</a>
          </div>
        </div>
      </section>
      <section class="tickets" ref="section-tickets">
        <h2 class="g-caption-section">Билеты</h2>
        <div class="tickets-wrapper">
          <ticket :btn="true" v-for="(item, i) in filterTicketsList" :key="item.id" :ticket="item" :event="activeEvent"/>
        </div>
      </section>
      <section class="other-activities" v-if="false">
      <h2 class="g-caption-section">Возможно, вас заинтересует</h2>
      <div class="slider-wrapper">
      <div class="swiper-pagination"></div>
      <button class="swiper-button swiper-button--prev"><span></span></button>
      <swiper :options="swiperOption" ref="mySwiperEvents">
      <swiper-slide>
      <div class="slide-event__wrapper">
      <div class="slide-event__img"></div>
      <h3 class="slide-event__name">Бизнес-тренинг “Старт с нуля”</h3>
      <div class="slide-event__date">
      <p class="slide-event__time">
      <img class="svg-icon" svg-inline src="../assets/img/icon/clock.svg" alt="">
      <span>14.00 - 16.00</span>
      </p>
      <p class="slide-event__location">
      <img class="svg-icon" svg-inline src="../assets/img/icon/location.svg" alt="">
      <span>г. Москва, ул. Ленина, 32, оф. 391 (ТЦ “Европа”)</span>
      </p>
      </div>
      <div class="ticket ticket--slide-event">
      <p class="ticket__price">9000 <span class="currency">р</span></p>
      <a href="#" class="g-btn g-btn--no-icon">
      <span>Купить билет</span>
      </a>
      </div>
      </div>
      </swiper-slide>
      <swiper-slide>
      <div class="slide-event__wrapper">
      <div class="slide-event__img"></div>
      <h3 class="slide-event__name">Бизнес-тренинг “Старт с нуля”</h3>
      <div class="slide-event__date">
      <p class="slide-event__time">
      <img class="svg-icon" svg-inline src="../assets/img/icon/clock.svg" alt="">
      <span>14.00 - 16.00</span>
      </p>
      <p class="slide-event__location">
      <img class="svg-icon" svg-inline src="../assets/img/icon/location.svg" alt="">
      <span>г. Москва, ул. Ленина, 32, оф. 391 (ТЦ “Европа”)</span>
      </p>
      </div>
      <div class="ticket--slide-event ticket">
      <p class="ticket__price">9000 <span class="currency">р</span></p>
      <a href="#" class="g-btn g-btn--no-icon">
      <span>Купить билет</span>
      </a>
      </div>
      </div>
      </swiper-slide>
      <swiper-slide>
      <div class="slide-event__wrapper">
      <div class="slide-event__img"></div>
      <h3 class="slide-event__name">Бизнес-тренинг “Старт с нуля”</h3>
      <div class="slide-event__date">
      <p class="slide-event__time">
      <img class="svg-icon" svg-inline src="../assets/img/icon/clock.svg" alt="">
      <span>14.00 - 16.00</span>
      </p>
      <p class="slide-event__location">
      <img class="svg-icon" svg-inline src="../assets/img/icon/location.svg" alt="">
      <span>г. Москва, ул. Ленина, 32, оф. 391 (ТЦ “Европа”)</span>
      </p>
      </div>
      <div class="ticket--slide-event ticket">
      <p class="ticket__price">9000 <span class="currency">р</span></p>
      <a href="#" class="g-btn g-btn--no-icon">
      <span>Купить билет</span>
      </a>
      </div>
      </div>
      </swiper-slide>
      </swiper>
      <button class="swiper-button swiper-button--next"><span></span></button>
      </div>
      </section>
      <router-link class="payments" to="/payment_policy">Оплата и возврат</router-link>
    </div>
  </section>
</template>

<script>
import Ticket from '../components/Ticket'
import EventStatus from '../components/EventStatus'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import API from '../api/index'
import { mapState } from 'vuex'

export default {
  name: 'TheEvent',
  components: {
    swiper,
    swiperSlide,
    EventStatus,
    Ticket
  },
  data() {
    return {
      val: null,
      responseData: null,
      activeEvent: false,
      myEvent: false,
      city: [],
      swiperOption: {
        slidesPerView: 3,
        speed: 300,
        slideClass: 'slide-event',
        spaceBetween: 50,
        navigation: {
          nextEl: '.swiper-button--next',
          prevEl: '.swiper-button--prev'
        },
        breakpoints: {
          // when window width is <= 320px
          1400: {
            spaceBetween: 50,
            slidesPerView: 3
          },
          1170: {
            spaceBetween: 50,
            slidesPerView: 2
          },
          750: {
            spaceBetween: 10,
            slidesPerView: 1,
            pagination: {
              el: '.swiper-pagination',
              type: 'bullets',
              clickable: true
            }
          }
        }
      },
    }
  },
  methods: {
    activeEventFilter(res) {
      res.forEach((item) => {
        if (item.url === this.$route.params.hash) {
          this.activeEvent = item
        }
      })
    },
    activeCity() {
      this.responseData.relations.forEach((item) => {
        this.city.push({ name: item.city, val: item.url })
      })
    },
    newActiveEvent(value) {
      this.val = value.val
      let a = value.val + ''
      this.$router.push({ path: `/event/${a}` })
    },
    statusInfo() {
      if (this.logged) {
        this.$store.dispatch('user/getMyParentEvents').then(() => {
          if (this.myParentEvents.some(item => item.id === this.responseData.id)) {
            this.myEvent = true
          }
        })
      }
    },
    getEvent() {
      API.relations.info({ url: this.$route.params.hash }).then(response => {
        this.responseData = response.data
        this.activeCity()
        this.activeEventFilter(response.data.relations)
        this.statusInfo()
      }).catch(error => {
        this.$router.push({ path: '/' })
      })
    },
    refreshStatus() {
      this.responseData = null
      this.activeEvent = false
      this.myEvent = false
      this.city = []
      this.getEvent()
    },
    scrollMeTo(refName) {
      let element = this.$refs[refName]
      let top = element.offsetTop
      // window.scrollTo(0, top)
      window.scrollTo({
        top: top - 20,
        behavior: "smooth"
      });
    }
  },
  watch: {
    val(newVal, oldVal) {
      this.activeEventFilter(this.responseData.relations)
    }
  },
  computed: {
    ...mapState('user', [
      'myParentEvents',
      'logged'
    ]),
    filterTicketsList() {
      return this.activeEvent.tickets.sort((a, b) => {
        return a - b
      })
    },
    swiper() {
      return this.$refs.mySwiperEvents.swiper
    },
    selectedCity() {
      return { name: this.activeEvent.city, val: this.activeEvent.url }
    },
    speakersName() {
      if (this.activeEvent) {
        return this.activeEvent.speakers.map(item => item.name)
      } else {
        return []
      }
    },
    parseDate() {
      if (this.activeEvent) {
        let onlyDate = this.activeEvent.date.split(' ')
        let [day, month, year] = onlyDate[0].split('.')
        let da = new Date(year, month - 1, day)
        return da.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' }) + ' ' + onlyDate[1]
      } else {
        return '00'
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    next()
  },
  mounted() {
    this.getEvent()
  }
}
</script>

<style scoped lang="less">
  @import '~swiper/dist/css/swiper.css';
  @import "../assets/less/_importants";
  .p-event {
    .location {
      display: flex;
      align-items: center;
      margin-bottom: 80px;
      .lg-block({ margin-bottom: 50px; });
      .md-block({ margin-bottom: 30px; });
      .xs-block({ margin-bottom: 20px; });
      &__desc {
        margin-right: 20px;
        margin-bottom: 10px;
        font-size: 2.4rem;
        font-weight: 800;
        color: @colorBlue;
        .xs-block({ font-size: 1.8rem; })
      }
      &__city {
        font-size: 2.4rem;
        font-weight: 800;
        color: @colorMainRed;
        .xs-block({ font-size: 1.8rem; })
      }
    }
    .info__ticket {
      display: flex;
      align-items: center;
      .xs-block({ flex-direction: column; align-items: flex-start; });
      &--slide-event {
        justify-content: space-between;
        .to(520px, { flex-direction: column; align-items: flex-start; });
        .ticket__price {
          font-size: 3rem;
          margin-right: 10px;
          .to(520px, { margin-bottom: 20px; margin-right: 0; });
        }
        .ticket__currency {
          font-size: 2rem;
        }
        .g-btn--no-icon {
          flex-basis: 240px;
          .to(520px, { flex-basis: auto; });
        }
      }
      &--brief {
        .sm-block({ flex-direction: column; align-items: flex-start; });
        .ticket__price {
          .sm-block({ margin-bottom: 20px; });
        }
        .g-btn--no-icon {
          flex-shrink: 0;
          width: 275px;
          .lg-block({ width: 240px; });
          .sm-block({ width: 200px; });
          .xs-block({ flex-basis: auto });
        }
      }
      .ticket__price {
        display: flex;
        align-items: baseline;
        flex-shrink: 0;
        margin-right: 20px;
        margin-bottom: 20px;
        font-size: 5rem;
        font-weight: 800;
        color: @colorBlue;
        .xs-block({ font-size: 3.5rem; margin-bottom: 20px; });
        .currency {
          margin-left: 10px;
          font-size: 2rem;
          color: #000;
          .xs-block({ font-size: 1.6rem; })
        }
      }
    }
    .brief {
      display: flex;
      margin-bottom: 100px;
      .sm-block({ margin-bottom: 80px; });
      &__img {
        flex-shrink: 1;
        max-width: 550px;
        width: 100%;
        height: 550px;
        min-height: 200px;
        margin-right: 10%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        .lg-block({ width: 300px; height: 300px; });
        .md-block({ display: none; });
      }
      &__text {
        display: flex;
        flex-direction: column;
        padding-top: 4%;
        max-width: min-content;
        min-width: 50%;
        .md-block({ padding-top: 0; max-width: 80%; });
        .sm-block({ max-width: 100%; });
      }
      .info {
        &__description {
          position: relative;
          margin-bottom: 75px;
          font-size: 1.8rem;
          overflow: hidden;
          .md-block({ margin-bottom: 50px; });
          .xs-block({ margin-bottom: 30px; font-size: 1.6rem; });
        }
        &__item {
          display: flex;
          align-items: baseline;
          margin-bottom: 30px;
          .xs-block({ margin-bottom: 20px; });
          &:last-of-type {
            margin-bottom: 80px;
            .xs-block({ margin-bottom: 50px; })
          }
          &--bold {
            margin-right: 25px;
            font-size: 2rem;
            font-weight: 800;
          }
          &--speakers {
            &:last-of-type {
              .symb {
                display: none;
              }
            }
          }
        }

      }
    }
    .description {
      margin-bottom: 120px;
      .sm-block({ margin-bottom: 80px; });
      .text-wrapper {
        margin-bottom: 50px;
        .sm-block({ margin-bottom: 30px; });
        .description__text {
          margin-bottom: 20px;
          line-height: 1.4;
          .sm-block({ margin-bottom: 15px; });
          &:last-of-type {
            margin-bottom: 0px;
          }
        }
      }
      &__text {
        font-size: 1.6rem;
      }
      &__list {
        margin-left: 45px;
        .sm-block({ margin-left: 25px; });
        .xs-block({ margin-left: 10px; });
      }
      &__item {
        position: relative;
        padding-left: 30px;
        margin-bottom: 20px;
        .sm-block({ margin-bottom: 15px; padding-left: 20px; });
        &:last-child {
          margin-bottom: 0;
        }
        &::after {
          position: absolute;
          content: '';
          display: inline-block;
          left: 0;
          top: 7px;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: @colorMainRed;
        }
      }
    }
    .speakers {
      margin-bottom: 120px;
      .sm-block({ margin-bottom: 80px; });
      &__wrapper {
        .row-flex();
      }
      &__item {
        .col();
        .size(3);
        .size-lg(4);
        .size-md(6);
        .size-xs(12);
      }
      .item {
        display: flex;
        flex-direction: column;
        .lg-block({ margin-bottom: 40px; });
        &__img {
          margin-bottom: 50px;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
        }
        &__name {
          margin-bottom: 15px;
          font-size: 2rem;
          font-weight: 800;
          color: @colorBlue;
        }
        &__post {

        }
      }
    }
    .org-info {
      .p-event__caption-second {
        margin-bottom: 90px;
        .lg-block({ margin-bottom: 75px; });
        .sm-block({ margin-bottom: 50px; });
      }
      &__wrapper {
        .row-flex();
      }
      &__item {
        .col();
        .size(4);
        .size-md(5);
        .shift-right(2);
        .shift-md-right(0.5);
        .to(600px, { .size(8); .shift-right(0); });
        .size-xs(12);
      }
      .item {
        margin-bottom: 100px;
        .sm-block({ margin-bottom: 50px; });
        .xs-block({ margin-bottom: 35px; });
        &__name {
          margin-bottom: 25px;
          font-size: 2rem;
          font-weight: 800;
          .sm-block({ margin-bottom: 15px; });
        }
        &__info {
          &--link {
            color: @colorBlue;
            transition: 0.3s;
            border-bottom: 1px solid @colorBlue;
            &:hover {
              border-bottom-color: transparent;
            }
          }
        }
      }
    }
    .tickets {
      .tickets-wrapper {
        .row-flex();
        .tickets-item {
          .col();
          .size(4);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 30px 15px;
          box-shadow: 0 0 30px -5px rgba(0, 0, 0, 0.4);
          &__title {
            margin-bottom: 40px;
            font-size: 2.4rem;
            font-weight: 800;
          }
          .mavon {
            margin-bottom: 20px;
          }
          &__price {
            display: flex;
            align-items: baseline;
            flex-shrink: 0;
            margin-bottom: 20px;
            font-size: 5rem;
            font-weight: 800;
            color: @colorBlue;
            .xs-block({ font-size: 3.5rem; margin-bottom: 20px; });
            .currency {
              margin-left: 10px;
              font-size: 2rem;
              color: #000;
              .xs-block({ font-size: 1.6rem; })
            }
          }
        }
      }
    }
    .other-activities {
      .slider-wrapper {
        position: relative;
        padding: 0 70px;
        .md-block({ padding: 0 50px; });
        .sm-block({ padding: 0 30px; });
        .xs-block({ padding: 0; });

      }
      .swiper-button {
        position: absolute;
        width: 22px;
        height: 22px;
        top: 200px;
        .md-block({ top: 140px; });
        .xs-block({ display: none; });
        &.swiper-button-disabled {
          opacity: 0.5;
        }
        &--prev {
          left: 2px;
          span {
            border-bottom: 4px solid @colorBlue;
            border-left: 4px solid @colorBlue;
          }
        }
        &--next {
          right: 2px;
          span {
            border-top: 4px solid @colorBlue;
            border-right: 4px solid @colorBlue;
          }
        }
        span {
          display: block;
          width: 100%;
          height: 100%;
          transform: rotate(45deg);
          box-sizing: border-box;
        }
      }
      .slide-event {
        flex-shrink: 0;
        &__img {
          margin-bottom: 65px;
          height: 400px;
          background: url("../assets/img/bg-steps-item.jpg") no-repeat center / cover;
          .to(1400px, { height: 340px; });
          .md-block({ height: 280px; });
          .sm-block({ margin-bottom: 40px; })
        }
        &__name {
          margin-bottom: 40px;
          font-size: 2rem;
          font-weight: 800;
          color: #000;
          text-transform: uppercase;
          text-decoration: underline;
          .sm-block({ margin-bottom: 25px; })
        }
        &__date {
          margin-bottom: 50px;
        }
        &__time {
          margin-bottom: 20px;
        }
        &__time,
        &__location {
          display: flex;
          font-size: 1.4rem;
          .svg-icon {
            margin-right: 10px;
            margin-top: -3px;
            width: 20px;
            height: 20px;
            flex-shrink: 0;
            .sm-block({ width: 15px; height: 15px; margin-top: 0; });
            path {
              fill: @colorMainRed;
            }
          }
        }
      }
    }
    .payments {
      display: inline-block;
      margin-top: 50px;
      font-size: 2.4rem;
      font-weight: 800;
      color: @colorBlue;
      border-bottom: 1px solid @colorBlue;
      transition: 0.3s;
      .sm-block({ font-size: 2rem; });
      &:hover {
        border-bottom-color: transparent;
      }
    }
  }
</style>
