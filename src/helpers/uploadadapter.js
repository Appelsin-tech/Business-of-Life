import API from '@/api/index'
import router from '@/router/router'

export default class UploadAdapter {
  constructor(loader, idImage) {
    // The file loader instance to use during the upload.
    this.loader = loader
    this.folder = router.currentRoute.params.id
    this.idImage = idImage
  }

  upload () {
    return this.loader.file
      .then(uploadedFile => {
        return new Promise((resolve, reject) => {
          let formData = new FormData()
          formData.append('file', uploadedFile)
          formData.append('id', this.idImage + new Date().getTime())
          formData.append('action', 'file_upload')
          formData.append('folder', this.folder)

          API.files.upload(formData)
            .then(response => {
              resolve({
                default: `https://storage.googleapis.com/businessoflife/${response.info.name}`
              })
            })
            .catch(e => {
              console.log(e)
              reject()
              if (e.response.data.reason === 'file_corrupted') {
                API.response.error('Файл слишком большой')
              } else if (e.response.data.reason === 'file_ext') {
                API.response.error('Не верный тип файла')
              } else {
                API.response.error('Ошибка сервера')
              }
            })
        })
      })
  }

  abort () {
    console.log('Abort upload')
  }
}
