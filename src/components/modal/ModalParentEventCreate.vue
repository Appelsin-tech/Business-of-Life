<template>
  <modal name='modal-parent-event-create' transition="pop-out" height="auto" width="100%" :maxWidth="1170" :maxHeight="680"
         :adaptive="true"
         :scrollable="true" :classes="'custom-modals'">
    <div class="modal modal__parent-event-create">
      <div class="close-modal" @click="$modal.hide('modal-parent-event-create')" title="Закрыть">
        <div class="close-modal__wrapper">
          <span class="close-modal__line"></span>
          <span class="close-modal__line"></span>
        </div>
      </div>
      <div class="modal__container">
        <h3 class="title">Создать мероприятие</h3>
        <form class="form-modal" @submit.prevent="onSubmit">
          <div class="form-modal__wrapper">
            <div class="form-modal__item form-modal__item--col-12">
              <label class="form-modal__label" for="form-title">Название</label>
              <input class="form-modal__input" id="form-title" :class="{error: $v.form.title.$error}" type="text" placeholder="Тренинг Искусство продаж " v-model="form.title" @blur="$v.form.title.$touch()">
              <div class="input-valid-error" v-if="$v.form.title.$error">
                <template v-if="!$v.form.title.required">Поле не может быть пустым</template>
                <template v-else-if="!$v.form.title.minLength">Название не должно быть меньше 10 символов</template>
              </div>
            </div>
            <div class="form-modal__item form-modal__item--col-12">
              <label class="form-modal__label" for="form-snippet">Краткое описание</label>
              <input class="form-modal__input" id="form-snippet" :class="{error: $v.form.snippet.$error}" type="text" placeholder="Краткое описание " v-model="form.snippet" @blur="$v.form.snippet.$touch()">
              <div class="input-valid-error" v-if="$v.form.snippet.$error">
                <template v-if="!$v.form.snippet.required">Поле не может быть пустым</template>
                <template v-else-if="!$v.form.snippet.minLength">Название не должно быть меньше 10 символов</template>
              </div>
            </div>
            <div class="form-modal__item textarea form-modal__item--col-12">
              <label class="form-modal__label" for="form-description">Полное описание</label>
              <textarea-resize>
                <textarea class="form-modal__input form-modal__input--textarea" rows="1" id="form-description" :class="{error: $v.form.description.$error}" type="text" placeholder="Полное и подробное описание мероприятия " v-model="form.description" @blur="$v.form.description.$touch()"></textarea>

              </textarea-resize>
              <div class="input-valid-error" v-if="$v.form.description.$error">
                <template v-if="!$v.form.description.required">Поле не может быть пустым</template>
                <template v-else-if="!$v.form.description.minLength">Название не должно быть меньше 10 символов
                </template>
              </div>
            </div>
            <div class="form-modal__item form-modal__item--col-12">
              <label class="form-modal__label" for="form-audience">Описание целевой аудитории</label>
              <input class="form-modal__input" id="form-audience" :class="{error: $v.form.audience.$error}" type="text" placeholder="Тренинг Искусство продаж" v-model="form.audience" @blur="$v.form.audience.$touch()">
              <div class="input-valid-error" v-if="$v.form.audience.$error">
                <template v-if="!$v.form.audience.required">Поле не может быть пустым</template>
                <template v-else-if="!$v.form.audience.minLength">Название не должно быть меньше 10 символов</template>
              </div>
            </div>
          </div>
          <div class="btn-wrapper">
            <button type="submit" class="g-btn g-btn--no-icon" :disabled="$v.$invalid">
              <span>Создать</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </modal>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'
import API from '../../api/index'
import TextareaResize from '../textareaResize'

export default {
  name: 'ModalParentEventCreate',
  components: {TextareaResize},
  data() {
    return {
      name: '',
      form: {
        title: '',
        snippet: '',
        description: '',
        audience: ''
      }
    }
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(10)
      },
      snippet: {
        required,
        minLength: minLength(10)
      },
      description: {
        required,
        minLength: minLength(10)
      },
      audience: {
        required,
        minLength: minLength(10)
      },
    }
  },
  methods: {
    onSubmit() {
      API.events.create(this.form).then(response => {
        console.log(response)
        this.$store.dispatch('user/getMyParentEvents')
        this.$modal.hide('modal-parent-event-create')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
