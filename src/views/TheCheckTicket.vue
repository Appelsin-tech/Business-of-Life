<template>
  <section class="p-description p-default p-default-inner">
    <bread-crumbs v-if="logged" :arrCrumbs="[]"/>
    <div class="container page">
      <h1 class="g-caption-inner">Информация о билете</h1>
      <ticket-search v-if="logged"/>
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
            <p class="info-text">
              <span class="info-text__regular">Событие:</span>
              <router-link :to="`/event/${ticket.event.relation_id}`" class="info-text__strong link">{{ticket.event.title}}</router-link>
            </p>
            <p class="info-text info-date__date">
              <span class="info-text__regular">Дата и время:</span>
              <strong class="info-text__strong">{{parseDate}}</strong>
            </p>
            <p class="info-text info-date__price">
              <span class="info-text__regular">Билет:</span>
              <strong class="info-text__strong">{{ticket.title}}</strong>
            </p>
          </div>
        </div>
        <div class="wrapper-control__col wrapper-control__col--status">
          <div class="info-status">
            <div class="info-status__status" :class="status[ticket.status]">
              <span class="info-status__text-small">Статус</span>
              <p class="info-status__text-strong strong-icon">
                <span class="strong-icon__text" v-if="status[ticket.status] === 'used'">Использован</span>
                <span class="strong-icon__text" v-else-if="status[ticket.status] === 'blocked'">Блокирован</span>
                <span class="strong-icon__text" v-else-if="status[ticket.status] === 'extended'">Продлен</span>
                <span class="strong-icon__text" v-else>Активен</span>
              </p>
            </div>
            <div class="btn-wrapper">
              <a href="#" v-if="superV" class="g-btn g-btn--no-icon" @click.prevent="activateTicket(false)" :class="{disabled: disabledBtn || status[ticket.status] === 'used' || status[ticket.status] === 'blocked'}" >
                <span>Закрыть билет</span>
              </a>
              <a href="#" v-if="status[ticket.status] === 'active' && superV" class="g-btn g-btn--no-icon g-btn--white" @click.prevent="activateTicket(true)" :class="{disabled: disabledBtn || status[ticket.status] === 'used' || status[ticket.status] === 'blocked'}">
                <span>Продлить билет</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import API from '../api/index'
import { mapState, mapGetters } from 'vuex'
import TicketSearch from '../components/TicketSearch'
import BreadCrumbs from '../components/BreadCrumbs'
export default {
  name: 'TheCheckTicket',
  components: { TicketSearch, BreadCrumbs },
  data () {
    return {
      ticket: false,
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
        2: 'extended',
        3: 'used'
      }
    }
  },
  computed: {
    ...mapState('user', [
      'profile'
    ]),
    ...mapGetters('user', [
      'logged'
    ]),
    parseDate () {
      if (this.ticket.event.date) {
        let onlyDate = this.ticket.event.date.split(' ')
        let [day, month, year] = onlyDate[0].split('.')
        let da = new Date(year, month - 1, day)
        return da.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' }) + ' ' + onlyDate[1]
      } else {
        return '00'
      }
    }
  },
  methods: {
    activateTicket (extend) {
      API.tickets.use({ hash: this.$route.params.id, extend: extend }).then(response => {
        this.checkTicked()
      }).catch(error => {
        console.log(error)
      })
    },
    checkTicked () {
      API.tickets.check({ hash: this.$route.params.id }).then(response => {
        this.ticket = response.data
        this.existTicket = true
        this.btnSupervisor()
      }).catch(error => {
        console.log(error)
      })
    },
    btnSupervisor () {
      if (this.profile.supervisor !== undefined) {
        this.profile.supervisor.forEach(item => {
          if (item.id === this.ticket.event.relation_id) {
            this.superV = true
          }
        })
      } else {
        this.superV = false
      }
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.pageTickets = true
      this.checkTicked()
    }
  },

  watch: {
    '$route' (to, from) {
      if (this.$route.params.id) {
        this.pageTickets = true
        this.checkTicked()
      } else {
        this.pageTickets = false
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";

  .wrapper-control {
    .row-flex();
    display: flex;
    flex-wrap: wrap;
    .sm-block({ flex-direction: column;});
    &__col {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 50px;
      .col();
      &--qr {
        .size(3.75);
        .size-lg(5.5);
        .size-sm(8);
        .size-ss(12);
        .ticket__qr-code {
          width: 300px;
          height: 300px;
          margin-left: -13px;
          margin-top: -13px;
          background-size: contain;
          .sm-block({ width: 200px; height: 200px;
            margin-top: 0; margin-left: -9px;});
        }
      }
      &--status {
        .size(3.75);
        .size-lg(5.5);
        .size-sm(8);
        .size-ss(12);
      }
      &--number {
        padding-bottom: 13px;
        .size(4);
        .size-xxl(5);
        .size-lg(6);
        .size-sm(12);
        .shift(0.25);
        .shift-sm(0);
        .size-xs(12);
        .shift-xs(0);
      }
      .info-number {
        display: flex;
        flex-direction: column;
        margin-bottom: 97px;
        .sm-block({ margin-bottom: 40px;});
        &__small-text {
          margin-bottom: 15px;
        }
        &__number {
          font-size: 3.5rem;
          font-weight: 800;
          .md-block({ font-size: 3rem;});
        }
      }
      .btn-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .g-btn {
          min-width: 210px;
          height: 72px;
          padding-top: 0;
          padding-bottom: 0;
          box-sizing: border-box;
          margin-bottom: 20px;
          .md-block({ height: 60px;});
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
      .info-status {
        display: flex;
        flex-direction: column;
        width: 100%;
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
          &.extended,
          &.used {
            color: #fff;
            border: none;
          }
          &.blocked {
            background: rgba(226, 58, 58, 0.75);
          }
          &.extended,
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
        .g-btn {
          align-self: flex-start;
        }
      }
      .info-date {
        .info-text {
          margin-bottom: 20px;
          &:last-child {
            margin-bottom: 0;
          }
          &__regular {
            margin-right: 20px;
            font-weight: 400;
          }
          &__strong {
            font-weight: 800;
            &.link {
              text-transform: uppercase;
              color: #000;
              text-decoration: underline;
              &:hover {
                text-decoration: none;
              }
            }
          }
        }
      }
    }
  }
</style>
