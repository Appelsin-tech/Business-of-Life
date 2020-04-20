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
        <div class="g-wrapper-btn-f" v-if="true">
          <button-app-function icon="icon-upload" v-tooltip.bottom="'Пополнить'" @click.native=""></button-app-function>
          <button-app-function icon="icon-download" v-tooltip.bottom="'Пополнить'" @click.native=""></button-app-function>
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
      margin-bottom: 15px;
      .default-panel-style();
      .info-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-grow: 1;
        .ss-block({
          flex-direction: column;
          align-items: flex-start;
        });
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
