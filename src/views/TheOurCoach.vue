<template>
  <section class="p-our-coach p-default-flex">
    <div class="container page">
      <div class="row-caption">
        <div class="content">
          <span class="desc-light">Тренеры академии</span>
          <h1 class="g-caption">Наши тренеры</h1>
          <p class="desc desc--bold">У нас работают только высококвалифицированные
            и профессиональные тренеры с многолетним опытом
            в своей сфере</p>
        </div>
      </div>
      <div class="row-slider">
        <div class="slider-wrapper">
          <button class="swiper-button swiper-button--prev"><span></span></button>
          <swiper :options="swiperOption" ref="mainSwiperCoach">
            <swiper-slide>
              <div class="item-swiper item-coach-1">
                <h3 class="caption-steps">Александр <br> Бахтияров</h3>
                <div class="wrapper-btn">
                  <a class="circle-btn" href="#">
                    <img svg-inline src="../assets/img/icon/right-arrow.svg" alt="">
                  </a>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="item-swiper item-coach-2">
                <h3 class="caption-steps">Ерлан <br> Думанулы</h3>
                <div class="wrapper-btn">
                  <a class="circle-btn" href="#">
                    <img svg-inline src="../assets/img/icon/right-arrow.svg" alt="">
                  </a>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="item-swiper item-coach-3">
                <h3 class="caption-steps">Темиржан</h3>
                <div class="wrapper-btn">
                  <a class="circle-btn" href="#">
                    <img svg-inline src="../assets/img/icon/right-arrow.svg" alt="">
                  </a>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <button class="swiper-button swiper-button--next"><span></span></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'TheOurCoach',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 3,
        speed: 300,
        slideClass: 'slide-coach',
        slideActiveClass: 'active-slide-coach',
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button--next',
          prevEl: '.swiper-button--prev'
        },
        breakpoints: {
          // when window width is <= 320px
          1400: {
            slidesPerView: 3
          },
          900: {
            slidesPerView: 2
          },
          500: {
            slidesPerView: 1
          },
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mainSwiperCoach.swiper
    }
  }
}
</script>

<style scoped lang="less">
  @import '~swiper/dist/css/swiper.css';
  @import "../assets/less/_importants";

  .p-our-coach {
    background: url("../assets/img/bg-coach.jpg") no-repeat center / cover;
    .row-caption {
      position: relative;
      padding-top: 90px;
      padding-left: 90px;
      margin-bottom: 80px;
      .decor-cube(300px, 300px);
      .lg-block({ padding-top: 60px; padding-left: 60px; margin-bottom: 60px; .decor-cube(260px, 260px);});
      .sm-block({ margin-bottom: 110px;});
      .xs-block({ padding-left:0; padding-top: 0; margin-bottom: 25px; .decor-cube(@display: none;);});
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
      display: flex;
      justify-content: flex-end;
      width: 100%;
      .xs-block({ margin-bottom: 30px;});
      .slider-wrapper {
        position: relative;
        max-width: 1300px;
        width: 100%;
        padding: 0 100px;
        box-sizing: border-box;
        .lg-block({ padding: 0 70px;});
        .sm-block({ padding: 0 40px;});
        .item-swiper {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          height: 380px;
          max-width: 300px;
          flex-grow: 1;
          padding: 40px;
          box-sizing: border-box;
          transition: 0.3s;
          background-position: center bottom;
          background-repeat: no-repeat;
          background-size: contain;
          .lg-block({ height: 320px;});
          .sm-block({ height: 320px; max-width: 235px; padding: 30px;});
          .xs-block({ padding: 20px;});
          &::before {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            opacity: 0;
            transition: 0.3s;
            background: @colorMain;
            z-index: 1;
          }
          &:hover {
            &::before {
              opacity: 0.8;
            }
            .caption-steps {
              text-decoration: underline;
            }
            .wrapper-btn {
              overflow: hidden;
              height: 95px;
              .circle-btn {
                opacity: 1;
                transform: translateY(0);
              }
            }
          }
          &.item-coach-1 {
            background-image: url("../assets/img/coach-1.jpg");
          }
          &.item-coach-2 {
            background-image: url("../assets/img/coach-2.jpg");
          }
          .caption-steps {
            position: relative;
            max-width: 200px;
            font-weight: 800;
            font-size: 2.2rem;
            color: #fff;
            text-transform: uppercase;
            transition: 0.3s;
            z-index: 10;
            .lg-block({ margin-bottom: 15px; font-size: 2rem;});
          }
          .wrapper-btn {
            display: flex;
            align-items: flex-end;
            height: 0;
            flex-shrink: 0;
            overflow: hidden;
            transition: 0.3s;
            .sm-block({ display: none;});
            .circle-btn {
              position: relative;
              display: inline-flex;
              width: 65px;
              height: 65px;
              justify-content: center;
              align-items: center;
              border: 1px solid #fff;
              border-radius: 50%;
              transition: 0.3s;
              z-index: 5;
              opacity: 0;
              transform: translateY(65px);
              box-sizing: border-box;
              .lg-block({ width: 50px; height: 50px;});
              svg {
                width: 20px;
                height: 15px;
                transition: 0.3s;
                .lg-block({ width: 20px; height: 20px; });
                path {
                  stroke: #fff;
                }
              }
            }
          }
        }
      }
    }
    .swiper-button {
      position: absolute;
      width: 22px;
      height: 22px;
      top: calc(~"50% - 11px");
      &.swiper-button-disabled {
        opacity: 0.5;
      }
      &--prev {
        left: 20px;
        .sm-block({ left: 4px;});
        span {
          border-bottom: 4px solid @colorMainSecondary;
          border-left: 4px solid @colorMainSecondary;
        }
      }
      &--next {
        right: 20px;
        .sm-block({ right: 4px;});
        span {
          border-top: 4px solid @colorMainSecondary;
          border-right: 4px solid @colorMainSecondary;
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
    .swiper-container {
      .slide-coach {
        display: flex;
        flex-shrink: 0;
        .to(540px, { justify-content: center;})
      }
    }
    .swiper-pagination {
      display: none;
      bottom: -20px;
      left: 20px;
      right: 20px;
      height: 3px;
      .to(540px, { display: block;});
    }
  }
</style>
