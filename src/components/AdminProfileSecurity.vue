<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="item-wrapper">
      <p class="g-caption g-caption-section">Пароль</p>
      <div class="grid-wrapper grid-wrapper--main">
        <div class="g-item-form ">
          <label class="g-item-form__label" for="form-role-name">Старый пароль</label>
          <input class="g-item-form__input" id="form-role-name" :class="{error: $v.form.title.$error}" type="text" @blur="$v.form.title.$touch()">
          <div class="input-valid-error" v-if="$v.form.select.$error">
            <template v-if="!$v.form.select.required">Поле не может быть пустым</template>
          </div>
        </div>
        <div class="g-item-form row-2">
          <label class="g-item-form__label" for="form-role-name">Новый пароль</label>
          <input class="g-item-form__input" id="form-role-name" :class="{error: $v.form.title.$error}" type="text" @blur="$v.form.title.$touch()">
          <div class="input-valid-error" v-if="$v.form.select.$error">
            <template v-if="!$v.form.select.required">Поле не может быть пустым</template>
          </div>
        </div>
        <div class="g-item-form row-2">
          <label class="g-item-form__label" for="form-role-name">Повторите пароль</label>
          <input class="g-item-form__input" id="form-role-name" :class="{error: $v.form.title.$error}" type="text" @blur="$v.form.title.$touch()">
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
  name: 'AdminProfileSettings',
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
        padding-bottom: 40px;
        border-bottom: 1px solid @colorBorder;
        .sm-block({
          margin-bottom: 40px;
          padding-bottom: 20px;
        });
        .ss-block({padding-bottom: 30px;})
      }
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
        grid-template-columns: 1fr 1fr;
        .md-block({
          grid-template-columns: 1fr;
        });
        .g-item-form {
          &.row-2 {
            grid-row: ~"2 / 3";
            .md-block({grid-row: auto});
          }
        }
      }
    }
  }
</style>
