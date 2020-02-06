<template>
  <router-link :to="item.to" class="menu-item">
    <div class="menu-item__img" :class="item.name"></div>
    <p class="g-caption-element">{{item.title}}</p>
  </router-link>
</template>

<script>
export default {
  name: 'PannelAdminKnowledgeMenu',
  props: ['item']
}
</script>

<style scoped lang="less">
  @import "../../../assets/less/_importants";
  .menu-item {
    display: flex;
    flex-direction: column;
    transition: 0.3s;
    .sm-block({
      flex-direction: row;
      align-items: center;
    });
    &:hover {
      .g-caption-element {
        text-decoration: none;
      }
    }
    &__img {
      position: relative;
      margin-bottom: 40px;
      height: 240px;
      width: 240px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: @colorBgGray;
      .to(1430px, {
        width: auto;
      });
      .lg-block({
        height: 220px;
        margin-bottom: 30px;
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
        height: 40px;
      });
      /*.xs-block({ height: 250px; margin-bottom: 20px; });*/
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
  }
</style>
