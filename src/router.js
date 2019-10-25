import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
      path: '/description',
      name: 'description',
      meta: {
        navDots: true
      },
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
          component: () => import('./views/TheCheckTicket')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/me',
      meta: { auth: true },
      component: () => import('./views/TheAdmin'),
      children: [
        {
          path: 'me',
          name: 'me',
          component: () => import('./components/components-admin/AdminMe'),
          meta: {
            breadCrumbs: {
              title: 'Личный кабинет',
              parent: []
            }
          }
        },
        {
          path: 'event-create',
          name: 'event-create',
          meta: {
            breadCrumbs: {
              title: 'Создание мероприятия',
              parent: [
                {
                  title: 'Личный кабинет',
                  path: '/admin/me'
                },
                {
                  title: 'Управление мероприятиями',
                  path: '/admin/event-control'
                }
              ]
            }
          },
          component: () => import('./components/components-admin/AdminEventRelationsEditing'),
        },
        {
          path: 'event-control',
          name: 'event-control',
          meta: {
            breadCrumbs: {
              title: 'Управление мероприятиями',
              parent: [
                {
                  title: 'Личный кабинет',
                  path: '/admin/me'
                }
              ]
            }
          },
          component: () => import('./components/components-admin/AdminEventControl')
        },
        {
          path: 'event-editing/:id',
          name: 'event-editing',
          props: true,
          meta: {
            breadCrumbs: {
              title: 'Редактирование мероприятия',
              parent: [
                {
                  title: 'Личный кабинет',
                  path: '/admin/me'
                },
                {
                  title: 'Управление мероприятиями',
                  path: '/admin/event-control'
                }
              ]
            }
          },
          component: () => import('./components/components-admin/AdminEventRelationsEditing'),
        },
        {
          path: 'editing/:id/:event',
          name: 'editing',
          props: true,
          meta: {
            breadCrumbs: {
              title: 'Редактирование события',
              parent: [
                {
                  title: 'Личный кабинет',
                  path: '/admin/me'
                },
                {
                  title: 'Управление мероприятиями',
                  path: '/admin/event-control'
                },
                {
                  title: 'Редактирование мероприятия',
                  path: '/admin/event-editing'
                }
              ]
            },
          },
          component: () => import('./components/components-admin/AdminRelationEditing'),
        },
        {
          path: 'control-ticket/:hash',
          name: 'control-ticket',
          meta: {
            breadCrumbs: {
              title: 'Проверка билета',
              parent: [
                {
                  title: 'Личный кабинет',
                  path: '/admin/me'
                }
              ]
            }
          },
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
