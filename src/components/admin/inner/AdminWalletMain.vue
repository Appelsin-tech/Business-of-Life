<template>
  <div class="wallet-wrapper">
    <div class="wallet">
      <div class="g-icon-circle g-icon-circle--wallet">BL</div>
      <div class="info-wrapper">
        <div class="info">
          <p class="g-caption-element g-caption-element--static">Business of Life Монеты </p>
          <div class="g-price--mb">
            <p class="g-price-main">{{balance.bol}} <span class="currency">BoL</span></p>
            <p class="g-price-secondary">({{balance.bol}} USD)</p>
          </div>
        </div>
        <div class="g-control-icon" v-if="false">
          <button class="g-icon-circle g-icon-circle--control g-icon-circle--control-green" v-tooltip.bottom="'Пополнить'" @click="">
            <img svg-inline class="svg-icon" src="../../../assets/img/icon/download.svg" alt="">
          </button>
          <button class="g-icon-circle g-icon-circle--control g-icon-circle--control-red" v-tooltip.bottom="'Вывести'" @click="">
            <img svg-inline class="svg-icon" src="../../../assets/img/icon/download.svg" alt="">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AdminWalletMain',
  computed: {
    ...mapState('wallet', [
      'balance'
    ])
  },
  mounted() {
    this.$store.dispatch('wallet/balance')
  }
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
      }
    }
  }
</style>
