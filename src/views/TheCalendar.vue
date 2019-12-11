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
                  <v-calendar @dayclick="scrollToSlide" :attributes='calendarMini' :is-expanded="true" :nav-visibility="'hidden'" :class="'calendarMini'" >
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
  </section>
</template>

<script>
import 'v-calendar/lib/v-calendar.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import calendarChild from '../components/calendarChild'
import API from '../api/index'

export default {
  name: 'TheCalendar',
  components: {
    swiper,
    swiperSlide,
    calendarChild
  },
  data() {
    return {
      publicEvents: [],
      indexInnerEvent: 0,
      showRelation: false,
      activeScrollSlide: 0,
      arr: [1, 2, 3],
      showCalendarMini: false,
      swiperOptionCalendar: {
        slidesPerView: 7,
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
    filterEvents() {
      let finishArr = []
      for (let i = 0; i < 31; i++) {
        finishArr.push({
          date: this.$moment().startOf('day').add(i, 'days'),
          day: this.$moment().startOf('day').add(i, 'days').date(),
          weekday: this.$moment().startOf('day').add(i, 'days').format('dddd'),
          events: []
        })

        this.publicEvents.forEach(item => {
          let parseSec = item.stamp * 1000
          // console.log(currentDate.add('day', i).diff(this.$moment(parseSec), 'days'))
          if (this.$moment(parseSec).isBetween(this.$moment().startOf('day').add(i, 'days'), this.$moment().startOf('day').add(i + 1, 'days'))) {
            finishArr[i].stamp = parseSec
            finishArr[i].events.push(item)
          }
        })
      }
      return finishArr
    },
    calendarMini() {
      let optionsArr = []
      let options1 = {
        key: 'qweqwe',
        color: 'red',
        contentClass: 'wwwwwwww',
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
        dates: this.publicEvents.map(item => item.stamp * 1000)
      }
      let options2 = {
        key: 'today',
        color: 'red',
        contentClass: 'wwwwwwww',
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
      let a
      this.filterEvents.forEach((item, index) => {
        if (item.stamp !== undefined) {
          if (this.$moment(e.dateTime).isSame(item.stamp, 'day')) {
            a = index
          }
        }
      })
      if (a !== undefined) {
        this.activeScrollSlide = a
        this.showCalendarMini = false
        this.calendarSwiper.slideTo(a)
      }
    }
  },
  mounted () {
    if (this.publicEvents.length === 0) {
      let currentDate = this.$moment().startOf('day').unix()
      let lastDate = this.$moment().startOf('day').add(30, 'days').unix()

      API.relations.find({ from: currentDate, to: lastDate }).then(response => {
        this.publicEvents = response
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
              padding: 20px 25px;
              background-color: #fff;
              box-shadow: 0 0 20px 0px rgba(0,0,0,0.2);
              box-sizing: border-box;
              transition: 0.3s;
              pointer-events: none;
              z-index: 99;
              .lg-block({ top: 50px; left: -100px;});
              .sm-block({padding: 10px; top: 47px;});
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
        &.activeSlideColor {
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
