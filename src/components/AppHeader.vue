<template>
  <header class="s-header" :class="[$route.name === 'pricing' && !showMenu ? 'white' : '', {active : showMenu, 'border-class': !borderClass}]">
    <div class="container">
      <div class="wrapper-relative">
        <a class="logo-link" href="#" @click.prevent="goRouter('main')">
          <img svg-inline class="logo" src="../assets/img/logo.svg" alt="Business of Life">
        </a>
        <div class="icon-wrapper icon-wrapper--desktop" >
          <a href="#" class="icon-red icon-red--desktop" @click.prevent="goRouter('calendar')">
            <img svg-inline src="../assets/img/icon/calendar.svg" alt="">
            <span>Календарь</span>
          </a>
          <div href="#" class="icon-red icon-red--desktop user user-desktop"  v-if="logged">
            <img svg-inline src="../assets/img/icon/avatar.svg" alt="">
            <div class="link">
              <span class="lk" @click="goRouter('admin')">{{profile.login}}</span>
              <a class="exit" href="#" @click.prevent="$store.dispatch('user/logout')">Выйти</a>
            </div>
          </div>
          <a href="#" class="icon-red icon-red--desktop" @click.prevent="goRouter('auth')" v-else>
            <img svg-inline src="../assets/img/icon/avatar.svg" alt="">
            <span>Войти</span>
          </a>
          <!--<a href="#" class="icon-red icon-red&#45;&#45;desktop" @click.prevent="goRouter('event/random-symbols')">-->
            <!--<img svg-inline src="../assets/img/icon/info.svg" alt="">-->
            <!--<span>Информация</span>-->
          <!--</a>-->
        </div>
        <button class="burger" @click="showMenuMethod">
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
            <a href="#" class="link" @click.prevent="goRouter('description')">О нас</a>
          </li>
          <li class="item">
            <a href="#" class="link" @click.prevent="goRouter('calendar')">Календарь событий</a>
          </li>
          <li class="item">
            <a href="#" class="link" @click.prevent="goRouter('admin')" v-if="logged">Личный кабинет</a>
          </li>
        </ul>
        <div class="icon-wrapper icon-wrapper--mobile">
          <div href="#" class="icon-red icon-red--desktop user user-mobile" @click="activeClass" v-if="logged">
            <img svg-inline src="../assets/img/icon/avatar.svg" alt="">
            <div class="link">
              <span class="lk">{{profile.login}}</span>
              <a class="exit" :class="{active : showLogout}" href="#" @click.prevent="$store.dispatch('user/logout')">Выйти</a>
            </div>
          </div>
          <a href="#" class="icon-red icon-red--desktop" @click.prevent="goRouter('auth')" v-else>
            <img svg-inline src="../assets/img/icon/avatar.svg" alt="">
            <span>Войти</span>
          </a>
        </div>

        <!--<div class="icon-wrapper  icon-wrapper&#45;&#45;mobile">-->
          <!--<a href="#" class="icon-red icon-red&#45;&#45;desktop" @click.prevent="goRouter('calendar')">-->
            <!--<img svg-inline src="../assets/img/icon/calendar.svg" alt="">-->
            <!--<span>Календарь</span>-->
          <!--</a>-->
          <!--<a href="#" class="icon-red icon-red&#45;&#45;mobile" @click.prevent="goRouter('event')">-->
            <!--<img svg-inline src="../assets/img/icon/info.svg" alt="">-->
            <!--<span>Информация</span>-->
          <!--</a>-->
        <!--</div>-->
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'AppHeader',
  data() {
    return {
      showMenu: false,
      showLogout: false
    }
  },
  methods: {
    goRouter(rout) {
      this.showMenu = false
      this.$router.push({ path: `/${rout}` })
    },
    activeClass () {
      this.showLogout = !this.showLogout
    },
    showMenuMethod() {
      this.showMenu = !this.showMenu
    }
  },
  computed: {
    borderClass () {
      let rout = false
      switch (this.$route.name) {
        case 'main':
          rout = true
          break
        case 'description':
          rout = true
          break
        case 'calendar':
          rout = true
          break
        case 'pricing':
          rout = true
          break
        case 'auth':
          rout = true
          break
        case 'registration':
          rout = true
          break
        case 'registration-referal':
          rout = true
          break
      }
      return rout
    },
    ...mapState('user', [
      'profile'
    ]),
    ...mapGetters('user', [
      'logged'
    ]),
  },
  watch: {
    showMenu(newVal, oldVal) {
      if(newVal) {
        document.body.classList.add('menu-open')
      } else {
        document.body.classList.remove('menu-open')
      }
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
    padding-top: 20px;
    z-index: 991;
    .lg-block({ padding-top: 15px; });
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
      padding-bottom: 20px;
      border-bottom: 1px solid @colorBorder;
      .lg-block({ padding-bottom: 15px; });
    }
    &.white {
      .container {
        .logo {
          * {
            fill: #fff;
          }
        }
        .icon-wrapper {
          .icon-red--desktop {
            &:hover {
              span {
                color: #fff;
                border-bottom-color: #fff;
              }
            }
            span {
              color: #fff;
            }
            svg {
              * {
                fill: #fff;
              }
            }
            &.user {
              &::after {
                border-top-color: #fff;
              }
              .exit {
                color: #fff;
              }
            }
          }
        }
        .burger {
          span {
            background: #fff;
          }
        }
      }
    }
    &.active {
      position: fixed;
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
        width: 100%;
        max-width: 135px;
        outline: none;
        .lg-block({ max-width: 105px; });
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
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        flex-direction: column;
        justify-self: center;
        z-index: 9;
        .menu-list {
          position: relative;
          display: none;
          flex-direction: column;
          align-items: center;
          .sm-block({ margin-bottom: 40px; });
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
              font-size: 2.8rem;
              font-weight: bold;
              color: @colorBlue;
              text-transform: uppercase;
              transition: 0.3s;
              .lg-block({ font-size: 2.4rem; });
              .xs-block({ font-size: 2rem; });
            }
          }
        }
      }
      .icon-wrapper {
        align-items: center;
        &--desktop {
          display: flex;
          margin-right: 75px;
          margin-left: auto;
          .lg-block({ margin-right: 50px; });
          .sm-block({ display: none; });
          .icon-red {
            margin-right: 50px;
            .lg-block({ margin-right: 30px; });
            &:last-child {
              margin-right: 0;
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
          position: relative;
          &:hover {
            span {
              color: #666666;
              border-bottom-color: #666666;
            }
          }
          svg {
            margin-right: 17px;
            width: 30px;
            height: 30px;
            .lg-block({ width: 25px; height: 25px; });
            path {
              fill: @colorMainRed;
            }
          }
          span {
            font-size: 1.4rem;
            color: #000;
            border-bottom: 1px solid transparent;
            transition: 0.3s;
            .sm-block({ font-size: 2rem; });
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
    .icon-red {
      display: flex;
      align-items: center;
      position: relative;
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
        .sm-block({ font-size: 2rem; });
      }
      &.user {
        padding-right: 25px;
        cursor: pointer;
        &:hover {
          span {
            color: #000;
            border-bottom-color: transparent;
          }
          .link {
            .exit {
              opacity: 1;
              pointer-events: auto;
            }
          }
          &::after {
            transform: rotate(180deg);
          }
        }
        &.active {
          .exit {
            opacity: 1;
            pointer-events: auto;
          }
          &::after {
            transform: rotate(180deg);
          }
        }
        &-desktop {
          .sm-block({ display: none;});
        }
        &-mobile {
          display: none;
          .sm-block({ display: block;});
        }
        .link {
          position: relative;
          text-align: right;
          .exit {
            position: absolute;
            pointer-events: none;
            opacity: 0;
            bottom: -37px;
            right: 0;
            color: #000;
            padding-top: 20px;
            transition: 0.3s;
            &.active {
              opacity: 1;
              pointer-events: auto;
            }
          }
        }
        &::after {
          position: absolute;
          content: '';
          right: 0;
          top: 12px;
          border-top: 8px solid  @colorBlue;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          transition: 0.3s;
          .lg-block({ top: 10px;})
        }

      }
    }
  }
</style>
