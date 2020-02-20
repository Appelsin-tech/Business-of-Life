import store from '../../store'

export default [
  {
    path: 'event-control',
    name: 'event-control',
    beforeEnter: checkEditors,
    component: () => import('@admin/event/AdminEventControl')
  },
  {
    path: 'event-create',
    name: 'event-create',
    beforeEnter: checkRole,
    component: () => import('@admin/event/AdminEventRelationEditing')
  },
  {
    path: 'event-editing/:id',
    name: 'event-editing',
    props: true,
    beforeEnter: checkEditors,
    component: () => import('@admin/event/AdminEventRelationEditing')
  },
  {
    path: 'relation/:event',
    name: 'relation-create',
    props: true,
    beforeEnter: checkRole,
    component: () => import('@admin/event/AdminRelationEditing')
  },
  {
    path: 'relation/:event/:id',
    name: 'relation-editing',
    props: true,
    beforeEnter: checkEditors,
    component: () => import('@admin/event/AdminRelationEditing')
  },
  {
    path: 'member/:ticket',
    name: 'member',
    props: true,
    beforeEnter: checkEditors,
    component: () => import('@admin/event/AdminMember')
  }
]

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
