<template>
  <section class="p-auth p-default-block" :class="$route.name">
    <div class="container page">
      <div class="row-form">
        <h1 class="g-caption-inner">Войти</h1>
        <transition name="fade"  mode="out-in">
          <auth-reg-form/>
        </transition>

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
    display: flex;
    align-items: center;
    .g-caption-inner {
      text-align: center;
    }
    .auth-info-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 40px;
      .auth-info {
        margin-bottom: 15px;
        font-size: 1.8rem;
        text-align: center;
        .md-block({text-align: center});
        span {
          margin-right: 16px;
        }
        .link {
          font-weight: bold;
          color: var(--app_emphasis__color);
          transition: 0.3s;
          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
  }
</style>
