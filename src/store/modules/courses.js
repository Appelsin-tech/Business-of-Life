import API from '@/api/index'

const state = () => ({
  coursesMy: null,
  courses: null
})

const getters = {
  isCourses: state => state.courses,
  isMyCourse: state => state.coursesMy,
  statusMyCourse: state => idCourse => {
    return state.coursesMy.length ? state.coursesMy.find(item => item.id === idCourse).status : 0
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
