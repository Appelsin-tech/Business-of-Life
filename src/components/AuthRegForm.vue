<template>
  <form @submit.prevent="onSubmit" class="form" :class="pageName">
    <div class="item-wrapper">

      <div class="g-item-form" v-if="pageName === 'registration' || pageName === 'registration-referal'">
        <label class="g-item-form__label" for="form-role-name">Ваше имя</label>
        <input type="text" class="g-item-form__input" v-model="form_reg.name" :class="{error: $v.form_reg.name.$error}" @blur="$v.form_reg.name.$touch()">
        <div class="input-valid-error" v-if="$v.form_reg.name.$error">
          <template v-if="!$v.form_reg.name.required">Поле не может быть пустым</template>
          <template v-if="!$v.form_reg.name.minLength">Значение не должно быть менее 3-х символов</template>
        </div>
      </div>
      <div class="g-item-form" v-if="pageName === 'registration' || pageName === 'registration-referal'">
        <label class="g-item-form__label" for="form-role-name">Почта</label>
        <input type="text" class="g-item-form__input" v-model="form_reg.email" :class="{error: $v.form_reg.email.$error}" @blur="$v.form_reg.email.$touch()">
        <div class="input-valid-error" v-if="$v.form_reg.email.$error">
          <template v-if="!$v.form_reg.email.required">Поле не может быть пустым</template>
          <template v-if="!$v.form_reg.email.email">Некорректный Email</template>
        </div>
      </div>
      <div class="g-item-form" v-if="pageName === 'registration' || pageName === 'registration-referal'">
        <label class="g-item-form__label" for="form-role-name">Имя пригласителя</label>
        <input type="text" class="g-item-form__input" v-model="form_reg.sponsor" :class="{error: $v.form_reg.sponsor.$error}" @blur="$v.form_reg.sponsor.$touch()">
        <div class="input-valid-error" v-if="$v.form_reg.sponsor.$error">
          <template v-if="!$v.form_reg.sponsor.required">Поле не может быть пустым</template>
          <template v-if="!$v.form_reg.sponsor.minLength">Значение должно быть не менее 3-х символов</template>
        </div>
      </div>
      <div class="g-item-form" v-if="pageName === 'auth'">
        <label class="g-item-form__label" for="form-role-name">Логин</label>
        <input type="text" class="g-item-form__input" v-model="form_auth.user" :class="{error: $v.form_auth.user.$error}" @blur="$v.form_auth.user.$touch()">
        <div class="input-valid-error" v-if="$v.form_auth.user.$error">
          <template v-if="!$v.form_auth.user.required">Поле не может быть пустым</template>
          <template v-if="!$v.form_auth.user.minLength">Значение не должно быть менее 3-х символов</template>
        </div>
      </div>
      <div class="g-item-form" v-if="pageName === 'auth'">
        <label class="g-item-form__label" for="form-role-name">Пароль</label>
        <input type="password" class="g-item-form__input" v-model="form_auth.password" :class="{error: $v.form_auth.password.$error}" @blur="$v.form_auth.password.$touch()">
        <div class="input-valid-error" v-if="$v.form_auth.password.$error">
          <template v-if="!$v.form_auth.password.required">Поле не может быть пустым</template>
          <template v-if="!$v.form_auth.password.minLength">Значение должно быть не менее 5 символов</template>
        </div>
      </div>
    </div>
    <button class="g-btn" :disabled="$v.$invalid">
      <span>
        <template v-if="pageName === 'auth'">Войти</template>
        <template v-else>Регистрация</template>
        <img svg-inline class="svg-icon" src="../assets/img/icon/right-arrow.svg" alt=""></span>
    </button>

  </form>
</template>

<script>
import { email, minLength, required } from 'vuelidate/lib/validators'
import API from '../api/index'

export default {
  name: 'AuthRegForm',
  data() {
    return {
      errorResponse: {
        user_wrong: 'Пользователь не найден',
        recovery: 'Требуется восстановление доступа',
        password: 'Не верный пароль',
        banned: 'Пользователь забанен'
      },
      pageAuth: false,
      form_auth: {
        user: '',
        password: ''
      },
      form_reg: {
        name: '',
        language: 'ru',
        email: '',
        sponsor: ''
      }
    }
  },
  validations() {
    if (this.pageName === 'registration' || this.pageName === 'registration-referal') {
      return {
        form_reg: {
          name: {
            required,
            minLength: minLength(3)
          },
          language: {
            required
          },
          email: {
            required,
            email
          },
          sponsor: {
            required,
            minLength: minLength(3)
          }
        }
      }
    } else if (this.pageName === 'auth') {
      return {
        form_auth: {
          user: {
            required,
            minLength: minLength(3)
          },
          password: {
            required,
            minLength: minLength(5)
          }
        }
      }
    }
  },
  computed: {
    pageName() {
      return this.$route.name
    }
  },
  methods: {
    onSubmit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.pageName === 'registration' || this.pageName === 'registration-referal') {
          API.access.request(this.form_reg).then(response => {
            this.btnSubmit = true
            console.log(response)
            API.response.success('Вам отправлено письмо на почту')
          }).catch(error => {
            API.response.error(this.errorResponse[error.response.data.reason])
          })
        } else {
          API.access.auth(this.form_auth).then(response => {
            this.$store.dispatch('user/login').then(response => {
              this.$router.push({ path: '/admin/me' })
            })
          }).catch(error => {
            API.response.error(this.errorResponse[error.response.data.reason])
          })
        }
      }
    },
  },
  mounted() {
    if (this.$route.params.sponsor) {
      this.form_reg.sponsor = this.$route.params.sponsor
      if (!this.$cookies.get('sponsor')) {
        this.$cookies.set('sponsor', this.$route.params.sponsor)
        this.$store.dispatch('user/setCookieSponsor')
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .form {
    display: flex;
    .md-block({
      flex-direction: column;
      align-items: center;
    });
    &.auth {
      .g-btn {
        margin-left: 20px;
      }
    }
    &.registration {
      flex-direction: column;
      .g-btn {
        margin-top: 0;
      }
    }
    .item-wrapper {
      .row-flex();
      align-items: flex-start;
      flex-grow: 1;
      .md-block({
        flex-direction: column;
        align-items: center;
        align-self: stretch
      });
    }
    .g-item-form {
      .col();
      .size(6);
      .size-sm(11);
      .size-xs(12);
      box-sizing: border-box;
      .md-block({
        margin-bottom: 30px;
      });
      .xs-block({
        margin-bottom: 20px;
      });
      &__input {
        transition: 0.3s;
        &:hover,
        &:focus {
          background: #fff;
          border-color: #000;
        }
        &.error {
          &:hover,
          &:focus {
            border-color: @colorMainRed;
          }
        }
      }
    }
    .g-btn {
      height: 68px;
      padding-top: 0;
      padding-bottom: 0;
      margin-bottom: 30px;
      margin-top: 37px;
      align-self: flex-start;
      transition: background-color 0.3s;
      .lg-block({
        height: 60px;
        margin-top: 0;
      });
      .md-block({
        max-width: 250px;
        height: 60px;
        align-self: center;
      });
    }
  }
</style>
