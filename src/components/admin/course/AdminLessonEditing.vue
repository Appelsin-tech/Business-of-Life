<template>
  <section class="p-event-all-editing p-default p-default-inner">
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class="container page">
      <h1 class="g-caption-inner">
        <template v-if="id">Редактирование урока</template>
        <template v-else>Создание урока</template>
      </h1>
      <form class="edit-form" @submit.prevent="onSubmit">
        <h2 class="g-caption-section">Общая информация</h2>
        <div class="edit-grid">
          <div class="g-item-form  g-item-form--col-12">
            <label class="g-item-form__label">Название</label>
            <input class="g-item-form__input" type="text" id="form-title" v-model="form.title" :class="{error: $v.form.title.$error}" @blur="$v.form.title.$touch()">
            <div class="input-valid-error" v-if="$v.form.title.$error">
              <template v-if="!$v.form.title.required">Поле не может быть пустым</template>
              <template v-if="!$v.form.title.maxLength">Превышено количество допустимых символов</template>
            </div>
          </div>
          <div class="g-item-form  g-item-form--col-12">
            <label class="g-item-form__label">Описание</label>
            <ckeditor :editor="editor" v-model="form.description" :config="editorConfig"></ckeditor>
            <div class="input-valid-error" v-if="$v.form.description.$error">
              <template v-if="!$v.form.description.required">Поле не может быть пустым</template>
              <template v-if="!$v.form.description.maxLength">Превышено количество допустимых символов</template>
            </div>
          </div>
          <div class="btn-wrapper">
            <button class="g-btn g-btn--no-icon" :disabled="$v.$invalid">
              <span v-if="id">Сохранить</span>
              <span v-else>Создать</span>
            </button>
          </div>
        </div>
      </form>
      <router-link :to="`/admin/course-editing/${course}`" class="back-btn">Назад</router-link>
    </div>
  </section>
</template>

<script>
import { maxLength, required } from 'vuelidate/lib/validators'
import API from '@/api'
import BreadCrumbs from '@/components/BreadCrumbs'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/ru'
import response from '@/api/response'

export default {
  name: 'AdminLessonEditing',
  props: ['course', 'id'],
  components: {
    ckeditor: CKEditor.component,
    BreadCrumbs
  },
  data() {
    return {
      breadCrumbs: [
        {
          path: '/admin/menu',
          title: 'Личный кабинет'
        },
        {
          path: '/admin/course-control',
          title: 'Редактирование курсов'
        },
        {
          title: 'Курс',
          path: `/admin/course-editing/${this.course}`
        }
      ],
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
      form: {
        title: '',
        description: '',
        course_id: this.course
      },
      errorResponse: {
        title: 'Неверная длина названия',
        description: 'Неверная длина описания'
      }
    }
  },
  validations: {
    form: {
      title: {
        required,
        maxLength: maxLength(100)
      },
      description: {
        required,
        maxLength: maxLength(5000)
      }
    }
  },
  methods: {
    onSubmit() {
      this.$v.$touch()
      if (this.id) {
        API.courses.lesson.edit(this.form).then(response => {
          console.log(response)
          API.response.success('Урок отредактирован')
        }).catch(e => {
          if (e.response.reason) {
            API.response.error(this.errorResponse[e.response.reason])
          }
        })
      } else {
        API.courses.lesson.create(this.form).then(response => {
          console.log(response)
          API.response.success('Урок создан')
          this.$router.push({ path: `/admin/course-editing/${this.course}` })
        }).catch(e => {
          if (e.response.reason) {
            API.response.error(this.errorResponse[e.response.reason])
          }
        })
      }
    },
    getDetailsLesson() {
      API.courses.lesson.details({ id: this.id }).then(response => {
        this.form.title = response.title
        this.form.description = response.description
      })
    }
  },
  mounted() {
    if (this.id) {
      this.getDetailsLesson()
    }
  }
}
</script>

<style scoped>

</style>
