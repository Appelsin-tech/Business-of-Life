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
}
