<template>
  <section class="p-description p-default p-default-inner">
    <div class="container page">
      <h1 class="g-caption g-caption-inner">Информация о билете</h1>
      <ticket-search v-if="!profile.logged"/>

      <div class="wrapper-control" v-if="pageTickets && existTicket">
        <div class="wrapper-control__col wrapper-control__col--qr">
          <div class="ticket__qr-code" :style="{backgroundImage: `url(https://api.businessof.life/tickets/show?hash=${$route.params.id})`}"></div>
        </div>
        <div class="wrapper-control__col wrapper-control__col--number">
          <div class="info-number">
            <span class="info-number__small-text">Номер вашего билета</span>
            <strong class="info-number__number">{{this.$route.params.id}}</strong>
          </div>
          <div class="info-date">
            <p class="info-text info-date__date">
              <span class="info-text__regular">Дата покупки:</span>
              <strong class="info-text__strong">{{response.registered}}</strong>
            </p>
            <p class="info-text info-date__price">
              <span class="info-text__regular">Стоимость билета:</span>
              <strong class="info-text__strong">{{response.price}} {{response.currency}}</strong>
            </p>
          </div>
        </div>
        <div class="wrapper-control__col wrapper-control__col--status">
          <div class="info-status">
            <div class="info-status__status" :class="status[response.status]">
              <span class="info-status__text-small">Статус</span>
              <p class="info-status__text-strong strong-icon">
                <span class="strong-icon__text" v-if="status[response.status] === 'used'">Использован</span>
                <span class="strong-icon__text" v-else-if="status[response.status] === 'blocked'">Блокирован</span>
                <span class="strong-icon__text" v-else>Активен</span>
                <!--<span class="strong-icon__icon">-->
                  <!--<img class="strong-icon__svg" svg-inline src="../assets/img/icon/check.svg" alt="">-->
                <!--</span>-->
              </p>
            </div>
            <a href="#" class="g-btn g-btn--no-icon" @click.prevent="activateTicket" :class="{disabled: disabledBtn || status[response.status] === 'used' || status[response.status] === 'blocked'}" v-if="superV">
              <span>Использовать билет</span>
            </a>
          </div>
        </div>
      </div>
      <!--<div class="wrapper-control error">-->
        <!--<strong>{{errorTicket}}</strong>-->
      <!--</div>-->
    </div>
  </section>
</template>

<script>
import API from '../api/index'
import {mapState} from 'vuex'
import TicketSearch from '../components/TicketSearch'
export default {
  name: 'TheCheckTicket',
  components: {TicketSearch},
  data() {
    return {
      response: false,
      pageTickets: false,
      errorTicket: 'Билет не найден',
      disabledBtn: false,
      existTicket: false,
      superV: false,
      form: {
        hash: ''
      },
      status: {
        0: 'blocked',
        1: 'active',
        2: 'used'
      }
    }
  },
  computed: {
    ...mapState('user', [
      'profile'
    ]),
  },
  methods: {
    activateTicket() {
      API.tickets.use({hash: this.$route.params.id}).then(response => {
        this.checkTicked()
      }).catch(error => {
        console.log(error)
      })
    },
    checkTicked() {
      API.tickets.check({hash: this.$route.params.id}).then(response => {
        this.response = response.data
        this.existTicket = true
        this.btnSupervisor()
      }).catch(error => {
        console.log(error)
      })
    },
    btnSupervisor() {
      if(this.profile.supervisor !== undefined) {
        this.profile.supervisor.forEach(item => {
          if(item.id === this.response.event_relation_id) {
            this.superV = true
          }
        })
      } else {
        this.superV = false
      }
    },
  },
  mounted() {
    if(this.$route.params.id) {
      this.pageTickets = true
      this.checkTicked()
    }
  },

  watch: {
    '$route' (to, from) {
      if(this.$route.params.id) {
        this.pageTickets = true
        this.checkTicked()
      } else {
        this.pageTickets = false
        console.log(from)
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";

  .wrapper-control {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .lg-block({ justify-content: space-around;});
    .md-block({ flex-direction: column;});
    &__col {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .lg-block({ margin-bottom: 50px;});
      &--qr {
        width: 300px;
        height: 300px;
        .sm-block({ width: 200px; height: 200px;});
        .ticket__qr-code {
          width: 100%;
          height: 100%;
          background-size: contain;
        }
      }
      &--status {
        .lg-block({ width: 100%;})
      }
      .info-number {
        display: flex;
        flex-direction: column;
        margin-bottom: auto;
        .md-block({ margin-bottom: 40px;});
        &__small-text {
          margin-bottom: 15px;
        }
        &__number {
          font-size: 4rem;
          font-weight: 800;
          .md-block({ font-size: 3rem;});
        }
      }
      .g-btn {
        height: 72px;
        padding-top: 0;
        padding-bottom: 0;
        box-sizing: border-box;
        .md-block({ height: 60px;});
      }
      .info-status {
        display: flex;
        flex-direction: column;

        .lg-block({ margin: 0 auto; min-width: 300px;});
        .md-block({ margin-right: auto; margin-left:0;});
        &__status {
          padding: 30px 10px 60px 50px;
          margin-bottom: 45px;
          color: #000;
          border: 1px solid #000;
          .sm-block({ margin-bottom: 20px;});
          .xs-block({ padding-left: 30px; padding-bottom: 40px;});
          &.blocked,
          &.active,
          &.used {
            color: #fff;
            border: none;
          }
          &.blocked {
            background: rgba(226, 58, 58, 0.75);
          }
          &.active{
            background: rgba(93, 220, 105, 0.65);
          }
          &.used {
            background: rgba(226, 58, 58, 0.75);
          }
        }
        &__text-small {
          display: inline-block;
          margin-bottom: 20px;
          .xs-block({ margin-bottom: 12px;});
        }
        .strong-icon {
          display: flex;
          align-items: center;
          &__text {
            margin-right: 4vw;
            font-size: 2.4rem;
            font-weight: 800;
            text-transform: uppercase;
            .md-block({ font-size: 2rem;});
          }
          &__icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border: 2px solid #5ddc69;
            border-radius: 50%;
            box-sizing: border-box;
            flex-shrink: 0;
            .md-block({ width: 33px; height: 33px;});
            .xs-block({border-width: 1px; width: 28px; height: 28px;})
          }
          &__svg {
            width: 20px;
            height: 20px;
            .md-block({ width: 13px; height: 13px;});
            path {
              fill: #5ddc69;
            }
          }
        }

      }
      .info-date {
        &__date {
          margin-bottom: 30px;
        }
        .info-text {
          &__regular {
            margin-right: 20px;
            font-weight: 400;
          }
          &__strong {
            font-weight: 800;
          }
        }
      }
    }
  }
</style>
