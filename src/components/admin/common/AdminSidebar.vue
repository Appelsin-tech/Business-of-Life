<template>
  <aside class="sidebar-admin" :class="{active : showMenu}">
    <div class="wrapper-desktop">
      <router-link class="logo-wrapper" to="/">
        <img svg-inline class="logo" src="@/assets/img/logo.svg" alt="Business of Life">
      </router-link>
      <button class="burger" @click="showMenuMethod">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="list-menu-desktop">
        <li v-for="item in menuListFilterUserLogged" :key="item.to">
          <router-link class="link" :class="{line: item.line}"  active-class="active"  :to="item.to" >
            <component :is="item.icon" class="g-icon"></component>
            <p class="title-item">{{item.title}}</p>
          </router-link>
        </li>
        <li v-if="statusDev">
          <router-link class="link line"  active-class="active" to="/office/role" >
            <component :is="'icon-account-star'" class="g-icon"></component>
            <p class="title-item">Роли и управление доступом</p>
          </router-link>
        </li>
        <li v-if="statusDev">
          <router-link class="link" active-class="active" to="/office/statistic" >
            <component :is="'icon-finance'" class="g-icon"></component>
            <p class="title-item">Статистика продаж</p>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="wrapper-mobile">
      <ul class="list-menu-mobile">
        <li class="item" v-for="item in menuListFilterUserLogged" :key="item.to">
          <router-link class="link" :to="item.to" @click.native="showMenu = false">{{item.title}}</router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/office" @click.native="showMenu = false">Личный кабинет</router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import appMenuList from '@/mixins/appMenuList'
export default {
  name: 'AdminSidebar',
  mixins: [appMenuList],
  data() {
    return {
      showMenu: false,
      showLogout: false
    }
  },
  computed: {
    ...mapState('user', [
      'profile'
    ]),
    ...mapGetters('user', [
      'logged',
      'statusDev'
    ]),
  },
  methods: {
    showMenuMethod() {
      this.showMenu = !this.showMenu
    }
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
  @import "~@/assets/less/_importants";
  ::-webkit-scrollbar { /* chrome based */
    width: 0px;  /* ширина scrollbar'a */
    background: transparent;  /* опционально */
  }
  .sidebar-admin {
    position: fixed;
    top: 0;
    bottom: 0;
    padding-bottom: 70px;
    max-width: 304px;
    background: #fff;
    grid-area: aside;
    color: #fff;
    overflow-y: auto;
    z-index: 991;
    scrollbar-width: none; /* Firefox */
    .xl-block({
      max-width: 240px;
    });
    .md-block({
      position: absolute;
      bottom: auto;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      padding-bottom: 0;
      max-width: 100%;
      width: 100%;
      overflow: hidden;
      background: transparent;
      z-index: 991;
    });
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
      position: fixed;
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
      .wrapper-mobile {
        overflow: auto;
        .list-menu-mobile {
          display: flex;
          z-index: 5;
          padding: 20px 0;
          .item {
            animation: fadeItemMenu 0.15s ease-in-out forwards;
            animation-delay: 0.2s;
          }
        }
      }
    }
    .wrapper-desktop {
      position: relative;
      .md-block({
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 99;
        padding-left: 20px;
        padding-right: 20px;
        background: #fff;
      });
      .logo-wrapper {
        height: 96px;
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid var(--app_element-border__color);
        box-sizing: border-box;
        .xl-block({
          height: 80px;
          margin-bottom: 20px;
        });
        .md-block({
          border-bottom: none;
          margin-bottom: 0;
        });
        .logo {
          width: 100%;
          max-width: 120px;
          outline: none;
          .xl-block({
            max-width: 105px;
          });
          path {
            fill: @colorMainSecondary;
          }
        }
      }
      .list-menu-desktop {
        padding: 0 24px;
        .xl-block({
          padding: 0 10px;
        });
        .md-block({
          display: none;
        });
        .link {
          display: flex;
          align-items: center;
          padding: 12px 10px 12px 15px;
          font-size: 2rem;
          transition: 0.3s;
          border-radius: 5px;
          .xl-block({
            padding: 10px;
            font-size: 16px;
          });
          &:focus,
          &:hover {
            background: #e2e2e2;
          }
          &.active {
            background: var(--sidebar-admin_link__color-focus);
            .title-item {
              color: var(--sidebar-admin_title__color-focus);
            }
            .g-icon {
              color: var(--sidebar-admin_icon__color-focus);
            }
          }
          &.line {
            position: relative;
            margin-top: 20px;
            .xl-block({
              margin-top: 14px;
            });
            &::after {
              content: '';
              position: absolute;
              top: -10px;
              left: 20px;
              right: 20px;
              height: 1px;
              background: var(--sidebar-admin_border__color);
              .xl-block({
                top: -7px;
                left: 10px;
                right: 10px;
              });
            }
          }
          .title-item {
            color: var(--sidebar-admin_title__color);
            .xl-block({
              font-size: 16px;
            });
          }
          .g-icon {
            width: 20px;
            height: 20px;
            margin-right: 25px;
            color: var(--sidebar-admin_icon__color);
            flex-shrink: 0;
            .xl-block({
              margin-right: 18px;
              width: 16px;
              height: 16px;
            });
          }
        }
      }
    }
    .wrapper-mobile {
      display: flex;
      flex-direction: column;
      justify-self: center;
      justify-content: center;
      flex-grow: 1;
      z-index: 9;
      @media (max-height: 990px) {
        justify-content: flex-start;
      }
      .list-menu-mobile {
        position: relative;
        display: none;
        flex-direction: column;
        align-items: center;
        .sm-block({
          margin-bottom: 40px;
        });
        .item {
          margin-bottom: 25px;
          text-align: center;
          opacity: 0;
          transform: translateY(50px);
          .lg-block({
            margin-bottom: 17px;
          });
          .xs-block({
            margin-bottom: 10px;
          });
          &:last-child {
            margin-bottom: 0;
          }
          .link {
            font-size: 2.8rem;
            font-weight: bold;
            color: var(--app_emphasis__color);
            text-transform: uppercase;
            transition: 0.3s;
            .lg-block({
              font-size: 2.4rem;
            });
            .xs-block({
              font-size: 1.6rem;
            });
          }
        }
      }
    }
    .burger {
      display: none;
      position: relative;
      margin-left: 75px;
      width: 32px;
      height: 25px;
      cursor: pointer;
      transform: rotate(0deg);
      .md-block({
        display: block;});
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
</style>
