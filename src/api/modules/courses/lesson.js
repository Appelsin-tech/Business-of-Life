import { HTTP } from '../../http'

export default {
  create: (data) => new Promise((resolve, reject) => {
    HTTP.post('courses/lessons/create', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  edit: (data) => new Promise((resolve, reject) => {
    HTTP.post('courses/lessons/edit', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  delete: (data) => new Promise((resolve, reject) => {
    HTTP.post('courses/lessons/delete', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  details: (data) => new Promise((resolve, reject) => {
    HTTP.post('courses/lessons/details', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  info: (data) => new Promise((resolve, reject) => {
    HTTP.post('courses/lessons/info', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
}
