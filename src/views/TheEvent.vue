<template>
  <section class="p-event p-default p-default-inner">
    <bread-crumbs/>
    <div class="container">
      <h1 class="g-caption g-caption-inner">бизнес-тренинг “старт с нуля”</h1>
      <div class="location">
        <div class="location__desc">Город</div>
        <v-select v-model="selectedCity" :multiple="false" :class="'v-select__event'" :searchable="false" selected="" label="cityName" :options="city"></v-select>
      </div>
      <section class="brief">
        <div class="brief__img"></div>
        <div class="brief__text info">
          <p class="info__description">Мастер-класс, в котором объединены и проанализированы главные компетенции,
            которые позволят быть эффективным и успешным в бизнесе, в работе и в жизни.</p>
          <p class="info__item ">
            <strong class="info__item--bold">Дата:</strong>
            <span class="info__item--normal">13 октября 2019</span>
          </p>
          <p class="info__item">
            <strong class="info__item--bold">Место:</strong>
            <span class="info__item--normal">ул. Луначарскогог, 52, оф. 506 (ТЦ “Европа”)</span>
          </p>
          <p class="info__item">
            <strong class="info__item--bold">Спикеры:</strong>
            <span class="info__item--normal">Александр Бухтияров, Роза Жаманкулова</span>
          </p>
          <div class="info__ticket ticket ticket--brief">
            <p class="ticket__price">9000 <span class="currency">р</span></p>
            <a href="#" class="g-btn g-btn--no-arrow" @click.prevent="$modal.show('modal-ticket-purchase')">
              <span>Купить билет</span>
            </a>
          </div>
        </div>
      </section>
      <section class="description">
        <h2 class="p-event__caption-second">Описание</h2>
        <div class="text-wrapper">
          <p class="description__text">Мастер-класс, в котором объединены и проанализированы главные компетенции,
            которые позволят быть эффективным и успешным в бизнесе, в работе и в жизни.
          </p>
          <p class="description__text">Данная программа будет полезна всем, кто интересуется развитием своего бизнеса
            или собственным профессиональным развитием.</p>
        </div>
        <ul class="description__list">
          <li class="description__item">
            <p class="description__text">Компетенции будущего. Набор каких качеств и знаний, будет востребован в
              ближайшие 20 лет.</p>
          </li>
          <li class="description__item">
            <p class="description__text">Компетенции в бизнесе. Чему учить ваших детей и сотрудников.</p>
          </li>
          <li class="description__item">
            <p class="description__text">Методы развития компетенций будущего.</p>
          </li>
          <li class="description__item">
            <p class="description__text">Методы эффективного мышления и обработки информации.</p>
          </li>
          <li class="description__item">
            <p class="description__text">Стратегическое мышление будущего</p>
          </li>
        </ul>
      </section>
      <section class="speakers">
        <h2 class="p-event__caption-second">Спикеры</h2>
        <div class="speakers__wrapper">
          <div class="speakers__item item">
            <div class="item__img"></div>
            <p class="item__name">Александр Бухтияров</p>
            <p class="item__post">Бизнес-тренер</p>
          </div>
          <div class="speakers__item item">
            <div class="item__img"></div>
            <p class="item__name">Александр Бухтияров</p>
            <p class="item__post">Бизнес-тренер</p>
          </div>
        </div>
      </section>
      <section class="org-info">
        <h2 class="p-event__caption-second">Организационная информация</h2>
        <div class="org-info__wrapper">
          <div class="org-info__item item">
            <p class="item__name">Дата и продолжительность:</p>
            <p class="item__info">10 сентября, с 10:00 до 18:00
              (предусмотрены 2 кофе-паузы и перерыв на обед)</p>
          </div>
          <div class="org-info__item item">
            <p class="item__name">Место проведения:</p>
            <p class="item__info">ул. Луначарскогог, 52, оф. 506 (ТЦ “Европа”)</p>
          </div>
          <div class="org-info__item item">
            <p class="item__name">Целевая аудитория:</p>
            <p class="item__info">все заинтересованные в развитии личности и бизнеса</p>
          </div>
          <div class="org-info__item item">
            <p class="item__name">Контактная информация:</p>
            <p class="item__info">+7 861 204-08-38 (круглосуточно)</p>
          </div>
        </div>
      </section>
      <section class="other-activities">
        <h2 class="p-event__caption-second">Возможно, вас заинтересует</h2>
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
                  <a href="#" class="g-btn g-btn--no-arrow">
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
                  <a href="#" class="g-btn g-btn--no-arrow">
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
                  <a href="#" class="g-btn g-btn--no-arrow">
                    <span>Купить билет</span>
                  </a>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <button class="swiper-button swiper-button--next"><span></span></button>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import BreadCrumbs from '../components/BreadCrumbs.vue'

export default {
  name: 'TheEvent',
  components: {
    BreadCrumbs,
    swiper,
    swiperSlide
  },
  data() {
    return {
      selectedCity: {
        cityName: 'Москва',
        cityVal: 'Moscow'
      },
      city: [
        {
          cityName: 'Санкт-Петербург',
          cityVal: 'SpB'
        },
        {
          cityName: 'Омск',
          cityVal: 'Omsk'
        },
        {
          cityName: 'Москва',
          cityVal: 'Moscow'
        }
      ],
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
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiperEvents.swiper
    }
  }
}
</script>

<style scoped lang="less">
  @import '~swiper/dist/css/swiper.css';
  @import "../assets/less/_importants";
  .p-event {
    &__caption-second {
      margin-bottom: 50px;
      font-size: 4rem;
      font-weight: 800;
      color: #000;
      text-transform: uppercase;
      .lg-block({ font-size: 3rem; });
      .sm-block({ font-size: 2.5rem; });
    }
    .location {
      display: flex;
      align-items: center;
      margin-bottom: 80px;
      .lg-block({ margin-bottom: 50px; });
      .md-block({ margin-bottom: 30px; });
      .xs-block({ margin-bottom: 20px; });
      &__desc {
        margin-right: 20px;
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
    .ticket {
      display: flex;
      align-items: center;
      .xs-block({ flex-direction: column; align-items: flex-start; });
      &__price {
        flex-shrink: 0;
        margin-right: 17%;
        font-size: 5rem;
        font-weight: 800;
        color: @colorBlue;
        .xs-block({ font-size: 3.5rem; margin-bottom: 20px; });
        .currency {
          font-size: 2rem;
          color: #000;
          .xs-block({ font-size: 1.6rem; })
        }
      }
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
        .g-btn--no-arrow {
          flex-basis: 240px;
          .to(520px, { flex-basis: auto; });
        }
      }
      &--brief {
        .g-btn--no-arrow {
          flex-basis: 275px;
          .xs-block({ flex-basis: auto });
        }
      }
    }
    .brief {
      display: flex;
      margin-bottom: 100px;
      .sm-block({ margin-bottom: 80px; });
      &__img {
        flex-shrink: 0;
        width: 550px;
        height: 550px;
        min-height: 200px;
        margin-right: 10%;
        background: url("../assets/img/event.png") no-repeat left top / contain;
        .lg-block({ width: 300px; height: 300px; });
        .md-block({ display: none; });
      }
      &__text {
        display: flex;
        flex-direction: column;
        padding-top: 4%;
        .md-block({ padding-top: 0; })
      }
      .info {
        &__description {
          margin-bottom: 75px;
          font-size: 1.8rem;
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
          background: url("../assets/img/coach-1.jpg") no-repeat center / cover;
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
  }
</style>
