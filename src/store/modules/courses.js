import API from '@/api/index'

const state = () => ({
  coursesMy: null,
  courses: null
})

const getters = {
  isCourses: state => state.courses,
  isMyCourse: state => state.coursesMy,
  statusMyCourse: (state, getters) => idCourse => {
    if (getters.isMyCourse !== null && getters.isMyCourse.length > 0) {
      let el = state.coursesMy.find(item => item.id === idCourse)
      if (el !== undefined) {
        return el.status
      } else {
        return 0
      }
    } else {
      return null
    }
  }
}

const actions = {
  getMyCourses({ commit }) {
    return new Promise((resolve, reject) => {
      API.courses.courses.my().then(response => {
        commit('SET_MY_COURSES', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getCourses({ commit }) {
    return new Promise((resolve, reject) => {
      API.courses.courses.list().then(response => {
        commit('SET_COURSES', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

const mutations = {
  SET_MY_COURSES(state, courses) {
    state.coursesMy = courses
  },
  SET_COURSES(state, courses) {
    state.courses = courses
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
