<template>
  <router-link :to="item.to" class="menu-item">
    <div class="menu-item__img" :class="item.name"></div>
    <h3 class="g-caption-element">{{item.title}}</h3>
    <p class="lesson">
      <img class="svg-icon" svg-inline src="@/assets/img/icon/book.svg" alt="">
      <span>уроков:</span>
      {{item.lesson}}
    </p>
    <p class="description">
      Основные навыки построения бизнеса - звонки, закрытые сделки, спонсорство, имидж, полезные техники и многое другое
    </p>
    <div class="author">
      <div class="g-icon-circle">
        BoL
      </div>
<!--      <div class="img"></div>-->
      <span class="name">Business of Life</span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'PannelAdminKnowledgeMenu',
  props: ['item']
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .menu-item {
    display: flex;
    flex-direction: column;
    transition: 0.3s;
    color: #000;
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
        margin-bottom: 20px;
        flex-shrink: 0
      });
      .xs-block({
        width: 40px;
        height: 40px;
        margin-bottom: 15px;
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
      margin-bottom: 25px;
      .sm-block({margin-bottom: 10px;})
    }
    .lesson {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      .sm-block({margin-bottom: 10px;});
      .svg-icon {
        width: 30px;
        height: 30px;
        .sm-block({
          width: 20px;
          height: 20px;});
        * {
          fill: @colorMain;
        }
      }
      span {
        margin: 0 15px;
      }
    }
    .description {
      margin-bottom: 15px;
      line-height: 1.4;
    }
    .author {
      display: flex;
      align-items: center;
      .g-icon-circle {
        .xs-block({
          font-size: 1.2rem;});
      }
    }
  }
</style>
