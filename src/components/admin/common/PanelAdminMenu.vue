<template>
  <router-link :to="item.to" class="menu-item g-panel--img">
    <div class="menu-item__img" :class="item.name"></div>
    <div class="content">
      <p class="g-caption-element">{{item.title}}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'PanelAdminMenu',
  props: ['item']
}
</script>

<style scoped lang="less">
  @import "../../../assets/less/_importants";
  .menu-item {
    display: flex;
    flex-direction: column;
    transition: 0.3s;
    border-radius: 8px;
    background: #fff;
    overflow: hidden;
    .xxl-block({max-width: 95%;});
    .lg-block({max-width: 100%;});
    .sm-block({
      border-radius: 5px;
      flex-direction: row;
      align-items: center;
      padding-bottom: 0;
    });
    &:hover {
      .g-caption-element {
        text-decoration: none;
      }
    }
    &__img {
      position: relative;
      height: 240px;
      width: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: @colorBgGray;
      .lg-block({
        height: 220px;
      });
      .md-block({
        height: 210px;
      });
      .sm-block({
        width: 70px;
        height: 70px;
        margin-bottom: 0;
        margin-right: 20px;
        flex-shrink: 0
      });
      .xs-block({
        width: 40px;
        min-height: 40px;
        height: 100%;
      });
      &.event-control {
        background-image: url('~@/assets/img/admin/admin-menu-events.jpg');
      }
      &.tickets-page {
        background-image: url('~@/assets/img/admin/admin-menu-tickets.jpg');
      }
      &.statistic {
        background-image: url('~@/assets/img/admin/admin-menu-statistic.jpg');
      }
      &.role {
        background-image: url('~@/assets/img/admin/admin-menu-role.jpg');
      }
      &.knowledge-package {
        background-image: url('~@/assets/img/admin/admin-menu-knowledge.jpg');
      }
      &.profile {
        background-image: url('~@/assets/img/admin/admin-menu-profile.jpg');
      }
      &.wallet {
        background-image: url('~@/assets/img/admin/admin-menu-wallet.jpg');
      }
      &.partners-program {
        background-image: url('~@/assets/img/admin/admin-menu-partners.jpg');
      }
      &.news {
        background-image: url('~@/assets/img/admin/admin-menu-news.jpg');
      }
      &.news-control {
        background-image: url('~@/assets/img/admin/admin-menu-news-editing.jpg');
      }
      &.calendar {
        background-image: url('~@/assets/img/admin/admin-menu-calendar.jpg');
      }
      &.course-control {
        background-image: url('~@/assets/img/admin/admin-menu-courses.jpg');
      }
      .img-link {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
    .g-caption-element {

    }
  }
</style>
