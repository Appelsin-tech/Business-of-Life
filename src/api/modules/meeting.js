import { HTTP } from '../http'

export default {
  start: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/meeting/start', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  end: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/meeting/end', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  open: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/meeting/open', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  close: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/meeting/close', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  enable: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/meeting/moderation/enable', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  disable: (data) => new Promise((resolve, reject) => {
    HTTP.post('events/meeting/moderation/disable', data).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  info: (id) => new Promise((resolve, reject) => {
    HTTP.get('events/meeting/info', {params: {id: id}}).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  recordingsGet: (id) => new Promise((resolve, reject) => {
    HTTP.post('events/meeting/recordings/get', {id: id}).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  }),
  recordingsDelete: (id) => new Promise((resolve, reject) => {
    HTTP.post('events/meeting/recordings/delete', {id: id}).then(response => {
      resolve(response.data)
    }).catch((error, res) => {
      reject(error)
    })
  })
}
