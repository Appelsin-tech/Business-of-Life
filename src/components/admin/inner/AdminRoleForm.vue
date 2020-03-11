<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="item-wrapper">
      <p class="g-caption-section">Роль</p>
<!--      <div class="g-item-form">-->
<!--        <label class="g-item-form__label" for="form-role-title">Название роли</label>-->
<!--        <input class="g-item-form__input" id="form-role-title" :class="{error: $v.form.title.$error}" type="text" v-model="form.title" @blur="$v.form.title.$touch()">-->
<!--        <div class="input-valid-error" v-if="$v.form.title.$error">-->
<!--          <template v-if="!$v.form.title.required">Поле не может быть пустым</template>-->
<!--          <template v-if="!$v.form.title.maxLength">Превышено количество допустимых символов</template>-->
<!--        </div>-->
<!--      </div>-->
      <div class="g-item-form">
        <label class="item__label">Назначить</label>
        <div class="item__input taggable"  :class="{error: $v.form.select.$error}">
          <v-select ref="select" taggable multiple :closeOnSelect="false" v-model="form.select" class="v-select__role" >
                  <span slot="no-options">
                    Введите имя
                  </span>
            <template #search="{attributes, events}">
              <input
                class="vs__search"
                v-bind="attributes"
                v-on="events"
                :required="false"
                @blur="$v.form.select.$touch()"
              />
            </template>
          </v-select>
        </div>
        <div class="input-valid-error" v-if="$v.form.select.$error">
          <template v-if="!$v.form.select.required">Поле не может быть пустым</template>
        </div>
      </div>
    </div>
    <div class="item-wrapper">
      <p class="g-caption-section">Доступы</p>
      <div class="checkbox" v-for="item in checkboxData" :key="item.role">
        <span class="g-item-form__label">{{item.title}}</span>
        <div class="g-item-form--checkbox disabled" v-for="(field, index) in item.field">
          <input class="checkbox-input" :value="index" type="checkbox" :checked="item.role === role">
          <label class="checkbox-label">{{field}}</label>
        </div>
      </div>
<!--      <div class="checkbox">-->
<!--        <span class="g-item-form__label">Общие</span>-->
<!--        <div class="item">-->
<!--          <input class="checkbox-input" :value="4" type="checkbox" id="access" v-model="form.access">-->
<!--          <label class="checkbox-label" for="access">Дата регистрации в компании</label>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="checkbox">-->
<!--        <span class="g-item-form__label">Мероприятия</span>-->
<!--        <div class="item">-->
<!--          <input class="checkbox-input" :value="1" type="checkbox" id="event_create" v-model="form.event">-->
<!--          <label class="checkbox-label" for="event_create">Создание мероприятий и событий</label>-->
<!--        </div>-->
<!--        <div class="item">-->
<!--          <input class="checkbox-input" :value="2" type="checkbox" id="event_public" v-model="form.event">-->
<!--          <label class="checkbox-label" for="event_public">Публикация событий</label>-->
<!--        </div>-->
<!--        <div class="item">-->
<!--          <input class="checkbox-input" :value="3" type="checkbox" id="event_moderation" v-model="form.event">-->
<!--          <label class="checkbox-label" for="event_moderation">Модерирование событий</label>-->
<!--        </div>-->
<!--        <div class="item">-->
<!--          <input class="checkbox-input" :value="4" type="checkbox" id="ticket_check" v-model="form.event">-->
<!--          <label class="checkbox-label" for="ticket_check">Проверка любого билета</label>-->
<!--        </div>-->
<!--        <div class="item">-->
<!--          <input class="checkbox-input" :value="5" type="checkbox" id="view_statistic" v-model="form.event">-->
<!--          <label class="checkbox-label" for="view_statistic">Просмотр статистики продаж</label>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="checkbox">-->
<!--        <span class="g-item-form__label">Новости</span>-->
<!--        <div class="item">-->
<!--          <input class="checkbox-input" :value="1" type="checkbox" id="news_create" v-model="form.news">-->
<!--          <label class="checkbox-label" for="news_create">Создание новостей</label>-->
<!--        </div>-->
<!--        <div class="item">-->
<!--          <input class="checkbox-input" :value="2" type="checkbox" id="news_public" v-model="form.news">-->
<!--          <label class="checkbox-label" for="news_public">Публикация новостей</label>-->
<!--        </div>-->
<!--        <div class="item">-->
<!--          <input class="checkbox-input" :value="3" type="checkbox" id="news_moderation" v-model="form.news">-->
<!--          <label class="checkbox-label" for="news_moderation">Модерирование новостей</label>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="checkbox">-->
<!--        <span class="g-item-form__label">Курсы</span>-->
<!--        <div class="item">-->
<!--          <input class="checkbox-input" :value="1" type="checkbox" id="news_create" v-model="form.news">-->
<!--          <label class="checkbox-label" for="news_create">Создание курсов</label>-->
<!--        </div>-->
<!--        <div class="item">-->
<!--          <input class="checkbox-input" :value="2" type="checkbox" id="news_public" v-model="form.news">-->
<!--          <label class="checkbox-label" for="news_public">Публикация курсов</label>-->
<!--        </div>-->
<!--        <div class="item">-->
<!--          <input class="checkbox-input" :value="3" type="checkbox" id="news_moderation" v-model="form.news">-->
<!--          <label class="checkbox-label" for="news_moderation">Модерирование курсов</label>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <button class="g-btn g-btn--no-icon" :disabled="$v.$invalid">
      <span>Сохранить</span>
    </button>
  </form>
</template>

<script>
import API from '@/api/index'
import { maxLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'AdminRoleForm',
  props: {
    role: {
      required: true
    }
  },
  data() {
    return {
      user: [],
      form: {
        user: '',
        name: ''
      },
      errorSelect: {
        selectedStatus: false
      },
      checkboxData: [
        {
          role: 'course',
          title: 'Управление курсами',
          field: ['Создание курсов', 'Модерирование курсов', 'Публикация курсов']
        },
        {
          role: 'news',
          title: 'Управление новостями',
          field: ['Создание новостей', 'Модерирование новостей', 'Публикация новостей']
        },
        {
          role: 'event',
          title: 'Управление мероприятиями',
          field: ['Создание мероприятий', 'Модерирование мероприятий', 'Публикация мероприятий']
        }
      ]
    }
  },
  validations: {
    form: {
      title: {
        required,
        maxLength: maxLength(100)
      },
      select: {
        required
      }
    }
  },
  computed: {
    paramsSubmit() {
      let obg = {
        user: this.user
      }
      switch (this.role) {
        case 'course':
          obg.roles[0] = 0
          break
        case 'news':
          obg.roles[0] = 1
          break
        case 'event':
          obg.roles[0] = 2
          break
      }
      return obg
    }
  },
  methods: {
    onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        API.response.error('Заполните все поля')
        return
      }
    },
  }
}
</script>

<style scoped lang="less">
  @import '~@/assets/less/_importants';
  .form {
    display: flex;
    flex-direction: column;
    .item-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;
    }
    .item {
      margin-bottom: 30px;
      .ss-block({
        margin-bottom: 20px;
      });
      &:last-child {
        margin-bottom: 0;
      }
      &__label {
        display: inline-block;
        margin-bottom: 15px;
        font-weight: 800;
        font-size: 1.8rem;
        .ss-block({
          margin-bottom: 10px;
        });
      }
      &__input {
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
    .checkbox {
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 18px;
        &:last-child {
          margin-bottom: 0;
        }
        &__label {
          .ss-block({
            margin-bottom: 15px;
          });
        }
        input {
          display: none;
          &:checked + label::after {
            display: block;
          }
        }
        .checkbox-label {
          position: relative;
          padding-left: 50px;
          .ss-block({
            padding-left: 40px
          });
          &::before,
          &::after {
            position: absolute;
            content: '';
            left: 0;
          }
          &::before {
            top: -3px;
            width: 26px;
            height: 26px;
            background: @colorBgGray;
            .sm-block({
              top: -5px;
            });
          }
          &::after {
            display: none;
            top: -3px;
            left: 8px;
            transform: rotate(38deg);
            width: 8px;
            height: 16px;
            border-bottom: 2px solid #000;
            border-right: 2px solid #000;
          }
        }
      }
    }
    .g-btn {
      min-width: 220px;
      align-self: flex-start;
    }
  }
</style>
