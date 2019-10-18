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
  receive: (data) => new Promise((resolve, reject) => {
    HTTP.post('tickets/receive', data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }),
}
