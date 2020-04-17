<template>
  <section class="p-description p-default-block">
    <div class="container page">
      <div class="col-text">
        <div class="content">
          <span class="desc-light">Академия “Business of Life”</span>
          <h1 class="g-caption">Об академии</h1>
          <p class="desc desc--bold">В бизнесе можно буквально за 1 год выйти на
            достойный уровень ежемесячного дохода и за несколько
            лет добиться выдающихся результатов</p>
          <p class="desc">Для того, чтобы добиться такого результата, необходимо выполнить всего два условия. Первое –
            конечно же, надо хорошо поработать. Бизнес – это не новогоднее чудо, и просто так результат не случится.
            Второе – специальные
            знания и бизнес-инструменты, которые важно получить на каждом принципиальном этапе создания бизнеса.</p>
          <p class="desc">Мы уверены, что принесем хорошие результаты каждому дистрибьютору компании, который имеет
            смелые цели, стремится сделать свою жизнь лучше, готов учиться, действовать, и превращать свои мечты в
            реальность!</p>
          <router-link to="/calendar" class="g-btn">
            <span class="text">
              Наши мероприятия
              <icon-arrow-right class="g-icon"/>
            </span>
          </router-link>
        </div>
      </div>
      <div class="col-img">
        <div class="img">
          <picture>
            <source srcset="../assets/img/foto-president-mobile.png" media="(max-width: 425px)">
            <img src="../assets/img/foto-president.png" alt="Гульнара Саудова">
          </picture>

        </div>
        <p class="wrapper-president">
          <span class="post">Президент академии</span>
          <strong class="name">Гульнара Садуова</strong>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TheDescription'
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .p-description {
    background: url("../assets/img/bg-description.jpg") no-repeat center / cover;
    .container {
      display: flex;
      justify-content: space-between;
      .md-block({ flex-direction: column; });
      .col-text {
        position: relative;
        padding-top: 90px;
        padding-left: 90px;
        width: 50%;
        box-sizing: border-box;
        .decor-cube(290px, 290px);
        .lg-block({ padding-top: 60px; padding-left: 60px; .decor-cube(240px, 240px); });
        .md-block({ margin-bottom: 60px; width: 80%; });
        .sm-block({ width: 100%; max-width: 570px; });
        .xs-block({ margin-bottom: 40px; padding-left: 0; padding-top: 0; .decor-cube(@display: none;); });
        .content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .desc-light {
            margin-bottom: 10px;
            font-size: 1.4rem;
            color: #666666;
          }
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
          .g-btn {
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
        .sm-block({ width: auto; });
        .img {
          display: flex;
          margin-bottom: 40px;
          align-items: flex-end;
          justify-content: center;
          width: 100%;
          box-sizing: border-box;
          .sm-block({ width: auto; margin-bottom: 30px; });
          > img {
            max-height: 570px;
            .sm-block({ max-width: 300px; });
            .xs-block({ max-width: 250px; });
          }
        }
        .wrapper-president {
          display: flex;
          flex-direction: column;
          .post {
            margin-bottom: 10px;
            font-size: 1.4rem;
          }
          .name {
            font-size: 3.2rem;
            font-weight: 800;
            color: @colorMainSecondary;
            text-transform: uppercase;
            .sm-block({ font-size: 2.4rem; })
          }
        }
      }
    }
  }
</style>
