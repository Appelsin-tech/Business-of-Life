import { HTTP } from '@/api/http'

export default {
  ticketCheck: (data) => new Promise((resolve, reject) => {
    HTTP.post('tickets/check', data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }),
  participants: (data) => new Promise((resolve, reject) => {
    HTTP.get('events/relations/participants', {params: data}).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
