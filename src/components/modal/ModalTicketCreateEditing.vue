<template>
  <modal name='modal-create-ticket' transition="pop-out" height="auto" width="100%" :maxWidth="1170" :maxHeight="680"
         :adaptive="true"
         :scrollable="true" :classes="'custom-modals'">
    <div class="modal modal__ticket-create">
      <div class="close-modal" @click="$modal.hide('modal-create-ticket')" title="Закрыть">
        <div class="close-modal__wrapper">
          <span class="close-modal__line"></span>
          <span class="close-modal__line"></span>
        </div>
      </div>
      <div class="modal__container">
        <h3 class="title">Создать мероприятие</h3>
        <form class="form-modal" @submit.prevent="onSubmit">
          <div class="form-modal__wrapper">
            <div class="form-modal__item">
              <label class="form-modal__label" for="form-title">Название</label>
              <v-select v-model="form.type" :multiple="false" :class="['v-select__modal', {'error': errorSelect.selectedQualification}]" v-on:search:blur="validateSelect('selectedQualification')" :searchable="false" placeholder="Тип билета" :options="selectType"></v-select>
              <div class="input-valid-error" v-if="errorSelect.type">
                Выберите Валюту
              </div>
            </div>
            <div class="form-modal__item">
              <ckeditor :editor="editor" v-model="form.description" :config="editorConfig" :class="{error: $v.form.description.$error}"  @blur="$v.form.description.$touch()"></ckeditor>
              <div class="input-valid-error" v-if="$v.form.description.$error">
                <template v-if="!$v.form.description.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.description.maxLength">Превышено количество допустимых символов</template>
              </div>
            </div>
            <div class="form-modal__item">
              <input class="form-modal__input" v-mask="'#################'" v-model="form.price">
            </div>
            <div class="form-modal__item">
              <v-select :multiple="false" :class="['v-select__modal', {error: errorSelect.t_currency}]" :searchable="false" :options="selectCurrency" v-model="form.currency" v-on:search:blur="validateSelect('t_currency')"></v-select>
              <div class="input-valid-error" v-if="errorSelect.currency">
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
import { required, minLength } from 'vuelidate/lib/validators'
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
        selectedQualification: false,
        selectedPayment: false
      },
      showError: false,
      name: '',
      form: {
        type: '',
        description: '',
        price: '',
        currency: ''
      },
      selectType: ['стандарт', 'базовый', 'VIP'],
      selectCurrency: ['USD', 'RUB', 'KZT']
    }
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(3)
      },
      city: {
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
