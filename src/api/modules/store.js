import { HTTP } from '../http'

export default {
  items: (type) => new Promise((resolve, reject) => {
    HTTP.get(`store/items?type=${type}`).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  }),
  buy: (data) => new Promise((resolve, reject) => {
    HTTP.post('store/buy', data).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
