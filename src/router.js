import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('./views/TheHero')
    },
    {
      path: '/description',
      name: 'description',
      component: () => import('./views/TheDescription')
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
      component: () => import('./views/TheNews')
    },
    {
      path: '/photo-gallery',
      name: 'photo-gallery',
      component: () => import('./views/ThePhotoGallery')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('./views/TheAuth')
    },
    {
      path: '/calendar',
      name: 'calendar',
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
      path: '/admin',
      name: 'admin',
      redirect: '/admin/me',
      meta: {auth: true},
      component: () => import('./views/TheAdmin'),
      children: [
        {
          path: 'me',
          name: 'me',
          component: () => import('./components/components-admin/AdminMe')
        },
        {
          path: 'event-editing',
          name: 'event-editing',
          component: () => import('./components/components-admin/AdminEventEditing')
        },
        {
          path: 'event-all-editing/:hash',
          name: 'event-all-editing',
          component: () => import('./components/components-admin/AdminEventAllEditing')
        },
        {
          path: 'event-all-control',
          name: 'event-all-control',
          component: () => import('./components/components-admin/AdminEventAllControl')
        },
        {
          path: 'control-ticket/:hash',
          name: 'control-ticket',
          component: () => import('./components/components-admin/AdminControlTicket')
        },
        {
          path: 'statistic',
          name: 'statistic',
          component: () => import('./components/components-admin/AdminStatistic')
        },
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
