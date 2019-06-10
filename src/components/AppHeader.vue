<template>
  <header class="s-header" :class="{active : showMenu}">
    <div class="container">
      <div class="wrapper-relative">
        <img class="logo" src="../assets/img/logo.png" alt="Business of Life">
        <div class="icon-wrapper">
          <a href="#" class="icon--red">
            <img svg-inline src="../assets/img/icon/calendar.svg" alt="">
            <span>Календарь</span>
          </a>
          <a href="#" class="icon--red">
            <img svg-inline src="../assets/img/icon/info.svg" alt="">
            <span>Информация</span>
          </a>
          <button class="burger" @click="showMenu = !showMenu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
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
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
    goRouter (rout) {
      this.showMenu = !this.showMenu
      this.$router.push({ path: `${rout}` })
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .s-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding-top: 30px;
    z-index: 9;
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

    }
    .container {
      .wrapper-relative {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 10;
      }
      .icon-wrapper {
        display: flex;
        align-items: center;
        .icon--red {
          display: flex;
          align-items: center;
          margin-right: 80px;
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
            path {
              fill: @colorMainRed;
            }
          }
          span {
            font-size: 1.4rem;
            color: #000;
            border-bottom: 1px solid transparent;
            transition: 0.3s;
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
      .menu-list {
        position: absolute;
        display: none;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        flex-direction: column;
        align-items: center;
        .item {
          margin-bottom: 25px;
          text-align: center;
          opacity: 0;
          transform: translateY(50px);
          .sm-block({ margin-bottom: 17px; });
          &:last-child {
            margin-bottom: 0;
          }
          .link {
            font-size: 3rem;
            font-weight: bold;
            color: #000;
            text-transform: uppercase;
            transition: 0.3s;
            .sm-block({ font-size: 2.4rem; letter-spacing: 0.6rem; });
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
