<template>
  <section class='p-statistic p-default-block'>
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class='container page'>
      <h1 class='g-caption-inner'>Роли и управление доступом</h1>
      <div class="wrapper-col">
        <div class="col col--role">
          <div class="btn-wrapper">
            <button class="btn-role" :class="'active'">Администратор</button>
            <button class="btn-role">Модератор</button>
            <a href="#" class="g-btn g-btn--icon-left">
            <span>
              <img svg-inline class="svg-icon" src="../../assets/img/icon/plus-circle.svg" alt="">
              Добавить роль
            </span>
            </a>
          </div>
        </div>
        <form class="col col--access" @submit.prevent="onSubmit">
          <div class="item-wrapper">
            <p class="g-caption-section">Роль</p>
            <div class="item">
              <label class="item__label" for="form-role-title">Название роли</label>
              <input class="item__input" id="form-role-title" :class="{error: $v.form.title.$error}" type="text" v-model="form.title" @blur="$v.form.title.$touch()">
              <div class="input-valid-error" v-if="$v.form.title.$error">
                <template v-if="!$v.form.title.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.title.maxLength">Превышено количество допустимых символов</template>
              </div>
            </div>
            <div class="item">
              <label class="item__label" for="form-role-name">Назначить</label>
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
            <div class="checkbox">
              <span class="item__label">Общие</span>
              <div class="item">
                <input class="checkbox-input" :value="4" type="checkbox" id="access" v-model="form.access">
                <label class="checkbox-label" for="access">Дата регистрации в компании</label>
              </div>
            </div>
            <div class="checkbox">
              <span class="item__label">Мероприятия</span>
              <div class="item">
                <input class="checkbox-input" :value="1" type="checkbox" id="event_create" v-model="form.event">
                <label class="checkbox-label" for="event_create">Создание мероприятий и событий</label>
              </div>
              <div class="item">
                <input class="checkbox-input" :value="2" type="checkbox" id="event_public" v-model="form.event">
                <label class="checkbox-label" for="event_public">Публикация событий</label>
              </div>
              <div class="item">
                <input class="checkbox-input" :value="3" type="checkbox" id="event_moderation" v-model="form.event">
                <label class="checkbox-label" for="event_moderation">Модерирование событий</label>
              </div>
              <div class="item">
                <input class="checkbox-input" :value="4" type="checkbox" id="ticket_check" v-model="form.event">
                <label class="checkbox-label" for="ticket_check">Проверка любого билета</label>
              </div>
              <div class="item">
                <input class="checkbox-input" :value="5" type="checkbox" id="view_statistic" v-model="form.event">
                <label class="checkbox-label" for="view_statistic">Просмотр статистики продаж</label>
              </div>
            </div>
            <div class="checkbox">
              <span class="item__label">Новости</span>
              <div class="item">
                <input class="checkbox-input" :value="1" type="checkbox" id="news_create" v-model="form.news">
                <label class="checkbox-label" for="news_create">Создание новостей</label>
              </div>
              <div class="item">
                <input class="checkbox-input" :value="2" type="checkbox" id="news_public" v-model="form.news">
                <label class="checkbox-label" for="news_public">Публикация новостей</label>
              </div>
              <div class="item">
                <input class="checkbox-input" :value="3" type="checkbox" id="news_moderation" v-model="form.news">
                <label class="checkbox-label" for="news_moderation">Модерирование новостей</label>
              </div>
            </div>
          </div>
          <button class="g-btn g-btn--no-icon" :disabled="$v.$invalid">
            <span>Сохранить</span>
          </button>
        </form>
      </div>
      <router-link to="/admin/menu" class="back-btn">Назад</router-link>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '../BreadCrumbs.vue'
import { maxLength, required } from 'vuelidate/lib/validators'
import API from '../../api/index'

export default {
  name: 'AdminRole',
  components: {
    BreadCrumbs
  },
  data() {
    return {
      breadCrumbs: [
        {
          path: '/admin/menu',
          title: 'Личный кабинет'
        }
      ],
      errorSelect: {
        selectedStatus: false
      },
      form: {
        title: '',
        name: '',
        access: [],
        event: [],
        news: [],
        select: []
      },
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
  methods: {
    onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        API.response.error('Заполните все поля')
        return
      }
    }
  },
  mounted() {
    // this.$refs.select.open = true
  }
}
</script>

<style scoped lang="less">
  @import '../../assets/less/_importants';

  .wrapper-col {
    .row-flex();
    .col {
      .col();
      &--role {
        .size(3.2);
        .size-lg(12);
        padding-right: 50px;
        border-right: 1px solid @colorBorder;
        .lg-block({
          border-right: none;
          padding-right: 0;
          padding-bottom: 20px;
          border-bottom: 1px solid @colorBorder;
        });
        .btn-wrapper {
          width: 100%;
          .lg-block({max-width: 300px; margin: 0 auto;});
          .sm-block({max-width: 210px;})
        }
        .btn-role {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 35px 25px;
          font-size: 1.3rem;
          font-weight: 900;
          text-transform: uppercase;
          min-width: 100%;
          margin-bottom: 20px;
          box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
          cursor: pointer;
          border: 3px solid transparent;
          .lg-block({
            padding: 30px 20px;
          });
          .sm-block({
            padding: 20px 15px;
            border-width: 2px;
          });
          &.active {
            border: 3px solid @colorMain;
            .sm-block({border-width: 2px;});
          }

        }
        .g-btn {
          min-width: 100%;
        }
      }
      &--access {
        .size(8.8);
        .size-lg(12);
        display: flex;
        flex-direction: column;
        padding-left: 30px;
        .lg-block({
          padding-left: 0;
          padding-top: 20px;
        });
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
          margin-bottom: 35px;
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
    }
  }
</style>
