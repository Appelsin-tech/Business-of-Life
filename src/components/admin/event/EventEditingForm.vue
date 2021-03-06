<template>
  <form class="edit-form" @submit.prevent="onSubmit">
    <div class="edit-grid">
      <div class="g-item-form textarea item--col-12">
        <label class="g-item-form__label">Название</label>
        <textarea-resize>
          <textarea class="g-item-form__input" rows="1" :class="{error: $v.form.title.$error}" type="text" placeholder="Тренинг Искусство продаж " v-model="form.title" @blur="$v.form.title.$touch()"></textarea>
        </textarea-resize>
        <div class="input-valid-error" v-if="$v.form.title.$error">
          <template v-if="!$v.form.title.required">Поле не может быть пустым</template>
          <template v-if="!$v.form.title.maxLength">Превышено количество допустимых символов</template>
        </div>
      </div>
      <div class="g-item-form item--col-12">
        <label class="g-item-form__label">Краткое описание</label>
        <input class="g-item-form__input" :class="{error: $v.form.snippet.$error}" type="text" placeholder="Краткое описание " v-model="form.snippet" @blur="$v.form.snippet.$touch()">
        <div class="input-valid-error" v-if="$v.form.snippet.$error">
          <template v-if="!$v.form.snippet.required">Поле не может быть пустым</template>
          <template v-if="!$v.form.snippet.maxLength">Превышено количество допустимых символов</template>
        </div>
      </div>
      <div class="textarea  g-item-form item--col-12">
        <label class="g-item-form__label">Полное описание</label>
        <ckeditor :editor="editor" v-model="form.description" @ready="readyEditor" :config="editorConfig"  @blur="$v.form.description.$touch()"></ckeditor>
        <div class="input-valid-error" v-if="$v.form.description.$error">
          <template v-if="!$v.form.description.required">Поле не может быть пустым</template>
          <template v-if="!$v.form.description.maxLength">Превышено количество допустимых символов</template>
        </div>
      </div>
      <div class="g-item-form item--col-12">
        <label class="g-item-form__label">Описание целевой аудитории</label>
        <input class="g-item-form__input" :class="{error: $v.form.audience.$error}" type="text" placeholder="Тренинг Искусство продаж" v-model="form.audience" @blur="$v.form.audience.$touch()">
        <div class="input-valid-error" v-if="$v.form.audience.$error">
          <template v-if="!$v.form.audience.required">Поле не может быть пустым</template>
          <template v-if="!$v.form.audience.maxLength">Превышено количество допустимых символов</template>
        </div>
      </div>
    </div>
    <div class="btn-wrapper">
      <button-app>
        <template v-if="idEvent">Сохранить</template>
        <template v-else>Создать</template>
      </button-app>
      <button-app class="btn-app--white" @click.native="deleteEvent(idEvent)" v-if="btnDelete">
        Удалить
      </button-app>
    </div>
  </form>
</template>

<script>
import { maxLength, required } from 'vuelidate/lib/validators'
import API from '@/api'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/ru'
import textareaResize from '@/components/textareaResize'

export default {
  name: 'EventEditingForm',
  props: ['idEvent', 'event', 'btnDelete'],
  components: { ckeditor: CKEditor.component, textareaResize },
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
          'redo',
          'link'
        ]
      },
      name: 'asdasdasd',
      form: {
        title: '',
        snippet: '',
        description: '',
        audience: ''
      }
    }
  },
  validations: {
    form: {
      title: {
        required,
        maxLength: maxLength(100)
      },
      snippet: {
        required,
        maxLength: maxLength(150)
      },
      description: {
        required,
        maxLength: maxLength(5000)
      },
      audience: {
        required,
        maxLength: maxLength(150)
      },
    }
  },
  methods: {
    onSubmit() {
      if (this.idEvent) {
        API.events.edit(this.form).then(response => {
          API.response.success('Мероприятие отредактировано')
        }).catch(error => {
          console.log(error)
        })
      } else {
        API.events.create(this.form).then(response => {
          API.response.success('Мероприятие создано')
          this.$store.dispatch('event/getMyEvents').then(() => {
            this.$router.push({ path: `/office/events/${response.data.id}` })
          })
        }).catch(error => {
          console.log(error)
        })
      }
    },
    deleteEvent(id) {
      API.events.delete({ id: id }).then(() => {
        API.response.success('Мероприятие удалено')
        this.$store.dispatch('event/getMyEvents')
        this.$router.push({ path: '/office/events/control' })
      })
    },
    readyEditor () {
      if (this.event) {
        this.form.description = this.event.description
      }
    }
  },
  watch: {
    event(newVal, oldVal) {
      if (newVal !== undefined) {
        this.form.id = this.idEvent
        this.form.title = this.event.title
        this.form.snippet = this.event.snippet
        this.form.audience = this.event.audience
      }
    },
    'form.description': function(val) {
      this.$emit('input', val)
    }
  },
  mounted() {
    if (this.event) {
      this.form.id = this.idEvent
      this.form.title = this.event.title
      this.form.snippet = this.event.snippet
      this.form.audience = this.event.audience
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";

  .edit-grid {
    display: flex;
    flex-direction: column;
  }
  .btn-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 35px;
    .sm-block({
      margin-top: 18px;});
    .ss-block({ flex-direction: column; align-items: flex-start; });
    .btn-app {
      &--white {
        .ss-block({ margin-top: 10px; });
      }
    }
  }
</style>
