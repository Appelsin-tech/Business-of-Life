<template>
  <div>
    <section class="s-hero p-default-flex">
      <div class="container page test-production">
        <div class="wrapper-content">
          <div class="content">
            <h1 class="visually-hidden">Business of Life</h1>
            <img class="img-name-academy" src="../assets/img/name-business.png" alt="Business of Life">
            <strong class="desc-strong g-caption">Международная академия для интернет предпринимателей</strong>
            <button-app :to="'/description'">
              Стать участником
            </button-app>
          </div>
        </div>
      </div>
    </section>
    <section class="s-description">
      <div class="container">
        <h1 class="g-caption-inner">Об академии</h1>
        <div class="col-wrapper">
          <div class="col-img">
            <div class="img">
              <picture>
                <source srcset="../assets/img/foto-president-mobile.png" media="(max-width: 425px)">
                <img src="../assets/img/foto-president.png" alt="Гульнара Саудова">
              </picture>
            </div>
          </div>
          <div class="col-text">
            <div class="content">
              <p class="desc desc--bold">В бизнесе электронной коммерции можно буквально за 1 год выйти на
                достойный уровень ежемесячного дохода и за несколько
                лет добиться выдающихся результатов</p>
              <p class="desc">Для того, чтобы добиться такого результата, необходимо выполнить всего два условия. Первое –
                конечно же, надо хорошо поработать. Бизнес – это не новогоднее чудо, и просто так результат не случится.
                Второе – специальные
                знания и бизнес-инструменты, которые важно получить на каждом принципиальном этапе создания бизнеса.</p>
              <p class="desc">Мы уверены, что принесем хорошие результаты каждому дистрибьютору компании, который имеет
                смелые цели, стремится сделать свою жизнь лучше, готов учиться, действовать, и превращать свои мечты в
                реальность!</p>
              <p class="wrapper-president">
                <span class="post">Президент академии</span>
                <strong class="g-caption-section">Гульнара Садуова</strong>
              </p>
              <button-app :to="'/calendar'">
                Наши мероприятия
              </button-app>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="s-registration" v-if="!logged">
      <div class="container">
        <h2 class="g-caption-inner">Присоединяйтесь к нам!</h2>
        <span class="desc">Зарегистрируйся прямо сейчас!</span>
        <button-app :to="'/auth'">
          Регистрация
        </button-app>
      </div>
    </section>
    <section class="s-news" v-if="news && news.length !== 0">
      <div class="container">
        <h2 class="g-caption-inner">Новости</h2>
        <div class="news-wrapper">
          <div class="item" v-for="item in maxItemNews" :key="item.id">
            <news-item  :news="item"  page="page-hero"/>
          </div>
        </div>
        <button-app :to="'/news'">
          Показать больше
        </button-app>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import NewsItem from '@/components/NewsItem'

export default {
  name: 'TheHero',
  components: {
    NewsItem
  },
  computed: {
    ...mapGetters('user', [
      'logged',
    ]),
    ...mapGetters('news', [
      'news'
    ]),
    ...mapState('user', [
      'profile'
    ]),
    maxItemNews () {
      return this.news.length && this.news.length > 3 ? this.news.slice(0, 3) : this.news
    }
  },
  mounted() {
    if(this.$route.name === 'main-r' && this.$route.params.sponsor) {
      this.$cookies.set('sponsor', this.$route.params.sponsor, 'Sat, 01 Jan 2050 00:00:00 GMT')
    }
    this.$store.dispatch('user/setCookieSponsor')
    this.$store.dispatch('news/getNews')
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .s-hero {
    &::after {
      position: absolute;
      content: '';
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 1;
      background: url("../assets/img/bg-hero.jpg") no-repeat center / cover;
      .lg-block({ background-position: center top;});
      .sm-block({opacity: 0.3});
      .xs-block({background: url("../assets/img/bg-hero-mobile.jpg") no-repeat center / cover;})
    }
    .wrapper-content {
      position: relative;
      padding-left: 100px;
      padding-top: 80px;
      box-sizing: border-box;
      z-index: 2;
      transform: translateY(-6%);
      max-width: 70%;
      .decor-cube(364px, 364px);
      .lg-block({ padding-left: 82px; padding-top: 82px; .decor-cube(300px, 300px);});
      .sm-block({max-width: 100%; padding-left: 54px; padding-top: 54px;});
      .xs-block({ padding-left:0; padding-top: 0; .decor-cube(@display: none;);});
      @media screen and (max-height: 520px) {
        transform: translateY(0);
      }
      .content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        z-index: 5;
        .g-caption {
          margin-bottom: 40px;
          .lg-block({ margin-bottom: 30px;});
        }
        .img-name-academy {
          display: block;
          margin-bottom: 35px;
          .lg-block({ margin-bottom: 20px; max-width: 180px;});
          .xs-block({max-width: 130px;})
        }
        .desc-connect {
          margin-bottom: 50px;
          font-size: 1.8rem;
          font-weight: 800;
          .sm-block({ font-weight: 600; font-size: 1.6rem;})
        }
      }
    }
  }
  .s-description {
    padding: 100px 0 60px;
    .lg-block({
      padding: 80px 0 40px;});
    .xs-block({
      padding: 50px 0 25px;});
    .col-wrapper {
      display: flex;
      justify-content: space-between;
      .md-block({ flex-direction: column; });
      .col-text {
        position: relative;
        padding-left: 90px;
        width: 50%;
        box-sizing: border-box;
        .lg-block({ padding-left: 60px;});
        .md-block({ width: 80%; });
        .sm-block({ width: 100%; max-width: 570px; padding-left: 25px;});
        .xs-block({ padding-left: 0; padding-top: 0; });
        .content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .desc {
            margin-bottom: 20px;
            font-size: 1.6rem;
            line-height: 2.5rem;
            .sm-block({ line-height: 2.2rem; });
            &--bold {
              font-size: 1.8rem;
              font-weight: 800;
              .sm-block({ font-weight: 600; line-height: 2.2rem; font-size: 1.6rem; })
            }
          }
          .wrapper-president {
            display: flex;
            flex-direction: column;
            margin-top: 20px;
            margin-bottom: 40px;
            .lg-block({margin-top: 10px;
              margin-bottom: 25px;});
            .sm-block({margin-top: 10px;
              margin-bottom: 0px;});
            .post {
              margin-bottom: 10px;
              font-size: 1.4rem;
            }
            .g-caption-section {
              color: var(--app_title__color);
              margin-bottom: 0;
            }
          }
          .btn-app {
            margin-top: 30px;
            .xs-block({ margin-top: 20px; });
          }
        }
      }
      .col-img {
        display: flex;
        width: 38%;
        flex-direction: column;
        align-items: center;
        .md-block({ align-self: center; width: 50%; });
        .sm-block({ max-width: 320px;
          width: auto; });
        .img {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          width: 100%;
          box-sizing: border-box;
          .md-block({
            margin-bottom: 40px;});
          .sm-block({ width: auto; margin-bottom: 30px; });
          > img {
            max-height: 570px;
            .sm-block({ max-width: 300px; });
            .xs-block({ max-width: 250px; });
          }
        }
      }
    }
  }
  .s-registration {
    padding: 100px 0;
    margin: 60px 0;
    background-color: #101a63;
    background-image: url("../assets/img/logo-bg.png");
    background-position-y: 55%;
    .lg-block({
      padding: 80px 0;
      margin: 40px 0;});
    .xs-block({
      padding: 50px 0;
      margin: 25px 0;});
    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .g-caption-inner {
        color: #fff;
      }
      .desc {
        color: #fff;
        font-weight: bold;
        margin-bottom: 50px;
        .lg-block({
          margin-bottom: 30px;});
        .sm-block({
          margin-bottom: 20px;});
      }
    }
  }
  .s-news {
    margin-bottom: 250px;
    padding: 60px 0;
    .lg-block({
      padding: 40px 0;});
    .xs-block({
      padding: 25px 0;});
    .news-wrapper {
      .row-flex();
      margin-bottom: 50px;
      .sm-block({
        margin-bottom: 30px;});
      .item {
        margin-bottom: 20px;
        display: flex;
        .col();
        .size(4);
        .size-lg(5);
        .size-md(6);
        .size-sm(7);
        .size-ss(8);
        .size-xs(12);
      }
    }
  }
</style>
