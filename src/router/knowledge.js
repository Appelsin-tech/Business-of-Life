import store from '../store'

export default [
  {
    path: '/knowledge',
    name: 'knowledge',
    redirect: '/knowledge/menu',
    beforeEnter: requireAuth,
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
        path: ':url/:id',
        name: 'knowledge-course',
        meta: {
          auth: true
        },
        component: () => import('@/components/knowledge/KnowledgeCourse')
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
