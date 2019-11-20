<template>
  <modal name='modal-ticket-success' transition="pop-out" height="auto" width="100%" :maxWidth="1170" :maxHeight="680"
         :adaptive="true"
         :scrollable="true" :classes="'custom-modals'" @before-open="beforeOpen">
    <div class="modal modal__ticket-success">
      <div class="modal__container modal__container--ticket-success">
        <div class="close-modal" @click="$modal.hide('modal-ticket-success')" title="Закрыть">
          <div class="close-modal__wrapper">
            <span class="close-modal__line"></span>
            <span class="close-modal__line"></span>
          </div>
        </div>
        <div class="success">
          <div class="success__icon">
            <img class="svg" svg-inline src="../../assets/img/icon/check.svg" alt="">
          </div>
          <div class="success__text-wrapper">
            <h2 class="title title--ticket-success">Спасибо!</h2>
            <strong class="success__text-bold">Ваша оплата успешно прошла</strong>
          </div>
        </div>
        <ticket-info :ticketArr="ticketArr"/>
      </div>
    </div>
  </modal>
</template>

<script>
import TicketInfo from '../TicketInfo'
export default {
  name: 'ModalTicketSuccess',
  components: {TicketInfo},
  data() {
    return {
      ticketArr: [
        {hash: 'T-D4D5DB6E161C1351', title: 'Стандарт', event: {title: 'Hello World', date: '28.10.2019 12:38', relation_id: 4}}
      ]
    }
  },
  methods: {
    beforeOpen (event) {
      this.ticketArr = event.params.ticket
    }
  }
}
</script>

<style scoped>

</style>
