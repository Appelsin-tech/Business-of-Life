<template>
  <modal name='modal-calendar-events' transition="pop-out" height="auto" width="100%" :maxWidth="1170" :maxHeight="680"
         :adaptive="true"
         :scrollable="true" :classes="'custom-modals'">
    <div class="modal modal__event-edit">
      <div class="close-modal" @click="$modal.hide('modal-calendar-events')" title="Закрыть">
        <div class="close-modal__wrapper">
          <span class="close-modal__line"></span>
          <span class="close-modal__line"></span>
        </div>
      </div>
      <div class="modal__container">

      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ModalCalendarRelations'
}
</script>

<style scoped>

</style>
