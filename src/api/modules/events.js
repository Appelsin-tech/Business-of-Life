import { HTTP } from '../http'

export default {
  list: () => new Promise((resolve, reject) => {
    HTTP.get('events/list').then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }),
  info: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/info', data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }),
  create: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/create', data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }),
  edit: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/edit', data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }),
  delete: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/delete', data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }),
  my: () => new Promise((resolve, reject) => {
    HTTP.get('events/my').then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }),
}
