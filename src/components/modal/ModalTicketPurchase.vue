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
        <h3 class="g-caption-inner">Купить билет</h3>
        <form class="form-modal" @submit.prevent="onSubmit" novalidate>
          <div class="form-modal__wrapper" v-if="disabledBtn">

            <div class="g-item-form col-6" v-for="(item, index) in fields" :key="item.id">
              <label class="g-item-form__label" :for="`form_buy-id-${item.id}`">{{item.name}}</label>

              <input v-mask="maskConfig" v-if="item.id === '3'" class="g-item-form__input" v-model="fieldsData['field_' + item.id]" :class="{error: $v.fieldsData['field_' + item.id].$error}" @blur="$v.fieldsData['field_' + item.id].$touch()"/>
              <flat-pickr v-else-if="item.id === '4'" :config="configDate" :class="'g-item-form__input'" v-model="fieldsData['field_' + item.id]"></flat-pickr>
              <v-select v-else-if="item.id === '5'" v-model="fieldsData['field_' + item.id]" :multiple="false" :class="['v-select__modal', {'error': errorSelect.selectedStatus}]" :searchable="false" placeholder="Статус" :options="status"></v-select>
              <v-select v-else-if="item.id === '6'" v-model="fieldsData['field_' + item.id]" :multiple="false" :class="['v-select__modal', {'error': errorSelect.selectedQualification}]" :searchable="false" placeholder="Квалификация" :options="qualification"></v-select>
              <input v-else-if="item.id === '7'" v-mask="'########'" :id="`form_buy-id-${item.id}`" class="g-item-form__input" type="text" v-model="fieldsData['field_' + item.id]" :class="{error: $v.fieldsData['field_' + item.id].$error}" @blur="$v.fieldsData['field_' + item.id].$touch()">
              <input v-else-if="item.id === '8'" v-mask="'########'" :id="`form_buy-id-${item.id}`" class="g-item-form__input" type="text" v-model="fieldsData['field_' + item.id]" :class="{error: $v.fieldsData['field_' + item.id].$error}" @blur="$v.fieldsData['field_' + item.id].$touch()">
              <v-select v-else-if="item.id === '9'" v-model="fieldsData['field_' + item.id]" :multiple="false" :class="['v-select__modal', {'error': errorSelect.selectedStructure}]" :searchable="false" placeholder="Структура" :options="structure"></v-select>

              <input v-else class="g-item-form__input" :id="`form_buy-id-${item.id}`" type="text" v-model="fieldsData['field_' + item.id]" :class="{error: $v.fieldsData['field_' + item.id].$error}" @blur="$v.fieldsData['field_' + item.id].$touch()">

              <div class="input-valid-error" v-if="$v.fieldsData.field_2.$error && item.id === '2'">
                <template v-if="!$v.fieldsData.field_2.required">Поле не может быть пустым</template>
                <template v-if="!$v.fieldsData.field_2.email">Не корректный email</template>
              </div>
              <div class="input-valid-error" v-else-if="$v.fieldsData['field_' + item.id].$error">
                <template v-if="!$v.fieldsData['field_' + item.id].required">Поле не может быть пустым</template>
              </div>
            </div>
            <div class="g-item-form col-6">
              <label class="g-item-form__label">Способ оплаты</label>
              <v-select v-model="currencySelected" :multiple="false" :reduce="payment => payment.value" label="title" :class="['v-select__modal', {'error': errorSelect.selectedStructure}]" :searchable="false" placeholder="Способ оплаты" :options="payment"></v-select>
            </div>
<!--            <div class="g-item-form col-12">-->
<!--              <p class="form-modal__text">-->
<!--                <span class="form-modal__text&#45;&#45;desc">Способ оплаты:</span>-->
<!--                <span class="form-modal__text&#45;&#45;var">-->
<!--                  банковская карта-->
<!--                <img svg-inline class="svg svg&#45;&#45;visa" src="../../assets/img/icon/visa.svg" alt="">-->
<!--                <img svg-inline class="svg svg&#45;&#45;mastercard" src="../../assets/img/icon/mastercard.svg" alt="">-->
<!--                </span>-->
<!--              </p>-->
<!--            </div>-->
            <div class="g-item-form col-12" v-if="!logged && currencySelected === 'ncp'">
              <p class="error-auth">Авторизуйтесь чтобы воспользоваться этим способом оплаты</p>
            </div>
            <div class="g-item-form col-12" v-if="logged && showErrorBalance">
              <p class="error-auth">Недостаточно средств для покупки</p>
            </div>
          </div>

          <button-app type="submit" :disabled="$v.$invalid || !logged && currencySelected === 'ncp'" v-if="priceTotal[currencySelected]">
            <template>Купить билет {{priceTotal[currencySelected].price}} {{priceTotal[currencySelected].currency}}</template>
            <template></template>
          </button-app>
<!--          <button class="test-btn" type="button" @click="generate">Generate Ticket</button>-->
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
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'ModalTicketPurchase',
  components: {
    flatPickr
  },
  data () {
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
        selectedPayment: false,
        selectedStructure: false
      },
      disabledBtn: false,
      name: '',
      status: ['Key person', 'Top Key person', 'Gold person', 'Diamond person', 'Blue Sapphire', 'Korloff club'],
      qualification: ['★', '★★', '★★★', '★★★★', '★★★★★', '★★★★★★', '★★★★★★★★', '★★★★★★★★★'],
      structure: ['Ирина Семёнова', 'Татьяна Покотило', 'Кожантаева Гульнара', 'Жанат Токабаева', 'Леонид Пак', 'Роза Жаманкулова', 'Акмолдаева Сабиля'],
      payment: [
        {
          value: 'card',
          title: 'банковская карта VISA/MasterCard'
        },
        {
          value: 'ncp',
          title: 'Nayuta Cash Points'
        }
      ],
      currencySelected: 'card',
      priceTotal: {},
      reg_d: '',
      showErrorBalance: false
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
  computed: {
    ...mapGetters('user', [
      'logged'
    ]),
    ...mapState('wallet', [
      'balance'
    ])
  },
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
      if (this.logged && this.balance.ncp < this.priceTotal.ncp.price) {
        this.showErrorBalance = true
        return
      }
      API.biling.invoice(this.fieldsData).then(response => {
        this.eventData.invoiceId = response.data.id
        if (this.currencySelected === 'card') {
          this.WidgetPayment(this.eventData)
        } else if (this.logged) {
          this.$modal.show('modal-ticket-purchase-password', {
            invoice_id: response.data.id,
            email: this.fieldsData.field_2
          })
        }
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
        this.ticketsReceive(options.invoiceId)
      },
      function (reason, options) {
        this.$modal.hide('modal-ticket-purchase')
        API.response.error(reason)
      })
    },
    ticketsReceive (id) {
      API.tickets.receive({ invoice: id }).then(response => {
        let email = this.fieldsData.field_2
        this.$modal.hide('modal-ticket-purchase')
        this.$modal.show('modal-ticket-success', { ticket: response.data[0], email: email })
      }).catch(error => {
        API.response.error(error)
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
      // console.log(event.params)
      this.priceTotal = event.params.priceTotal
      this.eventData.price = event.params.priceTotal.card.price
      this.eventData.currency = event.params.priceTotal.card.currency
      // this.fieldsData.event_id = event.params.event_id
      // this.fieldsData.relation = event.params.event_id
      this.fieldsData.ticket_id = event.params.ticket_id
      // this.fieldsData.city = event.params.city ? event.params.city : 'Онлайн'
      // this.fieldsData.country = event.params.country ? event.params.country : 'Онлайн'
      this.fields = event.params.fields
      this.disabledBtn = true
      if (this.logged) {
        this.$store.dispatch('wallet/balance')
      }
    },
    beforeClose(event) {
      this.$v.$reset()
      this.eventData.price = ''
      this.eventData.currency = ''
      this.fieldsData = {}
      this.fields = []
      this.showErrorBalance = false
      this.currencySelected = 'card'
    },
    generate () {
      API.tickets.issue({id: this.fieldsData.ticket_id})
    }
  }
}
</script>

<style scoped lang="less">
  @import '~flatpickr/dist/flatpickr.css';
  .error-auth {
    background: var(--app_btn__color);
    padding: 8px 8px 8px 15px;
    color: #fff;
    font-size: 1.8rem;
  }
</style>
