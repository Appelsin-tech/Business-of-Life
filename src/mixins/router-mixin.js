import { mapState } from 'vuex'
export const RouterMixin = {
  beforeCreate () {
    // асинхронный запрос на авторизацию пользователя
    this.$store.dispatch('user/login').then(() => {
      // регистрация глобального хука для объекта route
      this.$router.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.auth)) {
          if (!this.logged) {
            next({ path: '/' })
          } else {
            next()
          }
        } else {
          next()
        }
      })
      // console.log(this.$route.matched.some(record => record.meta.auth))
      if (this.$route.matched.some(record => record.meta.auth)) {
        if (!this.logged) {
          this.$router.push({ path: '/' })
        }
      }
    })
  },
  computed: {
    ...mapState('user', [
      'logged'
    ])
  },
  watch: {
    logged (newValue, oldValue) {
      if (!newValue && this.$route.matched.some(record => record.meta.auth)) {
        this.$router.push({ path: '/' })
      }
    }
  }
}
