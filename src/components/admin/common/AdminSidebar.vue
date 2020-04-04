<template>
  <aside class="sidebar-admin">
    <ul class="list-menu">
      <li v-for="item in menuListFilterUserLogged" :key="item.to">
        <router-link class="link" :class="{line: item.line}" :exact="true" active-class="active" :to="item.to" v-tooltip.right="{content: item.title, container: '.sidebar-admin'}">
          <font-awesome-icon :icon="item.icon" class="fa-icon"/>
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
  .sidebar-admin {
    background: @colorMainSecondary;
    grid-area: aside;
    color: #fff;
    .md-block({
      display: none;});
    .tooltip {
      @media (min-width: 1570px) {
        display: none;
      }
    }
    .list-menu {
      padding-top: 70px;
      padding-bottom: 70px;
      .link {
        display: flex;
        align-items: center;
        padding: 25px 20px 25px 30px;
        color: #fff;
        font-size: 1.8rem;
        transition: 0.3s;
        @media (max-width: 1700px) {
          padding: 20px 25px;
        }
        @media (max-width: 1570px) {
        }
        &:hover {
          background: #3D3EB8;
        }
        &.active {
          background: #31336d;
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
            background: rgba(255,255,255, 0.4);
            @media (max-width: 1570px) {
              bottom: -7px;
              left: 10px;
              right: 10px;
            }
          }
        }
        .title-item {
          @media (max-width: 1700px) {
            font-size: 1.4rem;
          }
          @media (max-width: 1570px) {
            display: none;
          }
        }
        .fa-icon {
          width: 20px;
          height: 20px;
          margin-right: 25px;
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
