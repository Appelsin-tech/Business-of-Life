import store from '../../store'

export default [
  {
    path: 'news',
    name: 'news',
    redirect: 'news/control'
  },
  {
    path: 'news/control',
    name: 'news-control',
    beforeEnter: checkRole,
    meta: {
      breadcrumb: {
        parent: null,
        title: 'Управление новостями'
      }
    },
    component: () => import('@admin/news/AdminNewsControl')
  },
  {
    path: 'news/:id',
    name: 'news-editing',
    beforeEnter: checkRole,
    meta: {
      breadcrumb: {
        parent: 'news/control',
        title: 'Управление новостями'
      }
    },
    component: () => import('@admin/news/AdminNewsEditing')
  }
]

function checkRole (to, from, next) {
  if (store.getters['user/status'] < 2) {
    next('/office/menu')
  } else {
    next()
  }
}
