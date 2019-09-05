<template>
  <section class="p-hero p-default">
    <div class="container page">
      <div class="wrapper-content">
        <div class="content">
          <h1 class="visually-hidden">Business of Life</h1>
          <img class="img-name-academy" src="../assets/img/name-business.png" alt="Business of Life">
          <strong class="desc-strong g-caption">Эксклюзивная база знаний</strong>
          <p class="desc-connect">Присоединяйтесь к нам, чтобы получить доступ к уникальной базе знаний!</p>
          <a class="g-btn" href="#">
            <span>Стать участником</span>
            <img svg-inline class="svg-icon" src="../assets/img/icon/right-arrow.svg" alt="">
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TheHero'
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
      .sm-block({opacity: 0.3})
    }
    .wrapper-content {
      position: relative;
      padding-left: 100px;
      padding-top: 80px;
      max-width: 870px;
      box-sizing: border-box;
      z-index: 2;
      transform: translateY(-6%);
      .decor-cube(370px, 370px);
      .lg-block({ padding-left: 70px; padding-top: 60px; .decor-cube(320px, 320px); max-width: 600px;});
      .xs-block({ padding-left:0; padding-top: 0; .decor-cube(@display: none;);});
      @media screen and (max-height: 520px) {
        transform: translateY(0);
      }
      .content {
        .g-caption {
          margin-bottom: 40px;
          .lg-block({ margin-bottom: 30px;});
        }
        .img-name-academy {
          margin-bottom: 35px;
          .lg-block({ margin-bottom: 20px; max-width: 180px;});
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
