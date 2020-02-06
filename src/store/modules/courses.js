import API from '@/api/index'

const state = () => ({
  coursesMy: []
})

const getters = {
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
