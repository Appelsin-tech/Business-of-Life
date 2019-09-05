import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/main',
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
      path: '/statistic',
      name: 'statistic',
      component: () => import('./views/TheStatistic')
    },
    {
      path: '/event/:hash',
      name: 'event',
      component: () => import('./views/TheEvent')
    },
    {
      path: '*',
      redirect: '/main'
    }
  ]
})
