<template>
  <modal name='modal-stock-create' transition="pop-out" height="auto" width="100%" :maxWidth="1170" :maxHeight="680"
         :adaptive="true"
         :scrollable="true" :classes="'custom-modals'" @before-open="beforeOpen" @before-close="beforeClose">
    <div class="modal modal__stock-create">
      <div class="close-modal" @click="$modal.hide('modal-stock-create')" title="Закрыть">
        <div class="close-modal__wrapper">
          <span class="close-modal__line"></span>
          <span class="close-modal__line"></span>
        </div>
      </div>
      <div class="modal__container">
        <h3 class="g-caption-inner">Акция</h3>
        <form class="form-modal" @submit.prevent="onSubmit">
          <div class="form-modal__wrapper">
            <div class="form-modal__item">
              <label class="form-modal__label" >Название</label>
              <input class="form-modal__input" :class="{error: $v.form.title.$error}" v-model="form.title" @blur="$v.form.title.$touch()">
              <div class="input-valid-error" v-if="$v.form.title.$error">
                <template v-if="!$v.form.title.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.title.maxLength">Превышено количество допустимых символов</template>
                <template v-if="!$v.form.title.minLength">Минимальное количество символов - 3</template>
              </div>
            </div>
            <div class="form-modal__item ">
              <label class="form-modal__label">Тип акции</label>
              <v-select :multiple="false" :class="['v-select__modal', {error: errorSelect.type}]" :searchable="false" :options="selectType" v-model="form.type" v-on:search:blur="validateSelect('type')"></v-select>
              <div class="input-valid-error" v-if="errorSelect.type">
                Выберите тип
              </div>
            </div>
            <div class="form-modal__item ">
              <label class="form-modal__label">Акционный билет</label>
              <v-select :multiple="false" :class="['v-select__modal', {error: errorSelect.ticket}]" :searchable="false" :options="selectTicket" v-model="form.ticket" v-on:search:blur="validateSelect('ticket')"></v-select>
              <div class="input-valid-error" v-if="errorSelect.ticket">
                Выберите билет
              </div>
            </div>
            <div class="form-modal__item ">
              <label class="form-modal__label">Количество билетов</label>
              <input class="form-modal__input" v-mask="maskConfig" :class="{error: $v.form.ticket_count.$error}" v-model="form.ticket_count" @blur="$v.form.ticket_count.$touch()"/>
              <div class="input-valid-error" v-if="$v.form.ticket_count.$error">
                <template v-if="!$v.form.ticket_count.required">Поле не может быть пустым</template>
              </div>
            </div>
            <div class="form-modal__item form-modal__item--col-12">
              <label class="form-modal__label">Информация об акции</label>
              <ckeditor :editor="editor" v-model="form.info" :config="editorConfig" :class="{error: $v.form.info.$error}" @blur="$v.form.info.$touch()"></ckeditor>
              <div class="input-valid-error" v-if="$v.form.info.$error">
                <template v-if="!$v.form.info.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.info.maxLength">Превышено количество допустимых символов</template>
              </div>
            </div>
          </div>
          <div class="btn-wrapper">
            <button type="submit" class="g-btn g-btn--no-icon g-btn--white" v-if="!newStock">
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
  name: 'ModalStockCreateEditing',
  components: { ckeditor: CKEditor.component  },
  data() {
    return {
      editor: ClassicEditor,
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
        title: '',
        ticket: '',
        type: '',
        ticket_count: '',
        info: ''
      },
      selectType: ['Первые билеты', 'Вторые', 'Третьи билеты'],
      selectTicket: ['Партнер', 'VIP', 'Базовый']
    }
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30)
      },
      ticket: {
        required
      },
      ticket_count: {
        required
      },
      type: {
        required
      },
      info: {
        required,
        maxLength: maxLength(200)
      },
    }
  },
  methods: {
    onSubmit() {
      if(this.newStock) {
        // API.tickets.create(this.form).then(response => {
        //   API.response.success('Билет создан')
        //   this.$root.$emit('ticket-edit')
        //   this.$modal.hide('modal-ticket-create')
        // })
      } else {
        // API.tickets.edit(this.form).then(response => {
        //   API.response.success('Билет отредактирован')
        //   this.$root.$emit('ticket-edit')
        //   this.$modal.hide('modal-ticket-create')
        // })
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
        if (this.newStock) {
          this.form.relation_id = event.params.relation_id
        }
        if (event.params.stock) {
          this.form.title = event.params.ticket.title
          this.form.ticket_count = event.params.stock.ticket_count
          this.form.type = event.params.stock.type
          this.form.id = event.params.stock.id
          this.form.info = event.params.stock.info
          this.form.ticket = event.params.stock.ticket
        }
      }
    },
    beforeClose(event) {
      this.form.title = ''
      this.form.ticket_count = ''
      this.form.type = ''
      this.form.info = ''
      this.form.ticket = ''
    }
  }
}
</script>
<style>
</style>
