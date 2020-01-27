import store from '../store'

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
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/components/admin/AdminMenu'),
      },
      {
        path: 'event-create',
        name: 'event-create',
        beforeEnter: checkRole,
        component: () => import('@/components/admin/AdminEventRelationEditing'),
      },
      {
        path: 'event-control',
        name: 'event-control',
        beforeEnter: checkRole,
        component: () => import('@/components/admin/AdminEventControl')
      },
      {
        path: 'event-editing/:id',
        name: 'event-editing',
        props: true,
        beforeEnter: checkRole,
        component: () => import('@/components/admin/AdminEventRelationEditing'),
      },
      {
        path: 'relation/:event',
        name: 'relation-create',
        props: true,
        beforeEnter: checkRole,
        component: () => import('@/components/admin/AdminRelationEditing'),
      },
      {
        path: 'relation/:event/:id',
        name: 'relation-editing',
        props: true,
        beforeEnter: checkRole,
        component: () => import('@/components/admin/AdminRelationEditing'),
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
      {
        path: 'news-control',
        name: 'news-control',
        component: () => import('@/components/admin/AdminNewsControl')
      },
      {
        path: 'news-create',
        name: 'news-create',
        component: () => import('@/components/admin/AdminNewsEditing')
      },
      {
        path: 'news-editing/:id',
        name: 'news-editing',
        props: true,
        component: () => import('@/components/admin/AdminNewsEditing')
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
