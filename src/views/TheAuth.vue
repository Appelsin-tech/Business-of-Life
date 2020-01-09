<template>
  <section class="p-auth p-default p-default-inner" :class="$route.name">
    <div class="container page">
      <div class="row-caption">
        <div class="content">
          <span class="desc-light">База знаний</span>
          <h1 class="g-caption">Доступ к базе знаний</h1>
          <p class="desc desc--bold">Внимание! К этой части имеют доступ только партнеры компании Nayuta</p>
        </div>
      </div>
      <div class="row-form">
        <auth-reg-form/>
        <div class="auth-info-wrapper">
          <p class="auth-info">
            <span v-if="pageAuth">Еще нет акаунта?</span>
            <span v-else>Уже есть акаунт?</span>
            <router-link :to="routePath" class="link">
              <template v-if="!pageAuth">Войти</template>
              <template v-else>Регистрация</template>
            </router-link>
          </p>
          <p class="auth-info" v-if="pageAuth">
            <span>Забыли пароль?</span>
            <router-link to="/forgot" class="link">Восстановление доступа</router-link>
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'
import API from '../api/index'
import AuthRegForm from '../components/AuthRegForm'

export default {
  name: 'TheAuth',
  components: {AuthRegForm},
  data() {
    return {
      pageAuth: false,
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
  computed: {
    routePath() {
      if(this.pageAuth) {
        return '/registration'
      } else {
        return '/auth'
      }
    }
  },
  methods: {
  },
  mounted() {
    if (this.$route.name === 'auth') {
      this.pageAuth = true
    } else {
      this.pageAuth = false
    }
  },
  watch: {
    '$route' (to, from) {
      if (this.$route.name === 'auth') {
        this.pageAuth = true
      } else {
        this.pageAuth = false
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .p-auth {
    background: url("../assets/img/bg-auth.jpg") no-repeat center / cover;
    min-height: 1150px;
    .md-block({min-height: 1170px;});
    .xs-block({min-height: 100vh;});
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
          color: @colorSecondFonts;
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
    .auth-info-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr 280px;
      grid-column-gap: 20px;
      padding-left: 90px;
      .lg-block({padding-left: 60px;});
      .md-block({grid-template-columns: 1fr; grid-row-gap: 20px; padding-left: 0;});
      .auth-info {
        font-size: 1.8rem;
        text-align: left;
        .md-block({text-align: center});
        span {
          margin-right: 16px;
        }
        .link {
          text-transform: uppercase;
          color: @colorMain;
          border-bottom: 1px solid @colorMain;
          transition: 0.3s;
          &:hover {
            border-bottom-color: transparent;
          }
        }
      }
    }
  }
</style>
