<template>
  <section class='p-news-editing p-inner-admin'>
    <preloader v-if="loading"/>
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class='container page'>
      <h1 class='g-caption-inner'>Новость</h1>
      <div class="wrapper">
        <h1 class='g-caption-section'>Редактирование новости</h1>
        <form class="edit-form" @submit.prevent="onSubmit" v-if="!loading">
          <div class="edit-grid">
            <download-photo :image="form.preview_img" :folderFile="`news/${this.$route.params.id}/`" class="preview_img" idImage="preview_img" v-on:image-download="imageUpload('preview_img', $event)"/>
            <div class="g-item-form">
              <label class="g-item-form__label">Название</label>
              <input class="g-item-form__input" type="text" v-model="form.title" :class="{error: $v.form.title.$error}" @blur="$v.form.title.$touch()">
              <div class="input-valid-error" v-if="$v.form.title.$error">
                <template v-if="!$v.form.title.required  && publishedMethods">Поле не может быть пустым</template>
                <template v-if="!$v.form.title.maxLength">Превышено количество допустимых символов</template>
              </div>
            </div>
            <div class="g-item-form">
              <label class="g-item-form__label">URL Новости</label>
              <input class="g-item-form__input" type="text" v-mask="maskConfig" v-model="form.url" :class="{error: $v.form.url.$error}" @blur="$v.form.url.$touch()">
              <div class="input-valid-error" v-if="$v.form.url.$error">
                <template v-if="!$v.form.url.required  && publishedMethods">Поле не может быть пустым</template>
                <template v-if="!$v.form.url.maxLength">Превышено количество допустимых символов</template>
                <template v-if="!$v.form.url.minLength">Минимальное количество символов - 5</template>
              </div>
            </div>
            <download-photo class="col-grid-12" :image="form.widescreen_img" label="Широкоформатное фото" :folderFile="`news/${this.$route.params.id}/`" idImage="widescreen_img" v-on:image-download="imageUpload('widescreen_img', $event)"/>
<!--            <div class="g-item-form">-->
<!--              <label class="g-item-form__label">Дата и время</label>-->
<!--              <flat-pickr v-model="form.date" :config="configDate" :class="['g-item-form__input']" @blur=""></flat-pickr>-->
<!--              <div class="input-valid-error" v-if="$v.form.date.$error">-->
<!--                <template v-if="!$v.form.date.required">Поле не может быть пустым</template>-->
<!--                <template v-if="!$v.form.date.minLength">Минимальное количество символов - 3</template>-->
<!--              </div>-->
<!--            </div>-->
            <div class="g-item-form col-grid-12">
              <label class="g-item-form__label">Краткое описание</label>
              <input class="g-item-form__input" type="text" v-model="form.snippet" :class="{error: $v.form.snippet.$error}" @blur="$v.form.snippet.$touch()">
              <div class="input-valid-error" v-if="$v.form.snippet.$error">
                <template v-if="!$v.form.snippet.required && publishedMethods">Поле не может быть пустым</template>
                <template v-if="!$v.form.snippet.maxLength">Превышено количество допустимых символов</template>
              </div>
            </div>
            <div class="textarea  g-item-form col-grid-12">
              <label class="g-item-form__label">Полное описание</label>
              <ckeditor :editor="editor" :config="editorConfig" v-model="form.content" @blur="$v.form.content.$touch()"></ckeditor>
              <div class="input-valid-error" v-if="$v.form.content.$error">
                <template v-if="!$v.form.content.required  && publishedMethods">Поле не может быть пустым</template>
              </div>
            </div>
<!--            <div class="g-item-form col-grid-12">-->
<!--              <label class="g-item-form__label">Теги</label>-->
<!--              <div class="news-item__input taggable" :class="{}">-->
<!--                <v-select ref="select" taggable multiple :closeOnSelect="false" :class="{}" v-model="form.name_tags" class="v-select__relation">-->
<!--                  <span slot="no-options">-->
<!--                    Введите тег-->
<!--                  </span>-->
<!--                  <template #search="{attributes, events}">-->
<!--                    <input-->
<!--                      class="vs__search"-->
<!--                      v-bind="attributes"-->
<!--                      v-on="events"-->
<!--                      :required="false"-->
<!--                      @blur=""-->
<!--                    />-->
<!--                  </template>-->
<!--                </v-select>-->
<!--              </div>-->
<!--              &lt;!&ndash;            <div class="input-valid-error" v-if="$v.form.name_ticket.$error">&ndash;&gt;-->
<!--              &lt;!&ndash;              <template v-if="!$v.form.name_ticket.required">Поле не может быть пустым</template>&ndash;&gt;-->
<!--              &lt;!&ndash;            </div>&ndash;&gt;-->
<!--            </div>-->
          </div>
          <div class="btn-wrapper" v-if="myNews">
            <button-app :disabled="sameObject || $v.$anyError">
              Сохранить
            </button-app>
            <button-app :to="`/news/${form.url}`" :class="{disabled: !myNews.url}">
              Предпросмотр
            </button-app>
            <button-app class="btn-app--white" @click.native="publishNews" :disabled="$v.$anyError">
              <template v-if="status === 0">Опубликовать</template>
              <template v-else-if="status === 1">Снять с публикации</template>
            </button-app>
            <button-app class="btn-app--white" @click="deleteNews">
              Удалить
            </button-app>
          </div>
        </form>
      </div>

    </div>
    <div class="container page container--btn-back">
      <router-link to="/admin/news-control" class="back-btn">Назад</router-link>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import DownloadPhoto from '@/components/admin/common/DownloadPhoto'
import flatPickr from 'vue-flatpickr-component'
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import 'flatpickr/dist/flatpickr.css'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/ru'
import API from '@/api/index'
import Preloader from '@/components/ui/Preloader'
import UploadAdapter from '@/helpers/uploadadapter'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'
import translit from '@/mixins/translit'

export default {
  name: 'AdminNewsEditing',
  components: {
    BreadCrumbs,
    DownloadPhoto,
    flatPickr,
    ckeditor: CKEditor.component,
    Preloader,
  },
  mixins: [translit],
  data() {
    return {
      loading: false,
      breadCrumbs: [
        {
          path: '/admin/news-control',
          title: 'Управление новостями'
        }
      ],
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
          'link',
          'imageupload',
        ],
      },
      configDate: {
        enableTime: true,
        time_24hr: true,
        locale: Russian,
        dateFormat: 'd.m.Y H:i'
      },
      maskConfig: {
        mask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        tokens: {
          X: {
            pattern: /[0-9a-zA-Z_\-+]/
          }
        },
        masked: ''
      },
      form: {
        id: this.$route.params.id,
        url: '',
        preview_img: '',
        widescreen_img: '',
        title: '',
        snippet: '',
        content: ''
      },
      myNews: null,
      status: 0,
      publishedMethods: false,
      errorPublish: {}
    }
  },
  validations() {
    if (!this.publishedMethods) {
      return {
        form: {
          url: {
            minLength: minLength(5),
            maxLength: maxLength(50)
          },
          title: {
            maxLength: maxLength(100)
          },
          snippet: {
            maxLength: maxLength(150)
          },
          content: {}
        }
      }
    } else {
      return {
        form: {
          url: {
            required,
            maxLength: maxLength(50)
          },
          title: {
            required,
            maxLength: maxLength(100)
          },
          snippet: {
            required,
            maxLength: maxLength(150)
          },
          content: {
            required
          }
        }
      }
    }

  },
  computed: {
    sameObject() {
      return (this.form.title === this.myNews.title
        && this.form.url === this.myNews.url
        && this.form.preview_img === this.myNews.preview_img
        && this.form.widescreen_img === this.myNews.widescreen_img
        && this.form.snippet === this.myNews.snippet
        && this.form.content === this.myNews.content
        && this.form.img === this.myNews.img)
    },
    newForm() {
      let obj = {
        id: this.$route.params.id
      }
      for (let key in this.form) {
        if (this.form[key] !== this.myNews[key]) {
          obj[key] = this.form[key]
        }
      }
      return obj
    },
    urlTranslite: {
      get() {
        return this.form.title
      },
      set(val) {
        this.form.url = this.transliterate(val)
      }
    }
  },
  methods: {
    onSubmit() {
      if (!this.sameObject) {
        this.$v.$touch()
        if (this.$v.$invalid) {
          API.response.error('Не корректно заполнены поля')
        } else {
          this.loading = true
          API.news.edit(this.newForm).then(response => {
            API.response.success('Новость отредактирована')
            // this.$store.dispatch('news/getMyNews')
            this.getInfoNews()
          }).catch(error => {
            API.response.error('Ни одно поле не было отредактировано')
          })
        }
      }
    },
    getInfoNews() {
      API.news.details({ id: this.$route.params.id }).then(response => {
        this.myNews = response
        this.form.title = response.title
        this.form.snippet = response.snippet
        this.form.content = response.content
        this.form.preview_img = response.preview_img
        this.form.widescreen_img = response.widescreen_img
        this.form.url = response.url
        this.status = response.status
        this.loading = false
      }).catch(e => console.log(e))
    },
    publishNews() {
      this.publishedMethods = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        API.response.error('Заполните все поля')
      } else {
        if (this.status === 0) {
          API.news.publish({ id: this.$route.params.id })
            .then(response => {
              this.$v.$reset()
              API.response.success('Новость опубликована')
              this.status = 1
            })
            .catch(() => API.response.error('Заполните все поля'))
        } else if (this.status === 1) {
          API.news.unpublish({ id: this.$route.params.id })
            .then(response => {
              this.$v.$reset()
              API.response.success('Новость снята с публикации')
              this.status = 0
              this.publishedMethods = false
            })
            .catch(() => API.response.error('ошибка'))
        }
      }
    },
    deleteNews() {
      API.news.delete({ id: this.$route.params.id }).then(response => {
        API.response.success('Новость удалена')
        this.$router.push('/admin/news-control')
      })
    },
    imageUpload(nameImg, e) {
      this.form[nameImg] = e.link
    },
    uploader(editor) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader, 'content')
      }
    }
  },
  mounted() {
    this.loading = true
    this.getInfoNews()
  },
  watch: {
    'form.title': function (newVal, oldVal) {
      this.form.url = this.transliterate(newVal)
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('news/getMyNews').then(() => next())
  }
}
</script>

<style scoped lang="less">
  @import '~@/assets/less/_importants';
  .edit-grid {
    display: grid;
    grid-template-columns: minmax(0, 375px) 1fr;
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
      margin-bottom: 18px;
    });
    .news-item__input {
      padding-left: 25px;
      padding-right: 15px;
      width: 100%;
      height: 68px;
      background: @colorBgGray;
      border: 1px solid #fff;
      box-sizing: border-box;
      .lg-block({
        padding-left: 18px;
        height: 60px;
      });
      .xs-block({
        padding-left: 10px;
        height: 40px;
      });
      &.taggable {
        padding: 0;
        height: auto;
      }
      &.error {
        border: 1px solid @colorMain;
      }
    }
  }
  .btn-wrapper {
    transform: translateY(20px);
    display: flex;
    flex-wrap: wrap;
    .sm-block({
      transform: translateY(15px);
    });
    .btn-app {
      margin-right: 20px;
      margin-bottom: 20px;
      .sm-block({
        margin-bottom: 15px;
      });
      &:last-child {
        margin-left: auto;
        .md-block({margin-left: 0;});
      }
    }
  }
</style>
