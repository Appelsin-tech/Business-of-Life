import { HTTP } from '../http'

export default {
  me: () => new Promise((resolve, reject) => {
    HTTP.get('users/me').then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
