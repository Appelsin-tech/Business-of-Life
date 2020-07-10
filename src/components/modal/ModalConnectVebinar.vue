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
              <input class="g-item-form__input" id="form-title" :class="{error: $v.form.name.$error}" v-model.trim="form.name" @blur="$v.form.name.$touch()">
              <div class="input-valid-error" v-if="$v.form.name.$error">
                <template v-if="!$v.form.name.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.name.minLength">Минимальное количество символов - 3</template>
                <template v-if="!$v.form.name.maxLength">Максимальное количество символов - 30</template>
                <template v-if="!$v.form.name.checkSpace">Пробел является не допустимым символом</template>
              </div>
            </div>
            <div class="g-item-form col-12">
              <label class="g-item-form__label" for="form-fname">Фамилия</label>
              <input class="g-item-form__input" id="form-fname" :class="{error: $v.form.lname.$error}" v-model.trim="form.lname" @blur="$v.form.lname.$touch()">
              <div class="input-valid-error" v-if="$v.form.lname.$error">
                <template v-if="!$v.form.lname.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.lname.minLength">Минимальное количество символов - 3</template>
                <template v-if="!$v.form.lname.maxLength">Максимальное количество символов - 30</template>
                <template v-if="!$v.form.lname.checkSpace">Пробел является не допустимым символом</template>
              </div>
            </div>
            <div class="g-item-form col-12">
              <label class="g-item-form__label" for="form-city">Город</label>
              <input class="g-item-form__input" id="form-city" :class="{error: $v.form.city.$error}" v-model.trim="form.city" @blur="$v.form.city.$touch()">
              <div class="input-valid-error" v-if="$v.form.city.$error">
                <template v-if="!$v.form.city.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.city.minLength">Минимальное количество символов - 3</template>
                <template v-if="!$v.form.city.maxLength">Максимальное количество символов - 30</template>
                <template v-if="!$v.form.city.checkSpace">Пробел является не допустимым символом</template>
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
import { maxLength, minLength, required, helpers } from 'vuelidate/lib/validators'
const checkSpace = helpers.regex('checkSpace', /^[\S]*$/)

export default {
  name: 'ModalConnectVebinar',
  data() {
    return {
      id: null,
      form: {
        name: null,
        lname: null,
        city: null
      }
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30),
        checkSpace
      },
      lname: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30),
        checkSpace
      },
      city: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30),
        checkSpace
      }
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      window.open(`https://api.businessof.life/events/meeting/freejoin?id=${this.id}&name=${this.form.name}&lname=${this.form.lname}&city=${this.form.city}`, '_blank')
      this.$modal.hide('modal-connect-vebinar')
    },
    beforeOpen (event) {
      if (event.params !== undefined) {
        this.id = event.params.id
      }
    },
    beforeClose(event) {
      this.form.name = null
      this.form.lname = null
      this.form.city = null
      this.id = null
      this.$v.$reset()
    }
  }
}
</script>

<style scoped>

</style>
