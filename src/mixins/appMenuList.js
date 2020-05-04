import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      // 0-управление новостями
      // 1-управление курсами
      // 2-управление мероприятиями
      menuListUserLogged: [
        {
          to: '/office/menu',
          title: 'Главная',
          name: 'home',
          icon: 'icon-home',
          roles: 0
        },
        {
          to: '/office/wallet',
          title: 'Кошелек',
          name: 'wallet',
          icon: 'icon-wallet',
          roles: 0
        },
        {
          to: '/office/partners-program',
          title: 'Партнерская программа',
          name: 'partners-program',
          icon: 'icon-account-group',
          line: true,
          roles: 0
        },
        {
          to: 'https://coronanamillion.com/',
          title: 'Марафон "Корона на миллион"',
          name: 'coronanamillion',
          icon: 'icon-trophy-variant',
          roles: 0
        },
        {
          to: '/knowledge/menu',
          title: 'База знаний',
          name: 'knowledge-package',
          icon: 'icon-puzzle',
          roles: 0
        },
        {
          to: '/news',
          title: 'Новости',
          name: 'news',
          icon: 'icon-newspaper',
          roles: 0
        },
        {
          to: '/calendar',
          title: 'Календарь мероприятий',
          name: 'calendar',
          icon: 'icon-calendar-month',
          roles: 0
        },
        {
          to: '/office/profile',
          title: 'Профиль',
          name: 'profile',
          icon: 'icon-account',
          line: true,
          roles: 0
        },
        {
          to: '/office/news',
          title: 'Управление новостями',
          name: 'Редактор новостей',
          icon: 'icon-newspaper-plus',
          roles: 1
        },
        {
          to: '/office/events',
          title: 'Управление мероприятиями',
          name: 'event-control',
          icon: 'icon-calendar-edit',
          roles: 3
        },
        {
          to: '/tickets',
          title: 'Проверка билетов',
          name: 'tickets-page',
          icon: 'icon-clipboard-check-outline',
          roles: 0
        },
        {
          to: '/office/courses',
          title: 'Редактор курсов',
          name: 'course-control',
          icon: 'icon-book-plus',
          roles: 2
        },
        // {
        //   to: '/office/role',
        //   title: 'Роли и управление доступом',
        //   icon: 'icon-account-star',
        //   line: true,
        //   status: 2
        // },
        // {
        //   to: '/office/statistic',
        //   title: 'Статистика продаж',
        //   name: 'statistic',
        //   icon: 'icon-finance',
        //   roles: 0
        // },
      ]
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles',
      'statusDev',
      'relationEditors'
    ]),
    menuListFilterUserLogged() {
      return this.menuListUserLogged.filter(item => {
        if (this.roles.includes(item.roles) || item.roles === 0) {
          return item
        }
        if (this.relationEditors && item.title === 'Управление мероприятиями') {
          return item
        }
      })
    },
  },
}
