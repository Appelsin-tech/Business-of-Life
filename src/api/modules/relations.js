import { HTTP } from '../http'

export default {
  create: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/relations/create', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  edit: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/relations/edit', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  info: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/relations/info', data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }),
  delete: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/relations/delete', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  find: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/relations/find', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  publish: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/relations/publish', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  unpublish: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/relations/unpublish', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  details: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/relations/details', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  clone: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/relations/clone', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
}
