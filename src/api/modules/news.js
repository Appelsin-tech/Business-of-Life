import { HTTP } from '../http'

export default {
  list: () => new Promise((resolve, reject) => {
    HTTP.get('news/list').then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  info: (url) => new Promise((resolve, reject) => {
    HTTP.get(`news/info?url=${url}`).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  my: () => new Promise((resolve, reject) => {
    HTTP.get('news/my').then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  details: (data) => new Promise((resolve, reject) => {
    HTTP.post('news/details', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  create: (data) => new Promise((resolve, reject) => {
    HTTP.post('news/create', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  edit: (data) => new Promise((resolve, reject) => {
    HTTP.post('news/edit', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  delete: (data) => new Promise((resolve, reject) => {
    HTTP.post('news/delete', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  publish: (data) => new Promise((resolve, reject) => {
    HTTP.post('news/publish', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  unpublish: (data) => new Promise((resolve, reject) => {
    HTTP.post('news/unpublish', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  })
}
