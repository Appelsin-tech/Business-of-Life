import { HTTP } from '../http'

export default {
  create: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/relations/actions/create', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  delete: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/relations/actions/delete', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
}
