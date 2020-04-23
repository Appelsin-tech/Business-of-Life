import store from '../../store'

export default [
  {
    path: 'courses',
    name: 'courses',
    redirect: 'courses/control'
  },
  {
    path: 'courses/control',
    name: 'course-control',
    beforeEnter: checkRole,
    meta: {
      breadcrumb: {
        parent: null,
        title: 'Редактор курсов'
      }
    },
    component: () => import('@admin/course/AdminCourseControl')
  },
  {
    path: 'courses/create',
    name: 'course-create',
    props: true,
    beforeEnter: checkRole,
    meta: {
      breadcrumb: {
        parent: 'courses/control',
        title: 'Редактор курсов'
      }
    },
    component: () => import('@admin/course/AdminCourseLessonEditing')
  },
  {
    path: 'courses/:course',
    name: 'course-editing',
    props: true,
    beforeEnter: checkRole,
    meta: {
      breadcrumb: {
        parent: 'courses/control',
        title: 'Редактор курсов'
      }
    },
    component: () => import('@admin/course/AdminCourseLessonEditing')
  },
  {
    path: 'courses/:course/lesson/create',
    name: 'lesson-create',
    props: true,
    beforeEnter: checkRole,
    meta: {
      breadcrumb: {
        parent: 'courses/control',
        title: 'Редактор курсов'
      }
    },
    component: () => import('@admin/course/AdminLessonEditing')
  },
  {
    path: 'courses/:course/lesson/:id',
    name: 'lesson-editing',
    props: true,
    beforeEnter: checkRole,
    meta: {
      breadcrumb: {
        parent: 'courses/control',
        title: 'Редактор курсов'
      }
    },
    component: () => import('@admin/course/AdminLessonEditing')
  }
]

function checkRole (to, from, next) {
  if (store.getters['user/status'] < 2) {
    next('/office/menu')
  } else {
    next()
  }
}

