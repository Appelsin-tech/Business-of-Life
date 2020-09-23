<template>
  <section>
    <div class="transaction-wrapper" v-if="filterTransaction.length > 0">
      <div class="transaction-item" v-for="item in filterTransaction" :key="item.date">
        <p class="g-caption-section">{{item.date |  moment("D MMMM YYYY")}}</p>
        <div class="transaction" v-for="(trans, index) in item.trans" :key="index">
          <div class="g-icon-circle">
            <icon-arrow-right class="g-icon"/>
          </div>
          <div class="info-wrapper">
            <div class="info">
              <p class="name" v-show="trans.type === 'o'">Покупка</p>
              <div v-if="trans.info.type === 'ticket'">
                <p v-if="trans.info.pay_method === 'card'">{{trans.info.card_num}}</p>
                <p v-else>Билет на мероприятие: {{trans.info.event_title}}</p>
              </div>
              <div v-if="trans.info.type === 'item'">
                <p v-if="trans.info.pay_method === 'card'">{{trans.info.card_num}}</p>
                <p v-else>{{trans.info.item_id}}</p>
              </div>
            </div>
            <div class="g-price--mb">
              <p class="g-price-main">{{trans.amount}} <span class="currency">{{trans.currency}}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="preloader" v-if="transaction.length === 0">
      <panel-info>У вас еще нет транзакций</panel-info>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import PanelInfo from '../../ui/PanelInfo'
export default {
  name: 'AdminWalletTransaction',
  data() {
    return {
      transactionNull: false
    }
  },
  components: {
    PanelInfo
  },
  computed: {
    ...mapState('wallet', [
      'transaction'
    ]),
    ...mapGetters('wallet', [
      'filterTransaction'
    ])
  },
  mounted() {
    this.$store.dispatch('wallet/history')
  }
}
</script>

<style scoped lang="less">
  @import '../../../assets/less/_importants';
  .transaction {
    display: flex;
    align-items: center;
    padding: 45px 55px;
    margin-bottom: 15px;
    .default-panel-style();
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
    &-item {
      margin-bottom: 45px;
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
          font-size: 2.2rem;
          color: var(--app_title-panel__color);
          .sm-block({
            font-size: 1.8rem;});
          .ss-block({margin-bottom: 5px;});
        }
      }
    }
  }
  .preloader {
    .icon-preload {
      width: 50px;
      height: 50px;
    }
  }
</style>
