<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="item-wrapper">
      <p class="g-caption g-caption-section">Основные</p>
      <div class="grid-wrapper grid-wrapper--main">
        <div class="g-item-form photo">
          <span class="g-item-form__label">Фото</span>
          <div class="photo__wrapper">
            <input type="file" class="visually-hidden" id="form__file">
            <label class="photo__link photo__link--add" for="form__file">
              <img svg-inline class="photo__icon" src="../assets/img/icon/camera.svg" alt="">
              <span class="photo__text">Загрузить фото</span>
            </label>
          </div>
          <div class="input-valid-error" v-if="false">
            <template v-if="false">Поле не может быть пустым</template>
            <template v-else-if="false">Название не должно быть меньше 10 символов</template>
          </div>
        </div>
        <div class="g-item-form">
          <label class="g-item-form__label" for="form-role-title">Логин</label>
          <input class="g-item-form__input" id="form-role-title" :class="{error: $v.form.title.$error}" type="text"  @blur="$v.form.title.$touch()">
          <div class="input-valid-error" v-if="$v.form.title.$error">
            <template v-if="!$v.form.title.required">Поле не может быть пустым</template>
            <template v-if="!$v.form.title.maxLength">Превышено количество допустимых символов</template>
          </div>
        </div>
        <div class="g-item-form">
          <label class="g-item-form__label" for="form-role-name">Имя</label>
          <input class="g-item-form__input" id="form-role-name" :class="{error: $v.form.title.$error}" type="text"  @blur="$v.form.title.$touch()">
          <div class="input-valid-error" v-if="$v.form.select.$error">
            <template v-if="!$v.form.select.required">Поле не может быть пустым</template>
          </div>
        </div>
        <div class="g-item-form">
          <label class="g-item-form__label" for="form-role-name">Фамилия</label>
          <input class="g-item-form__input" id="form-role-nameeee" :class="{error: $v.form.title.$error}" type="text"  @blur="$v.form.title.$touch()">
          <div class="input-valid-error" v-if="$v.form.select.$error">
            <template v-if="!$v.form.select.required">Поле не может быть пустым</template>
          </div>
        </div>
        <div class="g-item-form col-12">
          <label class="g-item-form__label" for="form-role-name">Email</label>
          <input class="g-item-form__input" id="form-role-namee" :class="{error: $v.form.title.$error}" type="text"  @blur="$v.form.title.$touch()">
          <div class="input-valid-error" v-if="$v.form.select.$error">
            <template v-if="!$v.form.select.required">Поле не может быть пустым</template>
          </div>
        </div>
        <div class="g-item-form col-12">
          <label class="g-item-form__label" for="form-role-name">Телефон</label>
          <input class="g-item-form__input" id="form-role-nameee" :class="{error: $v.form.title.$error}" type="text"  @blur="$v.form.title.$touch()">
          <div class="input-valid-error" v-if="$v.form.select.$error">
            <template v-if="!$v.form.select.required">Поле не может быть пустым</template>
          </div>
        </div>
      </div>

    </div>
    <div class="item-wrapper">
      <p class="g-caption g-caption-section">Адрес</p>
      <div class="grid-wrapper grid-wrapper--address">
        <div class="g-item-form">
          <label class="g-item-form__label" for="form-role-name">Страна</label>
          <input class="g-item-form__input" id="" :class="{error: $v.form.title.$error}" type="text"  @blur="$v.form.title.$touch()">
          <div class="input-valid-error" v-if="$v.form.select.$error">
            <template v-if="!$v.form.select.required">Поле не может быть пустым</template>
          </div>
        </div>
        <div class="g-item-form">
          <label class="g-item-form__label" for="form-role-name">Город</label>
          <input class="g-item-form__input" id="" :class="{error: $v.form.title.$error}" type="text"  @blur="$v.form.title.$touch()">
          <div class="input-valid-error" v-if="$v.form.select.$error">
            <template v-if="!$v.form.select.required">Поле не может быть пустым</template>
          </div>
        </div>
        <div class="g-item-form">
          <label class="g-item-form__label" for="form-role-name">Область / регион</label>
          <input class="g-item-form__input" id="" :class="{error: $v.form.title.$error}" type="text"  @blur="$v.form.title.$touch()">
          <div class="input-valid-error" v-if="$v.form.select.$error">
            <template v-if="!$v.form.select.required">Поле не может быть пустым</template>
          </div>
        </div>
        <div class="g-item-form">
          <label class="g-item-form__label" for="form-role-name">Почтовый индекс</label>
          <input class="g-item-form__input" id="" :class="{error: $v.form.title.$error}" type="text"  @blur="$v.form.title.$touch()">
          <div class="input-valid-error" v-if="$v.form.select.$error">
            <template v-if="!$v.form.select.required">Поле не может быть пустым</template>
          </div>
        </div>
        <div class="g-item-form col-12">
          <label class="g-item-form__label" for="form-role-name">Адрес</label>
          <input class="g-item-form__input" id="" :class="{error: $v.form.title.$error}" type="text"  @blur="$v.form.title.$touch()">
          <div class="input-valid-error" v-if="$v.form.select.$error">
            <template v-if="!$v.form.select.required">Поле не может быть пустым</template>
          </div>
        </div>
      </div>
    </div>
    <button class="g-btn g-btn--no-icon" :disabled="$v.$invalid">
      <span>Сохранить</span>
    </button>
  </form>
</template>

<script>
import { maxLength, required } from 'vuelidate/lib/validators'
import API from '../api/index'

export default {
  name: 'AdminProfileMain',
  data() {
    return {
      form: {
        title: '',
        select: ''
      }
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
}
</script>

<style scoped lang="less">
  @import '../assets/less/_importants';
  .form {
    .item-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;
      &:last-of-type {
        margin-bottom: 60px;
        padding-bottom: 30px;
        border-bottom: 1px solid @colorBorder;
        .sm-block({margin-bottom: 40px;
          padding-bottom: 30px;});
      }
    }
    .g-btn {
      min-width: 220px;
      align-self: flex-start;
    }
    .grid-wrapper {
      display: grid;
      grid-column-gap: 100px;
      .lg-block({
        grid-column-gap: 50px;
      });
      .md-block({
        grid-column-gap: 0;
      });
      &--main {
        grid-template-columns: 375px 1fr;
        .md-block({
          grid-template-columns: 1fr;
        });
      }
      &--address {
        grid-template-columns: 1fr 1fr;
        .md-block({
          grid-template-columns: 1fr;
        });
      }
      .g-item-form {
        &.col-12 {
          grid-column: ~"1 / 3";
          .md-block({grid-column: ~"1 / 2";})
        }
      }
    }
    .photo {
      grid-row: ~"1 / 4";
      grid-column: ~"1 / 2";
      display: flex;
      flex-direction: column;
      position: relative;
      height: 375px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      transition: 0.3s;
      margin-bottom: 30px;
      .md-block({
        grid-column: ~"1 / 2";
        height: 300px;
      });
      .ss-block({ margin-bottom: 20px;});
      .ss-block({
        height: 200px;
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

  }
</style>
