import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      // статус 0 для обычного пользователя
      // статус 1 для обычного пользователя, который является проверяющим
      // статус 2 для админа, показываются все, кроме разработки
      // статус 3 для разработки, показываются все
      menuListUserLogged: [
        {
          to: '/admin/menu',
          title: 'Главная',
          icon: ['fas', 'home'],
          status: 0
        },
        {
          to: '/admin/wallet',
          title: 'Кошелек',
          icon: ['fas', 'wallet'],
          status: 0
        },
        {
          to: '/admin/partners-program',
          title: 'Партнерская программа',
          icon: ['fas', 'user-friends'],
          line: true,
          status: 0
        },
        {
          to: '/coronanamillion',
          title: 'Марафон "Корона на миллион"',
          icon: ['fas', 'trophy'],
          status: 0
        },
        {
          to: '/knowledge/menu',
          title: 'База знаний',
          icon: ['fas', 'puzzle-piece'],
          status: 0
        },
        {
          to: '/news',
          title: 'Новости',
          icon: ['fas', 'newspaper'],
          status: 0
        },
        {
          to: '/calendar',
          title: 'Календарь мероприятий',
          icon: ['far', 'calendar-alt'],
          line: true,
          status: 0
        },
        {
          to: '/admin/profile',
          title: 'Профиль',
          icon: ['fas', 'user'],
          status: 0
        },
        {
          to: '/admin/news-control',
          title: 'Управление новостями',
          icon: ['fas', 'newspaper'],
          status: 3
        },
        {
          to: '/admin/event-control',
          title: 'Управление мероприятиями',
          icon: ['far', 'newspaper'],
          status: 1
        },
        {
          to: '/tickets',
          title: 'Проверка билетов',
          icon: ['far', 'check-square'],
          status: 0
        },
        {
          to: '/admin/course-control',
          title: 'Редактор курсов',
          icon: ['fas', 'book'],
          status: 3
        },
        {
          to: '/admin/role',
          title: 'Роли и управление доступом',
          icon: ['fas', 'star'],
          line: true,
          status: 2
        },
        {
          to: '/admin/statistic',
          title: 'Статистика продаж',
          icon: ['fas', 'signal'],
          status: 2
        },
      ]
    }
  },
  computed: {
    ...mapGetters('user', [
      'status',
      'statusDev',
      'relationEditors'
    ]),
    menuListFilterUserLogged() {
      if (this.statusDev) {
        return this.menuListUserLogged
      } else if (this.status === 2) {
        return this.menuListUserLogged.filter(item => item.status < 3)
      } else if (this.relationEditors) {
        return this.menuListUserLogged.filter(item => item.status < 2)
      } else if (this.status === 1) {
        return this.menuListUserLogged.filter(item => item.status < 1)
      }
    },
  },
}
