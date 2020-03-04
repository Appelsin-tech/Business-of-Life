<template>
  <section class="p-event-all-editing p-default-block">
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class="container page">
      <h1 class="g-caption-inner">Список участников</h1>
      <search page="member"/>
      <admin-member-filters/>
      <div class="print" id="printMe">
        <admin-member-item v-for="member in ticketMembers" :member="member" :key="member.id"></admin-member-item>
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
  methods: {
    print () {
      // Pass the element id here
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
</style>
