<template>
  <section class="p-calendar p-default p-default-inner">
    <div class="container page">
      <div class="row-caption">
        <div class="content">
          <span class="desc-light">Календарь событий</span>
          <h1 class="g-caption">Расписание мероприятий</h1>
          <div class="wrapper-date-icon">
            <p class="date">Ближайшие 30 дней</p>
            <div class="calendar-small" :class="{active: showCalendarMini}">
              <div class="svg-wrapper"    @click="showCalendarMini = !showCalendarMini">
                <img svg-inline class="svg-square" src="../assets/img/icon/calendar-square.svg" alt="">
              </div>
              <transition name="fade">
                <div class="calendar-wrapper" v-if="showCalendarMini">
                  <v-calendar :attributes='calendarMini' :is-expanded="true" :nav-visibility="'hidden'" :class="'calendarMini'" >
                  </v-calendar>
                </div>
              </transition>


            </div>
            <div class="wrapper-btn wrapper-btn--calendar">
              <button class="swiper-button swiper-button--prev"><span></span></button>
              <button class="swiper-button swiper-button--next"><span></span></button>
            </div>
          </div>
        </div>
      </div>
      <div class="row-slider" v-if="filterEvents.length > 0">

        <swiper :options="swiperOptionCalendar" ref="calendarSwiper">
          <swiper-slide v-for="(item, i) in filterEvents" :key="i">
            <div class="item-swiper">
              <div class="day-week">
                <p class="day">{{item.day}}</p>
                <p class="week">{{item.weekday}}</p>
              </div>
              <calendar-child :arr="item.events"/>
              <!--<div class="test-btn"  @click="relationSwiper.update()">qwdqwd</div>-->
            </div>
          </swiper-slide>
        </swiper>

      </div>
    </div>
  </section>
</template>

<script>
import 'v-calendar/lib/v-calendar.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapGetters, mapState } from 'vuex'
import calendarChild from '../components/calendarChild'

export default {
  name: 'TheCalendar',
  components: {
    swiper,
    swiperSlide,
    calendarChild
  },
  data() {
    return {
      indexInnerEvent: 0,
      showRelation: false,
      arr: [1, 2, 3],
      showCalendarMini: false,
      swiperOptionCalendar: {
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
          500: {
            slidesPerView: 1
          }
        }
      },
    }
  },
  computed: {
    calendarSwiper() {
      return this.$refs.calendarSwiper.swiper
    },
    ...mapState('events', [
      'publicEvents'
      // ...
    ]),
    ...mapGetters('events', [
      'filterEvents'
      // ...
    ]),
    calendarMini() {
      let optionsArr = []
      let options = {
        key: 'today',
        color: 'red',
        contentClass: 'wwwwwwww',
        highlight: {
          height: '5px',
          backgroundColor: '#e23a3a',
          color: 'white',
          class: 'qqqqqqqqq',
          borderRadius: '0px'// Class provided by TailwindCSS
          // Other properties are available too, like `height` & `borderRadius`
        },
        contentStyle: {
          color: '#fff'
        },
        dates: this.publicEvents.map(item => item.stamp * 1000)
      }
      optionsArr[0] = options
      return optionsArr
    }
  },
  methods: {},
  mounted() {
    if (this.publicEvents.length === 0) {
      let currentDate = new Date()
      let currentDateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime() / 1000
      let lastDate = currentDateTime + 2678400

      this.$store.dispatch('events/eventsCalendar', { from: currentDateTime, to: lastDate }).then(() => {
        // console.dir(this.publicEvents)
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import '~swiper/dist/css/swiper.css';
  @import "../assets/less/_importants";
  .p-calendar {
    background: url("../assets/img/bg-calendar.jpg") no-repeat center / cover;
    .row-caption {
      position: relative;
      padding-top: 90px;
      padding-left: 90px;
      margin-bottom: 60px;
      .decor-cube(300px, 300px);
      .lg-block({
        padding-top: 60px;
        padding-left: 60px;
        margin-bottom: 24px;
        .decor-cube(210px, 210px);
      });
      .sm-block({
        margin-bottom: 27px;
        .decor-cube(190px, 190px);
      });
      .xs-block({
        padding-left: 0;
        padding-top: 0;
        margin-bottom: 25px;
        .decor-cube(@display: none;);
      });
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
            .sm-block({
              font-weight: 600;
              font-size: 2rem;
            })
          }
          .calendar-small {
            position: relative;
            font-size: 0;
            &.active {
              .svg-wrapper {
                .svg-square {
                  path {
                    fill: @colorMainRed;
                  }
                }
              }
              .calendar-wrapper {
                z-index: 99;
                pointer-events: auto;
                /*animation: cal-show 0.2s forwards;*/
              }
            }
            .svg-wrapper {
              cursor: pointer;
              margin-right: 40px;
              .svg-square {
                width: 25px;
                height: 25px;
                outline: none;
                .sm-block({
                  width: 20px;
                  height: 20px;
                });
                path {
                  transition: 0.3s;
                  fill: @colorBlue;
                }
              }
            }
            .calendar-wrapper {
              position: absolute;
              top: 87px;
              left: -160px;
              width: 375px;
              padding: 20px 25px;
              background-color: #fff;
              box-shadow: 0 0 20px 0px rgba(0,0,0,0.2);
              box-sizing: border-box;
              transition: 0.3s;
              pointer-events: none;
              z-index: 99;
              .lg-block({width: 312px; top: 50px; left: -100px;});
              .sm-block({padding: 10px; top: 47px;
                width: 282px;});
              .to(630px, {
                left: -241px;
              });
              .to(375px, {
                left: -200px;
              });
            }
            @keyframes cal-show {
              0% {
                display: block;
                opacity: 0;
                transform: translateY(-10px);
              }
              100% {
                opacity: 1;
                transform: translateY(0px);
              }
            }
            @keyframes cal-hide {
              0% {
                opacity: 1;
                transform: translateY(0px);
              }
              100% {
                opacity: 0;
                transform: translateY(-10px);
              }
            }
          }
        }
      }
    }
    .wrapper-btn {
      display: flex;
      align-items: center;
      .swiper-button {
        cursor: pointer;
        &.swiper-button-disabled {
          opacity: 0.5;
        }
        &:first-of-type {
          span {
            transform: rotate(45deg);
          }
        }
        &:last-of-type {
          span {
            transform: rotate(-135deg);
          }
        }
        span {
          display: block;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
      }
      &--calendar {
        .swiper-button {
          width: 16px;
          height: 16px;
          .sm-block({
            width: 13px;
            height: 13px;
          });
          &--prev {
            margin-right: 15px;
          }
          span {
            border-bottom: 3px solid @colorBlue;
            border-left: 3px solid @colorBlue;
          }
        }
      }
      &--relation {
        margin-top: 10px;
        align-self: center;
        display: flex;
        align-items: center;
        .swiper-button {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          .sm-block({
            width: 13px;
            height: 13px;
          });
          &--prev {
            margin-right: 15px;
          }
          span {
            border-bottom: 3px solid @colorMainRed;
            border-left: 3px solid @colorMainRed;
          }
        }
        .swiper-pagination-relation {
          position: relative;
          bottom: auto;
          margin: 0 8px;
        }
      }
    }
    .row-slider {
      padding-left: 90px;
      .lg-block({
        padding-left: 60px;
      });
      .xs-block({
        padding-left: 0;
      });
      .swiper-container {
        .slide-calendar {
          flex-shrink: 0;
          /*.md-block({max-width: 33.33%;})*/
        }
      }
      .item-swiper {
        display: flex;
        flex-direction: column;
        height: 470px;
        background: #fff;
        border-right: 1px solid #e7e7e7;
        .sm-block({
          height: 400px;
        });
        .xs-block({
          height: 350px;
        });
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
          .sm-block({
            padding: 20px 15px;
          });
          .day {
            font-size: 3rem;
            font-weight: 800;
            color: @colorBlue;
            .sm-block({
              font-size: 2.4rem;
            });
          }
          .week {
            font-size: 1.4rem;
            color: #666666;
          }
        }

      }
    }
  }

</style>
