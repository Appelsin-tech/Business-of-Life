<template>
  <section class="p-pricing p-default p-default-inner">
    <div class="container page">
      <div class="content">
        <p class="desc-light">База знаний</p>
        <h1 class="g-caption">Доступ к базе знаний</h1>
        <p class="desc-bold">Приобретите пакет, чтобы получить доступ к базе знаний Business of Life</p>
      </div>
      <div class="package-wrapper">
        <div class="package" v-for="(item, index) in bonusOptions">
          <div class="info">
            <h3 class="title">{{item.info.title}}</h3>
            <p class="duration-desc">доступ к базе знаний</p>
            <strong class="duration">{{item.info.term}} {{arrMonth[(item.info.term % 100 > 4 && item.info.term % 100 <
              20) ? 2: [2, 0, 1, 1, 1, 2][(item.info.term % 10 < 5) ? item.info.term % 10:5]]}}</strong>
            <p class="price">{{item.price}} <span class="currency">usd</span></p>
            <p class="price-secondary">({{item.price_kzt}} KZT)</p>
            <a href="#" class="g-btn g-btn--no-icon"
               @click.prevent="buyItems(item)">
              <span>Получить доступ</span>
            </a>
          </div>
          <!--          <v-select ref="select" v-model="bonus['bonus_' + index]" :multiple="false" :class="['v-select__pricing']" placeholder="партнерский бонус" :searchable="false" :options="bonusOptions"></v-select>-->

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import API from '../api/index'

export default {
  name: 'TheKnowledge',
  data() {
    return {
      bonus: {},
      bonusOptions: [],
      arrMonth: ['месяц', 'месяца', 'месяцев']
    }
  },
  async mounted() {
    await API.store.items('knowledge').then(response => {
      this.bonusOptions = response
    })
  },
  methods: {
    buyItems(item) {
      API.store.buy({
        item_id: item.id
      }).then(response => {
        this.WidgetPayment(item.price_kzt, response.id)
        console.log(response)
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
        data: {
        }
      },
      (options) => {
        API.response.success('Вам открыт доступ')
        this.$store.dispatch('user/login')
      },
      function (reason, options) {

      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .p-pricing {
    background: #0f1d5f;
    .container {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .content {
        position: relative;
        margin-bottom: 100px;
        padding-top: 90px;
        padding-left: 90px;
        box-sizing: border-box;
        .decor-cube(290px, 290px);
        .lg-block({
          padding-top: 60px;
          padding-left: 60px;
          .decor-cube(240px, 240px);
        });
        .md-block({
          margin-bottom: 60px;
          width: 80%;
        });
        .sm-block({
          width: 100%;
          max-width: 570px;
          .decor-cube(200px, 200px);
        });
        .xs-block({
          margin-bottom: 40px;
          padding-left: 0;
          padding-top: 0;
          .decor-cube(@display: none;);
        });
        .g-caption {
          margin-bottom: 30px;
          color: #fff;
        }
        .desc-light {
          margin-bottom: 10px;
          font-size: 1.4rem;
          color: #fff;
        }
        .desc-bold {
          max-width: 550px;
          font-size: 1.8rem;
          font-weight: 800;
          line-height: 2.5rem;
          color: #fff;
          .sm-block({
            line-height: 2.2rem;
            font-weight: 600;
            font-size: 1.6rem;
          });
        }
      }
      .package-wrapper {
        .row-flex();
        padding-left: 90px;
        justify-content: center;
        .xxl-block({
          padding-left: 0px;
        });
        .package {
          .col();
          .size(3);
          margin-bottom: 20px;
          .xl-block({
            width: 300px;
          });
          .sm-block({
            width: 250px;
            margin-bottom: 30px;
          });
          .info {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 30px;
            margin-bottom: 15px;
            background: #fff;
            border-radius: 5px;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.4);
            .xs-block({
              padding: 20px;
              margin-bottom: 10px;
            });
            .title {
              margin-bottom: 50px;
              font-size: 3rem;
              font-weight: 800;
              color: #000;
              text-transform: uppercase;
              .lg-block({
                font-size: 2.4rem;
              });
              .sm-block({
                font-size: 2rem;
                margin-bottom: 20px;
              });
            }
            .duration-desc {
              margin-bottom: 8px;
            }
            .duration {
              margin-bottom: 50px;
              font-size: 1.8rem;
              font-weight: 800;
              color: #000;
              text-transform: uppercase;
              .sm-block({
                margin-bottom: 20px;
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
              .xs-block({
                font-size: 3.5rem;
              });
              .currency {
                margin-left: 10px;
                font-size: 2rem;
                color: #000;
                .xs-block({
                  font-size: 1.6rem;
                })
              }
            }
            .price-secondary {
              margin-bottom: 50px;
              font-weight: 400;
              .sm-block({
                margin-bottom: 30px;
              });
            }
          }
        }
      }
    }
  }
</style>
