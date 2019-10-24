<template>
  <modal name='modal-ticket-purchase' transition="pop-out" height="auto" width="100%" :maxWidth="1170"
         :adaptive="true"
         :pivot-y="0.5"
         :reset="true"
         :scrollable="true" :class="['custom-modals', 'top-position']"
         @before-open="beforeOpen">

    <div class="modal modal__ticket-purchase">
      <div class="close-modal" @click="$modal.hide('modal-ticket-purchase')" title="Закрыть">
        <div class="close-modal__wrapper">
          <span class="close-modal__line"></span>
          <span class="close-modal__line"></span>
        </div>
      </div>
      <div class="modal__container">
        <h3 class="title">Купить билет</h3>
        <form class="form-modal" @submit.prevent="onSubmit">
          <div class="form-modal__wrapper">
            <div class="form-modal__item">
              <input class="form-modal__input" :class="{error: $v.form.name.$error}" type="text" placeholder="Имя" v-model="form.name" @blur="$v.form.name.$touch()">
              <div class="input-valid-error" v-if="$v.form.name.$error">
                <template v-if="!$v.form.name.required">Поле не может быть пустым</template>
                <template v-else-if="!$v.form.name.minLength">Имя не должно быть меньше 3-х символов</template>
              </div>
            </div>
            <div class="form-modal__item">
              <input class="form-modal__input" :class="{error: $v.form.email.$error}" placeholder="Email" v-model="form.email" @blur="$v.form.email.$touch()">
              <div class="input-valid-error" v-if="$v.form.email.$error">
                <template v-if="!$v.form.email.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.email.email">Не корректный email</template>
              </div>
            </div>
            <div class="form-modal__item">
              <flat-pickr v-model="reg_d" :config="configDate" :class="'form-modal__input'" :placeholder="'Дата регистрации в компании'"></flat-pickr>
            </div>
            <div class="form-modal__item">
              <v-select v-model="form.qualification" :multiple="false" :class="['v-select__modal', {'error': errorSelect.selectedQualification}]" v-on:search:blur="validateSelect('selectedQualification')" :searchable="false" placeholder="Квалификация" :options="qualification"></v-select>
            </div>
            <div class="form-modal__item">
              <input v-mask="'########'" class="form-modal__input" type="text" placeholder="Какой по счету семинар" v-model="form.seminar_с">
            </div>
            <div class="form-modal__item">
              <input v-mask="'########'" class="form-modal__input" type="text" placeholder="Сколько человек пригласил" v-model="form.invited_c">
            </div>
            <div class="form-modal__item form-modal__item--col-12">
              <p class="form-modal__text">
                <span class="form-modal__text--desc">Способ оплаты:</span>
                <span class="form-modal__text--var">
                  банковская карта
                <img svg-inline class="svg svg--visa" src="../../assets/img/icon/visa.svg" alt="">
                <img svg-inline class="svg svg--mastercard" src="../../assets/img/icon/mastercard.svg" alt="">
                </span>
              </p>
            </div>
            <!--<div class="form-modal__item">-->
            <!--<v-select v-model="form.selectedPayment" :multiple="false" :class="['v-select__modal',{'error': errorSelect.selectedPayment}]" :searchable="false" placeholder="Способ оплаты" label="qualName" :options="payment" v-on:search:blur="validateSelect('selectedPayment')"></v-select>-->
            <!--<div class="input-valid-error" v-if="errorSelect.selectedPayment">-->
            <!--Выберите способ оплаты-->
            <!--</div>-->
            <!--</div>-->
          </div>
          <button type="submit" class="g-btn g-btn--no-icon" :disabled="$v.$invalid || errorSelect.selectedQualification === true || errorSelect.selectedPayment === true ">
            <span>Купить билет</span>
            <span>{{eventData.price}} {{eventData.currency}}</span>
          </button>
          <!--<button type="button" class="test-btn" @click="$modal.show('modal-ticket-success')">-->
          <!--<span>Окно успешной оплаты</span>-->
          <!--</button>-->
        </form>
      </div>
    </div>
  </modal>
</template>

<script>
import { email, minLength, required } from 'vuelidate/lib/validators'
import API from '../../api/index'
import flatPickr from 'vue-flatpickr-component'
import { Russian } from 'flatpickr/dist/l10n/ru.js'

export default {
  name: 'ModalTicketPurchase',
  components: { flatPickr },
  data() {
    return {
      configDate: {
        enableTime: false,
        time_24hr: true,
        locale: Russian,
        dateFormat: 'd.m.Y'
      },
      eventData: {
        price: '',
        currency: '',
        event_id: 5,
        invoiceId: '',
      },
      errorSelect: {
        selectedQualification: false,
        selectedPayment: false
      },
      name: '',
      qualification: ['Key person', 'Top Key person', 'Gold person', 'Diamond person', 'Blue Sapphire', 'Korloff club'],
      payment: [
        {
          qualVal: 'card',
          qualName: 'Банковская карта'
        },
        {
          qualVal: 'payPal',
          qualName: 'PayPal'
        },
        {
          qualVal: 'qiwi',
          qualName: 'QIWI Кошелек'
        },
        {
          qualVal: 'Bitcoin',
          qualName: 'Bitcoin'
        }
      ],
      reg_d: '',
      form: {
        name: '',
        email: '',
        country: '',
        city: '',
        qualification: '',
        seminar_с: '',
        invited_c: '',
        relation: '',
        ticket_id: ''
      }
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      }
    }
  },
  computed: {
    regData() {
      if (this.reg_d !== '') {
        let [day, month, year] = this.reg_d.split('.')
        return new Date(year, month - 1, day).getTime()
      } else {
        return ''
      }
    },
  },
  methods: {
    onSubmit() {
      API.biling.invoice({
        name: this.form.name,
        email: this.form.email,
        country: this.form.country,
        city: this.form.city,
        qualification: this.form.qualification,
        seminar_с: this.form.seminar_с,
        invited_c: this.form.invited_c,
        ticket_id: this.form.ticket_id,
        reg_d: this.regData
      }).then(response => {
        this.eventData.invoiceId = response.data.id
        this.WidgetPayment(this.eventData)
      }).catch(error => {
        API.response.error(error)
      })
      // this.WidgetPayment(this.eventData)
    },
    WidgetPayment(data) {
      const widget = new cp.CloudPayments()
      widget.charge({
        publicId: 'pk_e13f4353f48d3a9904042ccb2bffc',
        description: 'Покупка билета',
        amount: data.price,
        currency: data.currency,
        invoiceId: data.invoiceId,
        skin: 'mini',
        data: {
          relation: data.event_id
        }
      },
      (options) => {
        API.tickets.receive({ invoice: options.invoiceId }).then(response => {
          this.$modal.hide('modal-ticket-purchase')
          this.$modal.show('modal-ticket-success', { ticket: response.data })
        }).catch(error => {
          API.response.error(error)
        })

      },
      function (reason, options) {
        this.$modal.hide('modal-ticket-purchase')
        console.log(options)
        API.response.error(reason)
      })
    },
    validateSelect(name) {
      if (this.form[name] === '') {
        this.errorSelect[name] = true
      } else {
        this.errorSelect[name] = false
      }
    },
    beforeOpen(event) {
      this.eventData.price = event.params.price
      this.eventData.currency = event.params.currency
      this.eventData.event_id = event.params.event_id
      this.form.relation = event.params.event_id
      this.form.ticket_id = event.params.ticket_id
      this.form.city = event.params.city
      this.form.country = event.params.country
    },
  }
}
</script>

<style scoped lang="less">
  @import '~flatpickr/dist/flatpickr.css';
</style>
