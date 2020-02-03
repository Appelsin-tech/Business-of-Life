import store from '../../store'

export default [
  {
    path: 'news-control',
    name: 'news-control',
    beforeEnter: checkRole,
    component: () => import('@admin/news/AdminNewsControl')
  },
  {
    path: 'news-create',
    name: 'news-create',
    beforeEnter: checkRole,
    component: () => import('@admin/news/AdminNewsEditing')
  },
  {
    path: 'news-editing/:id',
    name: 'news-editing',
    props: true,
    beforeEnter: checkRole,
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
