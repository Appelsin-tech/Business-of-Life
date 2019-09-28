<template>
  <section class="p-auth p-default">
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
          <div class="item-form">
            <input type="text" class="item-form__input" v-model="form.user" :class="{error: $v.form.user.$error}" @blur="$v.form.user.$touch()">
            <div class="input-valid-error" v-if="$v.form.user.$error">
              <template v-if="!$v.form.user.required">Поле не может быть пустым</template>
              <template v-if="!$v.form.user.minLength">Значение не должно быть менее 3-х символов</template>
            </div>
          </div>
          <div class="item-form">
            <input type="password" class="item-form__input" v-model="form.password" :class="{error: $v.form.password.$error}" @blur="$v.form.password.$touch()">
            <div class="input-valid-error" v-if="$v.form.password.$error">
              <template v-if="!$v.form.password.required">Поле не может быть пустым</template>
              <template v-if="!$v.form.password.minLength">Значение должно быть не менее 5 символов</template>
            </div>
          </div>
          <button class="g-btn"  :disabled="$v.$invalid">
            <span>
              Войти
              <img svg-inline class="svg-icon" src="../assets/img/icon/right-arrow.svg" alt="">
            </span>
          </button>
        </form>
      </div>

    </div>
  </section>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'
import API from '../api/index'
import responseApi from '../api/response'

export default {
  name: 'TheAuth',
  data() {
    return {
      errorResponse: {
        user_wrong: 'Пользователь не найден',
        recovery: 'Требуется восстановление доступа',
        password: 'Не верный пароль',
        banned: 'Пользователь забанен'
      },
      form: {
        user: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      user: {
        required,
        minLength: minLength(3)
      },
      password: {
        required,
        minLength: minLength(5)
      }
    }
  },
  methods: {
    onSubmit() {
      API.access.auth(this.form).then(response => {
        this.$store.dispatch('user/login').then(response => {
          this.$router.push({path :'/admin/me'})
        })
      }).catch(error => {
        responseApi.error(this.errorResponse[error.response.data.reason])
      })
    },
  }
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
        .row-flex();
        align-items: flex-start;
        .md-block({ flex-direction: column; align-items: center;});
        .item-form {
          .col();
          .size(4.5);
          .size-md(6);
          .size-sm(8);
          .size-xs(11);
          box-sizing: border-box;
          .md-block({margin-bottom: 30px; });
          .xs-block({ margin-bottom: 20px; });
          &__input {
            padding-left: 25px;
            width: 100%;
            height: 78px;
            background: rgba(214,214,214, 0.3);
            box-sizing: border-box;
            transition: 0.3s;
            border: 1px solid transparent;
            .md-block({ padding-left: 18px; height: 65px;});
            .xs-block({ padding-left: 10px; height: 40px;});
            &:hover,
            &:focus {
              background: #fff;
              border-color: #000;
            }
            &.error {
              border-color: @colorError;
            }
          }
        }
        .g-btn {
          .col();
          .size(3);
          .size-md(4);
          .size-sm(5);
          min-width: auto;
          height: 78px;
          padding-top: 0;
          padding-bottom: 0;
          .md-block({max-width: 250px;  height: 60px;});
          .xs-block({ width: 100%; });
        }
      }
    }
  }
</style>
