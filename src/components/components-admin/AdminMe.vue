<template>
  <section class="p-me p-default p-default-inner">
    <bread-crumbs/>
    <div class="container">
      <h1 class="g-caption g-caption-inner">Мои данные</h1>
      <div class="data-wrapper">
        <div class="info">
          <p class="info__item">
            <span class="info__desc">Пользователь:</span>
            <span class="info__data">{{profile.login}}</span>
          </p>
          <p class="info__item">
            <span class="info__desc">Почта:</span>
            <a href="#" class="info__data info__data--mail">{{profile.email}}</a>
          </p>
        </div>
        <button class="logout" @click="$store.dispatch('user/logout')">Выйти</button>
      </div>
      <div class="menu">
        <!--<router-link to="/admin/event-control" class="menu__item item">-->
          <!--<div class="item__img"></div>-->
          <!--<p class="item__title">Управление мероприятиями</p>-->
        <!--</router-link>-->
        <router-link to="/tickets" class="menu__item item">
          <div class="item__img"></div>
          <p class="item__title">Проверить билет</p>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '../BreadCrumbs.vue'
import { mapState } from 'vuex'

export default {
  name: 'AdminUsersMe',
  components: { BreadCrumbs },
  computed: {
    ...mapState('user', [
      'profile'
    ])
  },
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
      .sm-block({ margin-bottom: 40px; });
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
      .lg-block({ justify-content: center; });
      .item {
        .col();
        .size(4);
        .size-lg(5);
        .size-md(6);
        .size-sm(10);
        .size-xs(12);
        margin-bottom: 35px;
        display: flex;
        flex-direction: column;
        padding: 50px 3vw;
        border-radius: 6px;
        transition: 0.3s;
        box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);
        .md-block({ padding-top: 3vw; });
        .sm-block({ padding: 20px 20px; margin-bottom: 15px; });
        &:hover {
          .item__title {
            text-decoration: none;
          }
        }
        &__img {
          position: relative;
          margin-bottom: 40px;
          height: 400px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-color: #f3f3f3;
          .to(1400px, { height: 350px; });
          .md-block({ height: 300px; });
          .xs-block({ height: 250px; margin-bottom: 20px; });
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
        &__title {
          font-weight: 800;
          font-size: 2rem;
          text-transform: uppercase;
          text-decoration: underline;
          color: #000;
          .md-block({ font-size: 1.6rem; });
        }
      }
    }
  }
</style>
