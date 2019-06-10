<template>
  <div id="app">
    <app-header/>
    <div id="nav-menu" class="navigation-wrapper">
      <button class="arrow next-slide" ></button>
      <button class="arrow prev-slide"></button>
      <ul id="mainMenu" class="main-nav-menu">
        <li>
          <router-link to="/main" class="dots" active-class="active"/>
        </li>
        <li>
          <router-link to="/learning-stages" class="dots" active-class="active"/>
        </li>
        <li>
          <router-link to="/description" class="dots" active-class="active"/>
        </li>
        <li>
          <router-link to="/our-coach" class="dots" active-class="active"/>
        </li>
      </ul>
    </div>
    <main>
      <transition mode="out-in" name="fade">
        <router-view/>
      </transition>
    </main>
    <app-footer/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'

export default {
  components: {
    AppHeader,
    AppFooter
  },
  data () {
    return {
      showMenu: true
    }
  }
}
</script>
<style lang="less">
  @import "./assets/less/main";
  #app {
    position: relative;
  }
  .navigation-wrapper {
    position: fixed;
    right: 80px;
    top: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(-50%);
    z-index: 9999;
    .main-nav-menu {
      position: relative;
      display: flex;
      flex-direction: column;
      > li {
        &:not(&:last-child) {
          margin-bottom: 20px;
        }
        .dots {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          background-size: 15px 15px;
          &::after {
            content: '';
            display: inline-block;
            position: absolute;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #bebebe;
          }
          &.active {
            &::after {
              background: @colorMainRed;
            }
          }
        }
      }
    }
  }
  .main-pages-enter-active,
  .main-pages-leave-active {
    transition: all .3s ease;
  }
  .main-pages-enter {}
  .main-pages-leave-to
    /* .component-fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }

  .fade-enter-active{
    transition: opacity 0.5s;
  }
  .fade-leave-active {
    opacity: 0;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
