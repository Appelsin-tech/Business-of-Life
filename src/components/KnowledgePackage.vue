<template>
  <div class="package" :class="item.title">
    <div class="info">
      <h3 class="g-caption-element g-caption-element--static">{{item.info.title}}</h3>
      <p class="duration-desc">доступ к базе знаний</p>
      <strong class="duration">{{item.info.term}} {{arrMonth[(item.info.term % 100 > 4 && item.info.term % 100 <
        20) ? 2: [2, 0, 1, 1, 1, 2][(item.info.term % 10 < 5) ? item.info.term % 10:5]]}}</strong>
      <div class="g-price">
        <p class="g-price-main">{{item.price}} <span class="currency">usd</span></p>
        <p class="g-price-secondary">({{item.price_kzt}} KZT)</p>
      </div>
      <a href="#" class="g-btn g-btn--no-icon"
         @click.prevent="buyItems(item)">
        <span>Получить доступ</span>
      </a>
    </div>
    <!--          <v-select ref="select" v-model="bonus['bonus_' + index]" :multiple="false" :class="['v-select__pricing']" placeholder="партнерский бонус" :searchable="false" :options="bonusOptions"></v-select>-->

  </div>
</template>

<script>
import API from '../api/index'
export default {
  name: 'KnowledgePackage',
  props: ['item'],
  data() {
    return {
      arrMonth: ['месяц', 'месяца', 'месяцев']
    }
  },
  methods: {
    buyItems(item) {
      API.store.buy({
        item_id: item.id
      }).then(response => {
        this.WidgetPayment(item.price_kzt, response.id)
      })
    },
    WidgetPayment(price, id) {
      const widget = new cp.CloudPayments()
      widget.charge({
        publicId: 'pk_e13f4353f48d3a9904042ccb2bffc',
        description: 'Покупка доступа к Базе Знаний',
        amount: price,
        currency: 'KZT',
        invoiceId: id,
        skin: 'mini',
        data: {}
      },
      (options) => {
        API.response.success('Вам открыт доступ')
        this.$store.dispatch('user/login')
        this.$router.push('/knowledge-access')
      },
      function (reason, options) {

      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .package {
    .col();
    .size(3);
    margin-bottom: 20px;
    .xl-block({
      width: 300px;
    });
    .sm-block({
      width: 250px;
      margin-bottom: 15px;
    });
    &.test{
      display: none;
    }
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;
      border-radius: 5px;
      height: 100%;
      box-sizing: border-box;
      .default-panel-style();
      .g-caption-element {
        margin-bottom: 30px;
        .sm-block({ margin-bottom: 20px; });
      }
      .duration-desc {
        margin-bottom: 8px;
      }
      .duration {
        margin-top: auto;
        margin-bottom: 50px;
        font-weight: 800;
        color: #000;
        text-transform: uppercase;
        .sm-block({
          margin-bottom: 20px;
        });
      }
    }
  }
</style>
