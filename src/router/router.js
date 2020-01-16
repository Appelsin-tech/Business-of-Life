import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

import admin from './admin'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  routes: [
    ...admin,
    {
      path: '/',
      name: 'main',
      meta: {
        navDots: true
      },
      component: () => import('@/views/TheHero')
    },
    {
      path: '/r/:sponsor',
      name: 'main-r',
      meta: {
        navDots: true
      },
      component: () => import('@/views/TheHero')
    },
    {
      path: '/description',
      name: 'description',
      meta: {
        navDots: true
      },
      component: () => import('@/views/TheDescription')
    },
    {
      path: '/knowledge',
      name: 'knowledge',
      beforeEnter: requireAuth,
      meta: {
        auth: true,
        navDots: true
      },
      component: () => import('@/views/TheKnowledge')
    },
    {
      path: '/knowledge-access',
      name: 'knowledge-access',
      beforeEnter: requireAuthKnowledge,
      meta: {
        auth: true,
        navDots: true
      },
      component: () => import('@/views/TheKnowledgeAccess')
    },
    {
      path: '/learning-stages',
      name: 'learning-stages',
      component: () => import('@/views/TheLearningStages')
    },
    {
      path: '/our-coach',
      name: 'our-coach',
      component: () => import('@/views/TheOurCoach')
    },
    {
      path: '/news',
      name: 'news',
      beforeEnter: requireAuth,
      meta: {
        navDots: true
      },
      component: () => import('@/views/TheNews')
    },
    {
      path: '/news/:id',
      name: 'news-full',
      beforeEnter: requireAuth,
      meta: {
        navDots: true
      },
      component: () => import('@/views/TheNewsFull')
    },
    {
      path: '/photo-gallery',
      name: 'photo-gallery',
      meta: {
        navDots: true
      },
      component: () => import('@/views/ThePhotoGallery')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/TheAuth')
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: () => import('@/views/TheAuth')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@/views/TheAuth')
    },
    {
      path: '/reg-completion/:key',
      name: 'reg-completion',
      component: () => import('@/views/TheRegCompletion')
    },
    {
      path: '/recovery/:key',
      name: 'recovery',
      component: () => import('@/views/TheRegCompletion')
    },
    {
      path: '/calendar',
      name: 'calendar',
      meta: {
        navDots: true
      },
      component: () => import('@/views/TheCalendar')
    },
    {
      path: '/event/:hash',
      name: 'event',
      component: () => import('@/views/TheEvent')
    },
    {
      path: '/my-ticket/:hash',
      name: 'my-ticket',
      component: () => import('@/views/TheMyTicket')
    },
    {
      path: '/tickets',
      name: 'tickets-page',
      component: () => import('@/views/TheCheckTicket'),
      children: [
        {
          path: ':id',
          name: 'tickets',
          component: () => import('@/views/TheCheckTicket'),
        }
      ]
    },
    {
      path: '/payment_policy',
      name: 'payment_policy',
      component: () => import('@/views/ThePaymentPolicy')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

async function requireAuth (to, from, next) {
  await store.dispatch('user/login')

  if (!store.getters['user/logged']) {
    next('auth')
  } else {
    next()
  }
}
async function requireAuthKnowledge (to, from, next) {
  await store.dispatch('user/login')

  if (!store.getters['user/logged']) {
    next('auth')
  } else {
    if (store.getters['user/access'].knowledge.status === 2 || store.getters['user/access'].knowledge.status === 3) {
      next('/knowledge')
    } else {
      next()
    }
  }
}
export default router
