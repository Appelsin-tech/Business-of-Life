<template>
  <modal name='modal-calendar-event' transition="pop-out" height="auto" :maxWidth="900"
         :adaptive="true"
         :scrollable="true" :classes="'custom-modals'" @before-open="beforeOpen" @before-close="beforeClose">
    <div class="modal modal__calendar-event">
      <div class="close-modal" @click="$modal.hide('modal-calendar-event')" title="Закрыть">
        <div class="close-modal__wrapper">
          <span class="close-modal__line"></span>
          <span class="close-modal__line"></span>
        </div>
      </div>
      <div class="modal__container">
        <div class="relation" v-for="relation in relations" :key="relation.id">
          <router-link :to="`event/${relation.id}`" class="g-caption-element">{{relation.title}}</router-link>
          <ul class="info-list">
            <li>{{relation.date}}</li>
            <li>{{relation.city}}</li>
            <li>{{relation.address}}</li>
          </ul>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ModalCalendarEvent',
  data() {
    return {
      relations: []
    }
  },
  methods: {
    beforeOpen(event) {
      if(event.params !== undefined) {
        this.relations = event.params.relations
      }
    },
    beforeClose(event) {

    }
  }
}
</script>

<style scoped>

</style>
