import API from '../../api/index'

const state = () => ({
  publicEvents: []
})

const getters = {
  filterEvents(state) {
    let dateArr = [];

    state.publicEvents.forEach(item => {
      let dateStamp = new Date(item.stamp * 1000).getDay()
      dateArr.push({stamp: item.stamp, events: []})
    })

    function uniqByKeepLast (a, key) {
      return [
        ...new Map(
          a.map(x => [key(x), x])
        ).values()
      ]
    }

    let uniqArr = uniqByKeepLast(dateArr, item => item.stamp)

    state.publicEvents.forEach(item => {
      uniqArr.forEach(time => {
        let parseStamp = new Date(item.stamp * 1000).getDay()
        let parseStampTime = new Date(time.stamp * 1000).getDay()
        if(item.stamp === time.stamp) {
          time.events.push(item)
        }
      })
    })
    // console.log(uniqArr)
    uniqArr.forEach(item => {
      let d = new Date(item.stamp * 1000);
      item.day = d.getDate()
      item.weekday = d.toLocaleString('default', { weekday: 'long' });
    })
    return uniqArr
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
