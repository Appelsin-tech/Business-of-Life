import store from '../store'
import adminEvent from './admin/admin-event'
import adminNews from './admin/admin-news'
import adminCourse from './admin/admin-course'

export default [
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/menu',
    beforeEnter: requireAuth,
    meta: {
      auth: true
    },
    component: () => import('@/views/TheAdmin'),
    children: [
      ...adminEvent,
      ...adminNews,
      ...adminCourse,
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/components/admin/AdminMenu'),
      },
      {
        path: 'statistic',
        name: 'statistic',
        beforeEnter: checkRole,
        component: () => import('@/components/admin/AdminStatistic')
      },
      {
        path: 'role',
        name: 'role',
        beforeEnter: checkRole,
        component: () => import('@/components/admin/AdminRole')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/components/admin/AdminProfile')
      },
      {
        path: 'wallet',
        name: 'wallet',
        component: () => import('@/components/admin/AdminWallet')
      },
      {
        path: 'partners-program',
        name: 'partners-program',
        component: () => import('@/components/admin/AdminPartnersProgram')
      },
    ]
  },
]

async function requireAuth (to, from, next) {
  await store.dispatch('user/login')

  if (!store.getters['user/logged']) {
    next('auth')
  } else {
    next()
  }
}

function checkRole (to, from, next) {
  if (store.getters['user/status'] < 2) {
    next('/admin/menu')
  } else {
    next()
  }
}

function checkEditors (to, from, next) {
  if (store.getters['user/status'] < 2) {
    if (store.getters['user/relationEditors']) {
      next()
    } else {
      next('/admin/menu')
    }
  } else {
    next()
  }
}
