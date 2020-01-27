<template>
  <div class="ticket">
    <h3 class="g-caption-element g-caption-element--static">{{ticket.title}}</h3>
    <div class="description editor" v-html="ticket.desc"></div>
    <div class="g-price">
      <p class="g-price-main">{{ticket.price}} <span class="currency">{{ticket.currency}}</span></p>
      <p class="g-price-secondary">({{ticket.price_kzt}} KZT)</p>
    </div>
    <a href="#" class="g-btn g-btn--no-icon" v-if="btn"
       @click.prevent="openModalPurchase">
      <span>Купить билет</span>
    </a>
    <div class="g-control-icon g-control-icon--ticket" v-else>
      <button class="g-icon-circle g-icon-circle--control g-icon-circle--control-green" v-tooltip.bottom="'Редактировать'" @click="$modal.show('modal-ticket-create', {ticket: ticket})">
        <img svg-inline class="svg-icon" src="../assets/img/icon/pencil.svg" alt="">
      </button>
      <button class="g-icon-circle g-icon-circle--control g-icon-circle--control-red" v-tooltip.bottom="'Удалить'" @click="deleteTicket">
        <img svg-inline class="svg-icon" src="../assets/img/icon/basket.svg" alt="">
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
    margin-bottom: 20px;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    border-radius: 5px;
    .default-panel-style();
    .sm-block({ margin-bottom: 15px;});
    .g-caption-element {
      margin-bottom: 30px;
      text-align: center;
      .sm-block({ margin-bottom: 20px; });
    }
    .description {
      flex-grow: 1;
      margin-bottom: 40px;
      .sm-block({ margin-bottom: 25px; });
      .xs-block({ margin-bottom: 15px; });
    }
    .control {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-wrap: wrap;
      max-width: 160px;
      margin-left: auto;
      margin-top: 30px;
    }
  }
</style>
