<template>
  <div>
    <h2 class="g-caption-section">Доступы</h2>
    <div class="g-item-form">
      <label class="g-item-form__label">Контроль билетов</label>
      <div class="access-item__input taggable">
        <v-select @input="supervisorsMethods" ref="select" taggable multiple :closeOnSelect="false" v-model="user_supervisors" label="login" class="v-select__relation">
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
      <div class="access-item__input taggable">
        <v-select @input="editorsMethods" ref="select" taggable multiple :closeOnSelect="false" v-model="user_editors" label="login" class="v-select__relation">
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
  </div>
</template>

<script>
import API from '@/api/index'

export default {
  name: 'AdminRelationAccessSection',
  props: {
    relation: {
      required: true
    },
    supervisors: {
      required: true
    },
    editors: {
      required: true
    }
  },
  data() {
    return {
      user_editors: [],
      user_supervisors: [],
      error: {
        exist: 'Пользователь уже является проверяющим',
        not_found: 'Пользователь не найден'
      }
    }
  },
  methods: {
    supervisorsMethods(val) {
      if (this.supervisors.length > val.length) {
        let userId = null
        this.supervisors.forEach(item => {
          if (val.indexOf(item) === -1) {
            userId = item.id
          }
        })
        API.supervisors.remove({ relation: this.relation, user_id: userId}).then(response => {
          this.$emit('update-access')
          API.response.success('Проверяющий удален')
        }).catch(error => {
          console.log(error)
        })
      } else {
        API.supervisors.add({ relation: this.relation, user: val[val.length - 1] }).then(response => {
          this.$emit('update-access')
          API.response.success('Проверяющий добавлен')
        }).catch(error => {
          this.user_supervisors.splice(-1, 1)
          if (error.response.reason) {
            API.response.error(this.error[error.response.reason])
          } else {
            API.response.error(this.error['not_found'])
          }
        })
      }
    },
    editorsMethods(val) {
      if (this.editors.length > val.length) {
        let userId = null
        this.editors.forEach(item => {
          if (val.indexOf(item) === -1) {
            userId = item.id
          }
        })
        API.editors.remove({ relation: this.relation, user_id: userId}).then(response => {
          this.$emit('update-access')
          API.response.success('Редактор удален')
        }).catch(error => {
          console.log(error)
        })
      } else {
        API.editors.add({ relation: this.relation, user: val[val.length - 1] }).then(response => {
          this.$emit('update-access')
          API.response.success('Редактор добавлен')
        }).catch(error => {
          this.user_editors.splice(-1, 1)
          if (error.response.reason) {
            API.response.error(this.error[error.response.reason])
          } else {
            API.response.error(this.error['not_found'])
          }
        })
      }
    },
  },
  watch: {
    supervisors(newVal, oldVal) {
      this.user_supervisors = newVal
    },
    editors(newVal, oldVal) {
      this.user_editors = newVal
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";

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
      margin-top: 18px;
    });
  }
</style>
