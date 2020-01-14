<template>
  <form @submit="onSubmit">
    <h2 class="g-caption-section">Доступы</h2>
    <div class="g-item-form">
      <label class="g-item-form__label">Контроль билетов</label>
      <div class="access-item__input taggable" :class="{error: $v.form.name_ticket.$error}">
        <v-select ref="select" taggable multiple :closeOnSelect="false" :class="{error: $v.form.name_ticket.$error}" v-model="form.name_ticket" class="v-select__relation">
                  <span slot="no-options">
                    Введите имя
                  </span>
          <template #search="{attributes, events}">
            <input
              class="vs__search"
              v-bind="attributes"
              v-on="events"
              :required="false"
              @blur="$v.form.name_ticket.$touch()"
            />
          </template>
        </v-select>
      </div>
      <div class="input-valid-error" v-if="$v.form.name_ticket.$error">
        <template v-if="!$v.form.name_ticket.required">Поле не может быть пустым</template>
      </div>
    </div>
    <div class="g-item-form">
      <label class="g-item-form__label">Редактирование события</label>
      <div class="access-item__input taggable" :class="{error: $v.form.name_relations.$error}">
        <v-select ref="select" taggable multiple :closeOnSelect="false"  :class="{error: $v.form.name_relations.$error}" v-model="form.name_relations" class="v-select__relation">
                  <span slot="no-options">
                    Введите имя
                  </span>
          <template #search="{attributes, events}">
            <input
              class="vs__search"
              v-bind="attributes"
              v-on="events"
              :required="false"
              @blur="$v.form.name_relations.$touch()"
            />
          </template>
        </v-select>
      </div>
      <div class="input-valid-error" v-if="$v.form.name_relations.$error">
        <template v-if="!$v.form.name_relations.required">Поле не может быть пустым</template>
      </div>
    </div>
    <button class="g-btn g-btn--no-icon" :disabled="$v.$invalid">
      <span>Сохранить</span>
    </button>
  </form>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'AdminRelationEditingAccess',
  data() {
    return {
      form: {
        name_ticket: [],
        name_relations: []
      },
      errorSelect: {
        selectedTicket: false,
        selectedRelation: false
      }
    }
  },
  validations: {
    form: {
      name_ticket: {
        required
      },
      name_relations: {
        required
      }
    }
  },
  methods: {
    onSubmit () {
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/_importants";

  .access-item__input {
    padding-left: 25px;
    padding-right: 15px;
    width: 100%;
    height: 68px;
    background: @colorBgGray;
    border: 1px solid #fff;
    box-sizing: border-box;
    .lg-block({
      padding-left: 18px;
      height: 60px;
    });
    .xs-block({
      padding-left: 10px;
      height: 40px;
    });
    &.taggable {
      padding: 0;
      height: auto;
    }
    &.error {
      border: 1px solid @colorMain;
    }
  }
</style>
