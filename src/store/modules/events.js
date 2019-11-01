import API from '../../api/index'

const state = () => ({
  publicEvents: []
})

const getters = {
  filterEvents(state) {
    let finishArr = [];

    let currentDateFull = new Date();
    const date = new Date(currentDateFull.getFullYear(), currentDateFull.getMonth(), currentDateFull.getDate())

    function addDays(date, days) {
      const copy = new Date(Number(date))
      copy.setDate(date.getDate() + days)
      return copy
    }

    for (let i = 0; i < 31; i++) {

      finishArr.push({
        date: addDays(date, i),
        day: addDays(date, i).getDate(),
        weekday: addDays(date, i).toLocaleString('default', { weekday: 'long' }),
        events: []
      })

      state.publicEvents.forEach(item => {
        let parseSec = item.stamp * 1000
        if(addDays(date, i).getTime() <= parseSec && parseSec <= addDays(date, i + 1).getTime()) {
          finishArr[i].events.push(item)
        }
      })
    }

    return finishArr
  },
}

const actions = {
  async eventsCalendar({ commit }, time) {
    return new Promise((resolve, reject) => {
      if (time !== undefined) {
        API.relations.find(time).then(response => {
          commit('SET_PUBLIC_EVENTS', response)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      }
    })
  }

}

const mutations = {
  SET_PUBLIC_EVENTS(state, data) {
    state.publicEvents = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
