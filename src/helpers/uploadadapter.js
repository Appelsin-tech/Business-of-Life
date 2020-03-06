import API from '@/api/index'

export default class UploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader
  }

  upload = () => {
    let formData = new FormData()
    formData.append('file', file)
    formData.append('id', new Date().getTime())
    formData.append('action', 'file_upload')
    formData.append('folder', 'news')

    API.files.upload(formData)
      .then(response => {
        console.log(response.info.name)
        return {
          default: response.info.name
        }
        // this.$emit('image-download', {link: response.info.name})
      })
      .catch(e => {
        console.log(e.response)
        if (e.response.data.reason === 'file_corrupted') {
          API.response.error('Файл слишком большой')
        } else if (e.response.data.reason === 'file_ext') {
          API.response.error('Не верный тип файла')
        }
      })
  }

  abort = () => {
    console.log('Abort upload')
  }
}
