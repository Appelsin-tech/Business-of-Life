import { HTTP } from '../http'

export default {
  list: () => new Promise((resolve, reject) => {
    HTTP.get('roles/list').then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  }),
  edit: (data) => new Promise((resolve, reject) => {
    HTTP.post('roles/edit', data).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
