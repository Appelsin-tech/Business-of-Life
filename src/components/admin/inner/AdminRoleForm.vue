<template>
  <div class="form" >
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
        <div class="item__input taggable">
          <v-select @input="accessMethods" ref="select" taggable multiple :closeOnSelect="false" label="login" v-model="users" class="v-select__role" >
                  <span slot="no-options">
                    Введите имя
                  </span>
            <template #search="{attributes, events}">
              <input
                class="vs__search"
                v-bind="attributes"
                v-on="events"
                :required="false"
              />
            </template>
          </v-select>
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
<!--    <button class="g-btn g-btn&#45;&#45;no-icon" :disabled="$v.$invalid">-->
<!--      <span>Сохранить</span>-->
<!--    </button>-->
  </div>
</template>

<script>
import API from '@/api/index'

export default {
  name: 'AdminRoleForm',
  props: {
    role: {
      required: true
    }
  },
  data() {
    return {
      users: [],
      listRoles: [],
      error: {
        exist: 'Пользователь уже является проверяющим',
        not_found: 'Пользователь не найден'
      },
      errorSelect: {
        selectedStatus: false
      },
      checkboxData: [
        {
          role: 1,
          title: 'Управление курсами',
          field: ['Создание курсов', 'Модерирование курсов', 'Публикация курсов']
        },
        {
          role: 2,
          title: 'Управление новостями',
          field: ['Создание новостей', 'Модерирование новостей', 'Публикация новостей']
        },
        {
          role: 3,
          title: 'Управление мероприятиями',
          field: ['Создание мероприятий', 'Модерирование мероприятий', 'Публикация мероприятий']
        }
      ],
      testRoles: [
        {
          email: 'aksabitov@gmail.com',
          id: '1',
          login: '1 2 3',
          roles: [1, 2, 3],
          status: 2
        },
        {
          email: 'aksabitov@gmail.com',
          id: '2',
          login: '3',
          roles: [3],
          status: 2
        },
        {
          email: 'aksabitov@gmail.com',
          id: '3',
          login: '1 3',
          roles: [1, 3],
          status: 2
        },
        {
          email: 'aksabitov@gmail.com',
          id: '44',
          login: '2 3',
          roles: [2, 3],
          status: 2
        },
        {
          email: 'aksabitov@gmail.com',
          id: '5',
          login: '1',
          roles: [1],
          status: 2
        }
      ]
    }
  },
  computed: {
    paramsSubmit () {
      return {
        user: this.users,
        role: this.role
      }
    },
    roleId: {
      get () {
        return this.role
      },
      set () {

      }
    }
  },
  methods: {
    accessMethods (val) {
      if (this.users.length > val.length) {
        let userId = null
        this.users.forEach(item => {
          if (val.indexOf(item) === -1) {
            userId = item.id
          }
        })
        API.supervisors.remove({ relation: this.relation, user_id: userId}).then(response => {
          API.response.success('Проверяющий удален')
        }).catch(error => {
          console.log(error)
        })
      } else {
        API.roles.edit({ roles: this.role, user: val[val.length - 1] }).then(response => {
          API.response.success('Пользователь добавлен')
          this.getListRoles()
        }).catch(error => {
          this.users.splice(-1, 1)
          if (error.response.reason) {
            API.response.error(this.error[error.response.reason])
          } else {
            API.response.error(this.error['not_found'])
          }
        })
      }
    },
    getListRoles () {
      API.roles.list().then(response => {
        this.listRoles = response
        response.forEach(item => {
          if (Array.isArray(item.roles)) {
            item.roles.forEach(a => {
              if (a === this.role) {
                this.users.push(item.login)
              }
            })
          } else {
            if (item.roles === this.role) {
              this.users.push(item.login)
            }
          }

        })
      }).catch(e => console.log(e))
    }
  },
  watch: {
    // role(oldVal, newVal) {
    //   this.users = []
    //   this.listRoles.forEach(item => {
    //     item.roles.forEach(role => {
    //       if (role === this.role) {
    //         this.users.push(item.login)
    //       }
    //     })
    //   })
    // }
  },
  mounted () {
    this.getListRoles()
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
    .btn-app {
      min-width: 220px;
      align-self: flex-start;
    }
  }
</style>
