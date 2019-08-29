<template>
  <section class="p-news p-default">
    <div class="container page">
      <div class="row-caption">
        <div class="content">
          <span class="desc-light">Новости академии</span>
          <h1 class="g-caption">Новости</h1>
          <p class="desc desc--bold">Последние события нашего портала</p>
        </div>
      </div>
      <div class="row-slider">
        <div class="slider-wrapper">
          <button class="swiper-button swiper-button--prev"><span></span></button>
          <swiper :options="swiperOption" ref="mainSwiper">
            <swiper-slide>
              <div class="item-swiper">
                <div class="text-wrapper">
                  <p class="date">01.02.2033</p>
                  <h3 class="caption-steps">Роза Жаманкулова.
                    интервью lenta.ru</h3>
                  <p class="description">У нас работают только профессиональные тренеры с многолетним опытом в своей сфере</p>
                  <div class="wrapper-btn">
                    <a class="circle-btn" href="#">
                      <img svg-inline src="../assets/img/icon/arrow-slider-items.svg" alt="">
                    </a>
                  </div>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="item-swiper ">
                <div class="text-wrapper">
                  <p class="date">01.02.2033</p>
                  <h3 class="caption-steps">Изменилось расписание на октябрь</h3>
                  <p class="description">У нас работают только профессиональные тренеры с многолетним опытом в своей сфере</p>
                  <div class="wrapper-btn">
                    <a class="circle-btn" href="#">
                      <img svg-inline src="../assets/img/icon/arrow-slider-items.svg" alt="">
                    </a>
                  </div>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="item-swiper">
                <div class="text-wrapper">
                  <p class="date">01.02.2033</p>
                  <h3 class="caption-steps">Новый семинар 11 октября</h3>
                  <p class="description">У нас работают только профессиональные тренеры с многолетним опытом в своей сфере</p>
                  <div class="wrapper-btn">
                    <a class="circle-btn" href="#">
                      <img svg-inline src="../assets/img/icon/arrow-slider-items.svg" alt="">
                    </a>
                  </div>
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
  name: 'TheNews',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 3,
        speed: 300,
        slideClass: 'slide-news',
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button--next',
          prevEl: '.swiper-button--prev',
          disabledClass: 'swiper-button-disabled'
        },
        breakpoints: {
          // when window width is <= 320px
          990: {
            slidesPerView: 2
          },
          540: {
            slidesPerView: 1
          }
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiperServices.swiper
    }
  },
  methods: {
    getImgUrl(src) {
      const image = require(`../assets/img/news-${src}.jpg`)
      console.dir(image)
      return image
    }
  }
}
</script>

<style scoped lang="less">
  @import '~swiper/dist/css/swiper.css';
  @import "../assets/less/_importants";

  .p-news {
    background: url("../assets/img/bg-coach.jpg") no-repeat center / cover;
    .row-caption {
      position: relative;
      padding-top: 90px;
      padding-left: 90px;
      margin-bottom: 80px;
      .decor-cube(300px, 300px);
      .lg-block({ padding-top: 60px; padding-left: 60px; margin-bottom: 100px; .decor-cube(260px, 260px);});
      .sm-block({ margin-bottom: 110px; .decor-cube(220px, 220px);});
      .xs-block({ padding-left:0; padding-top: 0; margin-bottom: 25px; .decor-cube(@display: none;);});
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
      .slider-wrapper {
        position: relative;
        max-width: 1300px;
        width: 100%;
        padding: 0 100px;
        box-sizing: border-box;
        .lg-block({ padding: 0 70px;});
        .sm-block({ padding: 0 40px;});
        .xs-block({ margin-bottom: 30px;});
        .item-swiper {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          height: 380px;
          flex-grow: 1;
          padding: 30px;
          box-sizing: border-box;
          transition: 0.3s;
          background-position: center bottom;
          background-repeat: no-repeat;
          background-size: contain;
          background-color: #57412d;
          .lg-block({ height: 320px;});
          .sm-block({ height: 280px;});
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
            background: @colorMainRed;
            z-index: 1;
          }
          &:hover {
            &::before {
              opacity: 0.8;
            }
            .text-wrapper {
              .description {
                height: 60px;
                opacity: 1;
              }
              .caption-steps {
                text-decoration: underline;
                background-image: linear-gradient(to left, #fff, #fff);
              }
              .wrapper-btn {
                overflow: hidden;
                height: 95px;
                .lg-block({ height: 60px;});
                .circle-btn {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            }
          }
          .text-wrapper {
            position: relative;
            z-index: 5;
            .date {
              margin-bottom: 8px;
              font-size: 1.2rem;
              color: #fff;
              transition: 0.3s;
            }
            .caption-steps {
              padding-bottom: 15px;
              margin-bottom: 10px;
              font-weight: 800;
              font-size: 2.2rem;
              color: #fff;
              text-transform: uppercase;
              transition: 0.3s;
              z-index: 10;
              background-image: linear-gradient(to left, @colorMainRed, @colorMainRed);
              background-position: left bottom;
              background-size: 30px 2px;
              background-repeat: no-repeat;
              .lg-block({ margin-bottom: 15px; font-size: 2rem;});
            }
            .description {
              font-size: 1.2rem;
              color: #fff;
              height: 0;
              opacity: 0;
              transition: 0.3s;
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
        .swiper-button {
          position: absolute;
          width: 22px;
          height: 22px;
          top: calc(~"50% - 11px");
          cursor: pointer;
          &.swiper-button-disabled {
            opacity: 0.5;
          }
          &--prev {
            left: 20px;
            .sm-block({ left: 4px;});
            span {
              border-bottom: 4px solid @colorBlue;
              border-left: 4px solid @colorBlue;
            }
          }
          &--next {
            right: 20px;
            .sm-block({ right: 4px;});
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
      }
    }
    .main-swiper-pagination {
      position: absolute;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
    }
    .swiper-container {
      .slide-news {
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
