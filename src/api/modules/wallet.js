import { HTTP } from '../http'

export default {
  balance: () => new Promise((resolve, reject) => {
    HTTP.get('wallet/balance').then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  }),
  history: () => new Promise((resolve, reject) => {
    HTTP.get('wallet/history').then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  }),
}
