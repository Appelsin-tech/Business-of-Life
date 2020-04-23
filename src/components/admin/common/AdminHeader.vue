<template>
  <header class="s-header-admin">
    <div class="container">
      <transition mode="out-in" name="fade">
        <div class="title-admin">
          <router-link class="g-caption-inner parent" v-if="$route.meta.breadcrumb.parent" :to="`/office/${$route.meta.breadcrumb.parent}`">...</router-link>
          <span class="g-caption-inner parent separator" v-if="$route.meta.breadcrumb.parent">&#8201;/&#8201;</span>
          <h1 class="g-caption-inner">{{$route.meta.breadcrumb.title}}</h1>
        </div>
      </transition>
      <div class="user" :class="{active : showLogout}" v-if="logged"  @click="showLogout = !showLogout">
        <icon-account class="g-icon"/>
        <span class="lk text">{{profile.login}}</span>
        <a class="exit"  href="#" @click.prevent="$store.dispatch('user/logout')">Выйти</a>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'AdminHeader',
  data() {
    return {
      showLogout: false
    }
  },
  computed: {
    ...mapState('user', [
      'profile'
    ]),
    ...mapGetters('user', [
      'logged'
    ]),
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .s-header-admin {
    grid-area: header;
    border-bottom: 1px solid var(--app_element-border__color);
    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-grow: 1;
      height: 96px;
      .xl-block({
        height: 80px;});
      .title-admin {
        .g-caption-inner {
          margin-bottom: 0;
          display: inline-block;
        }
      }
      .g-icon {
        margin-right: 20px;
        width: 35px;
        height: 35px;
        .lg-block({ width: 30px; height: 30px; });
      }
      .user {
        display: flex;
        align-items: center;
        position: relative;
        padding-right: 25px;
        margin-left: 20px;
        cursor: pointer;
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
        &.active {
          .exit {
            opacity: 1;
            pointer-events: auto;
          }
          &::after {
            transform: rotate(180deg);
          }
          .exit {
            opacity: 1;
            pointer-events: auto;
          }
        }
        .exit {
          position: absolute;
          pointer-events: none;
          opacity: 0;
          bottom: -37px;
          right: 0;
          color: var(--app_font__color);
          transition: 0.3s;
          text-transform: uppercase;
        }
      }
    }
  }
</style>
