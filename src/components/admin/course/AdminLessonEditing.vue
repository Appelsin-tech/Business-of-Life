<template>
  <section class="p-event-all-editing p-inner-admin">
    <preloader v-if="activePreloader"/>
    <div class="container page">
      <form class="edit-form g-subsection" @submit.prevent="onSubmit">
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
            <button-app :disabled="$v.$invalid">
              <template v-if="id">Сохранить</template>
              <template v-else>Создать</template>
            </button-app>
          </div>
        </div>
      </form>
      <div class="materials">
        <h2 class="g-caption-section">Материалы</h2>
        <button-add class="row" @click.native="$modal.show('modal-lesson-materials', {idLesson: idLesson, newBlocks: true})" v-if="id"></button-add>
        <panel-info v-else>Чтобы добавить материалы - заполните информацию о уроке</panel-info>
      </div>
      <div class="materials-wrapper">
        <draggable v-model="content" tag="div" @start="drag = true" @end="moveMaterials" v-bind="dragOptions" handle=".drag" v-if="content">
          <transition-group type="transition" :name="!drag ? 'flip-list' : null">
            <div v-for="item in content" :key="item.id" class="item-materials">
              <panel-video-lesson :video="item" :editing="true" v-if="item.type === 'video'" v-on:edit-video="$modal.show('modal-lesson-materials', item)"  v-on:delete-video="deleteBlocks(item.id)"/>
              <div class="g-panel text" v-else>
                <div class="editor" v-html="item.content"></div>
                <div class="icon-wrapper">
                  <button-app-function icon="icon-drag-variant" class="drag"></button-app-function>
<!--                  <div class="g-icon-circle drag g-icon-circle&#45;&#45;control g-icon-circle&#45;&#45;control-drag">-->
<!--                    <icon-drag-variant class="g-icon"/>-->
<!--                  </div>-->
                  <div class="g-wrapper-btn-f g-wrapper-btn-f--static">
                    <button-app-function icon="icon-lead-pencil" v-tooltip.bottom="'Редактировать'" @click.native="$modal.show('modal-lesson-materials', item)"></button-app-function>
                    <button-app-function icon="icon-delete" v-tooltip.bottom="'Удалить'" @click.native="deleteBlocks(item.id)"></button-app-function>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </draggable>
      </div>
      <div class="link-wrapper">
        <button-app class="preview" :to="`/knowledge/${course}/${id}`" :class="{disabled: !course}">
          Предпросмотр
        </button-app>
      </div>
    </div>
    <modal-lesson-materials/>
  </section>
</template>

<script>
import { maxLength, required } from 'vuelidate/lib/validators'
import API from '@/api'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/ru'
import draggable from 'vuedraggable'
import ButtonAdd from '@/components/ui/ButtonAdd'
import ModalLessonMaterials from '@/components/modal/ModalLessonMaterials'
import PanelVideoLesson from '@/components/knowledge/components/PanelVideoLesson'
import Preloader from '@/components/ui/Preloader'
import PanelInfo from '@/components/ui/PanelInfo'
import UploadAdapter from '@/helpers/uploadadapter'

export default {
  name: 'AdminLessonEditing',
  props: ['course', 'id'],
  components: {
    ckeditor: CKEditor.component,
    draggable,
    ButtonAdd,
    ModalLessonMaterials,
    PanelVideoLesson,
    Preloader,
    PanelInfo
  },
  data() {
    return {
      drag: false,
      editor: ClassicEditor,
      editorConfig: {
        language: 'ru',
        image_previewText: '',
        extraPlugins: [this.uploader],
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
        description: ''
      },
      activePreloader: false,
      content: null,
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
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'materials',
        disabled: false,
        ghostClass: 'ghost',
        forceFallback: true,
      }
    },
    keysContent () {
      let arr = []
      if (this.content) {
        this.content.forEach(item => {
          arr.push(+item.id)
        })
      }
      return arr
    },
    idLesson () {
      return this.$route.params.id
    }
  },
  methods: {
    onSubmit() {
      this.$v.$touch()
      if (this.id) {
        API.courses.lesson.edit({
          title: this.form.title,
          description: this.form.description,
          id: this.id
        }).then(response => {
          this.$store.dispatch('courses/getMyCourses')
          API.response.success('Урок отредактирован')
        }).catch(e => {
          if (e.response.reason) {
            API.response.error(this.errorResponse[e.response.reason])
          }
        })
      } else {
        API.courses.lesson.create({
          title: this.form.title,
          description: this.form.description,
          course_id: this.course
        }).then(response => {
          this.$store.dispatch('courses/getMyCourses')
          API.response.success('Урок создан')
          this.$router.push({ path: `/office/courses/${this.course}/lesson/${response.id}` })
        }).catch(e => {
          if (e.response.reason) {
            API.response.error(this.errorResponse[e.response.reason])
          }
        })
      }
    },
    deleteBlocks(id) {
      API.courses.lesson.deleteBlocks({id: id}).then(response => {
        console.log(response)
        API.response.success('Блок удален')
        this.$root.$emit('materials-edit')
      }).catch(e => {
        console.log(e)
      })
      this.$root.$emit('materials-edit')
    },
    moveMaterials(evt) {
      this.drag = false
      API.courses.lesson.orderBlocks({lesson_id: this.idLesson, array: this.keysContent}).then(response => {
        API.response.success('Сохранено')
      })
    },
    getDetailsLesson() {
      API.courses.lesson.details({ id: this.id }).then(response => {
        this.form.title = response.title
        this.form.description = response.description
        this.content = response.content
        this.activePreloader = false
      })
    },
    uploader (editor) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader, 'content')
      }
    }
  },
  mounted() {
    if (this.id) {
      this.$root.$on('materials-edit', () => {
        this.activePreloader = true
        this.getDetailsLesson()
      })
      this.activePreloader = true
      this.getDetailsLesson()
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .materials-wrapper {
    margin-bottom: 30px;
    .ss-block({
      margin-bottom: 20px;});
  }
  .item-materials {
    margin-bottom: 20px;
    opacity: 1;
    .sm-block({
      margin-bottom: 15px;});
  }
  .g-panel {
    &.text {
      display: flex;
      justify-content: space-between;
      position: relative;
      .sm-block({flex-direction: column;});
      .icon-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        flex-shrink: 0;
        .sm-block({flex-direction: row-reverse;
          margin-top: 15px;});
        .drag {
          margin-bottom: 5px;
        }
      }
      .editor {
        margin-right: 15px;
        .sm-block({
          margin-right: 0;});
      }
    }
  }
  .link-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 30px;
    border-top: 1px solid @colorBorder;
    .ss-block({
      padding-top: 20px;});
  }
</style>
