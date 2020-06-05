<template>
  <div class="g-item-form">
    <label class="g-item-form__label">Спикеры</label>
    <div class="access-item__input taggable">
      <v-select @input="speakersMethods" ref="select" taggable multiple :closeOnSelect="false" v-model="userSpeakers" label="login" class="v-select__roles">
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
</template>

<script>
import API from '@/api/index'

export default {
  name: 'AdminRelationSpeakersSection',
  props: {
    speakers: {
      required: true
    },
    relation: {
      required: true
    }
  },
  data() {
    return {
      userSpeakers: [],
      error: {
        exist: 'Пользователь уже является спикером',
        not_found: 'Пользователь не найден'
      }
    }
  },
  methods: {
    speakersMethods(val) {
      if (this.speakers.length > val.length) {
        let userId = null
        this.speakers.forEach(item => {
          if (val.indexOf(item) === -1) {
            userId = item.id
          }
        })
        API.speakers.remove({ relation: this.relation, user_id: userId }).then(response => {
          this.$emit('update-speakers')
          API.response.success('Проверяющий удален')
        }).catch(error => {
          console.log(error)
        })
      } else {
        API.speakers.add({ relation: this.relation, user: val[val.length - 1] }).then(response => {
          this.$emit('update-speakers')
          API.response.success('Проверяющий добавлен')
        }).catch(error => {
          this.userSpeakers.splice(-1, 1)
          if (error.response.reason) {
            API.response.error(this.error[error.response.reason])
          } else {
            API.response.error(this.error['not_found'])
          }
        })
      }
    }
  },
  watch: {
    speakers(newVal, oldVal) {
      this.userSpeakers = newVal
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
  .btn-app {
    margin-top: 35px;
    .sm-block({
      margin-top: 18px;
    });
  }
</style>
