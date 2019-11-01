import { HTTP } from '../http'

export default {
  orders: (data) => new Promise((resolve, reject) => {
    HTTP.post('statistics/orders', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
}
