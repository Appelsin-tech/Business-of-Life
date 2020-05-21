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
            <icon-check class="g-icon"/>
          </div>
          <div class="success__text-wrapper">
            <h2 class="g-caption-inner g-caption-inner--ticket">Спасибо!</h2>
            <strong class="success__text-bold">Ваша оплата успешно прошла</strong>
          </div>
        </div>
        <ticket-info :ticketArr="ticketArr" class="modal"/>
        <div class="info">
          <span class="g-icon-attention">i</span>
          <div class="text">
            <p>Ссылка на билет была отправлена на {{email}}</p>
            <p>Чтобы пройти на мероприятие покажите QR-код или назовите номер билета контролеру</p>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import TicketInfo from '../TicketInfo'

export default {
  name: 'ModalTicketSuccess',
  components: { TicketInfo },
  data() {
    return {
      ticketArr: [
        { hash: 'T-', title: 'Стандарт', event: { title: 'Test', date: '28.10.2019 12:38', relation_id: 4 } }
      ],
      email: ''
    }
  },
  methods: {
    beforeOpen(event) {
      this.ticketArr[0] = event.params.ticket
      this.email = event.params.email
    }
  }
}
</script>

<style scoped>

</style>
