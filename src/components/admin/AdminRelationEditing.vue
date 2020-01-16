<template>
  <section class="p-event-editing p-default p-default-inner">
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class="container page">
      <h1 class="g-caption-inner">
        <template v-if="event === 'new'">Создание события</template>
        <template v-else>Редактирование события</template>
      </h1>
      <form class="edit-form" @submit.prevent="onSubmit">
        <h2 class="g-caption-section">Общая информация</h2>
        <div class="edit-grid">
          <div class="g-item-form  g-item-form--col-12">
            <label class="g-item-form__label">Название</label>
            <input class="g-item-form__input" type="text" id="form-title" v-model="form.title" :class="{error: $v.form.title.$error}" @blur="$v.form.title.$touch()">
            <div class="input-valid-error" v-if="$v.form.title.$error">
              <template v-if="!$v.form.title.required">Поле не может быть пустым</template>
              <template v-if="!$v.form.title.minLength">Минимальное количество символов - 5</template>
            </div>
          </div>
          <!--<div class="edit-grid__item item item&#45;&#45;col-4 photo">-->
          <!--<span class="item__label">Фото</span>-->
          <!--<div class="photo__wrapper">-->
          <!--<input type="file" class="visually-hidden" id="form__file">-->
          <!--<label class="photo__link photo__link&#45;&#45;add" for="form__file">-->
          <!--<img svg-inline class="photo__icon" src="../../assets/img/icon/camera.svg" alt="">-->
          <!--<span class="photo__text">Загрузить фото</span>-->
          <!--</label>-->
          <!--</div>-->
          <!--<div class="input-valid-error" v-if="false">-->
          <!--<template v-if="false">Поле не может быть пустым</template>-->
          <!--<template v-else-if="false">Название не должно быть меньше 10 символов</template>-->
          <!--</div>-->
          <!--</div>-->
          <div class="g-item-form">
            <label class="g-item-form__label">Страна</label>
            <input class="g-item-form__input" type="text" id="form__country" v-model="form.country" :class="{error: $v.form.country.$error}" @blur="$v.form.country.$touch()">
            <div class="input-valid-error" v-if="$v.form.country.$error">
              <template v-if="!$v.form.country.required">Поле не может быть пустым</template>
              <template v-if="!$v.form.country.minLength">Минимальное количество символов - 3</template>
            </div>
          </div>
          <div class="g-item-form">
            <label class="g-item-form__label">Город</label>
            <input class="g-item-form__input" type="text" id="form__city" v-model="form.city" :class="{error: $v.form.city.$error}" @blur="$v.form.city.$touch()">
            <div class="input-valid-error" v-if="$v.form.city.$error">
              <template v-if="!$v.form.city.required">Поле не может быть пустым</template>
              <template v-if="!$v.form.city.minLength">Минимальное количество символов - 3</template>
            </div>
          </div>
          <div class="g-item-form">
            <label class="g-item-form__label">Адрес</label>
            <input class="g-item-form__input" type="text" id="form__address" v-model="form.address" :class="{error: $v.form.address.$error}" @blur="$v.form.address.$touch()">
            <div class="input-valid-error" v-if="$v.form.address.$error">
              <template v-if="!$v.form.address.required">Поле не может быть пустым</template>
              <template v-if="!$v.form.address.minLength">Минимальное количество символов - 3</template>
            </div>
          </div>
          <div class="g-item-form">
            <label class="g-item-form__label">Дата и время</label>
            <flat-pickr v-model="form.date" :config="configDate" :class="['g-item-form__input', {error: $v.form.date.$error}]" @blur="$v.form.date.$touch()"></flat-pickr>
            <div class="input-valid-error" v-if="$v.form.date.$error">
              <template v-if="!$v.form.date.required">Поле не может быть пустым</template>
              <template v-if="!$v.form.date.minLength">Минимальное количество символов - 3</template>
            </div>
          </div>
          <div class="g-item-form g-item-form--col-12 textarea">
            <label class="g-item-form__label">Контактная информация</label>
            <ckeditor :editor="editor" v-model="form.contacts" :config="editorConfig" @blur="$v.form.contacts.$touch()"></ckeditor>
            <div class="input-valid-error" v-if="$v.form.contacts.$error">
              <template v-if="!$v.form.contacts.required">Поле не может быть пустым</template>
            </div>
            <p class="instruction-link">
              <span>* чтобы добавить телефон, создайте ссылку с префиксом tel: (tel:+79999999999) без пробелов и других символов, затем отредактируйте ссылку</span>
              <span>* чтобы добавить почту, создайте ссылку с префиксом mailto: (mailto:test@test.com)  без пробелов и других символов, затем отредактируйте ссылку</span>
            </p>
          </div>
        </div>
        <div class="btn-wrapper">
          <button class="g-btn g-btn--no-icon" v-if="event === 'new'" :disabled="$v.$invalid" :class="{disabled: disabledForm}">
            <span>Создать</span>
          </button>
          <button class="g-btn g-btn--no-icon" v-else :disabled="$v.$invalid">
            <span>Сохранить</span>
          </button>
          <button type="button" class="g-btn g-btn--no-icon g-btn--white" v-if="event !== 'new' && ticketsList.length !== 0" @click="newStatus">
            <span v-if="statusRelation === 3 ">Снять с публикации</span>
            <span v-else>Опубликовать</span>
          </button>
        </div>
      </form>
      <div class="tickets">
        <h2 class="g-caption-section">Билеты</h2>
        <div class="tickets-wrapper">
          <div class="ticket-create">
            <button-add :class="[event === 'new' ? 'disabled' : '']" @click.prevent.native="$modal.show('modal-ticket-create', {new: true, relation_id: event})"/>
          </div>
          <ticket v-for="(item, i) in filterTicketsList" :key="item.id" :ticket="item"/>
        </div>
      </div>
      <div class="stock">
        <h2 class="g-caption-section">Акции</h2>
        <div class="stock-wrapper">
          <div class="stock-create">
            <button-add :class="[event === 'new' ? 'disabled' : '', 'row']" @click.prevent.native="$modal.show('modal-stock-create', {new: true, relation_id: event})"></button-add>
          </div>
          <admin-relation-editing-stock v-for="stock in stockArr" :stock="stock" :key="stock.tickets"/>
        </div>
      </div>
      <div class="access">
        <admin-relation-editing-access/>
      </div>
      <div class="link-wrapper">
        <router-link class="g-btn g-btn--no-icon preview" :to="`/event/${event}`" :class="{disabled: event === 'new'}">
          <span>Предпросмотр</span>
        </router-link>
        <router-link :to="`/admin/event-editing/${id}`" class="back-btn">Назад</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '../BreadCrumbs.vue'
import ButtonAdd from '../ui/ButtonAdd'
import Ticket from '../Ticket'
import AdminRelationEditingStock from './inner/AdminRelationEditingStock'
import AdminRelationEditingAccess from './inner/AdminRelationEditingAccess'
import API from '../../api/index'
import { mapState } from 'vuex'

import flatPickr from 'vue-flatpickr-component'
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import { minLength, required } from 'vuelidate/lib/validators'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/ru'
import 'flatpickr/dist/flatpickr.css'

export default {
  name: 'AdminRelationEditing',
  props: ['id', 'event'],
  components: {
    BreadCrumbs,
    flatPickr,
    Ticket,
    ckeditor: CKEditor.component,
    ButtonAdd,
    AdminRelationEditingStock,
    AdminRelationEditingAccess
  },
  data() {
    return {
      breadCrumbs: [
        {
          path: '/admin/me',
          title: 'Личный кабинет'
        },
        {
          path: '/admin/event-control',
          title: 'Управление мероприятиями'
        },
        {
          title: 'Редактирование мероприятия',
          path: '/admin/event-editing'
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
      resize: true,
      ticketsList: [],
      disabledNewTicket: true,
      configDate: {
        enableTime: true,
        time_24hr: true,
        locale: Russian,
        dateFormat: 'd.m.Y H:i'
      },
      statusRelation: 0,
      form: {
        event_id: this.id,
        date: '',
        title: '',
        country: '',
        city: '',
        address: '',
        contacts: '',
        relation_edit: [],
        control_ticket: []
      },
      errorSelect: {
        t_currency: false
      },
      disabledForm: false,
      errorResponse: {
        status: 'Статус события не позволяет редактирование',
        date: 'Неверная дата',
        title: 'Неверная длина названия',
        description: 'Неверная длина описания',
        country: 'Неверная страна',
        city: 'Неверный город',
        address: 'Неверный адрес'
      },
      stockArr: [
        {
          title: 'Hello',
          tickets: 22,
          ticket_name: 'Первый билет'
        },
        {
          title: 'World',
          tickets: 100,
          ticket_name: 'Какой то билет'
        },
        {
          title: 'Starting Seminar',
          tickets: 5,
          ticket_name: 'Двадцатьчетвертый билет'
        }
      ]
    }
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(5)
      },
      date: {
        required,
        minLength: minLength(10)
      },
      country: {
        required,
        minLength: minLength(3)
      },
      city: {
        required,
        minLength: minLength(3)
      },
      address: {
        required,
        minLength: minLength(3)
      },
      contacts: {
        required
      }
    }
  },
  computed: {
    ...mapState('user', [
      'myParentEvents'
    ]),
    filterTicketsList() {
      return this.ticketsList.sort((a, b) => {
        return a - b
      })
    }
  },
  methods: {
    onSubmit() {
      if (this.event === 'new') {
        API.relations.create(this.form).then(response => {
          this.disabledForm = true
          API.response.success('Событие создано')
          this.$router.push({ path: `/admin/editing/${this.id}/${response.id}` })
          this.form.id = response.id
        }).catch(error => {
          console.log(error)
        })
      } else {
        API.relations.edit(this.form).then(response => {
          API.response.success('Событие отредактировано')
          // this.$router.push({path: `/admin/editing/${id}`})
        }).catch(error => {
          API.response.error(this.errorResponse[error.response.data.reason])
        })
      }
    },
    validateSelect(name) {
      if (this.form[name] === '') {
        this.errorSelect[name] = true
      } else {
        this.errorSelect[name] = false
      }
    },
    myForm(arr) {
      let newObg = arr.find(item => item.id === this.event)
      this.statusRelation = newObg.status
      this.ticketsList = newObg.tickets
      this.form = {
        id: newObg.id,
        date: newObg.date,
        title: newObg.title,
        country: newObg.country,
        city: newObg.city,
        address: newObg.address,
        contacts: newObg.contacts
      }
    },
    newStatus() {
      if (this.statusRelation === 3) {
        API.relations.unpublish({ id: this.event }).then((response) => {
          this.statusRelation = response.status
          API.response.success('Событие снято с публикации')
        })
      } else {
        API.relations.publish({ id: this.event }).then((response) => {
          this.statusRelation = response.status
          API.response.success('Событие опубликовано')
        })
      }
    },
    getInfoRelation() {
      API.events.info({ id: this.id }).then(response => {
        this.myForm(response.data.relations)
      })
    }
  },
  mounted() {
    this.$root.$on('ticket-edit', () => {
      this.getInfoRelation()
    })
    if (this.event === 'new') {
      this.form = {
        event_id: this.id,
        date: '',
        title: '',
        country: '',
        city: '',
        address: '',
        contacts: ''
      }
    } else {
      this.getInfoRelation()
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/_importants";
  @import '~flatpickr/dist/flatpickr.css';
  .edit-form {
    margin-bottom: 50px;
    .btn-wrapper {
      display: flex;
      justify-content: flex-start;
      .sm-block({
        margin-left: 0;
        margin-bottom: 40px;
      });
      .ss-block({
        flex-direction: column;
        align-items: center;
      });
      .g-btn {
        min-width: 250px;
        .sm-block({
          min-width: 220px;
        });
        .ss-block({
          min-width: 200px;
        });
        &:first-child {
          margin-right: 20px;
          .ss-block({
            margin-right: 0;
            margin-bottom: 20px;
          });
        }
        &.disabled {
          opacity: 0.7;
          pointer-events: none;
        }
      }
    }
  }
  .edit-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: max-content;
    grid-column-gap: 100px;
    margin-bottom: 35px;
    .lg-block({
      grid-column-gap: 50px;
    });
    .md-block({
      grid-template-columns: 1fr 1fr;
    });
    .ss-block({
      margin-bottom: 18px;
      grid-template-columns: 1fr;
    });
    .photo {
      display: flex;
      flex-direction: column;
      position: relative;
      height: 350px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      transition: 0.3s;
      .lg-block({
        height: 320px;
      });
      .md-block({
        height: 300px;
      });
      .xs-block({
        height: 200px;
        margin-bottom: 0;
      });
      &:hover {
        .photo-link--change {
          opacity: 1;
        }
        .photo__link--add {
          border-color: #000;
          .photo__icon {
            path {
              fill: #000;
            }
          }
          .photo__text {
            color: #000;
          }
        }
      }
      &__wrapper {
        position: relative;
        flex-grow: 2;
      }
      &__link {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: 0.3s;
        cursor: pointer;
        &--add {
          z-index: 1;
          border: 1px solid #d7d7d7;
          .photo__icon {
            path {
              fill: #d7d7d7;
            }
          }
          .photo__text {
            color: #d7d7d7;
          }
        }
        &--change {
          opacity: 0;
          background: rgba(226, 58, 58, 0.8);
          .photo__icon {
            path {
              fill: #fff;
            }
          }
          .photo__text {
            color: #fff;
          }
        }
      }
      &__icon {
        margin-bottom: 15px;
        width: 50px;
        height: 50px;
        path {
          transition: 0.3s;
        }
      }
      &__text {
        font-size: 1.6rem;
        font-weight: 400;
        text-decoration: underline;
        transition: 0.3s;
      }
    }
    .g-item-form--col-12 {
      grid-column: ~"1 / 3";
      .ss-block({
        grid-column: ~"1 / 2";
      });
    }
    .instruction-link {
      display: flex;
      flex-direction: column;
      margin-top: 15px;
      font-size: 1.4rem;
      span:first-child {
        margin-bottom: 8px;
      }
    }
  }

  .tickets {
    margin-bottom: 30px;
    .sm-block({
      margin-bottom: 20px;
    });
    &-wrapper {
      .row-flex();
    }
    .ticket-create {
      .col();
      .size(3);
      .size-lg(4);
      .size-md(5);
      .size-sm(6);
      .size-ss(10);
      .size-xs(12);
      margin-bottom: 20px;
      min-height: 350px;
      .md-block({
        min-height: 300px;
      });
      .sm-block({
        min-height: 250px;
        margin-bottom: 15px;
      });
      .ss-block({
        min-height: auto;
      });
    }
  }
  .link-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 30px;
    border-top: 1px solid @colorBorder;
    .ss-block({
      padding-top: 20px;
    });
    .preview {
      &.disabled {
        opacity: 0.7;
        pointer-events: none;
      }
    }
  }
  .stock {
    margin-bottom: 30px;
    .sm-block({
      margin-bottom: 20px;
    });
    &-wrapper {
      display: flex;
      flex-direction: column;
      .stock-create {
        margin-bottom: 20px;
        .sm-block({
          margin-bottom: 15px;
        });
      }
    }
  }
  .access {
    margin-bottom: 35px;
    .ss-block({
      margin-bottom: 20px;
    });
  }

</style>
