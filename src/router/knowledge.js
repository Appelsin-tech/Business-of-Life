import store from '../store'

export default [
  {
    path: '/knowledge/menu',
    name: 'knowledge-menu',
    beforeEnter: requireAuth,
    meta: {
      auth: true
    },
    component: () => import('@/components/knowledge/KnowledgeMenu')
  },
  {
    path: '/knowledge/:url/',
    name: 'knowledge-course',
    beforeEnter: requireAuth,
    props: true,
    meta: {
      auth: true
    },
    component: () => import('@/components/knowledge/KnowledgeCourse')
  },
  {
    path: '/knowledge/:url/:id',
    name: 'knowledge-lesson',
    beforeEnter: requireAuth,
    props: true,
    meta: {
      auth: true
    },
    component: () => import('@/components/knowledge/KnowledgeLesson')
  }
]

async function requireAuth (to, from, next) {
  if (store.getters['user/logged']) {
    next()
  } else {
    await store.dispatch('user/login')
    if (store.getters['user/logged']) {
      next()
    } else {
      next('auth')
    }
  }
}

async function requireAuthAccess(to, from, next) {
  await store.dispatch('user/login')

  if (store.getters['user/logged']) {
    if (store.getters['user/accessKnowledge'].exp) {
      next('404')
    } else {
      next()
    }
  } else {
    next('404')
  }
}
