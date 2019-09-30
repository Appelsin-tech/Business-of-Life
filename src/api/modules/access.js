import { HTTP } from '../http'

export default {
  auth: (data) => new Promise((resolve, reject) => {
    HTTP.post('access/auth', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      response.error(error.response.data)
      reject(error)
    })
  }),
  logout: () => new Promise((resolve, reject) => {
    HTTP.get('access/logout').then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  }),
  unknown: () => new Promise((resolve, reject) => {
    HTTP.get('unknown').then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
