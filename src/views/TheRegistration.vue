<template>
  <section class="p-auth p-default p-default-inner">
    <div class="container page">
      <div class="row-caption">
        <div class="content">
          <span class="desc-light">База знаний</span>
          <h1 class="g-caption">Доступ к базе знаний</h1>
          <p class="desc desc--bold">Внимание! К этой части имеют доступ только партнеры компании Nayuta</p>
        </div>
      </div>
      <div class="row-form">
        <form @submit.prevent="onSubmit" class="form">
          <div class="item-wrapper">
            <div class="g-item-form">
              <label class="g-item-form__label" for="form-role-name">Ваше имя</label>
              <input type="text" class="g-item-form__input" v-model="form.name" :class="{error: $v.form.name.$error}" @blur="$v.form.name.$touch()">
              <div class="input-valid-error" v-if="$v.form.name.$error">
                <template v-if="!$v.form.name.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.name.minLength">Значение не должно быть менее 3-х символов</template>
              </div>
            </div>
            <div class="g-item-form">
              <label class="g-item-form__label" for="form-role-name">Почта</label>
              <input type="text" class="g-item-form__input" v-model="form.email" :class="{error: $v.form.email.$error}" @blur="$v.form.email.$touch()">
              <div class="input-valid-error" v-if="$v.form.email.$error">
                <template v-if="!$v.form.email.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.email.email">Некорректный Email</template>
              </div>
            </div>
            <div class="g-item-form">
              <label class="g-item-form__label" for="form-role-name">Имя пригласителя</label>
              <input type="text" class="g-item-form__input" v-model="form.sponsor" :class="{error: $v.form.sponsor.$error, readonly: $route.params.sponsor}" @blur="$v.form.sponsor.$touch()" :readonly="$route.params.sponsor">
              <div class="input-valid-error" v-if="$v.form.sponsor.$error">
                <template v-if="!$v.form.sponsor.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.sponsor.minLength">Значение должно быть не менее 3-х символов</template>
              </div>
            </div>
          </div>
          <button class="g-btn"  :disabled="$v.$invalid || btnSubmit">
            <span>
              Регистрация
              <img svg-inline class="svg-icon" src="../assets/img/icon/right-arrow.svg" alt="">
            </span>
          </button>

        </form>
        <p class="auth-info">
          <span>Уже есть акаунт?</span>
          <router-link to="/auth" class="link">Войти</router-link>
        </p>
      </div>

    </div>
  </section>
</template>

<script>
import { minLength, required, email } from 'vuelidate/lib/validators'
import API from '../api/index'

export default {
  name: 'TheRegistration',
  data() {
    return {
      errorResponse: {
        email_chars: 'Указан некорректный email',
        email_used: 'Email уже зарегистрирован в системе',
        name_empty: 'Не указано имя',
        lang_format: 'Некорректный язык',
        sponsor_wrong: 'Спонсор не найден'
      },
      pageAuth: false,
      form: {
        name: '',
        language: 'ru',
        email: '',
        sponsor: ''
      },
      btnSubmit: false
    }
  },
  validations: {
    form: {
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
  },
  computed: {

  },
  methods: {
    onSubmit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        API.access.request(this.form).then(response => {
          this.btnSubmit = true
          console.log(response)
          API.response.success('Вам отправлено письмо на почту')
        }).catch(error => {
          API.response.error(this.errorResponse[error.response.data.reason])
        })
      }
    },
  },
  mounted() {
    if (this.$route.params.sponsor) {
      this.form.sponsor = this.$route.params.sponsor
    }
  },
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .p-auth {
    background: url("../assets/img/bg-auth.jpg") no-repeat center / cover;
    .row-caption {
      position: relative;
      padding-top: 90px;
      padding-left: 90px;
      margin-bottom: 80px;
      .decor-cube(300px, 300px);
      .lg-block({ padding-top: 60px; padding-left: 60px; margin-bottom: 100px; .decor-cube(260px, 260px); });
      .sm-block({ margin-bottom: 90px; .decor-cube(220px, 220px); });
      .xs-block({ padding-left: 0; padding-top: 0; margin-bottom: 25px; .decor-cube(@display: none;); });
      .content {
        display: flex;
        flex-direction: column;
        .g-caption {
          margin-bottom: 20px;
        }
        .desc-light {
          font-size: 1.4rem;
          color: #666666;
          margin-bottom: 10px;
        }
        .desc {
          &--bold {
            max-width: 570px;
            font-weight: 800;
            font-size: 1.8rem;
            line-height: 2.5rem;
            .sm-block({ font-weight: 600; line-height: 2.2rem; font-size: 1.6rem; })
          }
        }
      }
    }
    .row-form {
      padding-left: 90px;
      .lg-block({ padding-left: 60px;});
      .md-block({ padding-left: 0;});
      .form {
        display: flex;
        flex-direction: column;
        .md-block({flex-direction: column; align-items: center;});
        .item-wrapper {
          .row-flex();
          align-items: flex-start;
          .md-block({ flex-direction: column; align-items: center; align-self: stretch;});
        }
        .g-item-form {
          .col();
          .size(6);
          .size-md(6);
          .size-sm(11);
          .size-xs(12);
          box-sizing: border-box;
          .md-block({margin-bottom: 30px; });
          .xs-block({ margin-bottom: 20px; });
          &__input {
            height: 78px;
            transition: 0.3s;
            .md-block({ padding-left: 18px; height: 65px;});
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
            &.readonly {
              &:hover,
              &:focus {
                background: #f3f3f3;
                border-color: #f3f3f3;
              }
            }
          }
        }
        .g-btn {
          height: 78px;
          padding-top: 0;
          padding-bottom: 0;
          margin-bottom: 30px;
          align-self: flex-start;
          .md-block({max-width: 250px;  height: 60px; align-self: center;});
        }
      }
    }
    .auth-info {
      font-size: 1.8rem;
      text-align: left;
      .md-block({text-align: center});
      span {
        margin-right: 16px;
      }
      .link {
        text-transform: uppercase;
        color: @colorMainRed;
        border-bottom: 1px solid @colorMainRed;
        transition: 0.3s;
        &:hover {
          border-bottom-color: transparent;
        }
      }
    }
  }
</style>
