import { HTTP } from '../http'

export default {
  start: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/meeting/start', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  end: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/meeting/end', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  })
}
