<template>
  <modal name='modal-clone-relation' transition="pop-out" height="auto" width="100%" :maxWidth="1170" :maxHeight="680"
         :adaptive="true"
         :scrollable="true" :classes="'custom-modals'" @before-open="beforeOpen" @before-close="beforeClose">
    <div class="modal modal__clone-relation">
      <div class="close-modal" @click="$modal.hide('modal-clone-relation')" title="Закрыть">
        <div class="close-modal__wrapper">
          <span class="close-modal__line"></span>
          <span class="close-modal__line"></span>
        </div>
      </div>
      <div class="modal__container">
        <h3 class="g-caption-inner">Клонировать событие</h3>
        <form class="form-modal" @submit.prevent="onSubmit">
          <div class="form-modal__wrapper">
            <div class="g-item-form col-6">
              <label for="invoice_id" class="g-item-form__label">Название</label>
              <input id="invoice_id" v-model="form.title" type="text" class="g-item-form__input" :class="{error: $v.form.title.$error}">
              <div class="input-valid-error" v-if="$v.form.title.$error">
                <template v-if="!$v.form.title.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.title.minLength">Значение должно быть не менее 6 символов</template>
              </div>
            </div>
            <div class="g-item-form col-6">
              <label class="g-item-form__label">Дата и время</label>
              <flat-pickr v-model="form.stamp" :config="configDate" :class="['g-item-form__input', {error: $v.form.stamp.$error}]" @blur="$v.form.stamp.$touch()"></flat-pickr>
              <div class="input-valid-error" v-if="$v.form.stamp.$error">
                <template v-if="!$v.form.stamp.required">Поле не может быть пустым</template>
              </div>
            </div>
            <div class="g-item-form col-6">
              <div class="checkbox">
                <label class="g-item-form__label">Статус</label>
                <div class="g-item-form--checkbox">
                    <input class="checkbox-input" :value="false" type="checkbox" id="status" v-model="form.published">
                    <label class="checkbox-label" for="status">Должно ли быть сразу опубликовано</label>
                </div>
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
import flatPickr from 'vue-flatpickr-component'
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import { minLength, required } from 'vuelidate/lib/validators'
import API from '@/api/index'

export default {
  name: 'ModalCloneRelation',
  components: {
    flatPickr
  },
  data() {
    return {
      form: {
        title: '',
        stamp: '',
        id: '',
        published: false
      },
      event: '',
      configDate: {
        altInput: true,
        altFormat: 'd.m.Y H:i',
        enableTime: true,
        time_24hr: true,
        locale: Russian,
        dateFormat: 'U',
        minDate: 'today'
      },
    }
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(6)
      },
      stamp: {
        required
      }
    }
  },
  methods: {
    onSubmit () {
      API.relations.clone(this.form).then(response => {
        API.response.success('Событие скопировано')
        this.$router.push({ path: `/office/events/${this.event}/relation/${response.id}` })
        this.$store.dispatch('user/login')
        this.$modal.hide('modal-clone-relation')
      })
    },
    beforeOpen(event) {
      if (event.params !== undefined) {
        if (this.$moment().diff(this.$moment(event.params.stamp * 1000))) {
          this.form.stamp = this.$moment().unix() + ''
        } else {
          this.form.stamp = event.params.stamp
        }
        this.form.id = event.params.id
        this.form.title = event.params.title
        this.event = event.params.event
      }
    },
    beforeClose(event) {
      this.$v.$reset()

    }
  }
}
</script>

<style scoped>

</style>
