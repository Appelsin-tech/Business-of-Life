import store from '../store'

export default [
  {
    path: '/knowledge',
    name: 'knowledge',
    redirect: '/knowledge/menu',
    beforeEnter: requireAccess,
    meta: {
      auth: true
    },
    component: () => import('@/views/TheKnowledge'),
    children: [
      {
        path: 'menu',
        name: 'knowledge-menu',
        component: () => import('@/components/knowledge/KnowledgeMenu')
      },
      {
        path: ':url/',
        name: 'knowledge-course',
        props: true,
        meta: {
          auth: true
        },
        component: () => import('@/components/knowledge/KnowledgeCourse')
      },
      {
        path: ':url/:id',
        name: 'knowledge-lesson',
        props: true,
        meta: {
          auth: true
        },
        component: () => import('@/components/knowledge/KnowledgeLesson')
      }
    ]
  }
]

async function requireAuth(to, from, next) {
  await store.dispatch('user/login')

  if (!store.getters['user/statusDev']) {
    next('auth')
  } else {
    next()
  }
}

async function requireAccess(to, from, next) {
  await store.dispatch('user/login')

  if (store.getters['user/logged']) {
    if (!store.getters['user/access'].exp) {
      next('404')
    } else {
      next()
    }
  } else {
    next('404')
  }
}
