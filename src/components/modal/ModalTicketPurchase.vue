<template>
  <modal name='modal-ticket-purchase' transition="pop-out" height="auto" width="100%" :maxWidth="1170"
         :adaptive="true"
         :pivot-y="0.5"
         :reset="true"
         :scrollable="true" :class="['custom-modals', 'top-position']"
         @before-open="beforeOpen" @before-close="beforeClose">

    <div class="modal modal__ticket-purchase">
      <div class="close-modal" @click="$modal.hide('modal-ticket-purchase')" title="Закрыть">
        <div class="close-modal__wrapper">
          <span class="close-modal__line"></span>
          <span class="close-modal__line"></span>
        </div>
      </div>
      <div class="modal__container">
        <h3 class="title">Купить билет</h3>
        <form class="form-modal" @submit.prevent="onSubmit" novalidate>
          <div class="form-modal__wrapper" v-if="disabledBtn">

            <div class="form-modal__item" v-for="(item, index) in fields" :key="item.id">
              <label class="form-modal__label" :for="`form_buy-id-${item.id}`">{{item.name}}</label>

              <input v-mask="maskConfig" v-if="item.id === '3'" class="form-modal__input" v-model="fieldsData['field_' + item.id]" :class="{error: $v.fieldsData['field_' + item.id].$error}" @blur="$v.fieldsData['field_' + item.id].$touch()"/>
              <flat-pickr v-else-if="item.id === '4'" :config="configDate" :class="'form-modal__input'" v-model="fieldsData['field_' + item.id]"></flat-pickr>
              <v-select v-else-if="item.id === '5'" v-model="fieldsData['field_' + item.id]" :multiple="false" :class="['v-select__modal', {'error': errorSelect.selectedStatus}]" :searchable="false" placeholder="Статус" :options="status"></v-select>
              <v-select v-else-if="item.id === '6'" v-model="fieldsData['field_' + item.id]" :multiple="false" :class="['v-select__modal', {'error': errorSelect.selectedQualification}]" :searchable="false" placeholder="Квалификация" :options="qualification"></v-select>
              <input v-else-if="item.id === '7'" v-mask="'########'" :id="`form_buy-id-${item.id}`" class="form-modal__input" type="text" v-model="fieldsData['field_' + item.id]" :class="{error: $v.fieldsData['field_' + item.id].$error}" @blur="$v.fieldsData['field_' + item.id].$touch()">
              <input v-else-if="item.id === '8'" v-mask="'########'" :id="`form_buy-id-${item.id}`" class="form-modal__input" type="text" v-model="fieldsData['field_' + item.id]" :class="{error: $v.fieldsData['field_' + item.id].$error}" @blur="$v.fieldsData['field_' + item.id].$touch()">
              <input v-else class="form-modal__input" :id="`form_buy-id-${item.id}`" type="text" v-model="fieldsData['field_' + item.id]" :class="{error: $v.fieldsData['field_' + item.id].$error}" @blur="$v.fieldsData['field_' + item.id].$touch()">
              <div class="input-valid-error" v-if="$v.fieldsData.field_2.$error && item.id === '2'">
                <template v-if="!$v.fieldsData.field_2.required">Поле не может быть пустым</template>
                <template v-if="!$v.fieldsData.field_2.email">Не корректный email</template>
              </div>
              <div class="input-valid-error" v-else-if="$v.fieldsData['field_' + item.id].$error">
                <template v-if="!$v.fieldsData['field_' + item.id].required">Поле не может быть пустым</template>
              </div>
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
          </div>
          <button type="submit" class="g-btn g-btn--no-icon" :disabled="$v.$invalid">
            <span>Купить билет</span>
            <span>{{eventData.price}} {{eventData.currency}}</span>
          </button>
        </form>
      </div>
    </div>
  </modal>
</template>

<script>
import API from '../../api/index'
import flatPickr from 'vue-flatpickr-component'
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'ModalTicketPurchase',
  components: { flatPickr },
  data() {
    return {
      fields: [],
      fieldsData: {},
      newFieldsData: {},
      maskConfig: {
        mask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        tokens: {
          X: {
            pattern: /[0-9+]/
          }
        },
        masked: ''
      },
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
        selectedStatus: false,
        selectedQualification: false,
        selectedPayment: false
      },
      disabledBtn: false,
      name: '',
      status: ['Key person', 'Top Key person', 'Gold person', 'Diamond person', 'Blue Sapphire', 'Korloff club'],
      qualification: ['★', '★★', '★★★', '★★★★', '★★★★★', '★★★★★★', '★★★★★★★★', '★★★★★★★★★'],
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
      reg_d: ''
    }
  },
  validations() {
    let fieldsData = {}
    for (let key in this.fieldsData) {
      fieldsData[key] = {}
      fieldsData[key].required = required
    }
    this.fields.forEach(item => {
      fieldsData['field_' + item.id] = {}
      fieldsData['field_' + item.id].required = required
      if (item.id === '2') {
        fieldsData['field_2'].email = email
      }
    })
    return { fieldsData: fieldsData }
  },
  computed: {},
  methods: {
    onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        API.response.error('Заполните все поля')
        return
      }
      if (this.fieldsData['field_4'] !== undefined) {
        this.parseDate()
      }
      API.biling.invoice(this.fieldsData).then(response => {
        this.eventData.invoiceId = response.data.id
        this.WidgetPayment(this.eventData)
      }).catch(error => {
        API.response.error(error)
      })
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
          this.$modal.show('modal-ticket-success', { ticket: response.data, email: this.form.email })
        }).catch(error => {
          API.response.error(error)
        })
      },
      function (reason, options) {
        this.$modal.hide('modal-ticket-purchase')
        API.response.error(reason)
      })
    },
    parseDate() {
      if (this.fieldsData['field_4'] !== '') {
        let [day, month, year] = this.fieldsData['field_4'].split('.')
        this.fieldsData['field_4'] = new Date(year, month - 1, day).getTime()
      } else {
        return ''
      }
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
      this.fieldsData.event_id = event.params.event_id
      this.fieldsData.relation = event.params.event_id
      this.fieldsData.ticket_id = event.params.ticket_id
      this.fieldsData.city = event.params.city
      this.fieldsData.country = event.params.country
      this.fields = event.params.fields
      this.disabledBtn = true
    },
    beforeClose(event) {
      this.$v.$reset()
      this.eventData.price = ''
      this.eventData.currency = ''
      this.fieldsData = {}
      this.fields = []
    },
  }
}
</script>

<style scoped lang="less">
  @import '~flatpickr/dist/flatpickr.css';
</style>
