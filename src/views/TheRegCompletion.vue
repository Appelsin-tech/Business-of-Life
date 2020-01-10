<template>
  <section class="p-auth p-default p-default-inner">
    <bread-crumbs :arrCrumbs="[]"/>
    <div class="container page">
      <h1 class='g-caption-inner'>
        <template v-if="pageName === 'reg-completion'">Регистрация</template>
        <template v-else>Восстановление доступа</template>
      </h1>
      <p class="g-caption-section">
        <template v-if="pageName === 'reg-completion'">Заполните поля чтобы завершить регистрацию</template>
        <template v-else>Заполните поля чтобы восстановить доступ</template>
      </p>
      <div class="row-form">
        <form @submit.prevent="onSubmit" class="form" :class="pageName">
          <div class="item-wrapper" v-if="pageName === 'reg-completion'">
            <div class="g-item-form">
              <label class="g-item-form__label">Логин</label>
              <input type="text" class="g-item-form__input" v-model="form_reg.login" :class="{error: $v.form_reg.login.$error}" @blur="$v.form_reg.login.$touch()">
              <div class="input-valid-error" v-if="$v.form_reg.login.$error">
                <template v-if="!$v.form_reg.login.required">Поле не может быть пустым</template>
                <template v-if="!$v.form_reg.login.minLength">Значение не должно быть менее 3 символов</template>
              </div>
            </div>
            <div class="g-item-form">
              <label class="g-item-form__label">Имя</label>
              <input type="text" class="g-item-form__input" v-model="form_reg.fname" :class="{error: $v.form_reg.fname.$error}" @blur="$v.form_reg.fname.$touch()">
              <div class="input-valid-error" v-if="$v.form_reg.fname.$error">
                <template v-if="!$v.form_reg.fname.required">Поле не может быть пустым</template>
                <template v-if="!$v.form_reg.fname.minLength">Значение не должно быть менее 3 символов</template>
              </div>
            </div>
            <div class="g-item-form">
              <label class="g-item-form__label">Фамилия</label>
              <input type="text" class="g-item-form__input" v-model="form_reg.lname" :class="{error: $v.form_reg.lname.$error}" @blur="$v.form_reg.lname.$touch()">
              <div class="input-valid-error" v-if="$v.form_reg.lname.$error">
                <template v-if="!$v.form_reg.lname.required">Поле не может быть пустым</template>
                <template v-if="!$v.form_reg.lname.minLength">Значение не должно быть менее 3 символов</template>
              </div>
            </div>
            <div class="g-item-form">
              <label class="g-item-form__label">Пароль</label>
              <input type="password" class="g-item-form__input" v-model="form_reg.password" :class="{error: $v.form_reg.password.$error}" @blur="$v.form_reg.password.$touch()">
              <div class="input-valid-error" v-if="$v.form_reg.password.$error">
                <template v-if="!$v.form_reg.password.required">Поле не может быть пустым</template>
                <template v-if="!$v.form_reg.password.minLength">Значение должно быть не менее 6 символов</template>
              </div>
            </div>
            <div class="g-item-form">
              <label class="g-item-form__label">Подвердите пароль</label>
              <input type="password" class="g-item-form__input" v-model="form_reg.password_rep" :class="{error: $v.form_reg.password_rep.$error}" @blur="$v.form_reg.password_rep.$touch()">
              <div class="input-valid-error" v-if="$v.form_reg.password_rep.$error">
                <template v-if="!$v.form_reg.password_rep.required">Поле не может быть пустым</template>
                <template v-if="!$v.form_reg.password_rep.sameAs">Пароли не совпадают</template>
              </div>
            </div>
          </div>
          <div class="item-wrapper" v-else>
            <div class="g-item-form">
              <label class="g-item-form__label">Пароль</label>
              <input type="password" class="g-item-form__input" v-model="form_recovery.password" :class="{error: $v.form_recovery.password.$error}" @blur="$v.form_recovery.password.$touch()">
              <div class="input-valid-error" v-if="$v.form_recovery.password.$error">
                <template v-if="!$v.form_recovery.password.required">Поле не может быть пустым</template>
                <template v-if="!$v.form_recovery.password.minLength">Значение должно быть не менее 6 символов</template>
              </div>
            </div>
            <div class="g-item-form">
              <label class="g-item-form__label">Повторите пароль</label>
              <input type="password" class="g-item-form__input" v-model="form_recovery.password_rep" :class="{error: $v.form_recovery.password_rep.$error}" @blur="$v.form_recovery.password_rep.$touch()">
              <div class="input-valid-error" v-if="$v.form_recovery.password_rep.$error">
                <template v-if="!$v.form_recovery.password_rep.required">Поле не может быть пустым</template>
                <template v-if="!$v.form_recovery.password_rep.sameAs">Пароли не совпадают</template>
              </div>
            </div>
          </div>
          <button class="g-btn g-btn--no-icon" :disabled="$v.$invalid  || btnLoading">
            <span>Отправить</span>
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
const checkSpace = (value) => /^\S+$/.test(value)
export default {
  name: 'TheRegCompletion',
  components: {
    BreadCrumbs
  },
  data() {
    return {
      errorResponse: {
        login_length: 'Указан логин длиной менее 5 символов',
        login_chars: 'Логин содержит недопустимые символы',
        email_used: 'Email уже зарегистрирован в системе',
        login_used: 'Логин уже зарегистрирован в системе'
      },
      pageAuth: false,
      form_reg: {
        login: '',
        key: '',
        fname: '',
        lname: '',
        password: '',
        password_rep: ''
      },
      form_recovery: {
        key: '',
        password: '',
        password_rep: ''
      },
      btnLoading: false
    }
  },
  validations() {
    if (this.pageName === 'reg-completion') {
      return {
        form_reg: {
          login: {
            required,
            minLength: minLength(3)
          },
          fname: {
            required,
            minLength: minLength(3)
          },
          lname: {
            required,
            minLength: minLength(3)
          },
          key: {
            required
          },
          password: {
            required,
            minLength: minLength(6)
          },
          password_rep: {
            required,
            sameAs: sameAs('password')
          }
        }
      }
    } else {
      return {
        form_recovery: {
          key: {
            required
          },
          password: {
            required,
            minLength: minLength(6)
          },
          password_rep: {
            required,
            sameAs: sameAs('password')
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
        this.btnLoading = true
        if (this.pageName === 'reg-completion') {
          API.access.register({
            login: this.form_reg.login,
            key: this.form_reg.key,
            password: this.form_reg.password,
            fname: this.form_reg.fname,
            lname: this.form_reg.lname
          }).then(response => {
            this.btnLoading = true
            this.$router.push('/auth')
            API.response.success('Вы успешно зарегистрировались')
          }).catch(error => {
            this.btnLoading = false
            API.response.error(this.errorResponse[error.response.data.reason])
          })
        } else {
          API.access.recover({
            key: this.form_recovery.key,
            password: this.form_recovery.password
          }).then(response => {
            this.btnLoading = true
            this.$router.push('/auth')
            API.response.success('Пароль успешно изменен')
          }).catch(error => {
            this.btnLoading = false
            API.response.error(this.errorResponse[error.response.data.reason])
          })
        }
      }
    },
  },
  mounted() {
    if (this.$route.params.key) {
      if (this.$route.name === 'reg-completion') {
        this.form_reg.key = this.$route.params.key
      } else {
        this.form_recovery.key = this.$route.params.key
      }
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
        &.reg-completion {
          .item-wrapper {
            .g-item-form {
              &:nth-child(2) {
                grid-column: ~"1 / 2";
              }
            }
          }
        }
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
