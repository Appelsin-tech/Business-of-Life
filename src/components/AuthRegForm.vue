<template>
  <form @submit.prevent="onSubmit" class="form" :class="pageName">
    <div class="item-wrapper" v-if="pageName === 'registration'">
      <div class="g-item-form" >
        <label class="g-item-form__label">Ваше имя</label>
        <input type="text" class="g-item-form__input" v-model="form_reg.name" :class="{error: $v.form_reg.name.$error}" @blur="$v.form_reg.name.$touch()">
        <div class="input-valid-error" v-if="$v.form_reg.name.$error">
          <template v-if="!$v.form_reg.name.required">Поле не может быть пустым</template>
          <template v-if="!$v.form_reg.name.minLength">Значение не должно быть менее 3-х символов</template>
        </div>
      </div>
      <div class="g-item-form">
        <label class="g-item-form__label">Почта</label>
        <input type="text" class="g-item-form__input" v-model="form_reg.email" :class="{error: $v.form_reg.email.$error}" @blur="$v.form_reg.email.$touch()">
        <div class="input-valid-error" v-if="$v.form_reg.email.$error">
          <template v-if="!$v.form_reg.email.required">Поле не может быть пустым</template>
          <template v-if="!$v.form_reg.email.email">Некорректный Email</template>
        </div>
      </div>
      <div class="g-item-form">
        <label class="g-item-form__label">Имя пригласителя</label>
        <input type="text" class="g-item-form__input" v-model="form_reg.sponsor" :class="{error: $v.form_reg.sponsor.$error}" @blur="$v.form_reg.sponsor.$touch()">
        <div class="input-valid-error" v-if="$v.form_reg.sponsor.$error">
          <template v-if="!$v.form_reg.sponsor.required">Поле не может быть пустым</template>
          <template v-if="!$v.form_reg.sponsor.minLength">Значение должно быть не менее 3-х символов</template>
        </div>
      </div>
      <button-app :disabled="$v.$invalid || btnLoading">
        Регистрация
      </button-app>
    </div>
    <div class="item-wrapper" v-else-if="pageName === 'auth'">
      <div class="g-item-form" >
        <label class="g-item-form__label" >Логин</label>
        <input type="text" class="g-item-form__input" v-model="form_auth.user" :class="{error: $v.form_auth.user.$error}" @blur="$v.form_auth.user.$touch()">
        <div class="input-valid-error" v-if="$v.form_auth.user.$error">
          <template v-if="!$v.form_auth.user.required">Поле не может быть пустым</template>
          <template v-if="!$v.form_auth.user.minLength">Значение не должно быть менее 3-х символов</template>
        </div>
      </div>
      <div class="g-item-form">
        <label class="g-item-form__label">Пароль</label>
        <input type="password" class="g-item-form__input" v-model="form_auth.password" :class="{error: $v.form_auth.password.$error}" @blur="$v.form_auth.password.$touch()">
        <div class="input-valid-error" v-if="$v.form_auth.password.$error">
          <template v-if="!$v.form_auth.password.required">Поле не может быть пустым</template>
          <template v-if="!$v.form_auth.password.minLength">Значение должно быть не менее 6 символов</template>
        </div>
      </div>
      <button-app :disabled="$v.$invalid || btnLoading">
        Войти
      </button-app>
    </div>
    <div class="item-wrapper" v-else-if="pageName === 'forgot'">
      <div class="g-item-form">
        <label class="g-item-form__label">Email</label>
        <input type="text" class="g-item-form__input" v-model="form_forgot.email" :class="{error: $v.form_forgot.email.$error}" @blur="$v.form_forgot.email.$touch()">
        <div class="input-valid-error" v-if="$v.form_forgot.email.$error">
          <template v-if="!$v.form_forgot.email.required">Поле не может быть пустым</template>
          <template v-if="!$v.form_forgot.email.email">Некорректный Email</template>
        </div>
      </div>
      <button-app :disabled="$v.$invalid || btnLoading">
        Отправить
      </button-app>
<!--      <button class="g-btn" :disabled="$v.$invalid || btnLoading">-->
<!--        <span class="text">Отправить <icon-arrow-right class="g-icon"/></span>-->
<!--      </button>-->
    </div>

  </form>
</template>

<script>
import { email, minLength, required } from 'vuelidate/lib/validators'
import API from '../api/index'
import {mapState} from 'vuex'

export default {
  name: 'AuthRegForm',
  components: {
  },
  data() {
    return {
      btnLoading: false,
      errorResponse: {
        user_wrong: 'Пользователь не найден',
        recovery: 'Требуется восстановление доступа',
        password: 'Не верный пароль',
        banned: 'Пользователь забанен',
        email_wrong: 'Email не найден',
        email_used: 'Email уже зарегистрирован в системе'
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
      },
      form_forgot: {
        email: ''
      }
    }
  },
  validations() {
    if (this.pageName === 'registration') {
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
            minLength: minLength(6)
          }
        }
      }
    } else if (this.pageName === 'forgot') {
      return {
        form_forgot: {
          email: {
            required,
            email
          },
        }
      }
    }
  },
  computed: {
    pageName() {
      return this.$route.name
    },
    ...mapState('user', [
      'sponsor'
    ]),
  },
  methods: {
    onSubmit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.btnLoading = true
        if (this.pageName === 'registration') {
          API.access.request(this.form_reg).then(response => {
            this.btnLoading = false
            API.response.success('Вам отправлено письмо на почту')
          }).catch(error => {
            this.btnLoading = false
            API.response.error(this.errorResponse[error.response.data.reason])
          })
        } else if (this.pageName === 'auth') {
          this.btnLoading = false
          API.access.auth(this.form_auth).then(response => {
            this.$store.dispatch('user/login').then(response => {
              this.$router.push({ path: '/office/menu' })
            })
          }).catch(error => {
            API.response.error(this.errorResponse[error.response.data.reason])
          })
        } else {
          API.access.forgot(this.form_forgot).then(response => {
            this.btnLoading = false
            API.response.success('Вам отправлено письмо на почту')
          }).catch(error => {
            this.btnLoading = false
            API.response.error('Email не найден')
          })
        }
      }
    },
  },
  mounted() {
    this.form_reg.sponsor = this.sponsor
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .form {
    display: flex;
    justify-content: center;
    &.auth {
      .btn-app {
        .lg-block({
          margin-top: 35px;
        });
        .md-block({justify-self: center; margin-top: 0;});
      }
    }
    &.forgot {
      .btn-app {
        .lg-block({
          margin-top: 35px;
        });
      }
    }
    .item-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 500px;
      width: 100%;
      /*.row-flex();
      align-items: flex-start;
      flex-grow: 1;
      .md-block({
        flex-direction: column;
        align-items: center;
        align-self: stretch
      });*/
    }
    .g-item-form {
      /*.col();
      .size(6);
      .size-sm(11);
      .size-xs(12);*/
      width: 100%;
      box-sizing: border-box;
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
            border-color: @colorMain;
          }
        }
      }
    }
    .btn-app {
      margin-top: 30px;
      align-self: center;
      transition: background-color 0.3s;
      .sm-block({
        margin-top: 20px;});
    }
  }
</style>
