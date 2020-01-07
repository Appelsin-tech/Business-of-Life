<template>
  <div class="wallet-wrapper">
    <p class="g-caption g-caption-section">Кошельки</p>
    <div class="wallet">
      <div class="icon-wallet">BL</div>
      <div class="info-wrapper">
        <div class="info">
          <p class="title">Business of Life Монеты </p>
          <p class="price">200 <span class="currency">usdb</span></p>
          <p class="price-secondary">(1000 KZT)</p>
        </div>
        <div class="control">
          <button class="control-link control-link--refractor" v-tooltip.bottom="'Пополнить'" @click="">
            <img svg-inline class="control-link__icon" src="../../../assets/img/icon/download.svg" alt="">
          </button>
          <button class="control-link control-link--bring-out" v-tooltip.bottom="'Вывести'" @click="">
            <img svg-inline class="control-link__icon" src="../../../assets/img/icon/download.svg" alt="">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminWalletMain'
}
</script>

<style scoped lang="less">
  @import '../../../assets/less/_importants';
  .wallet-wrapper {
    display: flex;
    flex-direction: column;
    .wallet {
      display: flex;
      padding: 45px 55px;
      margin-bottom: 15px;
      box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);
      .md-block({
        padding: 40px 50px;
      });
      .sm-block({
        padding: 30px 30px 30px 20px;
      });
      .xs-block({
        padding: 20px;
      });
      .icon-wallet {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 60px;
        width: 45px;
        height: 45px;
        border-width: 1px;
        border-style: solid;
        border-color: @colorBlue;
        border-radius: 50%;
        flex-shrink: 0;
        box-sizing: border-box;
        color: @colorBlue;
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
      }
      .info-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-grow: 1;
        .ss-block({
          flex-direction: column;
          align-items: flex-start;
        })
      }
      .info {
        margin-right: auto;
        padding-right: 50px;
        .sm-block({
          padding-right: 30px;
        });
        .ss-block({
          margin-bottom: 30px;
          padding-right: 0;
        });
        .title {
          display: block;
          margin-bottom: 15px;
          font-weight: 800;
          font-size: 2rem;
          color: #000;
          .md-block({
            font-size: 1.6rem;
            margin-bottom: 10px;
          });
        }
        .price {
          display: flex;
          align-items: baseline;
          flex-shrink: 0;
          margin-bottom: 5px;
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
          &-secondary {
            font-weight: 400;
          }
        }
      }

      .tooltip {
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 5px 10px;
        background: #fff;
        border-radius: 3px;
        &__text {
          &::after {
            content: " ";
            position: absolute;
            bottom: 100%; /* At the top of the tooltip */
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent black transparent;
          }
        }
      }
      .control {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-wrap: wrap;
        max-width: 160px;
        .control-link {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1px solid #d6d6d6;
          transition: 0.3s;
          cursor: pointer;
          margin-right: 10px;
          margin-bottom: 10px;
          .md-block({
            width: 40px;
            height: 40px;
          });
          &:hover {
            border-color: #000;
            .control-link__icon {
              path {
                fill: #000;
              }
            }
          }
          &--bring-out {
            transform: rotate(180deg);
          }
          &__icon {
            width: 25px;
            height: 25px;
            .md-block({
              width: 18px;
              height: 18px;
            });
            path {
              transition: 0.3s;
              fill: #d6d6d6;
            }
          }
        }
      }
    }
  }
</style>
