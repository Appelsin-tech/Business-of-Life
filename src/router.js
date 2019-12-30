import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  routes: [
    {
      path: '/',
      name: 'main',
      meta: {
        navDots: true
      },
      component: () => import('./views/TheHero')
    },
    {
      path: '/r/:sponsor',
      name: 'main-r',
      meta: {
        navDots: true
      },
      component: () => import('./views/TheHero')
    },
    {
      path: '/description',
      name: 'description',
      meta: {
        navDots: true
      },
      component: () => import('./views/TheDescription')
    },
    {
      path: '/pricing',
      name: 'pricing',
      beforeEnter: requireAuth,
      meta: {
        auth: true,
        navDots: true
      },
      component: () => import('./views/ThePricing')
    },
    {
      path: '/learning-stages',
      name: 'learning-stages',
      component: () => import('./views/TheLearningStages')
    },
    {
      path: '/our-coach',
      name: 'our-coach',
      component: () => import('./views/TheOurCoach')
    },
    {
      path: '/news',
      name: 'news',
      meta: {
        navDots: true
      },
      component: () => import('./views/TheNews')
    },
    {
      path: '/news/:id',
      name: 'news-full',
      meta: {
        navDots: true
      },
      component: () => import('./views/TheNewsFull')
    },
    {
      path: '/photo-gallery',
      name: 'photo-gallery',
      meta: {
        navDots: true
      },
      component: () => import('./views/ThePhotoGallery')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('./views/TheAuth')
    },
    {
      path: '/forgot',
      name: 'forgot',
      meta: {
        navDots: true
      },
      component: () => import('./views/TheAuth')
    },
    {
      path: '/registration',
      name: 'registration',
      meta: {
        navDots: true
      },
      component: () => import('./views/TheAuth')
    },
    {
      path: '/reg-completion/:key',
      name: 'reg-completion',
      component: () => import('./views/TheRegCompletion')
    },
    {
      path: '/recovery/:key',
      name: 'recovery',
      component: () => import('./views/TheRegCompletion')
    },
    {
      path: '/calendar',
      name: 'calendar',
      meta: {
        navDots: true
      },
      component: () => import('./views/TheCalendar')
    },
    {
      path: '/event/:hash',
      name: 'event',
      component: () => import('./views/TheEvent')
    },
    {
      path: '/my-ticket/:hash',
      name: 'my-ticket',
      component: () => import('./views/TheMyTicket')
    },
    {
      path: '/tickets',
      name: 'tickets-page',
      component: () => import('./views/TheCheckTicket'),
      children: [
        {
          path: ':id',
          name: 'tickets',
          component: () => import('./views/TheCheckTicket'),
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/me',
      beforeEnter: requireAuth,
      meta: {
        auth: true
      },
      component: () => import('./views/TheAdmin'),
      children: [
        {
          path: 'me',
          name: 'me',
          component: () => import('./components/components-admin/AdminMe'),
        },
        {
          path: 'event-create',
          name: 'event-create',
          component: () => import('./components/components-admin/AdminEventRelationsEditing'),
        },
        {
          path: 'event-control',
          name: 'event-control',
          component: () => import('./components/components-admin/AdminEventControl')
        },
        {
          path: 'event-editing/:id',
          name: 'event-editing',
          props: true,
          component: () => import('./components/components-admin/AdminEventRelationsEditing'),
        },
        {
          path: 'editing/:id/:event',
          name: 'editing',
          props: true,
          component: () => import('./components/components-admin/AdminRelationEditing'),
        },
        {
          path: 'statistic',
          name: 'statistic',
          component: () => import('./components/components-admin/AdminStatistic')
        },
        {
          path: 'role',
          name: 'role',
          component: () => import('./components/components-admin/AdminRole')
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('./components/components-admin/AdminProfile')
        }
      ]
    },
    {
      path: '/payment_policy',
      name: 'payment_policy',
      component: () => import('./views/ThePaymentPolicy')
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
export default router
