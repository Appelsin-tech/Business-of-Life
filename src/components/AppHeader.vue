<template>
  <header class="s-header" :class="[($route.name === 'knowledge-package' || $route.name === 'marathon') && !showMenu ? 'white' : '', {active : showMenu, 'border-class': !borderClass}, layout]">
    <div class="container">
      <div class="wrapper-relative">
        <router-link class="logo-link" to="/" @click.native="showMenu = false">
          <img svg-inline class="logo" src="../assets/img/logo.svg" alt="Business of Life">
        </router-link>
        <div class="icon-wrapper icon-wrapper--desktop" >
          <div href="#" class="icon-red icon-red--desktop user user-desktop"  v-if="logged">
            <icon-account class="g-icon"/>
            <div class="link">
              <span class="lk text" @click="goRouter('office')">{{profile.login}}</span>
              <a class="exit" href="#" @click.prevent="$store.dispatch('user/logout')">Выйти</a>
            </div>
          </div>
          <router-link class="icon-red icon-red--desktop" to="/auth" @click.native="showMenu = false" v-else>
            <icon-account class="g-icon"/>
            <span class="text">Войти</span>
          </router-link>
        </div>
        <button class="burger" @click="showMenuMethod">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="wrapper-menu-list">
        <ul class="menu-list" v-if="logged">
          <li class="item" v-for="item in menuListFilterUserLogged" :key="item.to">
            <router-link class="link" :to="item.to" @click.native="showMenu = false">{{item.title}}</router-link>
          </li>
          <li class="item">
            <router-link class="link" to="/office" @click="showMenu = false">Личный кабинет</router-link>
          </li>
        </ul>
        <ul class="menu-list" v-else>
          <li class="item" v-for="item in menuListDefault" :key="item.to">
            <router-link class="link" :to="item.to" @click.native="showMenu = false">{{item.title}}</router-link>
          </li>
        </ul>
        <div class="icon-wrapper icon-wrapper--mobile">
          <div class="icon-red icon-red--desktop user user-mobile" @click="activeClass" v-if="logged">
            <icon-account class="g-icon"/>
            <div class="link">
              <span class="lk text">{{profile.login}}</span>
              <a class="exit" :class="{active : showLogout}" href="#" @click.prevent="$store.dispatch('user/logout')">Выйти</a>
            </div>
          </div>
          <router-link class="icon-red icon-red--desktop" to="/auth" @click.native="showMenu = false" v-else>
            <icon-account class="g-icon"/>
            <span class="text">Войти</span>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import appMenuList from '@/mixins/appMenuList'

export default {
  name: 'AppHeader',
  props: {
    layout: {
      default: 'default'
    }
  },
  mixins: [appMenuList],
  data() {
    return {
      showMenu: false,
      showLogout: false,
      menuListDefault: [
        {
          to: '/',
          title: 'Главная'
        },
        {
          to: '/knowledge-package',
          title: 'База знаний'
        },
        {
          to: '/calendar',
          title: 'Календарь событий'
        },
        {
          to: '/news',
          title: 'Новости'
        },
        {
          to: '/coronanamillion',
          title: 'Корона на миллион'
        }
      ]
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
        case 'main-r':
          rout = true
          break
        case 'description':
          rout = true
          break
        case 'calendar':
          rout = true
          break
        case 'knowledge-package':
          rout = true
          break
        case 'registration-referal':
          rout = true
          break
        case 'marathon':
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
    display: flex;
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
      border-bottom: 1px solid var(--app_element-border__color);
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
              .text {
                color: #fff;
                border-bottom-color: #fff;
              }
            }
            .text {
              color: #fff;
            }
            .g-icon {
              color: #fff;
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
          overflow: auto;
          .menu-list {
            display: flex;
            z-index: 5;
            padding: 20px 0;
            .item {
              animation: fadeItemMenu 0.15s ease-in-out forwards;
              animation-delay: 0.2s;
            }
          }
        }
        .icon-wrapper {
          &--mobile {
            .sm-block({ display: flex; });
            .icon-red {
              animation: fadeItemMenu 0.2s ease-in-out forwards;
              &:nth-of-type(1) {
                animation-delay: 0.2s;
              }
              &:nth-of-type(2) {
                animation-delay: 0.2s;
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
      flex-grow: 1;
      .logo {
        width: 100%;
        max-width: 120px;
        outline: none;
        .xl-block({ max-width: 105px; });
        path {
          fill: @colorMainSecondary;
        }
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
        justify-content: center;
        flex-grow: 1;
        z-index: 9;
        @media (max-height: 990px) {
          justify-content: flex-start;
        }
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
            .xs-block({
              margin-bottom: 10px;});
            &:last-child {
              margin-bottom: 0;
            }
            .link {
              font-size: 2.8rem;
              font-weight: bold;
              color: var(--app_emphasis__color);
              text-transform: uppercase;
              transition: 0.3s;
              .lg-block({ font-size: 2.4rem; });
              .xs-block({ font-size: 1.6rem; });
            }
          }
        }
      }
      .icon-wrapper {
        align-items: center;
        &--desktop {
          display: flex;
          margin-left: auto;
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
            .text {
              color: var(--app_font__color);
              border-bottom-color: var(--app_font__color);
            }
          }
         .g-icon {
            margin-right: 17px;
            width: 30px;
            height: 30px;
            .lg-block({ width: 25px; height: 25px; });
          }
          .text {
            font-size: 1.4rem;
            color: var(--app_font__color);
            border-bottom: 1px solid transparent;
            transition: 0.3s;
            .sm-block({ font-size: 2rem; });
          }
        }
      }
      .burger {
        position: relative;
        margin-left: 75px;
        width: 32px;
        height: 25px;
        cursor: pointer;
        transform: rotate(0deg);
        .lg-block({ margin-left: 50px; });
        .xs-block({ order: 2; });
        span {
          display: block;
          position: absolute;
          height: 3px;
          width: 100%;
          opacity: 1;
          left: 0;
          background-color: var(--app_font__color);
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
        .text {
          color: var(--app_font__color);
          border-bottom-color: var(--app_font__color);
        }
      }
      .g-icon {
        margin-right: 20px;
        width: 35px;
        height: 35px;
        .lg-block({ width: 30px; height: 30px; });
      }
      .text {
        font-size: 1.4rem;
        color: var(--app_font__color);
        border-bottom: 1px solid transparent;
        transition: 0.3s;
        .sm-block({ font-size: 2rem; });
      }
      &.user {
        padding-right: 25px;
        cursor: pointer;
        &:hover {
          .text {
            color: var(--app_font__color);
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
            color: var(--app_font__color);
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
          border-top: 8px solid  var(--app_font__color);
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          transition: 0.3s;
          .lg-block({ top: 10px;})
        }

      }
    }
  }
</style>
