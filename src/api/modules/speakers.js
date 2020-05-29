import { HTTP } from '../http'

export default {
  add: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/relations/speakers/add', data).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  }),
  remove: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/relations/speakers/remove', data).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
