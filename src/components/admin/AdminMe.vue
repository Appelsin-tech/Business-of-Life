<template>
  <section class="p-me p-default p-default-inner">
    <bread-crumbs :arrCrumbs="[]"/>
    <div class="container">
      <h1 class="g-caption-inner">Личный кабинет</h1>
      <div class="menu">
        <router-link to="/admin/event-control" class="menu__item item" v-if="status > 1">
          <div class="item__img item__img--event"></div>
          <p class="g-caption-element">Управление мероприятиями</p>
        </router-link>
        <router-link to="/tickets" class="menu__item item">
          <div class="item__img  item__img--tickets"></div>
          <p class="g-caption-element">Проверить билет</p>
        </router-link>
        <router-link to="/admin/statistic" class="menu__item item" v-if="status > 1">
          <div class="item__img  item__img--statistic"></div>
          <p class="g-caption-element">Статистика продаж</p>
        </router-link>
        <router-link to="/admin/role" class="menu__item item" v-if="status > 1">
          <div class="item__img  item__img--role"></div>
          <p class="g-caption-element">Роли и управление доступом</p>
        </router-link>
        <router-link to="/admin/profile" class="menu__item item">
          <div class="item__img  item__img--profile"></div>
          <p class="g-caption-element">Профиль</p>
        </router-link>
        <router-link to="/knowledge" class="menu__item item">
          <div class="item__img  item__img--knowledge"></div>
          <p class="g-caption-element">База знаний</p>
        </router-link>
        <router-link to="/admin/wallet" class="menu__item item">
          <div class="item__img  item__img--wallet"></div>
          <p class="g-caption-element">Кошелек</p>
        </router-link>
        <router-link to="/admin/partners-program" class="menu__item item">
          <div class="item__img  item__img--partners"></div>
          <p class="g-caption-element">Партнерская программа</p>
        </router-link>
        <router-link to="/news" class="menu__item item" v-if="status > 1">
          <div class="item__img  item__img--news"></div>
          <p class="g-caption-element">Новости</p>
        </router-link>
        <router-link to="/admin/news-control" class="menu__item item" v-if="status > 1">
          <div class="item__img  item__img--news-editing"></div>
          <p class="g-caption-element">Редактор новостей</p>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '../BreadCrumbs.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'AdminUsersMe',
  components: { BreadCrumbs },
  computed: {
    ...mapGetters('user', [
      'status'
    ])
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/_importants";
  .p-me {
    .data-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 60px;
      .sm-block({
        margin-bottom: 40px;
      });
      .info {
        display: flex;
        flex-direction: column;
        &__item {
          display: flex;
          align-items: baseline;
          &:not(:last-child) {
            margin-bottom: 30px;
          }
        }
        &__desc {
          margin-right: 20px;
          font-weight: 400;
        }
        &__data {
          font-weight: 800;
          &--mail {
            color: #000;
          }
        }
      }
      .logout {
        margin-right: 10vw;
        font-size: 2.4rem;
        text-transform: uppercase;
        font-weight: 800;
        color: @colorSecondFonts;
        cursor: pointer;
        border-bottom: 1px solid @colorSecondFonts;
        transition: 0.3s;
        &:hover {
          border-bottom-color: transparent;
        }
      }
    }
    .menu {
      .row-flex();
      margin-bottom: 80px;
      justify-content: flex-start;
      .sm-block({
        justify-content: center;
      });
      .item {
        .col();
        .size(3);
        .size-xl(4);
        .size-sm(10);
        .size-xs(12);
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        transition: 0.3s;
        .default-panel-style(40px);
        .lg-block({margin-bottom: 20px;});
        .sm-block({
          margin-bottom: 15px;
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
          &--event {
            background-image: url('../../assets/img/admin/admin-menu-events.jpg');
          }
          &--tickets {
            background-image: url('../../assets/img/admin/admin-menu-tickets.jpg');
          }
          &--statistic {
            background-image: url('../../assets/img/admin/admin-menu-statistic.jpg');
          }
          &--role {
            background-image: url('../../assets/img/admin/admin-menu-role.jpg');
          }
          &--knowledge {
            background-image: url('../../assets/img/admin/admin-menu-knowledge.jpg');
          }
          &--profile {
            background-image: url('../../assets/img/admin/admin-menu-profile.jpg');
          }
          &--wallet {
            background-image: url('../../assets/img/admin/admin-menu-wallet.jpg');
          }
          &--partners {
            background-image: url('../../assets/img/admin/admin-menu-partners.jpg');
          }
          &--news {
            background-image: url('../../assets/img/admin/admin-menu-news.jpg');
          }
          &--news-editing {
            background-image: url('../../assets/img/admin/admin-menu-news-editing.jpg');
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
    }
  }
</style>
