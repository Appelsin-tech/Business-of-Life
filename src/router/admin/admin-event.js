import store from '../../store'

export default [
  {
    path: 'events',
    name: 'events',
    redirect: 'events/control'
  },
  {
    path: 'events/control',
    name: 'event-control',
    beforeEnter: checkEditors,
    meta: {
      breadcrumb: {
        parent: null,
        title: 'Управление мероприятиями'
      }
    },
    component: () => import('@admin/event/AdminEventControl')
  },
  {
    path: 'events/create',
    name: 'event-create',
    beforeEnter: checkRole,
    meta: {
      breadcrumb: {
        parent: 'events/control',
        title: 'Управление мероприятиями'
      }
    },
    component: () => import('@admin/event/AdminEventRelationEditing')
  },
  {
    path: 'events/:event',
    name: 'event-editing',
    props: true,
    beforeEnter: checkEditors,
    meta: {
      breadcrumb: {
        parent: 'events/control',
        title: 'Управление мероприятиями'
      }
    },
    component: () => import('@admin/event/AdminEventRelationEditing')
  },
  {
    path: 'events/:event/relation/create',
    name: 'relation-create',
    props: true,
    beforeEnter: checkRole,
    meta: {
      breadcrumb: {
        parent: 'events/control',
        title: 'Управление мероприятиями'
      }
    },
    component: () => import('@admin/event/AdminRelationEditing')
  },
  {
    path: 'events/:event/relation/:id',
    name: 'relation-editing',
    props: true,
    beforeEnter: checkEditors,
    meta: {
      breadcrumb: {
        parent: 'events/control',
        title: 'Управление мероприятиями'
      }
    },
    component: () => import('@admin/event/AdminRelationEditing')
  },
  {
    path: 'participant/:relation',
    name: 'participant',
    beforeEnter: checkEditors,
    meta: {
      breadcrumb: {
        parent: 'events/control',
        title: 'Управление мероприятиями'
      }
    },
    component: () => import('@admin/event/AdminParticipant')
  }
]

function checkRole (to, from, next) {
  if (store.getters['user/status'] < 2) {
    next('/office/menu')
  } else {
    next()
  }
}

function checkEditors (to, from, next) {
  if (store.getters['user/status'] < 2) {
    if (store.getters['user/relationEditors']) {
      next()
    } else {
      next('/office/menu')
    }
  } else {
    next()
  }
}
