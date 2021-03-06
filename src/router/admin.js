import store from '../store'
import adminEvent from './admin/admin-event'
import adminNews from './admin/admin-news'
import adminCourse from './admin/admin-course'

export default [
  ...adminEvent,
  ...adminNews,
  ...adminCourse,
  {
    path: 'menu',
    name: 'menu',
    meta: {
      breadcrumb: {
        parent: null,
        title: 'Главная'
      }
    },
    component: () => import('@/components/admin/AdminMenu'),
  },
  {
    path: 'statistic',
    name: 'statistic',
    beforeEnter: checkAdmin,
    meta: {
      breadcrumb: {
        parent: null,
        title: 'Статистика'
      }
    },
    component: () => import('@/components/admin/AdminStatistic')
  },
  {
    path: 'role',
    name: 'role',
    beforeEnter: checkAdmin,
    meta: {
      breadcrumb: {
        parent: null,
        title: 'Роли и доступы'
      }
    },
    component: () => import('@/components/admin/AdminRole')
  },
  {
    path: 'profile',
    name: 'profile',
    meta: {
      breadcrumb: {
        parent: null,
        title: 'Профиль'
      }
    },
    component: () => import('@/components/admin/AdminProfile')
  },
  {
    path: 'wallet',
    name: 'wallet',
    meta: {
      breadcrumb: {
        parent: null,
        title: 'Кошелек'
      }
    },
    component: () => import('@/components/admin/AdminWallet')
  },
  {
    path: 'partners-program',
    name: 'partners-program',
    meta: {
      breadcrumb: {
        parent: null,
        title: 'Партнерская программа'
      }
    },
    component: () => import('@/components/admin/AdminPartnersProgram')
  },
  {
    path: 'materials',
    name: 'materials',
    meta: {
      breadcrumb: {
        parent: null,
        title: 'Материалы'
      }
    },
    component: () => import('@/components/admin/AdminMaterials')
  }
]

function checkAdmin (to, from, next) {
  if (store.getters['user/status'] < 2) {
    next('/office/menu')
  } else {
    next()
  }
}
