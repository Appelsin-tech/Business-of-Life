import { HTTP } from '@/api/http'

export default {
  upload: (data, config) => new Promise((resolve, reject) => {
    HTTP.post('files/upload', data, config).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  })
}
