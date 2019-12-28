<template>
  <div class="ticket">
    <h3 class="title">{{ticket.title}}</h3>
    <div class="description editor" v-html="ticket.desc"></div>
    <p class="price">{{ticket.price}} <span class="currency">{{ticket.currency}}</span></p>
    <p class="price-secondary">({{ticket.price_kzt}} KZT)</p>
    <a href="#" class="g-btn g-btn--no-icon" v-if="btn"
       @click.prevent="openModalPurchase">
      <span>Купить билет</span>
    </a>
    <div class="control" v-else>
      <button class="control__link control-link control-link--refractor" v-tooltip.bottom="'Редактировать'" @click="$modal.show('modal-ticket-create', {new: false, ticket: ticket})">
        <img svg-inline class="control-link__icon" src="../assets/img/icon/pencil.svg" alt="">
      </button>
      <button class="control__link control-link control-link--delete" v-tooltip.bottom="'Удалить'" @click="deleteTicket">
        <img svg-inline class="control-link__icon" src="../assets/img/icon/basket.svg" alt="">
      </button>
    </div>
<!--    <button @click="newTicket" class="test-btn">RUCHNIOI VIPUSK </button>-->
  </div>
</template>

<script>
import API from '../api/index'
export default {
  name: 'Ticket',
  props: ['btn', 'ticket', 'event'],
  methods: {
    // newTicket() {
    //   API.tickets.issue({ id: this.ticket.id}).then((response) => {
    //     console.log(response)
    //   })
    // },
    deleteTicket() {
      API.tickets.delete({id: this.ticket.id}).then(response => {
        API.response.success('Билет удален')
        this.$root.$emit('ticket-edit')
      })
    },
    openModalPurchase() {
      API.tickets.fields({id: this.ticket.id}).then( response => {
        this.$modal.show('modal-ticket-purchase', {
          price: this.ticket.price_kzt,
          currency: 'KZT',
          fields: response.data,
          ticket_id: this.ticket.id,
          event_id: this.event.id,
          country: this.event.country,
          city: this.event.city
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";

  .ticket {
    .col();
    .size(3);
    .size-lg(4);
    .size-md(5);
    .size-sm(6);
    .size-ss(10);
    .size-xs(12);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 30px;
    margin-bottom: 25px;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    .sm-block({ padding: 30px 20px; box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2); });
    .title {
      margin-bottom: 30px;
      font-size: 3rem;
      font-weight: 800;
      color: #000;
      .lg-block({ font-size: 2.4rem; });
      .sm-block({ font-size: 2rem; margin-bottom: 20px; });
      .xs-block({ font-size: 1.6rem; margin-bottom: 10px; });
    }
    .description {
      flex-grow: 1;
      margin-bottom: 40px;
      .sm-block({ margin-bottom: 25px; });
      .xs-block({ margin-bottom: 15px; });
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
    .control {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-wrap: wrap;
      max-width: 160px;
      margin-left: auto;
      margin-top: 30px;
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
        .md-block({ width: 40px; height: 40px; });
        &--refractor {
          &:hover {
            border-color: @colorSuccess;
            .control-link__icon {
              path {
                fill: @colorSuccess;
              }
            }
          }
        }
        &--delete {
          &:hover {
            border-color: @colorError;
            .control-link__icon {
              path {
                fill: @colorError;
              }
            }
          }
        }
        &__icon {
          width: 25px;
          height: 25px;
          .md-block({ width: 18px; height: 18px; });
          path {
            transition: 0.3s;
            fill: #d6d6d6;
          }
        }
      }
    }
    .g-btn {
      margin-top: 30px;
    }
  }
</style>
