<template>
  <div class="transaction-wrapper">
    <div class="transaction-item">
      <p class="g-caption g-caption-section">1 января 2020 года</p>
      <div class="transaction" v-for="item in 5">
        <div class="icon-transaction">
          <img class="icon" svg-inline src="@/assets/img/icon/right-arrow.svg" alt="">
        </div>
        <div class="info-wrapper">
          <div class="info">
            <p class="name">Пополнение кошелька</p>
            <p class="number">hjqwhdjqjw234kmdklj12332d</p>
          </div>
          <div class="sum">
            <p class="price">200 <span class="currency">usdb</span></p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminWalletTransaction'
}
</script>

<style scoped lang="less">
  @import '../../../assets/less/_importants';

  .transaction {
    display: flex;
    align-items: center;
    padding: 45px 55px;
    margin-bottom: 15px;
    box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);
    .md-block({
      padding: 40px 50px;
    });
    .sm-block({
      padding: 30px 30px 30px 20px;
    });
    .ss-block({align-items: flex-start;});
    .xs-block({
      padding: 20px;
    });
    .icon-transaction {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 60px;
      width: 45px;
      height: 45px;
      border-width: 1px;
      border-style: solid;
      border-color: #000;
      border-radius: 50%;
      flex-shrink: 0;
      box-sizing: border-box;
      .md-block({
        width: 40px;
        height: 40px;
        margin-right: 45px;
      });
      .sm-block({
        margin-right: 30px;
      });
      .ss-block({
        width: 30px;
        height: 30px;
        margin-right: 15px;
      });
      .icon {
        width: 25px;
        height: 25px;
        transform: rotate(90deg);
        .md-block({
          width: 18px;
          height: 18px;
        });
        .ss-block({
          width: 15px;
          height: 15px;
        });
        * {
          fill: #000;
        }
      }
    }
    .info-wrapper {
      display: flex;
      align-items: center;
      flex-grow: 1;
      .ss-block({
        flex-direction: column;
        align-items: flex-start;
      });
      .info {
        margin-right: auto;
        .ss-block({margin-bottom: 20px;});
        .name {
          margin-bottom: 10px;
          font-weight: 600;
          font-size: 2rem;
          .ss-block({margin-bottom: 5px;});
        }
        .number {
          color: #000;
        }
      }
      .price {
        display: flex;
        align-items: baseline;
        flex-shrink: 0;
        font-size: 5rem;
        font-weight: 800;
        color: @colorBlue;
        .xs-block({ font-size: 3.5rem; });
        .currency {
          margin-left: 10px;
          font-size: 2rem;
          color: #000;
          .xs-block({ font-size: 1.6rem; })
        }
      }
    }

  }
</style>
