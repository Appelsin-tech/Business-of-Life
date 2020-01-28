<template>
  <form @submit="onSubmit">
    <h2 class="g-caption-section">Доступы</h2>
    <div class="g-item-form">
      <label class="g-item-form__label">Контроль билетов</label>
      <div class="access-item__input taggable">
        <v-select ref="select" taggable multiple :closeOnSelect="false" v-model="user_supervisors" class="v-select__relation"  @input="onSubmit">
                  <span slot="no-options">
                    Введите имя
                  </span>
          <template #search="{attributes, events}">
            <input
              class="vs__search"
              v-bind="attributes"
              v-on="events"
              :required="false"
            />
          </template>
        </v-select>
      </div>
    </div>
    <div class="g-item-form">
      <label class="g-item-form__label">Редактирование события</label>
      <div class="access-item__input taggable" >
        <v-select ref="select" taggable multiple :closeOnSelect="false" v-model="user_editors" class="v-select__relation">
                  <span slot="no-options">
                    Введите имя
                  </span>
          <template #search="{attributes, events}">
            <input
              class="vs__search"
              v-bind="attributes"
              v-on="events"
              :required="false"
            />
          </template>
        </v-select>
      </div>
    </div>
<!--    <button class="g-btn g-btn&#45;&#45;no-icon" :disabled="invalid">-->
<!--      <span>Сохранить</span>-->
<!--    </button>-->
  </form>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'AdminRelationEditingAccess',
  props: {
    relation: {
      required
    }
  },
  data() {
    return {
      invalid: true,
      user_supervisors: [],
      user_editors: []
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
    onSubmit (val) {
      console.log(val)
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../../assets/less/_importants";

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
  .g-btn {
    margin-top: 35px;
    .sm-block({
      margin-top: 18px;});
  }
</style>
