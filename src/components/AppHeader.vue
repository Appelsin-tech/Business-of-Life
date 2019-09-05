<template>
  <header class="s-header" :class="[{active : showMenu},{'border-class': borderClass}]">
    <div class="container">
      <div class="wrapper-relative">
        <img class="logo" src="../assets/img/logo.png" alt="Business of Life">
        <div class="icon-wrapper icon-wrapper--desktop">
          <a href="#" class="icon-red icon-red--desktop" @click.prevent="goRouter('calendar')">
            <img svg-inline src="../assets/img/icon/calendar.svg" alt="">
            <span>Календарь</span>
          </a>
          <a href="#" class="icon-red icon-red--desktop" @click.prevent="goRouter('event/random-symbols')">
            <img svg-inline src="../assets/img/icon/info.svg" alt="">
            <span>Информация</span>
          </a>
          <a href="#" class="icon-red icon-red--desktop" @click.prevent="$modal.show('modal-access')">
            <span>Вход</span>
          </a>
          <a href="#" class="icon-red icon-red--desktop" @click.prevent="$modal.show('modal-ticket-success')">
            <span>Ticket Success</span>
          </a>
        </div>
        <button class="burger" @click="showMenu = !showMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="wrapper-menu-list">
        <ul class="menu-list">
          <li class="item">
            <a href="#" class="link" @click.prevent="goRouter('main')">Главная</a>
          </li>
          <li class="item">
            <a href="#" class="link" @click.prevent="goRouter('learning-stages')">Этапы обучения</a>
          </li>
          <li class="item">
            <a href="#" class="link" @click.prevent="goRouter('description')">Об академии</a>
          </li>
          <li class="item">
            <a href="#" class="link" @click.prevent="goRouter('our-coach')">Наши тренеры</a>
          </li>
          <li class="item">
            <a href="#" class="link" @click.prevent="goRouter('news')">Новости</a>
          </li>
          <li class="item">
            <a href="#" class="link" @click.prevent="goRouter('photo-gallery')">Фотогалерея</a>
          </li>
        </ul>
        <div class="icon-wrapper  icon-wrapper--mobile">
          <a href="#" class="icon-red icon-red--desktop" @click.prevent="goRouter('calendar')">
            <img svg-inline src="../assets/img/icon/calendar.svg" alt="">
            <span>Календарь</span>
          </a>
          <a href="#" class="icon-red icon-red--mobile" @click.prevent="goRouter('event')">
            <img svg-inline src="../assets/img/icon/info.svg" alt="">
            <span>Информация</span>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: ['borderClass'],
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    goRouter(rout) {
      this.showMenu = false
      this.$router.push({ path: `/${rout}` })
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .s-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding-top: 30px;
    z-index: 9;
    .lg-block({ padding-top: 20px; });
    &::after {
      content: '';
      display: block;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      opacity: 0;
      transform-origin: right top;
      transform: scale(0);
      transition: all 0.3s ease-in-out;
      z-index: 1;
    }
    &.border-class {
      padding-bottom: 30px;
      border-bottom: 1px solid @colorBorder;
    }
    &.active {
      bottom: 0;
      &::after {
        transform: scale(1);
        opacity: 1;
      }
      .container {
        .wrapper-menu-list {
          .menu-list {
            display: flex;
            z-index: 5;
            .item {
              animation: fadeItemMenu 0.15s ease-in-out forwards;
              animation-delay: 0.2s;
              &:nth-of-type(2) {
                animation-delay: 0.25s;
              }
              &:nth-of-type(3) {
                animation-delay: 0.30s;
              }
              &:nth-of-type(4) {
                animation-delay: 0.35s;
              }
              &:nth-of-type(5) {
                animation-delay: 0.40s;
              }
              &:nth-of-type(6) {
                animation-delay: 0.45s;
              }
              &:nth-of-type(7) {
                animation-delay: 0.50s;
              }
            }
          }
        }
        .icon-wrapper {
          &--mobile {
            .sm-block({ display: flex; });
            .icon-red {
              animation: fadeItemMenu 0.2s ease-in-out forwards;
              &:nth-of-type(1) {
                animation-delay: 0.55s;
              }
              &:nth-of-type(2) {
                animation-delay: 0.6s;
              }
            }
          }
        }
        .burger {
          z-index: 9;
          span {
            &:nth-child(1) {
              transform: rotate(45deg);
              top: 0px;
              left: 5px;
            }
            &:nth-child(2) {
              width: 0%;
              opacity: 0;
            }
            &:nth-child(3) {
              transform: rotate(-45deg);
              top: 22px;
              left: 5px;
            }
          }
        }
      }
    }
    .container {
      display: flex;
      flex-direction: column;
      .logo {
        .lg-block({ max-width: 110px; });
      }
      .wrapper-relative {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 10;
      }
      .wrapper-menu-list {
        display: flex;
        flex-direction: column;
        justify-self: center;
        transform: translateY(50%);
        z-index: 9;
        .lg-block({ transform: translateY(70%);});
        .sm-block({ transform: translateY(20%);});
        .menu-list {
          position: relative;
          display: none;
          flex-direction: column;
          align-items: center;
          .sm-block({ margin-bottom: 40px;});
          .item {
            margin-bottom: 25px;
            text-align: center;
            opacity: 0;
            transform: translateY(50px);
            .lg-block({ margin-bottom: 17px; });
            &:last-child {
              margin-bottom: 0;
            }
            .link {
              font-size: 3rem;
              font-weight: bold;
              color: @colorBlue;
              text-transform: uppercase;
              transition: 0.3s;
              .lg-block({ font-size: 2.4rem; });
              .xs-block({ font-size: 2rem;});
            }
          }
        }
      }
      .icon-wrapper {
        align-items: center;
        &--desktop {
          display: flex;
          margin-right: 80px;
          margin-left: auto;
          .lg-block({ margin-right: 50px; });
          .sm-block({ display: none;});
          .icon-red {
            &:first-child {
              margin-right: 80px;
              .lg-block({ margin-right: 50px; });
            }
          }
        }
        &--mobile {
          display: none;
          position: relative;
          flex-direction: column;
          justify-content: center;
          z-index: 9;
          .icon-red {
            transform: translateY(50px);
            opacity: 0;
            &:first-child {
              margin-bottom: 20px;
            }
          }
        }
        .icon-red {
          display: flex;
          align-items: center;
          &:hover {
            span {
              color: #666666;
              border-bottom-color: #666666;
            }
          }
          svg {
            margin-right: 20px;
            width: 35px;
            height: 35px;
            .lg-block({ width: 30px; height: 30px; });
            path {
              fill: @colorMainRed;
            }
          }
          span {
            font-size: 1.4rem;
            color: #000;
            border-bottom: 1px solid transparent;
            transition: 0.3s;
            .sm-block({ font-size: 2rem;});
          }
        }
      }
      .burger {
        position: relative;
        width: 32px;
        height: 25px;
        cursor: pointer;
        transform: rotate(0deg);
        .xs-block({ order: 2; });
        span {
          display: block;
          position: absolute;
          height: 3px;
          width: 100%;
          opacity: 1;
          left: 0;
          background-color: @colorBlue;
          transform: rotate(0deg);
          transform-origin: left center;
          transition: .25s ease-in-out;
          &:nth-child(1) {
            top: 0px;
          }
          &:nth-child(2) {
            top: 10px;
          }
          &:nth-child(3) {
            top: 20px;
          }
        }
      }

      @keyframes fadeItemMenu {
        0% {
          opacity: 0;
          transform: translateY(50px);
        }
        100% {
          opacity: 1;
          transform: translateY(0px);
        }
      }
    }
  }
</style>
