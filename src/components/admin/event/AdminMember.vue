<template>
  <section class="p-event-all-editing p-default-block">
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class="container page">
      <h1 class="g-caption-inner">Список участников</h1>
      <search page="member"/>
      <admin-member-filters/>
      <div class="print" id="printMe">
        <admin-member-item v-for="member in ticketMembers" :member="member" :key="member.id"></admin-member-item>
        <table class="table-members">
          <thead>
            <tr>
              <th v-for="item in fieldHeadTable" :key="item.id">{{item.field}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(member, index) in members" :key="index">
              <td v-for="item in member">{{item}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="g-btn g-btn--no-icon" @click="print">
        <span>Печать</span>
      </button>
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
import AdminMemberItem from '@admin/event/inner/AdminMemberItem'
import AdminMemberFilters from '@admin/event/inner/AdminMemberFilters'

const options = {
  name: '_blank',
  specs: ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
  styles: [
    '/css/print.css'
  ]
}

Vue.use(VueHtmlToPaper, options)

export default {
  name: 'AdminMember',
  props: ['ticket'],
  components: {
    BreadCrumbs,
    Search,
    AdminMemberItem,
    AdminMemberFilters
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
      listField: [
        {
          field: 'Имя',
          id: 'name'
        },
        {
          field: 'Email',
          id: 'email'
        },
        {
          field: 'Дата регистрации',
          id: 'reg'
        },
        {
          field: 'Какой по счеты семинар',
          id: 'seminar'
        },
        {
          field: 'Сколько человек пригласил',
          id: 'member_invit'
        },
        {
          field: 'Статус',
          id: 'status'
        },
        {
          field: 'Квалификация',
          id: 'qual'
        },
        {
          field: 'Структура',
          id: 'structure'
        },
        {
          field: 'Спонсор',
          id: 'sponsor'
        }
      ],
      ticketMembers: [
        {
          id: 1,
          name: 'Михаил Алиакберов',
          email: 'test@gmail.com',
          qual: '★★★★★★★★★',
          reg: '17.02.2020',
          ticket: 'Гость'
        },
        {
          id: 2,
          name: 'Иван Иванов',
          email: 'ivan@gmail.com',
          qual: '★★★★★',
          reg: '01.01.2020',
          ticket: 'Партнер'
        },
        {
          id: 3,
          name: 'Василий Васин',
          email: 'vas@gmail.com',
          qual: '★★★★★★★',
          reg: '29.02.2020',
          ticket: 'Гость'
        },
        {
          id: 4,
          name: 'Михаил Алиакберов',
          email: 'test@gmail.com',
          qual: '★★',
          reg: '17.02.2020',
          ticket: 'Гость'
        },
        {
          id: 5,
          name: 'Иван Иванов',
          email: 'ivan@gmail.com',
          qual: '★★★★★',
          reg: '01.01.2020',
          ticket: 'Партнер'
        }
      ]
    }
  },
  computed: {
    fieldHeadTable () {
      return this.listField
    },
    members () {
      // this.listField.forEach(item => {
      // })
      let newObj = [ ...this.ticketMembers ]
      newObj.forEach(member => {
        delete member.id
        this.listField.forEach(item => {
          if (member[item.id] === undefined) {
            member[item.id] = null
          }
        })
      })
      return newObj
    }
  },
  methods: {
    print () {
      this.$htmlToPaper('printMe')
    }
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
  }
</style>
