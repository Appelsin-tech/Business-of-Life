<template>
  <aside class="sidebar-admin">
    <ul class="list-menu">
      <li v-for="item in menuListFilterUserLogged" :key="item.to">
        <router-link class="link" :class="{line: item.line}" :exact="true" active-class="active" :to="item.to" v-tooltip.right="{content: item.title, container: '.layout-admin', boundariesElement: 'body',  classes: 'tooltip-admin-sidebar'}">
          <component :is="item.icon" class="g-icon"></component>
          <p class="title-item">{{item.title}}</p>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import appMenuList from '@/mixins/appMenuList'
export default {
  name: 'AdminSidebar',
  mixins: [appMenuList]
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
    max-width: 320px;
    background: #fff;
    grid-area: aside;
    color: #fff;
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* IE 10+ */
    @media (max-width: 1700px) {
      max-width: 250px;
    }
    @media (max-width: 1570px) {
      max-width: 70px;
    }
    .md-block({
      display: none;});
    .list-menu {
      padding: 70px 10px 70px 15px;
      @media (max-width: 1570px) {
        padding: 70px 10px;
      }
      .link {
        display: flex;
        align-items: center;
        padding: 12px 10px 12px 15px;
        font-size: 2rem;
        transition: 0.3s;
        border-radius: 5px;
        @media (max-width: 1570px) {
          padding: 12px;
        }
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
          margin-bottom: 20px;
          @media (max-width: 1570px) {
            margin-bottom: 14px;
          }
          &::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 20px;
            right: 20px;
            height: 1px;
            background: var(--sidebar-admin_border__color);
            @media (max-width: 1570px) {
              bottom: -7px;
              left: 10px;
              right: 10px;
            }
          }
        }
        .title-item {
          color: var(--sidebar-admin_title__color);
          @media (max-width: 1700px) {
            font-size: 1.4rem;
          }
          @media (max-width: 1570px) {
            display: none;
          }
        }
        .g-icon {
          width: 20px;
          height: 20px;
          margin-right: 25px;
          color: var(--sidebar-admin_icon__color);
          flex-shrink: 0;
          @media (max-width: 1700px) {
            margin-right: 18px;
          }
          @media (max-width: 1570px) {
            margin-right: 0;
          }
        }

      }
    }
  }
</style>
