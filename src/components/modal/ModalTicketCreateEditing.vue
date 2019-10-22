<template>
  <modal name='modal-ticket-create' transition="pop-out" height="auto" width="100%" :maxWidth="1170" :maxHeight="680"
         :adaptive="true"
         :scrollable="true" :classes="'custom-modals'">
    <div class="modal modal__ticket-create">
      <div class="close-modal" @click="$modal.hide('modal-ticket-create')" title="Закрыть">
        <div class="close-modal__wrapper">
          <span class="close-modal__line"></span>
          <span class="close-modal__line"></span>
        </div>
      </div>
      <div class="modal__container">
        <h3 class="title">Билет</h3>
        <form class="form-modal" @submit.prevent="onSubmit">
          <div class="form-modal__wrapper">
            <div class="form-modal__item form-modal__item--col-8">
              <label class="form-modal__label" for="form-title">Тип билета</label>
              <v-select v-model="form.type" :multiple="false" :class="['v-select__modal', {'error': errorSelect.type}]" v-on:search:blur="validateSelect('type')" :searchable="false" placeholder="Тип билета" :options="selectType"></v-select>
              <div class="input-valid-error" v-if="errorSelect.type">
                Выберите тип билета
              </div>
            </div>
            <div class="form-modal__item form-modal__item--col-8">
              <label class="form-modal__label">Описание</label>
              <ckeditor :editor="editor" v-model="form.description" :config="editorConfig" :class="{error: $v.form.description.$error}"  @blur="$v.form.description.$touch()"></ckeditor>
              <div class="input-valid-error" v-if="$v.form.description.$error">
                <template v-if="!$v.form.description.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.description.maxLength">Превышено количество допустимых символов</template>
              </div>
            </div>
            <div class="form-modal__item form-modal__item--col-8">
              <label class="form-modal__label">Цена</label>
              <input class="form-modal__input" v-mask="'#################'" v-model="form.price">
            </div>
            <div class="form-modal__item form-modal__item--col-8">
              <label class="form-modal__label">Валюта</label>
              <v-select :multiple="false" :class="['v-select__modal', {error: errorSelect.t_currency}]" :searchable="false" :options="selectCurrency" v-model="form.currency" v-on:search:blur="validateSelect('t_currency')"></v-select>
              <div class="input-valid-error" v-if="errorSelect.t_currency">
                Выберите Валюту
              </div>
            </div>
          </div>
          <div class="btn-wrapper">
            <button type="submit" class="g-btn g-btn--no-icon g-btn--white g-btn--border">
              <span>Сохранить</span>
            </button>
            <button type="submit" class="g-btn g-btn--no-icon" :disabled="$v.$invalid">
              <span>Опубликовать</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </modal>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/ru'

export default {
  name: 'ModalTicketCreateEditing',
  components: { ckeditor: CKEditor.component },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        language: 'ru',
        image_previewText: '',
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
        type: false,
        t_currency: false
      },
      showError: false,
      name: '',
      form: {
        type: '',
        description: '',
        price: '',
        t_currency: ''
      },
      selectType: ['стандарт', 'базовый', 'VIP'],
      selectCurrency: ['USD', 'RUB', 'KZT']
    }
  },
  validations: {
    form: {
      price: {
        required
      },
      description: {
        required,
        maxLength: maxLength(200)
      },
      t_currency: {
        required
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('as')
    },
    validateSelect(name) {
      if (this.form[name] === '') {
        this.errorSelect[name] = true
      } else {
        this.errorSelect[name] = false
      }
    },
  }
}
</script>

<style scoped>

</style>
