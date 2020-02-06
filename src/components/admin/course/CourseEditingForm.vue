<template>
  <form class="edit-form" @submit.prevent="onSubmit">
    <div class="edit-grid">
<!--      <download-photo/>-->
      <div class="g-item-form textarea col-grid-12">
        <label class="g-item-form__label">Название</label>
        <textarea-resize>
          <textarea class="g-item-form__input" rows="1" :class="{error: $v.form.title.$error}" type="text" placeholder="Тренинг Искусство продаж " v-model="form.title" @blur="$v.form.title.$touch()"></textarea>
        </textarea-resize>
        <div class="input-valid-error" v-if="$v.form.title.$error">
          <template v-if="!$v.form.title.required">Поле не может быть пустым</template>
          <template v-if="!$v.form.title.maxLength">Превышено количество допустимых символов</template>
        </div>
      </div>
      <div class="g-item-form col-grid-12">
        <label class="g-item-form__label">Краткое описание</label>
        <input class="g-item-form__input" :class="{error: $v.form.snippet.$error}" type="text" placeholder="Краткое описание " v-model="form.snippet" @blur="$v.form.snippet.$touch()">
        <div class="input-valid-error" v-if="$v.form.snippet.$error">
          <template v-if="!$v.form.snippet.required">Поле не может быть пустым</template>
          <template v-if="!$v.form.snippet.maxLength">Превышено количество допустимых символов</template>
        </div>
      </div>
      <div class="textarea  g-item-form col-grid-12">
        <label class="g-item-form__label">Полное описание</label>
        <ckeditor :editor="editor" v-model="form.description" :config="editorConfig"></ckeditor>
        <div class="input-valid-error" v-if="$v.form.description.$error">
          <template v-if="!$v.form.description.required">Поле не может быть пустым</template>
          <template v-if="!$v.form.description.maxLength">Превышено количество допустимых символов</template>
        </div>
      </div>
    </div>
    <div class="btn-wrapper">
      <button  type="submit" class="g-btn g-btn--no-icon" :disabled="$v.$invalid">
        <span v-if="idCourse">Сохранить</span>
        <span v-else>Создать</span>
      </button>
      <button class="g-btn g-btn--no-icon g-btn--white" type="button" @click="deleteCourse(idCourse)" v-if="btnDelete">
        <span>Удалить</span>
      </button>
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
import DownloadPhoto from '@admin/common/DownloadPhoto'

export default {
  name: 'CourseEditingForm',
  props: ['idCourse', 'course', 'btnDelete'],
  components: {
    ckeditor: CKEditor.component,
    textareaResize,
    DownloadPhoto
  },
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
      name: '',
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
    }
  },
  methods: {
    onSubmit() {
      if (this.idCourse) {
        API.courses.courses.edit(this.form).then(response => {
          API.response.success('Курс отредактирован')
        }).catch(error => {
          console.log(error)
        })
      } else {
        API.courses.courses.create(this.form).then(response => {
          console.log(response)
          API.response.success('Курс создан')
          this.$store.dispatch('courses/getMyCourses').then(() => {
            this.$router.push({ path: `/admin/course-editing/${response.id}` })
          })
        }).catch(error => {
          console.log(error)
        })
      }
    },
    deleteCourse(id) {
      API.courses.courses.delete({ id: id }).then(() => {
        API.response.success('Курс удален')
        this.$store.dispatch('courses/getMyCourses')
        this.$router.push({ path: '/admin/course-control' })
      })
    }
  },
  watch: {
    course(newVal, oldVal) {
      if (newVal !== undefined) {
        this.form = {
          id: this.idCourse,
          title: this.course.title,
          snippet: this.course.snippet,
          description: this.course.description
        }
      }
    }
  },
  mounted() {
    if (this.course) {
      this.form = {
        title: this.event.title,
        snippet: this.event.snippet,
        description: this.event.description,
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .edit-grid {
    display: grid;
    /*minmax(0, 203px)*/
    grid-template-columns:  1fr;
    grid-column-gap: 100px;
    margin-bottom: 15px;
    .lg-block({
      grid-column-gap: 50px;
    });
    .md-block({
      grid-column-gap: 0;
      grid-template-columns: 1fr;
    });
    .sm-block({
      margin-bottom: 18px;});
  }
  .btn-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 35px;
    .sm-block({
      margin-top: 18px;});
    .ss-block({ flex-direction: column; align-items: flex-start; });
    .g-btn {
      &--white {
        .ss-block({ margin-top: 10px; });
      }
    }
  }
</style>
