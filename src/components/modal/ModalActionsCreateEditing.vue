<template>
  <modal name='modal-actions-create' transition="pop-out" height="auto" width="100%" :maxWidth="1170" :maxHeight="680"
         :adaptive="true"
         :scrollable="true" :classes="'custom-modals'" @before-open="beforeOpen" @before-close="beforeClose">
    <div class="modal modal__stock-create">
      <div class="close-modal" @click="$modal.hide('modal-actions-create')" title="Закрыть">
        <div class="close-modal__wrapper">
          <span class="close-modal__line"></span>
          <span class="close-modal__line"></span>
        </div>
      </div>
      <div class="modal__container">
        <h3 class="g-caption-inner">Акция</h3>
        <form class="form-modal" @submit.prevent="onSubmit">
          <div class="form-modal__wrapper">
            <div class="g-item-form col-12">
              <label class="g-item-form__label">Название</label>
              <input class="g-item-form__input" :class="{error: $v.form.title.$error}" v-model="form.title" @blur="$v.form.title.$touch()">
              <div class="input-valid-error" v-if="$v.form.title.$error">
                <template v-if="!$v.form.title.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.title.maxLength">Превышено количество допустимых символов</template>
                <template v-if="!$v.form.title.minLength">Минимальное количество символов - 3</template>
              </div>
            </div>
            <div class="g-item-form col-12">
              <label class="g-item-form__label">Описание</label>
              <ckeditor :editor="editor" v-model="form.description" :config="editorConfig" :class="{error: $v.form.description.$error}" @blur="$v.form.description.$touch()"></ckeditor>
              <div class="input-valid-error" v-if="$v.form.description.$error">
                <template v-if="!$v.form.description.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.description.maxLength">Превышено количество допустимых символов</template>
              </div>
            </div>
            <div class="g-item-form col-6">
              <label class="g-item-form__label">Акционный билет</label>
              <v-select :disabled="!newStock" :multiple="false" :class="['v-select__modal', {error: errorSelect.ticket}]" :searchable="false" :reduce="ticket => ticket.id" label="title" :options="listTickets" v-model="form.ticket" v-on:search:blur="validateSelect('ticket')"></v-select>
              <div class="input-valid-error" v-if="errorSelect.ticket">
                Выберите билет
              </div>
            </div>
            <div class="g-item-form col-6">
              <label class="g-item-form__label">Количество билетов</label>
              <input class="g-item-form__input" v-mask="maskConfig" :class="{error: $v.form.amount.$error}" v-model="form.amount" @blur="$v.form.amount.$touch()"/>
              <div class="input-valid-error" v-if="$v.form.amount.$error">
                <template v-if="!$v.form.amount.required">Поле не может быть пустым</template>
              </div>
            </div>
          </div>
          <div class="btn-wrapper">
            <button-app v-if="!newStock">
              Сохранить
            </button-app>
            <button-app :disabled="$v.$invalid" v-else>
              Создать
            </button-app>
          </div>
        </form>
      </div>
    </div>
  </modal>
</template>

<script>
import { maxLength, minLength, required } from 'vuelidate/lib/validators'
import API from '@/api/index'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/ru'

export default {
  name: 'ModalActionsCreateEditing',
  components: { ckeditor: CKEditor.component },
  data() {
    return {
      newStock: false,
      stock: '',
      showError: false,
      name: '',
      maskConfig: {
        mask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        tokens: {
          X: {
            pattern: /[0-9.]/
          }
        },
        masked: ''
      },
      editor: ClassicEditor,
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
        type: false,
        ticket: false
      },
      form: {
        relation: '',
        title: '',
        ticket: '',
        amount: '',
        description: ''
      },
      listTickets: []
    }
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(100)
      },
      ticket: {
        required
      },
      description: {
        required,
        maxLength: maxLength(300)
      },
      amount: {
        required
      },
    }
  },
  methods: {
    onSubmit() {
      if(this.newStock) {
        API.actions.create(this.form).then(response => {
          API.response.success('Акция создана')
          this.$root.$emit('actions-edit')
          this.$modal.hide('modal-actions-create')
        })
      } else {
        API.actions.edit({
          id: this.form.id,
          title: this.form.title,
          amount: this.form.amount,
          description: this.form.description
        }).then(response => {
          API.response.success('Акция отредактирована')
          this.$root.$emit('actions-edit')
          this.$modal.hide('modal-actions-create')
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
        this.newStock = event.params.new
        this.form.relation = event.params.relation_id
        this.listTickets = event.params.listTickets
        if (event.params.action) {
          this.form.title = event.params.action.title
          this.form.ticket = event.params.action.ticket
          this.form.amount = event.params.action.amount
          this.form.description = event.params.action.desc
          this.form.id = event.params.action.id
        }
      }
    },
    beforeClose(event) {
      this.$v.$reset()
      this.errorSelect.type = false
      this.errorSelect.type = false
      this.form.title = ''
      this.form.ticket = ''
      this.form.amount = ''
      this.form.relation = ''
      this.form.description = ''
      this.form.id = ''
      this.listTickets = []
    }
  }
}
</script>
<style>
</style>
