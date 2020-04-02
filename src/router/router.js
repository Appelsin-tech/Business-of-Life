import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

import admin from './admin'
import knowledge from './knowledge'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  routes: [
    {
      path: '',
      name: 'default',
      redirect: '/',
      component: () => import('@/layout/default'),
      children: [
        {
          path: '/',
          name: 'main',
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
          path: '/knowledge-package',
          name: 'knowledge-package',
          beforeEnter: requireAuth,
          meta: {
            auth: true,
            navDots: true
          },
          component: () => import('@/views/TheKnowledgePackage')
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
          component: () => import('@/views/TheNews')
        },
        {
          path: '/news/:url',
          name: 'news-full',
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
          path: '/event/:url',
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
        ...knowledge,
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/menu',
      beforeEnter: requireAuth,
      meta: {
        auth: true
      },
      component: () => import('@/layout/admin'),
      children: [
        ...admin
      ]
    },

    {
      path: '/404',
      name: '404',
      component: () => import('@/views/The404')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

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
async function requireAuthKnowledge (to, from, next) {
  if (store.getters['user/logged']) {
    next()
  } else {
    await store.dispatch('user/login')
    if (store.getters['user/logged']) {
      if (store.getters['user/access'].knowledge.status === 2 || store.getters['user/access'].knowledge.status === 3) {
        next('/knowledge')
      } else {
        next()
      }
    } else {
      next('auth')
    }
  }
}
export default router
