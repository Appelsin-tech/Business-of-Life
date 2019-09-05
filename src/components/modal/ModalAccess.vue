<template>
  <modal name='modal-access' transition="pop-out" height="auto" width="100%" :maxWidth="1170" :maxHeight="680"
         :adaptive="true"
         :scrollable="true" :classes="'custom-modals'">
    <div class="modal modal__access">
      <div class="close-modal" @click="$modal.hide('modal-access')" title="Закрыть">
        <div class="close-modal__wrapper">
          <span class="close-modal__line"></span>
          <span class="close-modal__line"></span>
        </div>
      </div>
      <div class="modal__container">
        <h3 class="title">Вход</h3>
        <form class="form-modal" @submit.prevent="onSubmit">
          <div class="form-modal__wrapper">
            <div class="form-modal__item">
              <input class="form-modal__input" :class="{error: $v.form.login.$error}" type="text" placeholder="Имя" v-model="form.login" @blur="$v.form.login.$touch()">
              <div class="form-modal__error" v-if="$v.form.login.$error">
                <template v-if="!$v.form.login.required">Поле не может быть пустым</template>
                <template v-else-if="!$v.form.login.minLength">Логин не должен быть меньше 3-х символов</template>
              </div>
            </div>
            <div class="form-modal__item">
              <input class="form-modal__input" :class="{error: $v.form.password.$error}" placeholder="Email" v-model="form.password" @blur="$v.form.password.$touch()">
              <div class="form-modal__error" v-if="$v.form.password.$error">
                <template v-if="!$v.form.password.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.password.minLength">Пароль должен быть не менее 6 символов</template>
              </div>
            </div>
          </div>
          <button type="submit" class="g-btn g-btn--no-arrow" :disabled="$v.$invalid">
            <span>Войти</span>
          </button>
        </form>
      </div>
    </div>
  </modal>
</template>

<script>
import { alphaNum, minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'ModalAccess',
  data() {
    return {
      errorSelect: {
        selectedQualification: false,
        selectedPayment: false
      },
      showError: false,
      name: '',
      form: {
        login: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      login: {
        required,
        minLength: minLength(3),
        alphaNum
      },
      password: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('as')
    }
  }
}
</script>

<style scoped>

</style>
