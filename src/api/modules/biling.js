import { HTTP } from '../http'

export default {
  biling: (data) => new Promise((resolve, reject) => {
    HTTP.post('biling', data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
