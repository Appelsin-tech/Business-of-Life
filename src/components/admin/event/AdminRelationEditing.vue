<template>
  <section class="p-event-editing p-default-block">
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class="container page">
      <h1 class="g-caption-inner">
        <template v-if="id">Редактирование события</template>
        <template v-else>Создание события</template>
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
          <button class="g-btn g-btn--no-icon" v-if="!id" :disabled="$v.$invalid" :class="{disabled: disabledForm}">
            <span>Создать</span>
          </button>
          <button class="g-btn g-btn--no-icon" v-else :disabled="$v.$invalid">
            <span>Сохранить</span>
          </button>
          <button type="button" class="g-btn g-btn--no-icon g-btn--white" v-if="!id && tickets.length !== 0" @click="newStatus">
            <span v-if="statusRelation === 3 ">Снять с публикации</span>
            <span v-else>Опубликовать</span>
          </button>
        </div>
      </form>
      <div class="tickets">
        <h2 class="g-caption-section">Билеты</h2>
        <div class="tickets-wrapper">
          <div class="ticket-create">
            <button-add :class="[!id ? 'disabled' : '']" @click.native="$modal.show('modal-ticket-create', {new: true, relation_id: id})"/>
          </div>
          <ticket v-for="(item, i) in filterTickets" :key="item.id" :ticket="item"/>
        </div>
      </div>
      <div class="stock">
        <h2 class="g-caption-section">Акции</h2>
        <panel-info v-if="!this.tickets.length">
          Чтобы добавить акцию создайте билет
        </panel-info>
        <div class="stock-wrapper" v-else>
          <div class="stock-create">
            <button-add :class="[!id ? 'disabled' : '', 'row']" @click.native="$modal.show('modal-actions-create', {new: true, relation_id: id, listTickets: listTickets})"></button-add>
          </div>
          <action v-for="action in actions" :action="action" controlBtn="true" :relationId="id" :key="action.id"/>
        </div>
      </div>
      <div class="access" v-if="!relationEditors">
        <admin-relation-editing-access :relation="id" :supervisors="supervisors" :editors="editors" v-on:update-access="getInfoRelation"/>
      </div>
      <div class="link-wrapper">
        <router-link class="g-btn g-btn--no-icon preview" :to="`/event/${id}`" :class="{disabled: !event}">
          <span>Предпросмотр</span>
        </router-link>
        <router-link :to="`/admin/event-editing/${event}`" class="back-btn">Назад</router-link>
      </div>
    </div>
    <modal-ticket-create-editing/>
    <modal-actions-create-editing/>
  </section>
</template>

<script>
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import ButtonAdd from '@/components/ui/ButtonAdd'
import Ticket from '@/components/Ticket'
import Action from '@/components/Action'
import AdminRelationEditingAccess from '@admin/event/AdminRelationEditingAccess'
import API from '@/api/index'
import PanelInfo from '@/components/ui/PanelInfo'
import { mapState, mapGetters } from 'vuex'

import flatPickr from 'vue-flatpickr-component'
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import { minLength, required } from 'vuelidate/lib/validators'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/ru'
import 'flatpickr/dist/flatpickr.css'

export default {
  name: 'AdminRelationEditing',
  props: {
    event: {
      required: true
    },
    id: {
      required: false,
      default: null
    }
  },
  components: {
    PanelInfo,
    BreadCrumbs,
    flatPickr,
    Ticket,
    ckeditor: CKEditor.component,
    ButtonAdd,
    Action,
    AdminRelationEditingAccess,
    ModalTicketCreateEditing: () => import('@/components/modal/ModalTicketCreateEditing'),
    ModalActionsCreateEditing: () => import('@/components/modal/ModalActionsCreateEditing')
  },
  data() {
    return {
      breadCrumbs: [
        {
          path: '/admin/menu',
          title: 'Личный кабинет'
        },
        {
          path: '/admin/event-control',
          title: 'Управление мероприятиями'
        },
        {
          title: 'Редактирование мероприятия',
          path: `/admin/event-editing/${this.event}`
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
      tickets: [],
      supervisors: [],
      editors: [],
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
      actions: []
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
    ...mapState('event', [
      'eventsMy'
    ]),
    ...mapGetters('user', [
      'relationEditors'
    ]),
    listTickets() {
      let ticketsArr = []
      if (this.tickets.length > 0) {
        this.tickets.forEach(item => {
          ticketsArr.push({
            ticketTitle: item.title,
            ticketId: item.id
          })
        })
      }
      return ticketsArr
    },
    filterTickets() {
      return this.tickets.sort((a, b) => {
        return a - b
      })
    },
  },
  methods: {
    onSubmit() {
      if (!this.id) {
        API.relations.create(this.form).then(response => {
          this.disabledForm = true
          API.response.success('Событие создано')
          this.$router.push({ path: `/admin/relation/${this.event}/${response.id}` })
          this.form.id = response.id
        }).catch(error => {
          console.log(error)
        })
      } else {
        API.relations.edit(this.form).then(response => {
          API.response.success('Событие отредактировано')
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
    newStatus() {
      if (this.statusRelation === 3) {
        API.relations.unpublish({ id: this.id }).then((response) => {
          this.statusRelation = response.status
          API.response.success('Событие снято с публикации')
        })
      } else {
        API.relations.publish({ id: this.id }).then((response) => {
          this.statusRelation = response.status
          API.response.success('Событие опубликовано')
        })
      }
    },
    getInfoRelation() {
      API.relations.details({ id: this.id }).then(response => {
        this.statusRelation = response.status
        this.tickets = response.tickets
        this.actions = response.actions
        this.supervisors = response.supervisors
        this.editors = response.editors
        this.form = {
          id: response.id,
          date: response.date,
          title: response.title,
          country: response.country,
          city: response.city,
          address: response.address,
          contacts: response.contacts
        }
      })
    }
  },
  mounted() {
    this.$root.$on('ticket-edit', () => {
      this.getInfoRelation()
    })
    this.$root.$on('actions-edit', () => {
      this.getInfoRelation()
    })
    if (!this.id) {
      this.form = {
        event_id: this.event,
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
  @import "~@/assets/less/_importants";
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
    }
  }
  .access {
    margin-bottom: 35px;
    .ss-block({
      margin-bottom: 20px;
    });
  }

</style>
