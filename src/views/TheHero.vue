<template>
  <section class="p-hero p-default-flex">
    <div class="container page test-production">
      <div class="wrapper-content">
        <div class="content">
          <h1 class="visually-hidden">Business of Life</h1>
          <img class="img-name-academy" src="../assets/img/name-business.png" alt="Business of Life">
          <strong class="desc-strong g-caption">Эксклюзивная <br> база знаний</strong>
          <p class="desc-connect" v-if="false">Присоединяйтесь к нам, чтобы получить доступ к уникальной базе знаний!</p>
          <router-link to="/description" class="g-btn">
            <span>
              Стать участником
              <img svg-inline class="svg-icon" src="../assets/img/icon/right-arrow.svg" alt="">
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TheHero',
  mounted() {
    if(this.$route.name === 'main-r' && this.$route.params.sponsor) {
      this.$cookies.set('sponsor', this.$route.params.sponsor, 'Sat, 01 Jan 2050 00:00:00 GMT')
    }
    this.$store.dispatch('user/setCookieSponsor')
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .p-hero {
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
    .container {
      &.test-production {
        .wrapper-content {
          .sm-block({.decor-cube(237px, 237px);});
          .xs-block({.decor-cube(@display: none;);})
        }
      }
    }
    .wrapper-content {
      position: relative;
      padding-left: 100px;
      padding-top: 80px;
      box-sizing: border-box;
      z-index: 2;
      transform: translateY(-6%);
      .decor-cube(364px, 364px);
      .lg-block({ padding-left: 82px; padding-top: 82px; .decor-cube(320px, 320px); max-width: 670px;});
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
          color: #000;
          .sm-block({ font-weight: 600; font-size: 1.6rem;})
        }
      }
    }
  }
</style>
