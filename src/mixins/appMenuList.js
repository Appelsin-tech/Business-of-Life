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
          icon: 'icon-home',
          status: 0
        },
        {
          to: '/admin/wallet',
          title: 'Кошелек',
          icon: 'icon-wallet',
          status: 0
        },
        {
          to: '/admin/partners-program',
          title: 'Партнерская программа',
          icon: 'icon-account-group',
          line: true,
          status: 0
        },
        {
          to: '/coronanamillion',
          title: 'Марафон "Корона на миллион"',
          icon: 'icon-trophy-variant',
          status: 0
        },
        {
          to: '/knowledge/menu',
          title: 'База знаний',
          icon: 'icon-puzzle',
          status: 0
        },
        {
          to: '/news',
          title: 'Новости',
          icon: 'icon-newspaper',
          status: 0
        },
        {
          to: '/calendar',
          title: 'Календарь мероприятий',
          icon: 'icon-calendar-month',
          line: true,
          status: 0
        },
        {
          to: '/admin/profile',
          title: 'Профиль',
          icon: 'icon-account',
          status: 0
        },
        {
          to: '/admin/news-control',
          title: 'Управление новостями',
          icon: 'icon-newspaper-plus',
          status: 3
        },
        {
          to: '/admin/event-control',
          title: 'Управление мероприятиями',
          icon: 'icon-calendar-edit',
          status: 1
        },
        {
          to: '/tickets',
          title: 'Проверка билетов',
          icon: 'icon-clipboard-check-outline',
          status: 0
        },
        {
          to: '/admin/course-control',
          title: 'Редактор курсов',
          icon: 'icon-book-plus',
          status: 3
        },
        {
          to: '/admin/role',
          title: 'Роли и управление доступом',
          icon: 'icon-account-star',
          line: true,
          status: 2
        },
        {
          to: '/admin/statistic',
          title: 'Статистика продаж',
          icon: 'icon-finance',
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
