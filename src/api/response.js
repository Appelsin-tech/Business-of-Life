import Vue from 'vue'
import Notifications from 'vue-notification'

Vue.use(Notifications)
Vue.notify({
  duration: 4000
})
export default {
  error: (error) => {
    if (error.reason) {
      let errorMy = ''
      switch (error.reason) {
        case 'user_wrong':
          errorMy = 'Пользователь не найден'
          break
        case 'recovery':
          errorMy = 'Требуется восстановление доступа'
          break
        case 'password':
          errorMy = 'Не верный пароль'
          break
        case 'banned':
          errorMy = 'Пользователь забанен'
          break
      }
      Vue.notify({ type: 'error', title: 'Ошибка', text: errorMy })
    } else {
      console.error(error.message)
    }
  },
  success: (message) => {
    Vue.notify({ type: 'success', title: 'Успешно', text: message })
  }
}
