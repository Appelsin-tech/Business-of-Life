<template>
  <section class="p-event-all-editing p-default-block">
    <preloader v-if="loading"/>
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class="container page">
      <h1 class="g-caption-inner">Список участников</h1>
<!--      <search page="member" :idEvent="$route.params.relation"/>-->
      <div class="wrapper-show" v-if="!loading && response.participants.length > 0">
        <admin-participant-filters :filters="filters" v-on:filters-emit="filtersEmit"/>
        <div class="print" id="printMe" >
          <table class="table-members">
            <thead>
            <tr>
              <th v-for="item in fieldsArr" :key="item.id" v-show="item.show">{{item.name}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="member in members" :key="member.numeration">
              <td v-for="item in fieldsArr" :key="item.id" v-show="item.show">{{member[item.id]}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <button class="g-btn g-btn--no-icon" @click="print">
          <span>Печать</span>
        </button>
      </div>
      <panel-info v-if="!loading && response.participants.length === 0">Нет проданных билетов</panel-info>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import VueHtmlToPaper from 'vue-html-to-paper'
import API from '@/api/index'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import { mapState, mapGetters } from 'vuex'
import Search from '@/components/Search'
import AdminParticipantItem from '@admin/event/inner/AdminParticipantItem'
import AdminParticipantFilters from '@admin/event/inner/AdminParticipantFilters'
import Preloader from '@/components/ui/Preloader'
import response from '@/api/response'
import PanelInfo from '@/components/ui/PanelInfo'

const options = {
  name: '_blank',
  specs: ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
  styles: [
    '/css/print.css'
  ]
}

Vue.use(VueHtmlToPaper, options)

export default {
  name: 'AdminParticipant',
  components: {
    BreadCrumbs,
    Search,
    AdminParticipantItem,
    AdminParticipantFilters,
    Preloader,
    PanelInfo
  },
  data() {
    return {
      breadCrumbs: [
        {
          path: '/admin/menu',
          title: 'Личный кабинет'
        },
        {
          path: '/admin/event-control',
          title: 'Управление мероприятиями'
        }
      ],
      loading: true,
      fieldsArr: [],
      response: null,
      test: {
        fields: [
          {
            id: 1,
            name: 'Имя',
            type: 'string'
          },
          {
            id: 2,
            name: 'Почта',
            type: 'string'
          },
          {
            id: 3,
            name: 'Телефон',
            type: 'string'
          },
          {
            id: 4,
            name: 'Дата регистрации в компании',
            type: 'date'
          },
          {
            id: 5,
            name: 'Статус',
            type: 'string'
          },
          {
            id: 6,
            name: 'Квалификация',
            type: 'dropdown'
          },
          {
            id: 7,
            name: 'Какой по счету семинар',
            type: 'int'
          },
          {
            id: 8,
            name: 'Сколько человек пригласил',
            type: 'int'
          },
          {
            id: 9,
            name: 'В чьей структуре состоит',
            type: 'string'
          },
          {
            id: 10,
            name: 'Спонсор',
            type: 'string'
          }
        ],
        participants: [
          {
            ticket: 'T-0AQDN3999WJS33FFDSF',
            title: 'Партнер',
            status: 1,
            registered: '2020-01-01 16:01:34',
            receipt: {
              currency: 'USD',
              amount: '100.00'
            },
            fields: [
              {
                id: 2,
                value: 'mrpelkin@gmail.com'
              },
              {
                id: 3,
                value: '7777777777777777'
              },
              {
                id: 4,
                value: 1569664800000
              },
              {
                id: 5,
                value: 'Top Key Person'
              },
              {
                id: 6,
                value: '★★★★★★★★★'
              },
              {
                id: 7,
                value: 16
              },
              {
                id: 8,
                value: 10
              },
              {
                id: 9,
                value: 'Pelkin'
              },
              {
                id: 10,
                value: 'MikeAliakberov'
              }
            ]
          },
          {
            ticket: 'T-0000000000000000',
            title: 'Гость',
            status: 1,
            registered: '2020-01-26 16:01:34',
            receipt: {
              currency: 'USD',
              amount: '15.00'
            },
            fields: [
              {
                id: 1,
                value: 'Mikhail'
              },
              {
                id: 2,
                value: 'mrpelkin@gmail.com'
              },
              {
                id: 3,
                value: '+777023165465151'
              },
              {
                id: 6,
                value: '★★★★'
              }
            ]
          },
          {
            ticket: 'T-999999999999999',
            title: 'Партнер',
            status: 1,
            registered: '2020-02-01 16:01:34',
            receipt: {
              currency: 'USD',
              amount: '100.00'
            },
            fields: [
              {
                id: 1,
                value: 'Pavel Durov'
              },
              {
                id: 2,
                value: 'mrpelkin@gmail.com'
              },
              {
                id: 3,
                value: '+0000000000000'
              },
              {
                id: 4,
                value: 1569664800000
              },
              {
                id: 9,
                value: 'bbbbb'
              },
              {
                id: 6,
                value: '★★★★★★'
              },
              {
                id: 10,
                value: 'Sasha'
              }
            ]
          }
        ]
      }
    }
  },
  computed: {
    members() {
      let arrParticipant = []

      this.response.participants.forEach((part, i) => {
        let objParticipant = {}
        objParticipant.ticket = part.title
        objParticipant.numeration = i + 1
        this.response.fields.forEach(i => {
          let u = part.fields.find(item => item.id === i.id)
          objParticipant[i.id] = u ? u.value : null
          if (i.id === 4 && objParticipant[i.id] !== null) {
            objParticipant[i.id] = this.$moment(objParticipant[i.id]).format('D.MM.YYYY')
          }
        })
        arrParticipant.push(objParticipant)
      })
      return arrParticipant
    },
    filters() {
      return { hideParams: this.fieldsArr }
    },
  },
  methods: {
    print() {
      this.$htmlToPaper('printMe')
    },
    filtersEmit(e) {
      switch (e.id) {
        case 'hide-params':
          this.filterHideParams(e.val)
          break
      }
    },
    filterHideParams(val) {
      if (val.length > 0) {

        val.forEach(item => {
          this.fieldsArr.forEach((field, i) => {
            if (item === field.id) {
              field.show = false
              this.$set(this.fieldsArr, i, field)
            } else {
              let fIn = val.find(f => f === field.id)
              if (!fIn) {
                field.show = true
                this.$set(this.fieldsArr, i, field)
              }
            }
          })
        })
      } else {
        this.fieldsArr.forEach((field, i) => {
          field.show = true
          this.$set(this.fieldsArr, i, field)
        })
      }
    },
    setFields() {
      this.fieldsArr.forEach((item, i) => {
        item.show = true
      })
      this.fieldsArr.splice(1, 0, {
        name: 'Билет',
        id: 'ticket',
        show: true
      })
      this.fieldsArr.unshift({
        name: '№',
        id: 'numeration',
        show: true
      })
    }
  },
  mounted() {
    API.search.participants({ id: this.$route.params.relation, search: '' }).then(response => {
      // this.response = this.test
      // this.fieldsArr = [...this.test.fields]
      this.response = response.data
      this.fieldsArr = [...response.data.fields]
      this.setFields()
      this.loading = false
    }).catch(e => console.log(e))
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .print {
    margin-bottom: 30px;
  }
  .table-members {
    width: 100%;
    th {
      padding: 10px 5px;
      text-align: center;
    }
    th,
    td {
      border: 1px solid @colorBorder;
    }
    td {
      padding: 5px;
    }
  }
</style>
