<template>
  <div class="wallet-wrapper">
    <div class="wallet">
      <div class="g-icon-circle g-icon-circle--wallet">NCP</div>
      <div class="info-wrapper">
        <div class="info">
          <p class="g-caption-element g-caption-element--static">Nayuta Cash Points Монеты </p>
          <div class="g-price--mb">
            <p class="g-price-main">{{balance.ncp}} <span class="currency">NCP</span></p>
            <p class="g-price-secondary">({{balance.ncp}} USD)</p>
          </div>
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
        .g-caption-element {
          margin-bottom: 5px;
        }
      }
    }
  }
</style>
