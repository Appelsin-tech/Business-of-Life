import { HTTP } from '../http'

export default {
  me: () => new Promise((resolve, reject) => {
    HTTP.get('users/me').then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  }),
  edit: (data) => new Promise((resolve, reject) => {
    HTTP.post('users/edit', data).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
