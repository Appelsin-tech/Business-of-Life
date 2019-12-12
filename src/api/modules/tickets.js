import { HTTP } from '../http'

export default {
  use: (data) => new Promise((resolve, reject) => {
    HTTP.post('tickets/use', data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }),
  check: (data) => new Promise((resolve, reject) => {
    HTTP.post('tickets/check', data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }),
  issue: (data) => new Promise((resolve, reject) => {
    HTTP.post('tickets/issue', data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }),
  pack: (data) => new Promise((resolve, reject) => {
    HTTP.post('tickets/pack', data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }),
  receive: (data) => new Promise((resolve, reject) => {
    HTTP.post('tickets/receive', data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }),
  create: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/relations/tickets/create', data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }),
  edit: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/relations/tickets/edit', data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }),
  delete: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/relations/tickets/delete', data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }),
  fields: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/relations/tickets/fields', data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }),
}
