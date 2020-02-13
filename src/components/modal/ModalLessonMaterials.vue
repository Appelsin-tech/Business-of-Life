<template>
  <modal name='modal-lesson-materials' transition="pop-out" height="auto" width="100%" :maxWidth="1170" :maxHeight="680"
         :adaptive="true"
         :scrollable="true" :classes="'custom-modals'" @before-open="beforeOpen" @before-close="beforeClose">
    <div class="modal modal__lesson-materials">
      <div class="close-modal" @click="$modal.hide('modal-lesson-materials')" title="Закрыть">
        <div class="close-modal__wrapper">
          <span class="close-modal__line"></span>
          <span class="close-modal__line"></span>
        </div>
      </div>
      <div class="modal__container">
        <h3 class="g-caption-inner">Материал</h3>
        <form class="form-modal" @submit.prevent="onSubmit">
          <div class="form-modal__wrapper">
            <div class="g-item-form col-12">
              <label class="g-item-form__label">Тип</label>
              <v-select :disabled="!newMaterials" :multiple="false" :class="['v-select__modal', {error: errorSelect.type}]" :reduce="type => type.value" :searchable="false" label="titleType" :options="listType" v-model="form.type" v-on:search:blur="validateSelect('type')"></v-select>
              <div class="input-valid-error" v-if="errorSelect.type">
                Выберите Тип
              </div>
            </div>
            <div class="g-item-form col-12" v-if="form.type">
              <label class="g-item-form__label">Содержание</label>
              <ckeditor :editor="editor" v-model="form.content" :config="editorConfig" v-if="form.type === 'text'"></ckeditor>
              <input class="g-item-form__input" v-model="form.content" v-else-if="form.type === 'video'">
            </div>
            <div class="g-item-form col-12" v-if="form.type === 'video'">
              <label class="g-item-form__label">Название видео</label>
              <input class="g-item-form__input" v-model="form.title">
            </div>
          </div>
          <button type="submit" class="g-btn g-btn--no-icon" v-if="newMaterials">
            <span>Добавить</span>
          </button>
          <button type="submit" class="g-btn g-btn--no-icon" v-else>
            <span>Сохранить</span>
          </button>
        </form>
      </div>
    </div>
  </modal>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/ru'
import API from '@/api/index'

export default {
  name: 'ModalLessonMaterials',
  components: {
    ckeditor: CKEditor.component
  },
  data() {
    return {
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
      newMaterials: false,
      idLesson: null,
      form: {
        type: '',
        content: ''
      },
      listType: [
        {
          titleType: 'Видео',
          value: 'video'
        },
        {
          titleType: 'Текст',
          value: 'text'
        }
      ],
      errorSelect: {
        type: false
      }
    }
  },
  computed: {
    parseLink () {
      let parseUrl = null
      if (this.form.type === 'video') {
        let url = new URL(this.form.content)
        let regYt = /youtube/
        let regVimeo = /vimeo/
        // https://www.youtube.com/watch?v=uor5Bkmejxw
        if (regYt.test(this.form.content)) {
          parseUrl = 'https://www.youtube.com/embed/' + url.searchParams.get('v')
        } else if (regVimeo.test(this.form.content)) {
          parseUrl = 'https://player.vimeo.com/video' + url.pathname
        }
      }
      return parseUrl
    },
  },
  methods: {
    onSubmit () {
      let data = {
        type: this.form.type,
        lesson_id: this.idLesson
      }
      if (this.form.type === 'video') {
        data.content = this.parseLink
      } else {
        data.content = this.form.content
      }
      API.courses.lesson.add(data).then(response => {
        console.log(response)
        API.response.success('Блок добавлен')
        this.$root.$emit('materials-edit')
        this.$modal.hide('modal-lesson-materials')
      }).catch(e => {
        console.log(e)
      })
    },

    validateSelect (name) {
      if (this.form[name] === '') {
        this.errorSelect[name] = true
      } else {
        this.errorSelect[name] = false
      }
    },
    beforeClose () {
      this.form.type = ''
      this.form.content = ''
      this.errorSelect.type = false
    },
    beforeOpen (event) {
      if (event.params !== undefined) {
        this.idLesson = event.params.idLesson
        if (event.params.newBlocks) {
          this.newMaterials = true
        } else {
          this.form.type = event.params.type
          this.form.content = event.params.content
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
