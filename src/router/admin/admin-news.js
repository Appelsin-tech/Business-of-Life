import store from '../../store'

export default [
  {
    path: 'news-control',
    name: 'news-control',
    beforeEnter: checkRole,
    component: () => import('@admin/news/AdminNewsControl')
  },
  {
    path: 'news-editing/:id',
    name: 'news-editing',
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
