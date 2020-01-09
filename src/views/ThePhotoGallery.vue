<template>
  <section class="p-photo-gallery p-default">
    <div class="container page">
      <div class="row-caption">
        <div class="content">
          <span class="desc-light">Фотографии</span>
          <h1 class="g-caption">Фотогалерея</h1>
          <p class="desc desc--bold">Фото-отчеты с прошедших мероприятий</p>
        </div>
      </div>
      <div class="row-slider">
        <div class="slider-wrapper">
          <button class="swiper-button swiper-button--prev"><span></span></button>
          <swiper :options="swiperOption" ref="mainSwiper">
            <swiper-slide>
              <div class="item-swiper">
                <div class="img-wrapper">
                  <img src="../assets/img/photogallery/buhtiyarov.jpg" alt="Александр Бухтияров">
                </div>
                <div class="text-wrapper">
                  <h3 class="caption-steps">Семинар александра
                    бухтиярова 12 сентября 2019</h3>
                  <p class="description">У нас работают только профессиональные тренеры с многолетним опытом в своей сфере</p>
                  <a href="#" class="link-photo">
                    <img svg-inline src="../assets/img/icon/picture.svg" alt="">
                    <span>24 фотографии</span>
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
  name: 'ThePhotoGallery',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 1,
        speed: 300,
        slideClass: 'slide-gallery',
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button--next',
          prevEl: '.swiper-button--prev'
        },
        breakpoints: {
          // when window width is <= 320px
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

  .p-photo-gallery {
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
        .xs-block({ margin-bottom: 30px; padding: 0 20px;});
        .item-swiper {
          position: relative;
          display: flex;
          align-items: center;
          height: 380px;
          flex-grow: 1;
          box-sizing: border-box;
          transition: 0.3s;
          background-position: center bottom;
          background-repeat: no-repeat;
          background-size: contain;
          .sm-block({ flex-direction: column; align-items: flex-start;});
          .xs-block({ padding: 20px;});
          .img-wrapper {
            max-width: 50%;
            margin-right: 60px;
            .md-block({ margin-right: 35px; max-width: 40%;});
            .sm-block({ margin-right: 0; max-width: 100%; margin-bottom: 20px; max-height: 150px; height: 100%;});
            img {
              max-height: 100%;
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
              max-height: 105px;
              margin-bottom: 15px;
              font-weight: 800;
              font-size: 2.2rem;
              color: @colorMainSecondary;
              text-transform: uppercase;
              transition: 0.3s;
              z-index: 10;
              overflow: hidden;
              .lg-block({ margin-bottom: 15px; font-size: 2rem;});
              .sm-block({max-height: 60px;});
            }
            .description {
              max-height: 126px;
              margin-bottom: 40px;
              font-size: 1.4rem;
              color: #666666;
              transition: 0.3s;
              box-sizing: border-box;
              overflow: hidden;
              .md-block({max-height: 120px;});
              .sm-block({ margin-bottom: 25px; max-height: 70px;});
              .xs-block({ margin-bottom: 20px; max-height: 45px;});
            }
            .link-photo {
              display: flex;
              align-items: center;
              color: #666666;
              &:active,
              &:visited {
                color: #666666;
              }
              svg {
                width: 25px;
                height: 25px;
                margin-right: 15px;
                path {
                  fill: @colorMain;
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
