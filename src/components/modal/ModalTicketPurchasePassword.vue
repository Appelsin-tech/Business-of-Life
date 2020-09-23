<template>
  <modal name='modal-ticket-purchase-password' transition="pop-out" height="auto" width="100%" :maxWidth="1170"
         :adaptive="true"
         :pivot-y="0.5"
         :reset="true"
         :scrollable="true" :class="['custom-modals', 'top-position']"
         @before-open="beforeOpen" @before-close="beforeClose">

    <div class="modal modal__ticket-purchase">
      <div class="close-modal" @click="$modal.hide('modal-ticket-purchase-password')" title="Закрыть">
        <div class="close-modal__wrapper">
          <span class="close-modal__line"></span>
          <span class="close-modal__line"></span>
        </div>
      </div>
      <div class="modal__container">
        <h3 class="g-caption-inner">Купить билет</h3>
        <form class="form-modal" @submit.prevent="onSubmit">
          <div class="form-modal__wrapper">
            <div class="g-item-form col-12">
              <label for="invoice_id" class="g-item-form__label">Пароль</label>
              <input id="invoice_id" v-model="form.password" type="password" class="g-item-form__input"  :class="{error: $v.form.password.$error}">
              <div class="input-valid-error" v-if="$v.form.password.$error">
                <template v-if="!$v.form.password.required">Поле не может быть пустым</template>
                <template v-if="!$v.form_recovery.password.minLength">Значение должно быть не менее 6 символов</template>
              </div>
            </div>
          </div>

          <button-app :disabled="$v.$invalid">
            Отправить
          </button-app>
        </form>
      </div>
    </div>
  </modal>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'
import API from '../../api/index'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'ModalTicketPurchasePassword',
  data() {
    return {
      form: {
        invoice_id : '',
        password: ''
      },
      email: '',
      sum: ''
    }
  },
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  computed: {

  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        API.biling.pay(this.form).then(response => {
          this.ticketsReceive()
        }).catch(error => {
          API.response.error(error)
        })
      }
    },
    ticketsReceive () {
      API.tickets.receive({ invoice: this.form.invoice_id }).then(response => {
        this.$modal.hide('modal-ticket-purchase-password')
        this.$modal.hide('modal-ticket-purchase')
        this.$modal.show('modal-ticket-success', { ticket: response.data[0], email: this.email })
      }).catch(error => {
        API.response.error(error)
      })
    },
    beforeOpen (event) {
      this.form.invoice_id = event.params.invoice_id
      this.email = event.params.email
    },
    beforeClose () {
      this.$v.$reset()
      this.form.invoice_id = ''
      this.email = ''
    }
  }
}
</script>

<style scoped>

</style>
