<template>
  <modal name='modal-ticket-create' transition="pop-out" height="auto" width="100%" :maxWidth="1170" :maxHeight="680"
         :adaptive="true"
         :scrollable="true" :classes="'custom-modals'" @before-open="beforeOpen" @before-close="beforeClose">
    <div class="modal modal__ticket-create">
      <div class="close-modal" @click="$modal.hide('modal-ticket-create')" title="Закрыть">
        <div class="close-modal__wrapper">
          <span class="close-modal__line"></span>
          <span class="close-modal__line"></span>
        </div>
      </div>
      <div class="modal__container">
        <h3 class="g-caption-inner">Билет</h3>
        <form class="form-modal" @submit.prevent="onSubmit">
          <div class="form-modal__wrapper">
            <div class="form-modal__item form-modal__item--col-12">
              <label class="form-modal__label" for="form-title">Название</label>
              <input class="form-modal__input" id="form-title" :class="{error: $v.form.title.$error}" v-model="form.title" @blur="$v.form.title.$touch()">
              <div class="input-valid-error" v-if="$v.form.title.$error">
                <template v-if="!$v.form.title.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.title.maxLength">Превышено количество допустимых символов</template>
                <template v-if="!$v.form.title.minLength">Минимальное количество символов - 3</template>
              </div>
            </div>
            <div class="form-modal__item form-modal__item--col-12">
              <label class="form-modal__label">Описание</label>
              <ckeditor :editor="editor" v-model="form.description" :config="editorConfig" :class="{error: $v.form.description.$error}" @blur="$v.form.description.$touch()"></ckeditor>
              <div class="input-valid-error" v-if="$v.form.description.$error">
                <template v-if="!$v.form.description.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.description.maxLength">Превышено количество допустимых символов</template>
              </div>
            </div>
            <div class="form-modal__item ">
              <label class="form-modal__label">Цена</label>
              <the-mask class="form-modal__input" mask="XXXXXXXXXXXXXXXXXXX" :tokens="currencyMask" :class="{error: $v.form.price.$error}" v-model="form.price" @blur="$v.form.price.$touch()"/>
              <div class="input-valid-error" v-if="$v.form.price.$error">
                <template v-if="!$v.form.price.required">Поле не может быть пустым</template>
              </div>
            </div>
            <div class="form-modal__item ">
              <label class="form-modal__label">Валюта</label>
              <v-select :multiple="false" :class="['v-select__modal', {error: errorSelect.currency}]" :searchable="false" :options="selectCurrency" v-model="form.currency" v-on:search:blur="validateSelect('currency')"></v-select>
              <div class="input-valid-error" v-if="errorSelect.currency">
                Выберите Валюту
              </div>
            </div>
            <div class="form-modal__item form-modal__item--col-12">
              <label class="form-modal__label form-modal__label--checkbox">Уточнить у пользователя</label>
              <div class="checkbox-wrapper">
                <div class="item">
                  <input class="checkbox-input" :value="4" type="checkbox" id="date_reg" v-model="form.fields">
                  <label class="checkbox-label" for="date_reg">Дата регистрации в компании</label>
                </div>
                <div class="item">
                  <input class="checkbox-input" :value="5" type="checkbox" id="status" v-model="form.fields">
                  <label class="checkbox-label" for="status">Статус</label>
                </div>
                <div class="item">
                  <input class="checkbox-input" :value="6" type="checkbox" id="qualification" v-model="form.fields">
                  <label class="checkbox-label" for="qualification">Квалификация</label>
                </div>
                <div class="item">
                  <input class="checkbox-input" :value="7" type="checkbox" id="seminar_с" v-model="form.fields">
                  <label class="checkbox-label" for="seminar_с">Какой по счету семинар</label>
                </div>
                <div class="item">
                  <input class="checkbox-input" :value="8" type="checkbox" id="invited_c" v-model="form.fields">
                  <label class="checkbox-label" for="invited_c">Сколько человек пригласил</label>
                </div>
                <div class="item">
                  <input class="checkbox-input" :value="9" type="checkbox" id="structure" v-model="form.fields">
                  <label class="checkbox-label" for="structure">В чьей структуре Вы состоите</label>
                </div>
                <div class="item">
                  <input class="checkbox-input" :value="10" type="checkbox" id="sponsor" v-model="form.fields">
                  <label class="checkbox-label" for="sponsor">Ваш спонсор</label>
                </div>
              </div>
              <button type="button" class="editing-label disabled">Редактировать поля</button>
            </div>
          </div>
          <div class="btn-wrapper">
            <button type="submit" class="g-btn g-btn--no-icon g-btn--white" v-if="!newTicket">
              <span>Сохранить</span>
            </button>
            <button type="submit" class="g-btn g-btn--no-icon" :disabled="$v.$invalid" v-else>
              <span>Создать</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </modal>
</template>

<script>
import { maxLength, minLength, required } from 'vuelidate/lib/validators'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/ru'
import API from '../../api/index'

export default {
  name: 'ModalTicketCreateEditing',
  components: { ckeditor: CKEditor.component },
  data() {
    return {
      editor: ClassicEditor,
      newTicket: false,
      ticket: '',
      editorConfig: {
        language: 'ru',
        image_previewText: '',
        initialData: '',
        toolbar: [
          'bold',
          'italic',
          'bulletedList',
          'numberedList',
          'undo',
          'redo'
        ]
      },
      errorSelect: {
        currency: false
      },
      showError: false,
      name: '',
      form: {
        title: '',
        description: '',
        price: '',
        currency: '',
        fields: [1, 2, 3]
      },
      currencyMask: {
        X: {
          pattern: /[0-9.]/
        }
      },
      selectCurrency: ['USD', 'RUB', 'KZT']
    }
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30)
      },
      price: {
        required
      },
      description: {
        required,
        maxLength: maxLength(200)
      },
      currency: {
        required
      }
    }
  },
  methods: {
    onSubmit() {
      if(this.newTicket) {
        API.tickets.create(this.form).then(response => {
          API.response.success('Билет создан')
          this.$root.$emit('ticket-edit')
          this.$modal.hide('modal-ticket-create')
        })
      } else {
        API.tickets.edit(this.form).then(response => {
          API.response.success('Билет отредактирован')
          this.$root.$emit('ticket-edit')
          this.$modal.hide('modal-ticket-create')
        })
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
      if (event.params !== undefined) {
        this.newTicket = event.params.new
        if (this.newTicket) {
          this.form.relation_id = event.params.relation_id
        }
        if (event.params.ticket) {
          this.form.title = event.params.ticket.title
          this.form.description = event.params.ticket.desc
          this.form.price = event.params.ticket.price
          this.form.currency = event.params.ticket.currency
          this.form.id = event.params.ticket.id
        }
      }
    },
    beforeClose(event) {
      this.form.title = ''
      this.form.description = ''
      this.form.price = ''
      this.form.currency = ''
      this.editorConfig.initialData = ''
      this.fields = [1,2,3]
    }
  }
}
</script>

<style scoped>

</style>
