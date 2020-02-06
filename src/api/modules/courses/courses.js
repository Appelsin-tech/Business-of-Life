import { HTTP } from '../../http'

export default {
  list: () => new Promise((resolve, reject) => {
    HTTP.get('courses/list').then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  my: () => new Promise((resolve, reject) => {
    HTTP.get('courses/my').then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  details: (data) => new Promise((resolve, reject) => {
    HTTP.post('courses/details', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  create: (data) => new Promise((resolve, reject) => {
    HTTP.post('courses/create', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  edit: (data) => new Promise((resolve, reject) => {
    HTTP.post('courses/edit', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  delete: (data) => new Promise((resolve, reject) => {
    HTTP.post('courses/delete', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  info: (data) => new Promise((resolve, reject) => {
    HTTP.post('courses/info', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
}
