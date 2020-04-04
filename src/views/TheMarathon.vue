<template>
  <div>
    <section class="p-marathon p-default-flex">
      <div class="container page">
        <div class="wrapper-content">
          <div class="content">
            <h1 class="visually-hidden">Марафон "Корона на миллион"</h1>
            <strong class="g-caption-inner">Марафон</strong>
            <strong class="desc-strong g-caption">«Корона на Миллион»</strong>
            <p class="desc-connect" >Прими участие БЕСПЛАТНО!</p>
            <p class="desc-connect" >Развивайся онлайн - прокачай свой личный бренд и получи возможности новых технологий и бизнеса в Интернет</p>
            <router-link to="/description" class="g-btn g-btn--no-icon">
              <span>Стать участником</span>
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <section class="s-description">
      <div class="container">
        <h2 class="g-caption-inner">О марафоне</h2>
        <div class="col-wrapper">
          <div class="col-iframe">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/qD2Q2AJnWTY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div class="col-text">
            <div class="content">
              <div class="item">
                <p class="title-info"><strong>Организаторы:</strong></p>
                <p class="info">Международная академия интернет предпринимателей <a href="https://businessof.life/" target="_blank">Business of Life</a></p>
                <p class="info">в партнерстве с платформой для инвесторов и стартапов <a href="https://crowdsale.network/" target="_blank">Crowdsale Network</a></p>
              </div>
              <div class="item">
                <p class="title-info"><strong>Формат:</strong> Онлайн задания</p>
              </div>
              <div class="item">
                <p class="title-info"><strong>Стомость участия:</strong> <span>Бесплатно</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="s-prize">
      <div class="container">
        <h2 class="g-caption-inner">Призовой фонд</h2>
        <div class="col-wrapper">
          <div class="col-img">
            <img src="@/assets/img/prize.png" alt="">
          </div>
          <div class="col-content">
            <p class="sum-red">2 000 000 CSNP</p>
            <p class="desc-sum g-caption-section">Эквивалент 2 миллионов токенов ~ 200'000$</p>
            <div class="desc-wrapper">
              <div class="item">
                <p class="item-title">Победитель получит</p>
                <p class="sum-blue"><strong class="g-caption-inner">1 000 000</strong>  <span>CSNP</span></p>
              </div>
              <div class="item">
                <p class="item-title">Дополнительно</p>
                <p class="sum-blue"><strong class="g-caption-inner">1 000 000</strong>  <span>CSNP</span></p>
                <p class="item-desc">(будет поровну распределен между финалистами марфона)</p>
              </div>
            </div>
            <p class="desc-bottom">
              CSNP - цифровой актив платформы Crowdsale Network, которая торгуется на Европейских криптовалютных биржах:
              <a href="https://coinsbit.io/" target="_blank">www.coinsbit.io</a> и <a href="https://p2pb2b.io/" target="_blank">www.p2pb2b.io</a><br>
              Всего на рынок выпущено 50 000 000 токенов.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>

<script>
export default {
  name: 'TheMarathon'
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .p-marathon {
    background: #0f1d5f;
    .wrapper-content {
      position: relative;
      padding-top: 80px;
      box-sizing: border-box;
      z-index: 2;
      transform: translateY(-6%);
      max-width: 60%;
      @media screen and (max-height: 520px) {
        transform: translateY(0);
      }
      .lg-block({max-width: 67%;});
      .md-block({max-width: 90%;});
      .content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        z-index: 5;
        color: #fff;
        .g-caption {
          margin-bottom: 40px;
          color: #fff;
          text-transform: initial;
          .lg-block({ margin-bottom: 30px;});
          &-inner {
            color: #fff;
            margin-bottom: 20px;
            .sm-block({
              margin-bottom: 10px;})
          }
        }
        .desc-connect {
          margin-bottom: 20px;
          font-size: 1.8rem;
          .sm-block({  font-size: 1.6rem;
            margin-bottom: 10px;})
        }
        .g-btn {
          margin-top: 20px;
        }
      }
    }
  }
  .s-description {
    padding: 100px 0 50px;
    .lg-block({
      padding: 80px 0 40px;});
    .xs-block({
      padding: 50px 0 25px;});
    .col-wrapper {
      display: flex;
      justify-content: space-between;
      .md-block({ flex-direction: column; });
      .col-iframe {
        width: 50%;
        margin-right: 100px;
        .md-block({
          height: 250px;
          margin-right: 0;
          margin-bottom: 30px;});
        .sm-block({
          width: 100%;});
      }
      .col-text {
        .content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.5;
          padding-top: 15px;
          .item {
            margin-bottom: 30px;
            .sm-block({
              margin-bottom: 20px;});
            &:first-child {
              .info:last-of-type {
                margin-bottom: 0;
              }
            }
            &:nth-child(2) {
              .title-info {
                margin-bottom: 0;
                strong {
                  margin-right: 1em;
                }
              }
            }
            &:nth-child(3) {
              .title-info {
                display: flex;
                flex-direction: column;
                strong {
                  margin-bottom: 15px;
                  .sm-block({
                    margin-bottom: 10px;});
                }
              }
            }
            .title-info {
              margin-bottom: 20px;
              .sm-block({
                margin-bottom: 15px;});
              strong {
                font-weight: 600;
              }
            }
            .info {
              margin-bottom: 15px;
              .sm-block({
                margin-bottom: 10px;});
              a {
                color: @colorMainSecondary;
                border-bottom: 1px solid @colorMainSecondary;
                transition: 0.3s;
                &:hover {
                  border-bottom-color: transparent;
                }
              }
            }
          }
        }
      }
    }
  }
  .s-prize {
    margin-bottom: 250px;
    padding: 50px 0;
    .lg-block({
      padding: 40px 0;});
    .xs-block({
      padding: 25px 0;});
    .col-wrapper {
      display: flex;
      justify-content: space-between;
      margin-top: 80px;
      .md-block({ flex-direction: column;
        margin-top: 0;});
      .col-img {
        max-width: 30%;
        margin-right: 100px;
        .md-block({
          margin-right: 0;
          margin-bottom: 40px;});
        .xs-block({
          margin-right: 0;
          margin-bottom: 25px;});
      }
      .col-content {
        .sum-red {
          display: block;
          font-size: 7rem;
          font-weight: 800;
          text-transform: uppercase;
          color: @colorMain;
          margin-bottom: 20px;
          .lg-block({
            font-size: 5rem;
          });
          .sm-block({
            font-size: 4rem;
            margin-bottom: 10px;
          });
          .xs-block({
            font-size: 2.6rem;
          });
        }
        .desc-sum {
          margin-bottom: 50px;
          .lg-block({
            margin-bottom: 35px;});
        }
        .desc-wrapper {
          display: flex;
          margin-bottom: 50px;
          .lg-block({
            margin-bottom: 35px;});
          .sm-block({
            flex-direction: column;});
          .item {
            &:first-child {
              margin-right: 100px;
              flex-shrink: 0;
              .lg-block({
                margin-right: 70px;});
              .sm-block({
                margin-right: 0;
                margin-bottom: 20px;});
            }
            .item-title {
              font-size: 2rem;
              font-weight: 800;
              color: #000;
              .lg-block({
                font-size: 1.8rem;
              });
              .xs-block({
                font-size: 1.6rem;
              });
            }
            .sum-blue {
              color: @colorMainSecondary;
              font-weight: 400;
              font-size: 2rem;
              .lg-block({
                font-size: 1.8rem;
              });
              .xs-block({
                font-size: 1.6rem;
              });
              strong {
                display: inline-block;
                margin-right: 15px;
                margin-bottom: 0;
              }
            }
            .item-desc {

            }
          }
        }
        .desc-bottom {
          line-height: 1.5;
          a {
            color: @colorMainSecondary;
            transition: 0.3s;
            border-bottom: 1px solid @colorMainSecondary;
            &:hover {
              border-bottom-color: transparent;
            }
          }
        }
      }
    }
  }
</style>
