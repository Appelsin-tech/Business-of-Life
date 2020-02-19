import API from '@/api/index'

const state = () => ({
  coursesMy: []
})

const getters = {
  isMyCourse: state => idCourse => {
    return state.coursesMy.find(item => item.id === idCourse)
  },
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
}

const mutations = {
  SET_MY_COURSES(state, courses) {
    state.coursesMy = courses
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
