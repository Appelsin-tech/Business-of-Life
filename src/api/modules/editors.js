import { HTTP } from '../http'

export default {
  add: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/relations/editors/add', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  remove: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/relations/editors/remove', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
}
