<template>
  <section class="p-calendar">
    <div class="container page">
      <div class="row-caption">
        <div class="content">
          <span class="desc-light">Календарь событий</span>
          <h1 class="g-caption">Расписание мероприятий</h1>
          <div class="wrapper-date-icon">
            <p class="date">Сентябрь 2019</p>
            <div class="wrapper-btn">
              <button class="swiper-button swiper-button--prev"><span></span></button>
              <button class="swiper-button swiper-button--next"><span></span></button>
            </div>
          </div>
        </div>
      </div>
      <div class="row-slider">
          <swiper :options="swiperOption" ref="mainSwiper">
            <swiper-slide>
              <div class="item-swiper">
                <div class="day-week">
                  <p class="day">08</p>
                  <p class="week">Понедельник</p>
                </div>
                <div class="wrapper-info">
                  <h3 class="name-event">Бизнес-тренинг “Старт с нуля”</h3>
                  <div class="date-event">
                    <p class="time">
                      <img class="svg-icon" svg-inline src="../assets/img/icon/clock.svg" alt="">
                      <span>14.00 - 16.00</span>
                    </p>
                    <p class="location ">
                      <img class="svg-icon" svg-inline src="../assets/img/icon/location.svg" alt="">
                      <span>г. Москва, ул. Ленина, 32, оф. 391 (ТЦ “Европа”)</span>
                    </p>
                  </div>
                  <a href="#" class="link-more">Подробнее</a>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="item-swiper">
                <div class="day-week">
                  <p class="day">09</p>
                  <p class="week">Вторник</p>
                </div>
                <div class="wrapper-info">
                  <h3 class="name-event">Семинар с Александром Бухтияровым</h3>
                  <div class="date-event">
                    <p class="time">
                      <img class="svg-icon" svg-inline src="../assets/img/icon/clock.svg" alt="">
                      <span>14.00 - 16.00</span>
                    </p>
                    <p class="location ">
                      <img class="svg-icon" svg-inline src="../assets/img/icon/location.svg" alt="">
                      <span>г. Москва, ул. Ленина, 32, оф. 391 (ТЦ “Европа”)</span>
                    </p>
                  </div>
                  <a href="#" class="link-more">Подробнее</a>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="item-swiper">
                <div class="day-week">
                  <p class="day">10</p>
                  <p class="week">Среда</p>
                </div>
                <div class="wrapper-info" v-if="false">
                  <h3 class="name-event">Бизнес-тренинг “Старт с нуля”</h3>
                  <div class="date-event">
                    <p class="time">
                      <img class="svg-icon" svg-inline src="../assets/img/icon/clock.svg" alt="">
                      <span>14.00 - 16.00</span>
                    </p>
                    <p class="location ">
                      <img class="svg-icon" svg-inline src="../assets/img/icon/location.svg" alt="">
                      <span>г. Москва, ул. Ленина, 32, оф. 391 (ТЦ “Европа”)</span>
                    </p>
                  </div>
                  <a href="#" class="link-more">Подробнее</a>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="item-swiper active" >
                <div class="day-week">
                  <p class="day">11</p>
                  <p class="week">Четверг</p>
                </div>
                <div class="wrapper-info">
                  <h3 class="name-event">Бизнес-тренинг “Старт с нуля”</h3>
                  <div class="date-event">
                    <p class="time">
                      <img class="svg-icon" svg-inline src="../assets/img/icon/clock.svg" alt="">
                      <span>14.00 - 16.00</span>
                    </p>
                    <p class="location ">
                      <img class="svg-icon" svg-inline src="../assets/img/icon/location.svg" alt="">
                      <span>г. Москва, ул. Ленина, 32, оф. 391 (ТЦ “Европа”)</span>
                    </p>
                  </div>
                  <a href="#" class="link-more">Подробнее</a>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="item-swiper">
                <div class="day-week">
                  <p class="day">12</p>
                  <p class="week">Пятница</p>
                </div>
                <div class="wrapper-info" v-if="false">
                  <h3 class="name-event">Бизнес-тренинг “Старт с нуля”</h3>
                  <div class="date-event">
                    <p class="time">
                      <img class="svg-icon" svg-inline src="../assets/img/icon/clock.svg" alt="">
                      <span>14.00 - 16.00</span>
                    </p>
                    <p class="location ">
                      <img class="svg-icon" svg-inline src="../assets/img/icon/location.svg" alt="">
                      <span>г. Москва, ул. Ленина, 32, оф. 391 (ТЦ “Европа”)</span>
                    </p>
                  </div>
                  <a href="#" class="link-more">Подробнее</a>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="item-swiper">
                <div class="day-week">
                  <p class="day">13</p>
                  <p class="week">Суббота</p>
                </div>
                <div class="wrapper-info" v-if="false">
                  <h3 class="name-event">Бизнес-тренинг “Старт с нуля”</h3>
                  <div class="date-event">
                    <p class="time">
                      <img class="svg-icon" svg-inline src="../assets/img/icon/clock.svg" alt="">
                      <span>14.00 - 16.00</span>
                    </p>
                    <p class="location ">
                      <img class="svg-icon" svg-inline src="../assets/img/icon/location.svg" alt="">
                      <span>г. Москва, ул. Ленина, 32, оф. 391 (ТЦ “Европа”)</span>
                    </p>
                  </div>
                  <a href="#" class="link-more">Подробнее</a>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="item-swiper">
                <div class="day-week">
                  <p class="day">08</p>
                  <p class="week">Понедельник</p>
                </div>
                <div class="wrapper-info">
                  <h3 class="name-event">Бизнес-тренинг “Старт с нуля”</h3>
                  <div class="date-event">
                    <p class="time">
                      <img class="svg-icon" svg-inline src="../assets/img/icon/clock.svg" alt="">
                      <span>14.00 - 16.00</span>
                    </p>
                    <p class="location ">
                      <img class="svg-icon" svg-inline src="../assets/img/icon/location.svg" alt="">
                      <span>г. Москва, ул. Ленина, 32, оф. 391 (ТЦ “Европа”)</span>
                    </p>
                  </div>
                  <a href="#" class="link-more">Подробнее</a>
                </div>
              </div>
            </swiper-slide>
          </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'TheCalendar',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 7,
        speed: 300,
        slideClass: 'slide-calendar',
        navigation: {
          nextEl: '.swiper-button--next',
          prevEl: '.swiper-button--prev',
          disabledClass: 'swiper-button-disabled'
        },
        breakpoints: {
          // when window width is <= 320px
          1530: {
            slidesPerView: 6
          },
          1350: {
            slidesPerView: 5
          },
          1170: {
            slidesPerView: 4
          },
          900: {
            slidesPerView: 3
          },
          600: {
            slidesPerView: 2
          },
          425: {
            slidesPerView: 1
          }
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiperServices.swiper
    }
  }
}
</script>

<style scoped lang="less">
  @import '~swiper/dist/css/swiper.css';
  @import "../assets/less/_importants";
  .p-calendar {
    display: flex;
    align-items: center;
    min-height: 100vh;
    background: url("../assets/img/bg-calendar.jpg") no-repeat center / cover;
    .row-caption {
      position: relative;
      padding-top: 90px;
      padding-left: 90px;
      margin-bottom: 80px;
      .decor-cube(300px, 300px);
      .lg-block({ padding-top: 60px; padding-left: 60px; margin-bottom: 100px; .decor-cube(260px, 260px); });
      .sm-block({ margin-bottom: 110px; .decor-cube(220px, 220px); });
      .to(630px, { margin-bottom: 60px;});
      .xs-block({ padding-left: 0; padding-top: 0; margin-bottom: 25px; .decor-cube(@display: none;); });
      .content {
        display: flex;
        flex-direction: column;
        .g-caption {
          margin-bottom: 20px;
        }
        .desc-light {
          font-size: 1.4rem;
          color: #666666;
          margin-bottom: 10px;
        }
        .wrapper-date-icon {
          display: flex;
          align-items: center;
          .date {
            margin-right: 40px;
            font-weight: 800;
            font-size: 2.4rem;
            text-transform: uppercase;
            .sm-block({ font-weight: 600; font-size: 2rem; })
          }
          .svg-square {
            margin-right: 40px;
            width: 25px;
            height: 25px;
            .sm-block({ width: 20px; height: 20px;});
            path {
              fill: @colorMainRed;
            }
          }
          .wrapper-btn {
            display: flex;
            align-items: center;
            .swiper-button {
              width: 16px;
              height: 16px;
              cursor: pointer;
              .sm-block({ width: 13px; height: 13px;});
              &.swiper-button-disabled {
                opacity: 0.5;
              }
              &--prev {
                margin-right: 15px;
                span {
                  transform: rotate(45deg);
                }
              }
              &--next {
                span {
                  transform: rotate(-135deg);
                }
              }
              span {
                display: block;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                border-bottom: 3px solid @colorBlue;
                border-left: 3px solid @colorBlue;
              }
            }
          }
        }
      }
    }
    .row-slider {
      padding-left: 90px;
      .lg-block({ padding-left: 60px;});
      .xs-block({ padding-left:0;});
      .swiper-container {
        .slide-calendar {
          flex-shrink: 0;
        }
      }
      .item-swiper {
        display: flex;
        flex-direction: column;
        height: 470px;
        background: #fff;
        border-right: 1px solid #e7e7e7;
        .sm-block({ height: 400px;});
        .xs-block({ height: 350px;});
        &.active {
          background: @colorMainRed;
          .day-week {
            .day {
              color: #fff;
            }
            .week {
              color: #fff;
            }
          }
          .wrapper-info {
            .name-event {
              color: #fff;
            }
            .date-event {
              color: #fff;
              .time,
              .location {
                .svg-icon {
                  path {
                    fill: #fff;
                  }
                }
              }
            }
            .link-more {
              display: none;
            }
          }
        }
        .day-week {
          padding: 30px 20px;
          border-bottom: 1px solid #e7e7e7;
          .sm-block({ padding: 20px 15px;});
          .day {
            font-size: 3rem;
            font-weight: 800;
            color: @colorBlue;
            .sm-block({ font-size: 2.4rem;});
          }
          .week {
            font-size: 1.4rem;
            color: #666666;
          }
        }
        .wrapper-info {
          display: flex;
          padding: 20px 20px 30px;
          flex-direction: column;
          align-items: flex-start;
          flex-grow: 1;
          .sm-block({  padding: 20px 15px;});
          .name-event {
            margin-bottom: 35px;
            font-size: 1.4rem;
            font-weight: 800;
            color: #000;
            .sm-block({ margin-bottom: 25px;});
          }
          .date-event {
            color: #666;
            .time,
            .location {
              display: flex;
              margin-bottom: 20px;
              font-size: 1.4rem;
              .svg-icon {
                margin-right: 10px;
                margin-top: -3px;
                width: 20px;
                height: 20px;
                flex-shrink: 0;
                .sm-block({ width: 15px; height: 15px; margin-top: 0;});
                path {
                  fill: @colorMainRed;
                }
              }
            }
          }
          .link-more {
            margin-top: auto;
            color: @colorBlue;
            transition: 0.3s;
            border-bottom: 1px dashed @colorBlue;
            &:visited,
            &:active {
              color: @colorBlue;
            }
            &:hover {
              border-bottom-color: transparent;
            }
          }
        }
      }
    }
  }

</style>
