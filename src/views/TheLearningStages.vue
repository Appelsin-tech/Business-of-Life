<template>
  <section class="p-learning p-default-flex">
    <div class="container page">
      <div class="row-caption">
        <div class="content">
          <span class="desc-light">Необходимые знания</span>
          <h1 class="g-caption">Этапы обучения</h1>
          <p class=" desc desc--bold">Для того, чтобы вы, начав с нуля, стали зарабатывать в
            бизнесе МЛМ ежемесячно 1000 долларов и более – вам
            необходимо пройти три этапа</p>
        </div>
      </div>
      <div class="row-slider">
        <swiper :options="swiperOption" ref="mainSwiper">
          <swiper-slide>
            <div class="item-swiper">
              <div class="text-wrapper">
                <span class="number">Этап 1</span>
                <h3 class="caption-steps">Новичок</h3>
                <p class="desc-steps">Скрытый текст</p>
              </div>
              <a class="circle-btn" href="#">
                <img svg-inline src="../assets/img/icon/right-arrow.svg" alt="">
              </a>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="item-swiper">
              <div class="text-wrapper">
                <span class="number">Этап 2</span>
                <h3 class="caption-steps">Начинающий руководитель</h3>
                <p class="desc-steps">Скрытый текст</p>
              </div>
              <a class="circle-btn" href="#">
                <img svg-inline src="../assets/img/icon/right-arrow.svg" alt="">
              </a>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="item-swiper">
              <div class="text-wrapper">
                <span class="number">Этап 3</span>
                <h3 class="caption-steps">Начинающий лидер</h3>
                <p class="desc-steps">Если вы создали создали структуру из
                  50-70 человек</p>
              </div>
              <a class="circle-btn" href="#">
                <img svg-inline src="../assets/img/icon/right-arrow.svg" alt="">
              </a>
            </div>
          </swiper-slide>
        </swiper>
        <div class="main-swiper-pagination"></div>
      </div>
    </div>
  </section>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'TheLearningStages',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 3,
        speed: 300,
        allowTouchMove: false,
        // pagination: {
        //   el: '.main-swiper-pagination',
        //   clickable: true
        // },
        breakpoints: {
          // when window width is <= 320px
          1170: {
            slidesPerView: 2
          },
          750: {
            slidesPerView: 1,
            preventInteractionOnTransition: false,
            allowTouchMove: true
          }
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiperServices.swiper
    }
  }
}
</script>

<style scoped lang="less">
  @import '~swiper/dist/css/swiper.css';
  @import "../assets/less/_importants";

  .p-learning {
    background: url("../assets/img/bg-steps-learning.jpg") no-repeat center / cover;
    .row-caption {
      position: relative;
      padding-top: 90px;
      padding-left: 90px;
      margin-bottom: 90px;
      .decor-cube(300px, 300px);
      .lg-block({ padding-top: 60px; padding-left: 60px; margin-bottom: 60px; .decor-cube(260px, 260px);});
      .sm-block({ margin-bottom: 110px;});
      .xs-block({ padding-left:0; padding-top: 0; margin-bottom: 50px; .decor-cube(@display: none;);});
      .content {
        display: flex;
        flex-direction: column;
        .desc-light {
          font-size: 1.4rem;
          color: #666666;
          margin-bottom: 10px;
        }
        .desc {
          &--bold {
            max-width: 570px;
            font-weight: 800;
            font-size: 1.8rem;
            line-height: 2.5rem;
            .sm-block({ font-weight: 600; line-height: 2.2rem; font-size: 1.6rem;})
          }
        }
      }
    }
    .row-slider {
      .item-swiper {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 360px;
        padding: 50px;
        box-sizing: border-box;
        transition: 0.3s;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        .lg-block({ height: 320px;});
        .sm-block({ height: 260px; padding: 30px;});
        .sm-block({ height: 220px; padding: 20px;});
        &::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          opacity: 0;
          transition: 0.3s;
          background: url("../assets/img/bg-steps-item-1.jpg") no-repeat center / cover;
          z-index: 1;
        }
        &::after {
          position: absolute;
          content: '';
          width: 1px;
          right: -1px;
          height: 70%;
          background: #eaeaea;
        }
        &:hover {
          &::before {
            opacity: 1;
          }
          .text-wrapper {
            .number,
            .desc-steps {
              color: #fff;
            }
            .caption-steps {
              color: #fff;
              text-decoration: underline;
            }
          }
          .circle-btn {
            transform: rotate(90deg);
            background: #fff;
            border-color: #fff;
          }
        }
        .text-wrapper {
          position: relative;
          margin-bottom: auto;
          z-index: 5;
          .number {
            display: inline-block;
            margin-bottom: 10px;
            font-size: 1.4rem;
            color: #666666;
            transition: 0.3s;
          }
          .caption-steps {
            max-width: 200px;
            margin-bottom: 20px;
            font-weight: 800;
            font-size: 2.2rem;
            color: @colorMainSecondary;
            text-transform: uppercase;
            transition: 0.3s;
            .lg-block({ margin-bottom: 15px; font-size: 2rem;});
          }
          .desc {
            margin-top: 20px;
            font-weight: 300;
            font-size: 1.7rem;
            letter-spacing: 0.14rem;
            opacity: 0;
            height: 0px;
            transition: 0.3s;
            .sm-block({ margin-top: 15px; opacity: 1; height: 50px; });
          }
        }
        .circle-btn {
          position: relative;
          display: inline-flex;
          flex-shrink: 0;
          width: 65px;
          height: 65px;
          justify-content: center;
          align-items: center;
          border: 1px solid @colorMain;
          border-radius: 50%;
          transition: 0.3s;
          z-index: 5;
          .lg-block({ width: 50px; height: 50px;});
          .sm-block({ display: none; });
          svg {
            width: 20px;
            height: 15px;
            transition: 0.3s;
            .lg-block({ width: 20px; height: 20px; });
            path {
              stroke: @colorMain;
            }
          }
        }
      }
    }
    .main-swiper-pagination {
      position: absolute;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
