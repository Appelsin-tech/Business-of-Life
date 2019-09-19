import { HTTP } from '../http'

export default {
  list: () => new Promise((resolve, reject) => {
    HTTP.get('events/list').then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }),
  info: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/info', data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
