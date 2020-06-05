<template>
  <modal name='modal-connect-vebinar' transition="pop-out" height="auto" width="100%" :maxWidth="800" :maxHeight="680"
         :adaptive="true"
         :scrollable="true" :classes="'custom-modals'" @before-open="beforeOpen">
    <div class="modal modal__connect-vebinar">
        <div class="close-modal" @click="$modal.hide('modal-connect-vebinar')" title="Закрыть">
          <div class="close-modal__wrapper">
            <span class="close-modal__line"></span>
            <span class="close-modal__line"></span>
          </div>
        </div>
      <div class="modal__container">
        <h3 class="g-caption-inner">Вход</h3>
        <form class="form-modal" @submit.prevent="onSubmit">
          <div class="form-modal__wrapper">
            <div class="g-item-form col-12">
              <label class="g-item-form__label" for="form-title">Имя</label>
              <input class="g-item-form__input" id="form-title" :class="{error: $v.name.$error}" v-model="name" @blur="$v.name.$touch()">
              <div class="input-valid-error" v-if="$v.name.$error">
                <template v-if="!$v.name.required">Поле не может быть пустым</template>
                <template v-if="!$v.name.minLength">Минимальное количество символов - 3</template>
                <template v-if="!$v.name.maxLength">Максимальное количество символов - 30</template>
              </div>
            </div>
            <button-app :disabled="$v.$invalid">
              Подключиться
            </button-app>
          </div>
        </form>
      </div>
    </div>
  </modal>
</template>

<script>
import { maxLength, minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'ModalConnectVebinar',
  data() {
    return {
      name: null,
      id: null
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30)
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      window.open(`https://api.businessof.life/events/meeting/freejoin?id=${this.id}&name=${this.name}`, '_blank')
      this.$modal.hide('modal-connect-vebinar')
    },
    beforeOpen (event) {
      if (event.params !== undefined) {
        this.id = event.params.id
      }
    },
    beforeClose(event) {
      this.name = null
      this.id = null
      this.$v.$reset()
    }
  }
}
</script>

<style scoped>

</style>
