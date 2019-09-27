<template>
  <modal name='modal-adv-cash' transition="pop-out" height="auto" width="100%" :maxWidth="1170" :maxHeight="680"
         :adaptive="true"
         :scrollable="true" :classes="'custom-modals'">
    <div class="modal modal__adv-cash">
      <div class="close-modal" @click="$modal.hide('modal-adv-cash')" title="Закрыть">
        <div class="close-modal__wrapper">
          <span class="close-modal__line"></span>
          <span class="close-modal__line"></span>
        </div>
      </div>
      <div class="modal__container">
        <h3 class="title">Для оплаты билета</h3>
        <div class="instruction">
          <p class="instruction__p">1. Перешлите 15 Euro на банковскую карту <strong>5169 4971 0737 2405</strong></p>
          <p class="instruction__p">2. После оплаты заполните поля ниже и нажмите "Я оплатил"</p>
        </div>
        <form class="form-modal" @submit.prevent="onSubmit">
          <div class="form-modal__wrapper">
            <div class="form-modal__item">
              <label class="form-modal__label" for="form-wallet">Счет с которого совершена оплата</label>
              <input class="form-modal__input" id="form-wallet" :class="{error: $v.form.wallet.$error}" type="text" placeholder="1234 5678 9012 3456" v-model="form.wallet" @blur="$v.form.wallet.$touch()">
              <div class="input-valid-error" v-if="$v.form.wallet.$error">
                <template v-if="!$v.form.wallet.required">Поле не может быть пустым</template>
                <template v-else-if="!$v.form.wallet.minLength">Номер не должен быть меньше 12 символов</template>
              </div>
            </div>
            <div class="form-modal__item">
              <label class="form-modal__label" for="form-email">Email на который отправить билет</label>
              <input class="form-modal__input" id="form-email" :class="{error: $v.form.email.$error}" type="email" placeholder="email@mail.ru " v-model="form.email" @blur="$v.form.email.$touch()">
              <div class="input-valid-error" v-if="$v.form.email.$error">
                <template v-if="!$v.form.email.email">Не верный email</template>
                <template v-else-if="!$v.form.email.required">Поле не может быть пустым</template>
              </div>
            </div>
          </div>
          <div class="btn-wrapper">
            <button type="submit" class="g-btn g-btn--no-icon" :disabled="$v.$invalid">
              <span>Я оплатил</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </modal>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import responseSuccess from '../../api/response'
import API from '../../api/index'

export default {
  name: 'ModalAdvCash',
  data() {
    return {
      name: '',
      form: {
        wallet: '',
        emil: ''
      }
    }
  },
  validations: {
    form: {
      wallet: {
        required,
        minLength: minLength(12)
      },
      email: {
        email,
        required
      },
    }
  },
  methods: {
    onSubmit() {
      API.biling(this.form).then(response => {
        responseSuccess.success('Форма отправлена')
        this.$modal.hide('modal-adv-cash')
      })
    }
  }
}
</script>

<style scoped>

</style>
