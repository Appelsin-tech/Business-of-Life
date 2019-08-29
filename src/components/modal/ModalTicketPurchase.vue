<template>
  <modal name='modal-ticket-purchase' transition="pop-out" height="auto" width="100%" :maxWidth="1170" :maxHeight="680"
         :adaptive="true"
         :scrollable="true" :classes="'custom-modals'">

      <div class="modal modal__ticket-purchase">
        <div class="close-modal" @click="$modal.hide('modal-ticket-purchase')" title="Закрыть">
          <div class="close-modal__wrapper">
            <span class="close-modal__line"></span>
            <span class="close-modal__line"></span>
          </div>
        </div>
        <h3 class="title">Купить билет</h3>
        <form class="form-ticket" @submit.prevent="onSubmit">
          <div class="form-ticket__wrapper">
            <div class="form-ticket__item">
              <input class="form-ticket__input" :class="{error: $v.form.name.$error}" type="text" placeholder="Имя" v-model="form.name" @blur="$v.form.name.$touch()">
              <div class="form-ticket__error" v-if="$v.form.name.$error">
                <template v-if="!$v.form.name.required">Поле не может быть пустым</template>
                <template v-else-if="!$v.form.name.minLength">Имя не должно быть меньше 3-х символов</template>
              </div>
            </div>
            <div class="form-ticket__item">
              <input class="form-ticket__input" :class="{error: $v.form.email.$error}" placeholder="Email" v-model="form.email" @blur="$v.form.email.$touch()">
              <div class="form-ticket__error" v-if="$v.form.email.$error">
                <template v-if="!$v.form.email.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.email.email">Не корректный email</template>
              </div>
            </div>
            <div class="form-ticket__item">
              <input class="form-ticket__input" :class="{error: $v.form.number_seminar.$error}" type="number" placeholder="Какой по счету семинар" v-model="form.number_seminar" @blur="$v.form.number_seminar.$touch()">
              <div class="form-ticket__error" v-if="$v.form.number_seminar.$error">
                <template v-if="!$v.form.number_seminar.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.number_seminar.integer">Значение должно быть целым числом</template>
              </div>
            </div>
            <div class="form-ticket__item">
              <input v-mask="'##.##.####'" class="form-ticket__input" value="" type="text" :class="{error: $v.form.date_registration.$error}" @blur="$v.form.date_registration.$touch()"
                        v-model="form.date_registration" placeholder="Дата регистрации в компании">
              <div class="form-ticket__error" v-if="$v.form.date_registration.$error">
                <template v-if="!$v.form.date_registration.required">Поле не может быть пустым</template>
              </div>
            </div>
            <div class="form-ticket__item">
              <input class="form-ticket__input" :class="{error: $v.form.country.$error}" type="text" placeholder="Страна" v-model="form.country" @blur="$v.form.country.$touch()">
              <div class="form-ticket__error" v-if="$v.form.country.$error">
                <template v-if="!$v.form.country.required">Поле не может быть пустым</template>
              </div>
            </div>
            <div class="form-ticket__item">
              <input class="form-ticket__input" :class="{error: $v.form.city.$error}" type="text" placeholder="Город" v-model="form.city" @blur="$v.form.city.$touch()">
              <div class="form-ticket__error" v-if="$v.form.city.$error">
                <template v-if="!$v.form.city.required">Поле не может быть пустым</template>
              </div>
            </div>
            <div class="form-ticket__item form-ticket__item--col-12">
              <input class="form-ticket__input" :class="{error: $v.form.invited.$error}" type="text" placeholder="Сколько человек пригласил пользователь (или Email пригласителя)" v-model="form.invited" @blur="$v.form.invited.$touch()">
              <div class="form-ticket__error" v-if="$v.form.invited.$error">
                <template v-if="!$v.form.invited.required">Поле не может быть пустым</template>
              </div>
            </div>
            <div class="form-ticket__item">
              <v-select v-model="form.selectedQualification" :multiple="false" :class="['v-select__modal', {'error': errorSelect.selectedQualification}]" v-on:search:blur="validateSelect('selectedQualification')" :searchable="false" placeholder="Квалификация" label="qualName" :options="qualification"></v-select>
              <div class="form-ticket__error" v-if="errorSelect.selectedQualification" >
                Выберите квалификацию
              </div>
            </div>
            <div class="form-ticket__item">
              <v-select v-model="form.selectedPayment" :multiple="false" :class="['v-select__modal',{'error': errorSelect.selectedPayment}]" :searchable="false" placeholder="Способ оплаты" label="qualName" :options="payment" v-on:search:blur="validateSelect('selectedPayment')"></v-select>
              <div class="form-ticket__error" v-if="errorSelect.selectedPayment">
                Выберите способ оплаты
              </div>
            </div>
          </div>
          <button type="submit" class="g-btn g-btn--no-arrow" :disabled="$v.$invalid || errorSelect.selectedQualification === true || errorSelect.selectedPayment === true ">
            <span>Купить билет</span>
            <span>9000 р</span>
          </button>
        </form>
        <div class="validation-error" v-if="showError">
          <img svg-inline class="validation-error__icon" src="../../assets/img/icon/warning.svg" alt="">
          <span class="validation-error__text">Вы не заполнили одно из обязательных полей</span>
        </div>
      </div>
  </modal>
</template>

<script>
import { required, minLength, integer, alphaNum, email } from 'vuelidate/lib/validators'
export default {
  name: 'ModalTicketPurchase',
  data() {
    return {
      errorSelect: {
        selectedQualification: false,
        selectedPayment: false
      },
      showError: false,
      name: '',
      qualification: [
        {
          qualVal: 'L&M',
          qualName: 'Sigarets L&M'
        },
        {
          qualVal: 'Marlboro',
          qualName: 'Sigarets Marlboro'
        },
        {
          qualVal: 'LD',
          qualName: 'Sigarets LD'
        }
      ],
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
      form: {
        name: '',
        email: '',
        number_seminar: '',
        date_registration: '',
        country: '',
        city: '',
        invited: '',
        selectedQualification: '',
        selectedPayment: ''
      }
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
        alphaNum
      },
      email: {
        required,
        email
      },
      number_seminar: {
        required,
        integer
      },
      date_registration: {
        required
      },
      country: {
        required
      },
      city: {
        required
      },
      invited: {
        required
      },
      selectedPayment: {
        required
      }
    }
  },
  methods: {
    onSubmit () {
      if (this.form.name === '' && this.form.email === '' && this.form.number_seminar === '' && this.form.date_registration === '' && this.form.country === '' && this.form.city === '' && this.form.invited === '') {
        this.showError = true
      } else {
        console.log('as')
      }
    },
    validateSelect (name) {
      if (this.form[name] === '') {
        this.errorSelect[name] = true
      } else {
        this.errorSelect[name] = false
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
