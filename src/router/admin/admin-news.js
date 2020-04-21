import store from '../../store'

export default [
  {
    path: 'news-control',
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
    path: 'news-editing/:id',
    name: 'news-editing',
    beforeEnter: checkRole,
    meta: {
      breadcrumb: {
        parent: 'news-control',
        title: 'Редактирование новости'
      }
    },
    component: () => import('@admin/news/AdminNewsEditing')
  }
]

function checkRole (to, from, next) {
  if (store.getters['user/status'] < 2) {
    next('/admin/menu')
  } else {
    next()
  }
}
