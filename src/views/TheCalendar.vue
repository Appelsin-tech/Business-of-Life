<template>
  <section class="p-calendar p-default-block">
    <div class="container page">
      <div class="row-caption">
        <div class="content">
          <span class="desc-light">Календарь событий</span>
          <h1 class="g-caption">Расписание мероприятий</h1>
          <div class="wrapper-date-icon">
            <p class="date">Ближайшие 30 дней</p>
            <div class="calendar-small" :class="{active: showCalendarMini}">
              <div class="svg-wrapper" @click="showCalendarMini = !showCalendarMini">
                <img svg-inline class="svg-square" src="../assets/img/icon/calendar-square.svg" alt="">
              </div>
              <transition name="fade">
                <div class="calendar-wrapper" v-if="showCalendarMini">
                  <v-calendar @dayclick="scrollToSlide" :attributes='calendarMini' :is-expanded="true" :nav-visibility="'hidden'" :class="'calendarMini'">
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
      <div class="row-slider" v-if="filterRelations.length > 0">

        <swiper :options="swiperOptionCalendar" ref="calendarSwiper">
          <swiper-slide v-for="(item, i) in filterRelations" :key="i">
            <div class="item-swiper" :class="[i === activeScrollSlide ? 'activeSlideColor' : '']">
              <div class="day-week">
                <p class="day">{{item.day}}</p>
                <p class="week">{{item.weekday}}</p>
              </div>
              <calendar-child :arr="item.events" :class="[i === activeScrollSlide ? 'activeSlideColor' : '']"/>
            </div>
          </swiper-slide>
        </swiper>

      </div>
    </div>
    <modal-calendar-event/>
  </section>
</template>

<script>
import 'v-calendar/lib/v-calendar.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import CalendarChild from '../components/CalendarChild'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'TheCalendar',
  components: {
    CalendarChild,
    swiper,
    swiperSlide,
    ModalCalendarEvent: () => import('@/components/modal/ModalCalendarEvent')
  },
  data() {
    return {
      indexInnerEvent: 0,
      showRelation: false,
      activeScrollSlide: 0,
      arr: [1, 2, 3],
      showCalendarMini: false,
      swiperOptionCalendar: {
        slidesPerView: 6,
        speed: 300,
        threshold: 8,
        slideClass: 'slide-calendar',
        navigation: {
          nextEl: '.swiper-button--next',
          prevEl: '.swiper-button--prev',
          disabledClass: 'swiper-button-disabled'
        },
        breakpoints: {
          // when window width is <= 320px
          1380: {
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
    ...mapState('calendar', [
      'publicRelations'
      // ...
    ]),
    ...mapGetters('calendar', [
      'filterRelations'
      // ...
    ]),
    calendarSwiper() {
      return this.$refs.calendarSwiper.swiper
    },
    calendarMini() {
      let optionsArr = []
      let options1 = {
        key: 'qweqwe',
        color: 'red',
        highlight: {
          height: '5px',
          backgroundColor: 'rgba(226,58,58,0.65)',
          color: 'white',
          borderRadius: '0px'
        },
        contentStyle: {
          color: '#fff',
          cursor: 'pointer'
        },
        dates: this.publicRelations.map(item => item.stamp * 1000)
      }
      let options2 = {
        key: 'today',
        color: 'red',
        highlight: {
          height: '5px',
          backgroundColor: '#e23a3a',
          color: 'white',
          borderRadius: '0px'
        },
        contentStyle: {
          color: '#fff',
          cursor: 'pointer'
        },
        dates: [new Date()]
      }
      optionsArr.push(options1)
      optionsArr.push(options2)
      return optionsArr
    }
  },
  methods: {
    scrollToSlide(e) {
      let res = this.publicRelations.filter(item => this.$moment(e.dateTime).isSame(item.stamp * 1000, 'day'))
      let indexSlide
      if (this.$moment(e.dateTime).isSame(this.$moment(), 'day')) {
        indexSlide = 0
      } else {
        this.filterRelations.forEach((item, index) => {
          if (item.stamp !== undefined) {
            if (this.$moment(e.dateTime).isSame(item.stamp, 'day')) {
              indexSlide = index
            }
          }
        })
      }

      if (indexSlide !== undefined) {
        this.activeScrollSlide = indexSlide
        this.showCalendarMini = false
        this.calendarSwiper.slideTo(indexSlide)
      }
      // this.$modal.show('modal-calendar-event', {relations: res})
    }
  },
  mounted() {
    if (this.publicRelations.length === 0) {
      let currentDate = this.$moment().startOf('day').unix()
      let lastDate = this.$moment().startOf('day').add(365, 'days').unix()
      this.$store.dispatch('calendar/getRelations', { from: currentDate, to: lastDate }).then(() => {
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
      .decor-cube(288px, 288px);
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
        .desc-light {
          font-size: 1.4rem;
          color: var(--app_font__color);
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
                    fill: @colorMain;
                  }
                }
              }
              .calendar-wrapper {
                z-index: 99;
                pointer-events: auto;
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
                  fill: @colorMainSecondary;
                }
              }
            }
            .calendar-wrapper {
              position: absolute;
              top: 87px;
              left: -160px;
              padding: 20px 25px;
              background-color: #fff;
              box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.2);
              box-sizing: border-box;
              transition: 0.3s;
              pointer-events: none;
              z-index: 99;
              .lg-block({
                top: 50px;
                left: -100px;
              });
              .sm-block({
                padding: 10px;
                top: 47px;
              });
              .to(630px, {
                left: -241px;
              });
              .to(375px, {
                left: -200px;
              });
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
          span {
            opacity: 0.5;
          }
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
            border-bottom: 3px solid @colorMainSecondary;
            border-left: 3px solid @colorMainSecondary;
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
            border-bottom: 3px solid @colorMain;
            border-left: 3px solid @colorMain;
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
        height: 450px;
        background: #fff;
        border-right: 1px solid #e7e7e7;
        .sm-block({
          height: 400px;
        });
        .xs-block({
          height: 350px;
        });
        &.activeSlideColor {
          background: @colorMain;
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
            color: var(--app_emphasis__color);
            .sm-block({
              font-size: 2.4rem;
            });
          }
          .week {
            font-size: 1.4rem;
            color: var(--app_font__color);
          }
        }
      }
    }
  }

</style>
