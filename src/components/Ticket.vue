<template>
  <div class="ticket g-panel">
    <h3 class="g-caption-element g-caption-element--static">{{ticket.title}}</h3>
    <div class="description editor ul-pdl-0" v-html="ticket.desc"></div>
    <div class="g-price">
      <p class="g-price-main">{{ticket.price}} <span class="currency">{{ticket.currency}}</span></p>
      <p class="g-price-secondary">({{ticket.price_kzt}} KZT)</p>
    </div>
    <button-app @click.native="openModalPurchase" v-if="btn">
      Купить билет
    </button-app>
    <div class="g-wrapper-btn-f g-wrapper-btn-f--static" v-else>
      <button-app-function icon="icon-lead-pencil" v-tooltip.bottom="'Редактировать'" @click.native="$modal.show('modal-ticket-create', {ticket: ticket})"></button-app-function>
      <button-app-function icon="icon-delete" v-tooltip.bottom="'Удалить'" @click.native="deleteTicket"></button-app-function>
    </div>
    <generate-ticket :id="ticket.id" v-if="false"/>
<!--    <button @click="newTicket" class="test-btn">RUCHNIOI VIPUSK </button>-->
  </div>
</template>

<script>
import GenerateTicket from '@/components/helpers/GenerateTicket'
import API from '../api/index'

export default {
  name: 'Ticket',
  props: ['btn', 'ticket', 'event'],
  components: {
    GenerateTicket
  },
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
