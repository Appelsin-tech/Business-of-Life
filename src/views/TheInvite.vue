<template>
  <section class="p-invite p-default-block" :class="$route.name">
    <div class="container page">
      <div class="row-form">
        <h1 class="g-caption-inner">Получить билет</h1>
        <p class="desc">Если вы есть в списках на посещение мероприятия/вебинара, введите ваше Имя и ваш Email в поле ниже и нажмите отправить. Билет будет отправлен на ваш email.
          Если письмо не пришло - проверьте папку СПАМ.</p>
        <form @submit.prevent="onSubmit" class="form">
          <div class="g-item-form">
            <label class="g-item-form__label">Имя</label>
            <input type="text" class="g-item-form__input" v-model="form.name" :class="{error: $v.form.name.$error}" @blur="$v.form.name.$touch()">
            <div class="input-valid-error" v-if="$v.form.name.$error">
              <template v-if="!$v.form.name.required">Поле не может быть пустым</template>
              <template v-if="!$v.form.name.minLength">Значение не должно быть менее 3-х символов</template>
            </div>
          </div>
          <div class="g-item-form">
            <label class="g-item-form__label">Почта</label>
            <input type="email" class="g-item-form__input" v-model="form.email" :class="{error: $v.form.email.$error}" @blur="$v.form.email.$touch()">
            <div class="input-valid-error" v-if="$v.form.email.$error">
              <template v-if="!$v.form.email.required">Поле не может быть пустым</template>
              <template v-if="!$v.form.email.email">Некорректный Email</template>
            </div>
          </div>
          <button-app :disabled="$v.$invalid || btnLoading">
            Отправить
          </button-app>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { email, minLength, required } from 'vuelidate/lib/validators'
import API from '@/api/index'

export default {
  name: 'TheInvite',
  data() {
    return {
      errorResponse: {
        name_wrong: 'Пользователь не найден',
        recovery: 'Требуется восстановление доступа',
        password: 'Не верный пароль',
        banned: 'Пользователь забанен',
        email_wrong: 'Email не найден',
        email_used: 'Email уже зарегистрирован в системе'
      },
      btnLoading: false,
      pageAuth: false,
      form: {
        name: '',
        password: ''
      },
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      }
    }
  },
  methods: {
    onSubmit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.btnLoading = true
        API.tickets.take(this.form).then(response => {
          API.response.success('Письмо отправлено')
        }).catch(error => {
          this.btnLoading = false
          API.response.error('Приглашение отсутвует')
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .p-invite {
    display: flex;
    align-items: center;
    .g-caption-inner {
      text-align: center;
    }
    .desc {
      margin-bottom: 50px;
      max-width: 900px;
      text-align: center;
      font-size: 1.8rem;
      line-height: 1.3;
      .sm-block({
        margin-bottom: 30px;});
    }
  }
  .row-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 500px;
    width: 100%;
    .g-item-form {
      width: 100%;
    }
  }
</style>
