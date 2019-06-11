<template>
  <section class="p-hero">
    <div class="container page">
      <div class="wrapper-content">
        <div class="content">
          <h1 class="visually-hidden">Business of Life</h1>
          <img class="img-name-academy" src="../assets/img/name-business.png" alt="Business of Life">
          <strong class="desc-strong g-caption">Эксклюзивная база знаний</strong>
          <p class="desc-connect">Присоединяйтесь к нам, чтобы получить доступ к уникальной базе знаний!</p>
          <a class="g-btn" href="#">
            <span>Стать участником</span>
            <img svg-inline class="arrow-right" src="../assets/img/icon/right-arrow.svg" alt="">
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
    display: flex;
    align-items: center;
    min-height: 100vh;
    background: url("../assets/img/bg-hero.jpg") no-repeat center / cover;
    .lg-block({ background-position: center top;});
    .wrapper-content {
      position: relative;
      margin-top: -50px;
      padding-left: 100px;
      padding-top: 80px;
      max-width: 870px;
      box-sizing: border-box;
      .decor-cube(370px, 370px);
      .lg-block({ padding-left: 70px; padding-top: 60px; .decor-cube(320px, 320px); max-width: 600px;});
      .xs-block({ padding-left:0; padding-top: 0; .decor-cube(@display: none;);});
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
