<template>
  <section class="p-event-all-editing p-default-block">
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class="container page">
      <h1 class="g-caption-inner">Список участников</h1>
      <search page="member"/>
      <div class="content" v-for="item in ticketMembers" :key="item.title">
        <h2 class="g-caption-section">{{item.title}}</h2>
        <admin-member-item v-for="member in item.members" :member="member" :key="member.email"></admin-member-item>
      </div>
    </div>
  </section>
</template>

<script>
import API from '@/api/index'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import { mapState, mapGetters } from 'vuex'
import Search from '@/components/Search'
import AdminMemberItem from '@admin/event/inner/AdminMemberItem'

export default {
  name: 'AdminMember',
  props: ['ticket'],
  components: {
    BreadCrumbs,
    Search,
    AdminMemberItem
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
          title: 'Гость',
          members: [
            {
              name: 'Михаил Алиакберов',
              email: 'test@gmail.com',
              qual: '★★★★★★★★★',
              reg: '17.02.2020'
            },
            {
              name: 'Иван Иванов',
              email: 'ivan@gmail.com',
              qual: '★★★★★',
              reg: '01.01.2020'
            },
            {
              name: 'Василий Васин',
              email: 'vas@gmail.com',
              qual: '★★★★★★★',
              reg: '29.02.2020'
            }
          ]
        },
        {
          title: 'Партнер',
          members: [
            {
              name: 'Михаил Алиакберов',
              email: 'test@gmail.com',
              qual: '★★',
              reg: '17.02.2020'
            },
            {
              name: 'Иван Иванов',
              email: 'ivan@gmail.com',
              qual: '★★★★★',
              reg: '01.01.2020'
            },
          ]
        }
      ]
    }
  },
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .content {
    margin-bottom: 30px;
  }
</style>
