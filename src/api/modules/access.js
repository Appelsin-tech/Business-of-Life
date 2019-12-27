import { HTTP } from '../http'

export default {
  auth: (data) => new Promise((resolve, reject) => {
    HTTP.post('access/auth', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
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
  request: (data) => new Promise((resolve, reject) => {
    HTTP.post('access/request', data).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  }),
  register: (data) => new Promise((resolve, reject) => {
    HTTP.post('access/register', data).then(response => {
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
