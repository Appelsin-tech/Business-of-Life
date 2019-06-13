<template>
  <header class="s-header" :class="{active : showMenu}">
    <div class="container">
      <div class="wrapper-relative">
        <img class="logo" src="../assets/img/logo.png" alt="Business of Life">
        <div class="icon-wrapper icon-wrapper--desktop">
          <a href="#" class="icon-red icon-red--desktop">
            <img svg-inline src="../assets/img/icon/calendar.svg" alt="">
            <span>Календарь</span>
          </a>
          <a href="#" class="icon-red icon-red--desktop">
            <img svg-inline src="../assets/img/icon/info.svg" alt="">
            <span>Информация</span>
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
        </ul>
        <div class="icon-wrapper  icon-wrapper--mobile">
          <a href="#" class="icon-red icon-red--desktop">
            <img svg-inline src="../assets/img/icon/calendar.svg" alt="">
            <span>Календарь</span>
          </a>
          <a href="#" class="icon-red icon-red--mobile">
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
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    goRouter(rout) {
      this.showMenu = !this.showMenu
      this.$router.push({ path: `${rout}` })
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
    &.active {
      bottom: 0;
      &::after {
        transform: scale(1);
        opacity: 1;
      }
      .burger {
        z-index: 9;
        span {
          &:nth-child(1) {
            transform: rotate(45deg);
            transform-origin: 2px 6px;
          }
          &:nth-child(2) {
            opacity: 0;
          }
          &:nth-child(3) {
            transform: rotate(-45deg);
            transform-origin: 3px -3px;
          }
        }
      }
      .container {
        .wrapper-menu-list {
          .menu-list {
            display: flex;
            z-index: 5;
            .item {
              animation: fadeItemMenu 0.2s ease-in-out forwards;
              animation-delay: 0.2s;
              &:nth-of-type(2) {
                animation-delay: 0.3s;
              }
              &:nth-of-type(3) {
                animation-delay: 0.4s;
              }
              &:nth-of-type(4) {
                animation-delay: 0.5s;
              }
              &:nth-of-type(5) {
                animation-delay: 0.6s;
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
                animation-delay: 0.7s;
              }
              &:nth-of-type(2) {
                animation-delay: 0.8s;
              }
            }
          }
        }
      }
    }
    .container {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
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
        margin-top: 15%;
        .lg-block({ margin-top: 20%;});
        .sm-block({ margin-top: 50px;});
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
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        cursor: pointer;
        .xs-block({ order: 2; });
        span {
          display: block;
          height: 3px;
          width: 32px;
          background-color: @colorBlue;
          transition: all 0.2s ease 0.1s;
          &:not(:last-child) {
            margin-bottom: 8px;
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
