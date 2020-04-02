import store from '../store'

export default [
  {
    path: '/knowledge/menu',
    name: 'knowledge-menu',
    beforeEnter: requireAccess,
    component: () => import('@/components/knowledge/KnowledgeMenu')
  },
  {
    path: '/knowledge/:url/',
    name: 'knowledge-course',
    beforeEnter: requireAccess,
    props: true,
    meta: {
      auth: true
    },
    component: () => import('@/components/knowledge/KnowledgeCourse')
  },
  {
    path: '/knowledge/:url/:id',
    name: 'knowledge-lesson',
    beforeEnter: requireAccess,
    props: true,
    meta: {
      auth: true
    },
    component: () => import('@/components/knowledge/KnowledgeLesson')
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
