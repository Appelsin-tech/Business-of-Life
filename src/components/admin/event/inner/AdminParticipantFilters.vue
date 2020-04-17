<template>
  <div>
<!--    <h2 class="g-caption-section">Расширенный поиск</h2>-->
    <div class="grid">
<!--      <div class="item mb-30">-->
<!--        <span class="g-item-form__label">Дата регистрации</span>-->
<!--        <div class="input-wrapper">-->
<!--          <flat-pickr class="g-item-form__input"-->
<!--                      placeholder="От"-->
<!--                      :config="configs.start"-->
<!--                      v-model="dateStart"-->
<!--                      @on-change="onStartChange">-->
<!--          </flat-pickr>-->
<!--          <flat-pickr class="g-item-form__input"-->
<!--                      placeholder="До"-->
<!--                      :config="configs.end"-->
<!--                      v-model="dateEnd"-->
<!--                      @on-change="onEndChange">-->
<!--          </flat-pickr>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="item mb-30">-->
<!--        <span class="g-item-form__label">Какой по счету семинар</span>-->
<!--        <div class="input-wrapper">-->
<!--          <input class="g-item-form__input" v-mask="'########'" placeholder="От" type="text">-->
<!--          <input class="g-item-form__input" v-mask="'########'" placeholder="До" type="text">-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="item mb-30">-->
<!--        <span class="g-item-form__label">Сколько человек пригласил</span>-->
<!--        <div class="input-wrapper">-->
<!--          <input class="g-item-form__input" v-mask="'########'" placeholder="От" type="text">-->
<!--          <input class="g-item-form__input" v-mask="'########'" placeholder="До" type="text">-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="item mb-30">-->
<!--        <span class="g-item-form__label">Статус</span>-->
<!--        <div class="select-wrapper taggable">-->
<!--          <v-select @input="editorsMethods" :options="['Canada','United States', 'asdasdasdasd']" multiple :closeOnSelect="false" v-model="status" label="login" class="v-select__filter filter">-->
<!--            &lt;!&ndash;            <template #search="{attributes, events}">&ndash;&gt;-->
<!--            &lt;!&ndash;              <input&ndash;&gt;-->
<!--            &lt;!&ndash;                class="vs__search"&ndash;&gt;-->
<!--            &lt;!&ndash;                v-bind="attributes"&ndash;&gt;-->
<!--            &lt;!&ndash;                v-on=""&ndash;&gt;-->
<!--            &lt;!&ndash;                :required="false"&ndash;&gt;-->
<!--            &lt;!&ndash;              />&ndash;&gt;-->
<!--            &lt;!&ndash;            </template>&ndash;&gt;-->
<!--          </v-select>-->
<!--        </div>-->

<!--      </div>-->
<!--      <div class="item mb-30">-->
<!--        <span class="g-item-form__label">Квалификация</span>-->
<!--        <div class="select-wrapper taggable">-->
<!--          <v-select @input="editorsMethods" :options="['Canada','United States', 'asdasdasdasd']" multiple :closeOnSelect="false" v-model="qual" label="login" class="v-select__filter filter"></v-select>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="item mb-30">-->
<!--        <span class="g-item-form__label">В чьей структуре состоит</span>-->
<!--        <div class="select-wrapper taggable">-->
<!--          <v-select @input="editorsMethods" :options="['Canada','United States', 'asdasdasdasd']" multiple :closeOnSelect="false" v-model="structure" label="login" class="v-select__filter filter"></v-select>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="item mb-30">-->
<!--        <span class="g-item-form__label">Спонсор</span>-->
<!--        <div class="select-wrapper taggable">-->
<!--          <v-select @input="editorsMethods" :options="['Canada','United States', 'asdasdasdasd']" multiple :closeOnSelect="false" v-model="sponsor" label="login" class="v-select__filter filter"></v-select>-->
<!--        </div>-->
<!--      </div>-->
      <div class="item mb-30">
        <span class="g-item-form__label">Скрытые параметры</span>
        <div class="select-wrapper taggable">
          <v-select @input="setHideParams" :options="filters.hideParams"  :reduce="item => item.id" multiple :closeOnSelect="false" v-model="hideParams" label="name" class="v-select__filter filter"></v-select>
        </div>
      </div>
      <div class="item item--btn mb-30">
        <button class="g-btn g-btn--no-icon" @click="clearFilters">
          <span class="text">Очистить</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import 'flatpickr/dist/flatpickr.css'

export default {
  name: 'AdminParticipantFilters',
  props: ['filters'],
  components: {
    flatPickr
  },
  data() {
    return {
      qual: [],
      status: [],
      structure: [],
      sponsor: [],
      dateStart: null,
      dateEnd: null,
      hideParams: [],
      configs: {
        start: {
          minDate: null,
          maxDate: null,
          locale: Russian
        },
        end: {
          minDate: null,
          locale: Russian
        }
      }
    }
  },
  computed: {
    // showParams () {
    //   return this.filters.showParams
    // }
  },
  methods: {
    blur() {
    },
    setHideParams () {
      this.$emit('filters-emit', {id: 'hide-params', val: this.hideParams})
    },
    editorsMethods(val) {
      // if (this.editors.length > val.length) {
      //   let userId = null
      //   this.editors.forEach(item => {
      //     if (val.indexOf(item) === -1) {
      //       userId = item.id
      //     }
      //   })
      // API.editors.remove({ relation: this.relation, user_id: userId}).then(response => {
      //   this.$emit('update-access')
      //   API.response.success('Редактор удален')
      // }).catch(error => {
      //   console.log(error)
      // })
      // } else {
      // API.editors.add({ relation: this.relation, user: val[val.length - 1] }).then(response => {
      //   this.$emit('update-access')
      //   API.response.success('Редактор добавлен')
      // }).catch(error => {
      //   this.user_editors.splice(-1, 1)
      //   if (error.response.reason) {
      //     API.response.error(this.error[error.response.reason])
      //   } else {
      //     API.response.error(this.error['not_found'])
      //   }
      // })
      // }
    },
    clearFilters() {
      this.qual = []
      this.status = []
      this.structure = []
      this.sponsor = []
      this.dateStart = null
      this.dateEnd = null
      this.configs.start.maxDate = null
      this.configs.end.minDate = null
      this.hideParams = []
      this.$emit('filters-emit', {id: 'hide-params', val: []})
    },
    onStartChange(selectedDates, dateStr, instance) {
      this.$set(this.configs.end, 'minDate', dateStr)
    },
    onEndChange(selectedDates, dateStr, instance) {
      this.$set(this.configs.start, 'maxDate', dateStr)
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .grid {
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-column-gap: 20px;
    /*grid-template-columns: repeat(3, minmax(100px, 1fr));
    grid-column-gap: 20px;
    .md-block({
      grid-template-columns: repeat(2, minmax(100px, 1fr));
    });*/
    .sm-block({
      grid-template-columns: 1fr;
    });
    .item {
      .input-wrapper {
        display: flex;
        align-items: center;
        .g-item-form__input {
          &:first-child {
            margin-right: 15px;
          }
        }
      }
      .select-wrapper {
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        background: @colorBgGray;
        border: 1px solid #fff;
        box-sizing: border-box;
        min-height: 68px;
        .lg-block({
          min-height: 60px;
        });
        .xs-block({
          min-height: 40px;
        });
        &.taggable {
          padding: 0;
        }
        &.error {
          border: 1px solid @colorMain;
        }
      }
      &--btn {
        align-self: end;
      }
    }
  }
</style>
