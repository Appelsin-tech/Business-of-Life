<template>
  <section class='p-news-editing p-default-block'>
    <preloader v-if="loading"/>
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class='container page'>
      <h1 class='g-caption-inner'>Новость</h1>
      <div class="wrapper">
        <h1 class='g-caption-section'>Редактирование новости</h1>
        <form class="edit-form" @submit.prevent="onSubmit" v-if="!loading">
          <div class="edit-grid">
          <download-photo id="0" :image="form.img"/>
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
            </div>
          </div>
          <download-photo class="col-grid-12" label="Широкоформатное фото" id="1"/>
          <div class="g-item-form">
            <label class="g-item-form__label">Дата и время</label>
            <flat-pickr v-model="form.date" :config="configDate" :class="['g-item-form__input']" @blur=""></flat-pickr>
<!--            <div class="input-valid-error" v-if="$v.form.date.$error">-->
<!--              <template v-if="!$v.form.date.required">Поле не может быть пустым</template>-->
<!--              <template v-if="!$v.form.date.minLength">Минимальное количество символов - 3</template>-->
<!--            </div>-->
          </div>
          <div class="g-item-form col-grid-12">
            <label class="g-item-form__label">Краткое описание</label>
            <input class="g-item-form__input"  type="text" v-model="form.snippet" :class="{error: $v.form.snippet.$error}" @blur="$v.form.snippet.$touch()">
            <div class="input-valid-error" v-if="$v.form.snippet.$error">
              <template v-if="!$v.form.snippet.required && publishedMethods">Поле не может быть пустым</template>
              <template v-if="!$v.form.snippet.maxLength">Превышено количество допустимых символов</template>
            </div>
          </div>
          <div class="textarea  g-item-form col-grid-12">
            <label class="g-item-form__label">Полное описание</label>
            <ckeditor :editor="editor" :config="editorConfig" v-model="form.content" :class="'sssssssssssssssss'" @blur="$v.form.content.$touch()"></ckeditor>
            <div class="input-valid-error" v-if="$v.form.content.$error">
              <template v-if="!$v.form.content.required  && publishedMethods">Поле не может быть пустым</template>
            </div>
          </div>
          <div class="g-item-form col-grid-12">
            <label class="g-item-form__label">Теги</label>
            <div class="news-item__input taggable" :class="{}">
              <v-select ref="select" taggable multiple :closeOnSelect="false" :class="{}" v-model="form.name_tags" class="v-select__relation">
                  <span slot="no-options">
                    Введите тег
                  </span>
                <template #search="{attributes, events}">
                  <input
                    class="vs__search"
                    v-bind="attributes"
                    v-on="events"
                    :required="false"
                    @blur=""
                  />
                </template>
              </v-select>
            </div>
<!--            <div class="input-valid-error" v-if="$v.form.name_ticket.$error">-->
<!--              <template v-if="!$v.form.name_ticket.required">Поле не может быть пустым</template>-->
<!--            </div>-->
          </div>
          </div>
          <div class="btn-wrapper" v-if="myNews">
            <button class="g-btn g-btn--no-icon" :disabled="sameObject || $v.$anyError">
              <span>Сохранить</span>
            </button>
            <router-link :to="`/news/${form.url}`" class="g-btn g-btn--no-icon" :class="{disabled: !myNews.url}">
              <span>Предпросмотр</span>
            </router-link>
            <button type="button" class="g-btn g-btn--no-icon g-btn--white" @click="publishNews" :disabled="$v.$anyError">
              <span v-if="status === 0">Опубликовать</span>
              <span v-else-if="status === 1">Снять с публикации</span>
            </button>
            <button type="button" class="g-btn g-btn--no-icon g-btn--white" @click="deleteNews">
              <span>Удалить</span>
            </button>
          </div>
        </form>
      </div>
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
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'AdminNewsEditing',
  components: {
    BreadCrumbs,
    DownloadPhoto,
    flatPickr,
    ckeditor: CKEditor.component,
    Preloader
  },
  data() {
    return {
      loading: false,
      breadCrumbs: [
        {
          path: '/admin/menu',
          title: 'Личный кабинет'
        },
        {
          path: '/admin/news-control',
          title: 'Управление новостями'
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
            pattern: /[0-9a-zA-Z_\- +]/
          }
        },
        masked: ''
      },
      form: {
        id: this.$route.params.id,
        url: '',
        img: 'https://picsum.photos/300/300',
        title: '',
        snippet: '',
        content: ''
      },
      myNews: null,
      status: 0,
      publishedMethods: false,
      errorPublish: {

      }
    }
  },
  validations() {
    if (!this.publishedMethods) {
      return {
        form: {
          url: {
            maxLength: maxLength(50)
          },
          title: {
            maxLength: maxLength(100)
          },
          snippet: {
            maxLength: maxLength(150)
          },
          content: {

          }
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
        && this.form.snippet === this.myNews.snippet
        && this.form.content === this.myNews.content
        && this.form.img === this.myNews.img)
    }
  },
  methods: {
    onSubmit() {
      if(!this.sameObject) {
        this.$v.$touch()
        if (this.$v.$invalid) {
          API.response.error('Не корректно заполнены поля')
        } else {
          API.news.edit(this.form).then(response => {
            API.response.success('Новость отредактирована')
            this.$store.dispatch('news/getMyNews')
          }).catch(error => {
            API.response.error('Ни одно поле не было отредактировано')
          })
        }

      }
    },
    getInfoNews() {
      API.news.details({id: this.$route.params.id}).then(response => {
        this.myNews = response
        this.form.title = response.title
        this.form.snippet = response.snippet
        this.form.content = response.content
        if(response.img !== '') {
          this.form.img = response.img
        }
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
          API.news.publish({id: this.$route.params.id})
            .then(response => {
              this.$v.$reset()
              API.response.success('Новость опубликована')
              this.$store.dispatch('news/getMyNews')
            })
            .catch(() => API.response.error('Заполните все поля'))
        } else if (this.status === 1) {
          API.news.unpublish({id: this.$route.params.id})
            .then(response => {
              this.$v.$reset()
              API.response.success('Новость снята с публикации')
              this.$store.dispatch('news/getMyNews')
            })
            .catch(() => API.response.error('ошибка'))
        }
      }
    },
    deleteNews() {
      API.news.delete({id: this.$route.params.id}).then(response => {
        API.response.success('Новость удалена')
        this.$store.dispatch('news/getMyNews')
        this.$router.push('/admin/news-control')
      })
    }
  },
  mounted() {
    this.loading = true
    this.getInfoNews()
  },
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
      margin-bottom: 18px;});
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
    .sm-block({
      transform: translateY(15px);});
    .g-btn {
      margin-right: 20px;
      margin-bottom: 20px;
      .sm-block({
        margin-bottom: 15px;});
    }
  }
</style>
