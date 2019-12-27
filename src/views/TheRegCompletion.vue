<template>
  <section class="p-auth p-default p-default-inner">
    <bread-crumbs :arrCrumbs="[]"/>
    <div class="container page">
      <h1 class='g-caption g-caption-inner'>Регистрация</h1>
      <p class="g-caption g-caption-section">Заполните поля чтобы завершить регистрацию</p>
      <div class="row-form">
        <form @submit.prevent="onSubmit" class="form">
          <div class="item-wrapper">
            <div class="g-item-form">
              <label class="g-item-form__label" for="form-role-name">Логин</label>
              <input type="text" class="g-item-form__input" v-model="form.login" :class="{error: $v.form.login.$error}" @blur="$v.form.login.$touch()">
              <div class="input-valid-error" v-if="$v.form.login.$error">
                <template v-if="!$v.form.login.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.login.minLength">Значение не должно быть менее 3-х символов</template>
                <template v-if="!$v.form.login.checkSpace">Логин содержит недопустимые символы</template>
              </div>
            </div>
            <!--            <div class="g-item-form">-->
            <!--              <label class="g-item-form__label" for="form-role-name">Имя</label>-->
            <!--              <input type="text" class="g-item-form__input" v-model="form.login" :class="{error: $v.form.login.$error}" @blur="$v.form.login.$touch()">-->
            <!--              <div class="input-valid-error" v-if="$v.form.login.$error">-->
            <!--                <template v-if="!$v.form.login.required">Поле не может быть пустым</template>-->
            <!--                <template v-if="!$v.form.login.minLength">Значение должно быть не менее 3-х символов</template>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--            <div class="g-item-form">-->
            <!--              <label class="g-item-form__label" for="form-role-name">Фамилия</label>-->
            <!--              <input type="text" class="g-item-form__input" v-model="form.email" :class="{error: $v.form.email.$error}" @blur="$v.form.email.$touch()">-->
            <!--              <div class="input-valid-error" v-if="$v.form.email.$error">-->
            <!--                <template v-if="!$v.form.email.required">Поле не может быть пустым</template>-->
            <!--                <template v-if="!$v.form.email.email">Некорректный Email</template>-->
            <!--              </div>-->
            <!--            </div>-->
            <div class="g-item-form">
              <label class="g-item-form__label" for="form-role-name">Пароль</label>
              <input type="password" class="g-item-form__input" v-model="form.password" :class="{error: $v.form.password.$error}" @blur="$v.form.password.$touch()">
              <div class="input-valid-error" v-if="$v.form.password.$error">
                <template v-if="!$v.form.password.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.password.minLength">Значение должно быть не менее 3-х символов</template>
              </div>
            </div>
            <div class="g-item-form">
              <label class="g-item-form__label" for="form-role-name">Подвердите пароль</label>
              <input type="password" class="g-item-form__input" v-model="form.password_rep" :class="{error: $v.form.password_rep.$error}" @blur="$v.form.password_rep.$touch()">
              <div class="input-valid-error" v-if="$v.form.password_rep.$error">
                <template v-if="!$v.form.password_rep.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.password_rep.sameAs">Пароли не совпадают</template>
              </div>
            </div>
          </div>
          <button class="g-btn g-btn--no-icon" :disabled="$v.$invalid  || btnSubmit">
            <span>
              Отправить
            </span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '../components/BreadCrumbs'
import { minLength, required, sameAs } from 'vuelidate/lib/validators'
import API from '../api/index'

export default {
  name: 'TheRegCompletion',
  components: {
    BreadCrumbs
  },
  data() {
    return {
      errorResponse: {
        login_length: 'Указан логин длиной менее 3-х символов',
        login_chars: 'Логин содержит недопустимые символы',
        email_used: 'Email уже зарегистрирован в системе',
        login_used: 'Логин уже зарегистрирован в системе'
      },
      pageAuth: false,
      form: {
        login: '',
        key: '',
        password: '',
        password_rep: ''
      },
      btnSubmit: false
    }
  },
  validations: {
    form: {
      login: {
        required,
        minLength: minLength(3),
        checkSpace (login) {
          return /^\S+$/.test(login)
        }
      },
      key: {
        required
      },
      password: {
        required,
        minLength: minLength(3)
      },
      password_rep: {
        required,
        sameAs: sameAs('password')
      }
    }
  },
  computed: {},
  methods: {
    onSubmit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        API.access.register({
          login: this.form.login,
          key: this.form.key,
          password: this.form.password
        }).then(response => {
          this.btnSubmit = true
          this.$router.push('/auth')
          API.response.success('Вы успешно зарегистрировались')
        }).catch(error => {
          API.response.error(this.errorResponse[error.response.data.reason])
        })
      }

    },
  },
  mounted() {
    if (this.$route.params.key) {
      this.form.key = this.$route.params.key
    }
  },
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .p-auth {
    .row-form {
      .form {
        display: flex;
        flex-direction: column;
        .md-block({
          flex-direction: column;
          align-items: center;
        });
        .item-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: 100px;
          .lg-block({
            grid-column-gap: 50px;
          });
          .md-block({
            grid-column-gap: 0;
            grid-template-columns: 1fr;
          });
        }
        .g-item-form {
          box-sizing: border-box;
          .md-block({
            margin-bottom: 30px;
          });
          .xs-block({
            margin-bottom: 20px;
          });
          &:first-child {
          }
          &:nth-child(2) {
            grid-column: ~"1 / 2";
          }
        }
        .g-btn {
          margin-bottom: 30px;
          align-self: flex-start;
          .md-block({
            max-width: 250px;
            align-self: center;
          });
        }
      }
    }
  }
</style>
