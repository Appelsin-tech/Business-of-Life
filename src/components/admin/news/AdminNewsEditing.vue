<template>
  <section class='p-news-editing p-default p-default-inner'>
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class='container page'>
      <h1 class='g-caption-inner'>Новость</h1>
      <div class="wrapper">
        <h1 class='g-caption-section'>
          <template v-if="id">Редактирование новости</template>
          <template v-else>Создание новости</template>
        </h1>
        <form class="edit-form">
          <div class="edit-grid">
          <download-photo id="0"/>
          <div class="g-item-form">
            <label class="g-item-form__label">Название</label>
            <input class="g-item-form__input" type="text">
          </div>
          <div class="g-item-form">
            <label class="g-item-form__label">URL Новости</label>
            <input class="g-item-form__input" type="text">
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
            <input class="g-item-form__input" :class="{}" type="text" placeholder="Краткое описание " v-model="form.snippet" @blur="">
<!--            <div class="input-valid-error" v-if="$v.form.snippet.$error">-->
<!--              <template v-if="!$v.form.snippet.required">Поле не может быть пустым</template>-->
<!--              <template v-if="!$v.form.snippet.maxLength">Превышено количество допустимых символов</template>-->
<!--            </div>-->
          </div>
          <div class="textarea  g-item-form col-grid-12">
            <label class="g-item-form__label">Полное описание</label>
            <ckeditor :editor="editor" v-model="form.description" :config="editorConfig"></ckeditor>
<!--            <div class="input-valid-error" v-if="$v.form.description.$error">-->
<!--              <template v-if="!$v.form.description.required">Поле не может быть пустым</template>-->
<!--              <template v-if="!$v.form.description.maxLength">Превышено количество допустимых символов</template>-->
<!--            </div>-->
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
          <div class="btn-wrapper">
            <button class="g-btn g-btn--no-icon">
              <span>Сохранить</span>
            </button>
            <router-link to="/" class="g-btn g-btn--no-icon" v-if="id">
              <span>Предпросмотр</span>
            </router-link>
            <button class="g-btn g-btn--no-icon g-btn--white" v-if="id">
              <span>Снять с публикации</span>
            </button>
            <button class="g-btn g-btn--no-icon g-btn--white" v-if="id">
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

export default {
  name: 'AdminNewsEditing',
  props: ['id'],
  components: {
    BreadCrumbs,
    DownloadPhoto,
    flatPickr,
    ckeditor: CKEditor.component
  },
  data() {
    return {
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
      form: {
        date: '',
        description: '',
        snippet: '',
        name_tags: ''
      }
    }
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
