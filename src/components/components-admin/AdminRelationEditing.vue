<template>
  <section class="p-event-editing p-default p-default-inner">
    <bread-crumbs/>
    <div class="container page">
      <h1 class="g-caption g-caption-inner g-caption-inner--admin">
        <template v-if="event === 'new'">Создание события</template>
        <template v-else>Редактирование события</template>
      </h1>
      <form class="edit-form" @submit.prevent="onSubmit">
        <h2 class="g-caption g-caption-section">Общая информация</h2>
        <div class="edit-grid">
          <div class="edit-grid__item item item--col-8">
            <label class="item__label" for="form-title">Название</label>
            <input class="item__input" type="text" id="form-title" v-model="form.title" :class="{error: $v.form.title.$error}" @blur="$v.form.title.$touch()">
            <div class="input-valid-error" v-if="$v.form.title.$error">
              <template v-if="!$v.form.title.required">Поле не может быть пустым</template>
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
          <div class="edit-grid__item item item--col-4">
            <label class="item__label" for="form__country">Страна</label>
            <input class="item__input" type="text" id="form__country" v-model="form.country" :class="{error: $v.form.country.$error}" @blur="$v.form.country.$touch()">
            <div class="input-valid-error" v-if="$v.form.country.$error">
              <template v-if="!$v.form.country.required">Поле не может быть пустым</template>
            </div>
          </div>
          <div class="edit-grid__item item item--col-4">
            <label class="item__label" for="form__city">Город</label>
            <input class="item__input" type="text" id="form__city" v-model="form.city" :class="{error: $v.form.city.$error}" @blur="$v.form.city.$touch()">
            <div class="input-valid-error" v-if="$v.form.city.$error">
              <template v-if="!$v.form.city.required">Поле не может быть пустым</template>
            </div>
          </div>
          <div class="edit-grid__item item item--col-4">
            <label class="item__label" for="form__address">Адрес</label>
            <input class="item__input" type="text" id="form__address" v-model="form.address" :class="{error: $v.form.address.$error}" @blur="$v.form.address.$touch()">
            <div class="input-valid-error" v-if="$v.form.address.$error">
              <template v-if="!$v.form.address.required">Поле не может быть пустым</template>
            </div>
          </div>
          <div class="edit-grid__item item item--col-4">
            <label class="item__label" for="form__date">Дата и время</label>
            <flat-pickr v-model="form.date" :config="configDate" :class="['item__input', {error: $v.form.date.$error}]" @blur="$v.form.date.$touch()"></flat-pickr>
            <div class="input-valid-error" v-if="$v.form.date.$error">
              <template v-if="!$v.form.date.required">Поле не может быть пустым</template>
            </div>
          </div>
          <div class="edit-grid__item item item--col-4">
            <label class="item__label" for="form__t_price">Стоимость билета</label>
            <input class="item__input" type="text" id="form__t_price" v-mask="'#################'" v-model="form.t_price" :class="{error: $v.form.t_price.$error}" @blur="$v.form.t_price.$touch()">
            <div class="input-valid-error" v-if="$v.form.t_price.$error">
              <template v-if="!$v.form.t_price.required">Поле не может быть пустым</template>
            </div>
          </div>
          <div class="edit-grid__item item item--col-4">
            <span class="item__label">Валюта</span>
            <v-select :multiple="false" :class="['v-select__modal', {error: errorSelect.t_currency}]" :searchable="false" :options="selectCurrency" v-model="form.t_currency" v-on:search:blur="validateSelect('t_currency')"></v-select>
            <div class="input-valid-error" v-if="errorSelect.t_currency">
              Выберите Валюту
            </div>
          </div>
        </div>
        <div class="btn-wrapper">
          <button class="g-btn g-btn--no-icon" v-if="event === 'new'" :disabled="$v.$invalid || errorSelect.t_currency === true" :class="{disabled: disabledForm}">
            <span>Создать</span>
          </button>
          <button class="g-btn g-btn--no-icon" v-else :disabled="$v.$invalid  || errorSelect.t_currency === true">
            <span>Сохранить</span>
          </button>
        </div>
        <router-link :to="`/admin/event-editing/${id}`" class="back-btn">Назад</router-link>
      </form>
    </div>
  </section>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import API from '../../api/index'
import BreadCrumbs from '../BreadCrumbs.vue'
import { minLength, required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

export default {
  name: 'AdminRelationEditing',
  props: ['id', 'event'],
  components: { BreadCrumbs, flatPickr },
  data() {
    return {
      resize: true,
      configDate: {
        enableTime: true,
        time_24hr: true,
        locale: Russian,
        dateFormat: 'd.m.Y H:i'
      },
      form: {
        event_id: this.id,
        date: '',
        title: '',
        country: '',
        city: '',
        address: '',
        t_currency: '',
        t_price: null
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
        address: 'Неверный адрес',
        t_currency: 'Некорректная валюта продажи билета',
        t_price: 'Некорректная цена'
      },
      selectCurrency: ['USD', 'RUB', 'KZT']
    }
  },
  validations: {
    form: {
      title: {
        required
      },
      date: {
        required,
        minLength: minLength(10)
      },
      country: {
        required
      },
      city: {
        required
      },
      address: {
        required
      },
      t_currency: {
        required
      },
      t_price: {
        required
      },
    }
  },
  computed: {
    ...mapState('user', [
      'myParentEvents'
    ]),
  },
  methods: {
    onSubmit() {
      if (this.event === 'new') {
        API.relations.create(this.form).then(response => {
          console.log(response)
          this.disabledForm = true
          API.response.success('Событие создано')
          // this.$router.push({path: `/admin/editing/${id}`})
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
      this.form = {
        id: newObg.id,
        date: newObg.date,
        title: newObg.title,
        country: newObg.title,
        city: newObg.city,
        address: newObg.address,
        t_currency: newObg.tickets.currency,
        t_price: newObg.tickets.price
      }
    }
  },
  mounted() {
    if (this.event === 'new') {
      this.form = {
        event_id: this.id,
        date: '',
        title: '',
        country: '',
        city: '',
        address: '',
        t_currency: '',
        t_price: null
      }
    } else {
      API.events.info({id: this.id}).then(response => {
        this.myForm(response.data.relations)
      })
    }

  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/_importants";
  @import '~flatpickr/dist/flatpickr.css';
  .edit-form {
    padding-left: 50px;
    .lg-block({ padding-left: 0; });
    .btn-wrapper {
      display: flex;
      justify-content: flex-start;
      .sm-block({ margin-left: 0; margin-bottom: 40px; });
      .ss-block({ flex-direction: column; align-items: center; });
      .g-btn {
        min-width: 250px;
        .sm-block({ min-width: 220px; });
        .ss-block({ min-width: 200px; });
        &:first-child {
          margin-right: 20px;
          .ss-block({ margin-right: 0; margin-bottom: 20px; });
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
    grid-row-gap: 50px;
    margin-bottom: 50px;
    max-width: 1000px;
    .lg-block({ grid-column-gap: 50px; grid-row-gap: 30px; });
    .md-block({ grid-template-columns: 1fr 1fr; });
    .sm-block({grid-column-gap: 30px;});
    .ss-block({ grid-template-columns: 1fr; grid-row-gap: 20px; });
    .photo {
      display: flex;
      flex-direction: column;
      position: relative;
      height: 400px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      transition: 0.3s;
      .to(1400px, { height: 350px; });
      .md-block({ height: 300px; });
      .xs-block({ height: 200px; margin-bottom: 0; });
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
    .item {
      &--col-8 {
        grid-column: ~"1 / 3";
        .ss-block({ grid-column: ~"1 / 2"; });
        &.textarea {
          grid-row: ~"2 / 4";
          .md-block({ grid-row: ~"3 / 4"; });
        }
      }
      &--col-4 {
        &.photo {
          grid-column: ~"3 / 4";
          grid-row: ~"1 / 4";
          .md-block({ grid-row: ~"1 / 2"; grid-column: ~"1 / 3"; });
          .ss-block({ grid-column: ~"1 / 2"; });
        }
      }
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
  }
</style>
