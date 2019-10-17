import { HTTP } from '../http'

export default {
  billing: (data) => new Promise((resolve, reject) => {
    HTTP.post('billing/request', data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }),
  invoice: (data) => new Promise((resolve, reject) => {
    HTTP.post('billing/invoice', data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
