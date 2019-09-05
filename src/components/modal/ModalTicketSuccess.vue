<template>
  <modal name='modal-ticket-success' transition="pop-out" height="auto" width="100%" :maxWidth="1170" :maxHeight="680"
         :adaptive="true"
         :scrollable="true" :classes="'custom-modals'">
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
        <div class="ticket">
          <div class="ticket__number">
            <span class="ticket__number-text--light">Номер вашего билета</span>
            <strong class="ticket__number-text--bold">T-798jkhk2343</strong>
          </div>
          <div class="ticket__qr-code" :style="{backgroundImage: `url(${getImgUrl('qr.png')})`}"></div>
        </div>
        <div class="btn-wrapper">
          <a href="#" class="g-btn g-btn--icon-left" download="#">
            <img svg-inline class="svg-icon svg-icon--download" src="../../assets/img/icon/download.svg" alt="">
            <span>Скачать билет</span>
          </a>
          <a href="#" class="btn">
            <img svg-inline class="btn__icon" src="../../assets/img/icon/telegram.svg" alt="">
            <span class="btn__text">Отправить билет на почту</span>
          </a>
          <a href="#" class="btn">
            <img svg-inline class="btn__icon" src="../../assets/img/icon/printer.svg" alt="">
            <span class="btn__text">Распечатать билет</span>
          </a>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ModalTicketSuccess',
  methods: {
    getImgUrl(src) {
      const image = require(`../../assets/img/${src}`)
      return image
    }
  }
}
</script>

<style scoped>

</style>
