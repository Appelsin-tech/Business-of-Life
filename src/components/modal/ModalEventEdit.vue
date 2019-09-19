<template>
  <modal name='modal-event-edit' transition="pop-out" height="auto" width="100%" :maxWidth="1170" :maxHeight="680"
         :adaptive="true"
         :scrollable="true" :classes="'custom-modals'">
    <div class="modal modal__event-edit">
      <div class="close-modal" @click="$modal.hide('modal-event-edit')" title="Закрыть">
        <div class="close-modal__wrapper">
          <span class="close-modal__line"></span>
          <span class="close-modal__line"></span>
        </div>
      </div>
      <div class="modal__container">
        <h3 class="title">Редактировать событие</h3>
        <form class="form-modal" @submit.prevent="onSubmit">
          <div class="form-modal__wrapper">
            <div class="form-modal__item">
              <label class="form-modal__label" for="form-title">Название</label>
              <input class="form-modal__input" id="form-title" :class="{error: $v.form.title.$error}" type="text" placeholder="Тренинг Искусство продаж " v-model="form.title" @blur="$v.form.title.$touch()">
              <div class="form-modal__error" v-if="$v.form.title.$error">
                <template v-if="!$v.form.title.required">Поле не может быть пустым</template>
                <template v-else-if="!$v.form.title.minLength">Логин не должен быть меньше 3-х символов</template>
              </div>
            </div>
            <div class="form-modal__item">
              <label class="form-modal__label" for="form-city">Город</label>
              <input class="form-modal__input" id="form-city" :class="{error: $v.form.city.$error}" placeholder="Москва" v-model="form.city" @blur="$v.form.city.$touch()">
              <div class="form-modal__error" v-if="$v.form.city.$error">
                <template v-if="!$v.form.city.required">Поле не может быть пустым</template>
                <template v-if="!$v.form.city.minLength">Пароль должен быть не менее 6 символов</template>
              </div>
            </div>
          </div>
          <div class="btn-wrapper">
            <button type="submit" class="g-btn g-btn--no-icon g-btn--white g-btn--border">
              <span>Сохранить</span>
            </button>
            <button type="submit" class="g-btn g-btn--no-icon" :disabled="$v.$invalid">
              <span>Опубликовать</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </modal>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'ModalEventEdit',
  data() {
    return {
      errorSelect: {
        selectedQualification: false,
        selectedPayment: false
      },
      showError: false,
      name: '',
      form: {
        title: 'Тренинг',
        city: 'Москва'
      }
    }
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(3)
      },
      city: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('as')
    }
  }
}
</script>

<style scoped>

</style>
