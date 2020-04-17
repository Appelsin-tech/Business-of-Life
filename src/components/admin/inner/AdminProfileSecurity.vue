<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="item-wrapper">
      <p class="g-caption-section">Пароль</p>
      <div class="grid-wrapper grid-wrapper--main">
        <div class="g-item-form ">
          <label class="g-item-form__label">Старый пароль</label>
          <input class="g-item-form__input" :class="{error: $v.form.password_old.$error}" type="password" v-model="form.password_old" @blur="$v.form.password_old.$touch()">
          <div class="input-valid-error" v-if="$v.form.password_old.$error">
            <template v-if="!$v.form.password_old.required">Поле не может быть пустым</template>
          </div>
        </div>
        <div class="g-item-form row-2">
          <label class="g-item-form__label">Новый пароль</label>
          <input class="g-item-form__input" :class="{error: $v.form.password_new.$error}" type="password" v-model="form.password_new" @blur="$v.form.password_new.$touch()">
          <div class="input-valid-error" v-if="$v.form.password_new.$error">
            <template v-if="!$v.form.password_new.required">Поле не может быть пустым</template>
            <template v-if="!$v.form.password_new.minLength">Значение должно быть не менее 6 символов</template>
          </div>
        </div>
        <div class="g-item-form row-2">
          <label class="g-item-form__label">Повторите пароль</label>
          <input class="g-item-form__input" :class="{error: $v.form.password_repeat.$error}" type="password" v-model="form.password_repeat" @blur="$v.form.password_repeat.$touch()">
          <div class="input-valid-error" v-if="$v.form.password_repeat.$error">
            <template v-if="!$v.form.password_repeat.required">Поле не может быть пустым</template>
            <template v-if="!$v.form.password_repeat.sameAs">Пароли не совпадают</template>
          </div>
        </div>
      </div>
    </div>
    <button class="g-btn g-btn--no-icon" :disabled="$v.$invalid">
      <span class="text">Сохранить</span>
    </button>
  </form>
</template>

<script>
import { sameAs, required, minLength } from 'vuelidate/lib/validators'
import API from '../../../api/index'

export default {
  name: 'AdminProfileSettings',
  data() {
    return {
      form: {
        password_old: '',
        password_new: '',
        password_repeat: ''
      },
      errorResponse: {
        password: 'Не верный пароль'
      }
    }
  },
  validations: {
    form: {
      password_old: {
        required
      },
      password_new: {
        required,
        minLength: minLength(6)
      },
      password_repeat: {
        required,
        sameAs: sameAs('password_new')
      }
    }
  },
  methods: {
    onSubmit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        API.users.password({
          password_old: this.form.password_old,
          password_new: this.form.password_new
        }).then(response => {
          API.response.success('Пароль изменен')
        }).catch(e => {
          API.response.error(this.errorResponse[e.response.data.reason])
        })
      }
    }
  },
}
</script>

<style scoped lang="less">
  @import '../../../assets/less/_importants';
  .form {
    .item-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;
      &:last-of-type {
        margin-bottom: 60px;
        padding-bottom: 30px;
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
