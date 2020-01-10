<template>
  <div class="site-wrapper">
    <div class="site">
      <div class="img"></div>
      <div class="content">
        <h1 class="g-caption-element g-caption-element--static">Bussiness of Life</h1>
        <p class="desc">Основной реферальный сайт платформы для регистрации ваших партнеров. Отправляйте этот сайт всем потенциальным пользователям.</p>
        <input type="text" id="copy-input" class="visually-hidden" :value="`https://bussinessof.life/r/${profile.login}`">
        <a :href="`https://bussinessof.life/r/${profile.login}`" ref="linkToCopy" class="ref-link">{{`https://bussinessof.life/r/${profile.login}`}}</a>
        <button class="g-btn g-btn--no-icon g-btn--white" @click="copyLink">
          <span>Копировать ссылку</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AdminPartnersProgramReferal',
  computed: {
    ...mapState('user', [
      'profile'
    ])
  },
  methods: {
    copyLink() {
      let textToCopy = document.querySelector('#copy-input')
      textToCopy.select()
      document.execCommand('copy')
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../../assets/less/_importants";

  .site {
    display: flex;
    padding: 40px;
    margin-bottom: 20px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    &:last-child {
      margin-bottom: 0;
    }
    .sm-block({
      padding: 25px;
      margin-bottom: 10px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    });
    .xs-block({
      padding: 18px;
    });
    .img {
      flex-shrink: 0;
      margin-right: 50px;
      height: 260px;
      width: 360px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: @colorBgGray;
      background-image: url('../../../assets/img/app-main.jpg');
      .lg-block({
        width: 280px;
        height: 200px;
        margin-right: 30px;
      });
      .sm-block({
        display: none;
      })
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .g-caption-element {
        margin-bottom: 20px;
        .lg-block({
          margin-bottom: 10px;});
      }
      .desc {
        margin-bottom: auto;
        padding-bottom: 10px;
        font-size: 1.6rem;
        line-height: 2.5rem;
      }
      .ref-link {
        margin-bottom: 20px;
        font-weight: 800;
        font-size: 2rem;
        color: @colorMainSecondary;
        text-decoration: underline;
        .lg-block({
          margin-bottom: 15px;
          font-size: 1.8rem;});
        .xs-block({
          margin-bottom: 10px;
          font-size: 1.6rem;});
        &:hover {
          text-decoration: none;
        }
      }
    }
  }
</style>
