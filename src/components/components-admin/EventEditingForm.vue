<template>
  <form class="edit-form" @submit.prevent="onSubmit">
    <div class="edit-grid">
      <div class="edit-grid__item  item item--col-12">
        <label class="item__label" for="form-title">Название</label>
        <input class="item__input" id="form-title" :class="{error: $v.form.title.$error}" type="text" placeholder="Тренинг Искусство продаж " v-model="form.title" @blur="$v.form.title.$touch()">
        <div class="input-valid-error" v-if="$v.form.title.$error">
          <template v-if="!$v.form.title.required">Поле не может быть пустым</template>
          <template v-if="!$v.form.title.maxLength">Превышено количество допустимых символов</template>
        </div>
      </div>
      <div class="edit-grid__item  item item--col-12">
        <label class="item__label" for="form-snippet">Краткое описание</label>
        <input class="item__input" id="form-snippet" :class="{error: $v.form.snippet.$error}" type="text" placeholder="Краткое описание " v-model="form.snippet" @blur="$v.form.snippet.$touch()">
        <div class="input-valid-error" v-if="$v.form.snippet.$error">
          <template v-if="!$v.form.snippet.required">Поле не может быть пустым</template>
          <template v-if="!$v.form.snippet.maxLength">Превышено количество допустимых символов</template>
        </div>
      </div>
      <div class="edit-grid__item textarea  item item--col-12">
        <label class="item__label" for="form-description">Полное описание</label>
        <ckeditor :editor="editor" v-model="form.description" :config="editorConfig"></ckeditor>
        <div class="input-valid-error" v-if="$v.form.description.$error">
          <template v-if="!$v.form.description.required">Поле не может быть пустым</template>
          <template v-if="!$v.form.description.maxLength">Превышено количество допустимых символов</template>
        </div>
      </div>
      <div class="edit-grid__item item item--col-12">
        <label class="item__label" for="form-audience">Описание целевой аудитории</label>
        <input class="item__input" id="form-audience" :class="{error: $v.form.audience.$error}" type="text" placeholder="Тренинг Искусство продаж" v-model="form.audience" @blur="$v.form.audience.$touch()">
        <div class="input-valid-error" v-if="$v.form.audience.$error">
          <template v-if="!$v.form.audience.required">Поле не может быть пустым</template>
          <template v-if="!$v.form.audience.maxLength">Превышено количество допустимых символов</template>
        </div>
      </div>
    </div>
    <div class="btn-wrapper">
      <button type="submit" class="g-btn g-btn--no-icon" :disabled="$v.$invalid">
        <span>Сохранить</span>
      </button>
      <button class="g-btn g-btn--no-icon g-btn--white g-btn--border" type="button" @click="deleteEvent(idEvent)" v-if="btnDelete">
        <span>Удалить</span>
      </button>
    </div>
  </form>
</template>

<script>

import { maxLength, required } from 'vuelidate/lib/validators'
import API from '../../api/index'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/ru'

export default {
  name: 'EventEditingForm',
  props: ['idEvent', 'event', 'btnDelete'],
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
          this.$store.dispatch('user/getMyParentEvents').then(() => {
            this.$router.push({ path: `/admin/event-editing/${response.data.id}` })
          })
        }).catch(error => {
          console.log(error)
        })
      }
    },
    deleteEvent(id) {
      API.events.delete({ id: id }).then(() => {
        API.response.success('Мероприятие удалено')
        this.$router.push({ path: '/admin/event-control' })
      })
    }
  },
  watch: {
    event(newVal, oldVal) {
      if (newVal !== undefined) {
        this.form = {
          id: this.idEvent,
          title: this.event.title,
          snippet: this.event.snippet,
          description: this.event.description,
          audience: this.event.audience
        }
      }
    }
  },
  mounted() {
    if (this.event) {
      this.form = {
        title: this.event.title,
        snippet: this.event.snippet,
        description: this.event.description,
        audience: this.event.audience
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import '~mavon-editor/dist/css/index.css';
  @import "../../assets/less/_importants";

  .edit-grid {
    display: flex;
    flex-direction: column;
    padding-left: 50px;
    .sm-block({ padding-left: 0; });
  }
  .item {
    margin-bottom: 30px;
    &.textarea {
      display: flex;
      flex-direction: column;
      .item__input--textarea {
        flex-grow: 1;
        padding-top: 25px;
        padding-bottom: 20px;
        height: auto;
        resize: none;
        outline: none;
        min-height: 75px;
        .lg-block({ min-height: 65px; });
        .xs-block({ min-height: 40px; padding-top: 12px; padding-bottom: 12px; });
      }
    }
    &__label {
      display: inline-block;
      margin-bottom: 20px;
      font-weight: 800;
      font-size: 1.8rem;
      .ss-block({ margin-bottom: 12px; });
    }
    &__input {
      padding-left: 25px;
      padding-right: 15px;
      width: 100%;
      height: 75px;
      background: #f3f3f3;
      border: 1px solid #fff;
      box-sizing: border-box;
      .lg-block({ padding-left: 18px; height: 65px; });
      .xs-block({ padding-left: 10px; height: 40px; });
      &.error {
        border: 1px solid @colorMainRed;
      }
    }
  }
  .btn-wrapper {
    display: flex;
    justify-content: space-between;
    padding-left: 50px;
    .sm-block({ padding-left: 0; });
    .ss-block({ flex-direction: column; align-items: flex-start; });
    .g-btn {
      &--white {
        .ss-block({ margin-top: 10px; });
      }
    }
  }
</style>
