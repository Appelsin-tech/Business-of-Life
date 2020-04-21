import store from '../../store'

export default [
  {
    path: 'course-control',
    name: 'course-control',
    beforeEnter: checkRole,
    meta: {
      breadcrumb: {
        parent: null,
        title: 'Управление курсами'
      }
    },
    component: () => import('@admin/course/AdminCourseControl')
  },
  {
    path: 'course-create',
    name: 'course-create',
    props: true,
    beforeEnter: checkRole,
    meta: {
      breadcrumb: {
        parent: 'course-control',
        title: 'Редактирование курса'
      }
    },
    component: () => import('@admin/course/AdminCourseLessonEditing')
  },
  {
    path: 'course-editing/:id',
    name: 'course-editing',
    props: true,
    beforeEnter: checkRole,
    meta: {
      breadcrumb: {
        parent: 'course-control',
        title: 'Редактирование курса'
      }
    },
    component: () => import('@admin/course/AdminCourseLessonEditing')
  },
  {
    path: 'lesson/:course',
    name: 'lesson-create',
    props: true,
    beforeEnter: checkRole,
    meta: {
      breadcrumb: {
        parent: 'course-editing',
        title: 'Редактирование урока'
      }
    },
    component: () => import('@admin/course/AdminLessonEditing')
  },
  {
    path: 'lesson/:course/:id',
    name: 'lesson-editing',
    props: true,
    beforeEnter: checkRole,
    meta: {
      breadcrumb: {
        parent: 'course-editing',
        title: 'Редактирование урока'
      }
    },
    component: () => import('@admin/course/AdminLessonEditing')
  }
]

function checkRole (to, from, next) {
  if (store.getters['user/status'] < 2) {
    next('/admin/menu')
  } else {
    next()
  }
}

