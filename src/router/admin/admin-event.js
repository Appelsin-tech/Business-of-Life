import store from '../../store'

export default [
  {
    path: 'event-control',
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
    path: 'event-create',
    name: 'event-create',
    beforeEnter: checkRole,
    meta: {
      breadcrumb: {
        parent: 'event-control',
        title: 'Редактирование мероприятия'
      }
    },
    component: () => import('@admin/event/AdminEventRelationEditing')
  },
  {
    path: 'event-editing/:id',
    name: 'event-editing',
    props: true,
    beforeEnter: checkEditors,
    meta: {
      breadcrumb: {
        parent: 'event-control',
        title: 'Редактирование мероприятиями'
      }
    },
    component: () => import('@admin/event/AdminEventRelationEditing')
  },
  {
    path: 'relation/:event',
    name: 'relation-create',
    props: true,
    beforeEnter: checkRole,
    meta: {
      breadcrumb: {
        parent: 'event-control',
        title: 'Редактирование события'
      }
    },
    component: () => import('@admin/event/AdminRelationEditing')
  },
  {
    path: 'relation/:event/:id',
    name: 'relation-editing',
    props: true,
    beforeEnter: checkEditors,
    meta: {
      breadcrumb: {
        parent: 'event-control',
        title: 'Редактирование события'
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
        parent: 'event-control',
        title: 'Список участников'
      }
    },
    component: () => import('@admin/event/AdminParticipant')
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
