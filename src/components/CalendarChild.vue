<template>
  <div class="swiper-child">
    <div class="wrapper-info" v-for="(event, index) in arr" :key="event.id" v-show="indexSlide === index">
      <h3 class="name-event">
        <router-link class="name-event__link" :to="`/event/${event.id}`">{{event.title}}</router-link>
      </h3>
      <div class="date-event">
        <div class="time">
          <icon-clock-outline class="g-icon"/>
          <span>{{parseDate(event.stamp)}}</span>
        </div>
        <div class="location ">
          <icon-map-marker class="g-icon"/>
          <div class="location__text" v-if="event.type !== 2">
            <span>{{event.country}}, {{event.city}}</span>
            <span>{{event.address}}</span>
          </div>
          <div class="location__text" v-else>
            <span>Вебинар</span>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper-btn wrapper-btn--relation" v-if="arr.length > 1">
      <button class="swiper-button" :class="{'swiper-button-disabled': indexSlide === 0}" @click="btnPrev">
        <span></span>
      </button>
      <p class="num-slides">{{indexSlide + 1}} / {{arr.length}}</p>
      <button class="swiper-button" :class="{'swiper-button-disabled': indexSlide === arr.length - 1}" @click="btnNext">
        <span></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarChild',
  props: ['arr'],
  data() {
    return {
      indexSlide: 0
    }
  },
  methods: {
    btnPrev() {
      if (this.indexSlide !== 0) {
        this.indexSlide--
      }
    },
    btnNext() {
      if (this.indexSlide < this.arr.length - 1) {
        this.indexSlide++
      }
    },
    parseDate (stamp) {
      return this.$moment(stamp * 1000).format('D MMMM YYYY hh:mm')
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .swiper-child {
    &.activeSlideColor {
      .name-event,
      .name-event__link {
        color: #fff;
      }
      .date-event {
        color: #fff;
        .time,
        .location {
          .g-icon {
            color: #fff;
          }
        }
      }
      .wrapper-btn {
        .num-slides  {
          color: #fff;
        }
        .swiper-button {
          span {
            border-bottom: 3px solid #fff;
            border-left: 3px solid #fff;
          }
        }
      }
    }
  }
  .wrapper-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-grow: 1;
    .name-event {
      margin-bottom: 35px;
      font-size: 1.4rem;
      font-weight: 800;
      color: #000;
      .sm-block({
        margin-bottom: 25px;
      });
      &__link {
        text-decoration: underline;
        color: #000;
        &:hover {
          text-decoration: none;
        }
      }
    }
    .date-event {
      color: #666;
      .time,
      .location {
        display: flex;
        margin-bottom: 20px;
        font-size: 1.4rem;
        word-break: normal;
        .g-icon {
          margin-right: 10px;
          margin-top: -3px;
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          color: var(--app_icon__color);
          .sm-block({
            width: 15px;
            height: 15px;
            margin-top: 0;
          });
        }
      }
      .location__text {
        display: flex;
        flex-direction: column;
        max-height: 100px;
        overflow: hidden;
        .lg-block({
          max-height: 130px;
        });
        .sm-block({
          max-height: 120px;
        });
        .xs-block({
          max-height: 107px;
        });
        span {
          &:first-child {
            margin-bottom: 8px;
          }
        }
      }
    }
    .link-more {
      margin-top: auto;
      color: @colorMainSecondary;
      transition: 0.3s;
      border-bottom: 1px dashed @colorMainSecondary;
      &:visited,
      &:active {
        color: @colorMainSecondary;
      }
      &:hover {
        border-bottom-color: transparent;
      }
    }
  }
  .swiper-child {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 20px 20px 30px;
    .swiper-container {
      width: 100%;
      flex-grow: 1;
      .slide-relation {
        max-width: 100%;
        display: flex;
        flex-shrink: 0;
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
    .num-slides {
      margin: 0 5px;
      min-width: 40px;
      text-align: center;
    }
    &--relation {
      margin-top: 10px;
      align-self: center;
      display: flex;
      align-items: center;
      .swiper-button {
        width: 35px;
        height: 35px;
        flex-shrink: 0;
        padding: 10px;
        .sm-block({
          width: 25px;
          height: 25px;
          padding: 5px;
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
</style>
