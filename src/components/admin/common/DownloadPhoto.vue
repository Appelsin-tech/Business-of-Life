<template>
  <div class="photo" :class="`row-${row}`" v-cloak @drop.prevent="addFile" @dragover.prevent>
    <span class="g-item-form__label">{{label}}</span>
    <div class="photo__wrapper" :style="{backgroundImage: `url(${img})`}" :class="{'upload': progressShow}">
      <input type="file" class="visually-hidden" :id="`form__file_${idImage}`" @change="addFile" >
      <label class="photo__link" :class="[!!img ? 'photo__link--change' : 'photo__link--add']" :for="`form__file_${idImage}`" >
        <div class="progress" v-show="progressShow">{{uploadPercentage}} / 100%</div>
        <div class="text-wrapper" v-show="!progressShow">
          <icon-camera class="g-icon"/>
          <span class="photo__text">
            <template v-if="!!img">Изменить фото</template>
            <template v-else>Загрузить фото</template>
          </span>
        </div>
      </label>
    </div>
  </div>
</template>

<script>

import API from '@/api/index'

export default {
  name: 'DownloadFoto',
  props: {
    image: {
      default: null
    },
    label: {
      default: 'Фото'
    },
    row: {
      default: 2
    },
    folderFile: {
      default: 'folder'
    },
    idImage: {
      default: 'image'
    }
  },
  components: {},
  data() {
    return {
      files: [],
      uploadPercentage: 0,
      imageUpload: null
    }
  },
  computed: {
    img() {
      return !!this.imageUpload ? this.imageUpload : this.image
    },
    progressShow() {
      return this.uploadPercentage > 0 && this.uploadPercentage < 100
    }
  },
  methods: {
    addFile(e) {
      let f
      if (e.dataTransfer) {
        f = e.dataTransfer.files[0]
      } else {
        f = e.target.files[0]
      }
      let maxSize = 2 * (10 ** 6)
      if (f.size > maxSize) {
        API.response.error('Файл слишком большой')
      } else {
        if (f) {
          this.files[0] = f
          this.upload()
        }
      }
    },
    upload() {
      let formData = new FormData()
      formData.append('file', this.files[0])
      formData.append('id', this.idImage + new Date().getTime())
      formData.append('action', 'file_upload')
      formData.append('folder', this.folderFile)
      this.createImage(this.files[0])
      API.files.upload(formData, {
        onUploadProgress: (progressEvent) => {
          this.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
        }
      })
        .then(response => {
          this.$emit('image-download', {link: response.info.name})
        })
        .catch(e => {
          console.log(e)
          if (e.response.data.reason === 'file_corrupted') {
            API.response.error('Файл слишком большой')
          } else if (e.response.data.reason === 'file_ext') {
            API.response.error('Не верный тип файла')
          } else {
            API.response.error('Ошибка сервера')
          }
        })
    },
    createImage(file) {
      this.imageUpload = new Image()
      let reader = new FileReader()
      reader.onload = (e) => {
        this.imageUpload = e.target.result
      }
      reader.readAsDataURL(file)
    },
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .photo {
    grid-column: ~"1 / 2";
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    .md-block({
      grid-column: ~"1 / 2";
      min-height: 200px;
    });
    .xs-block({
      min-height: 150px;
    });
    &.preview_img {
      .md-block({max-width: 250px;});
    }
    &.row-2 {
      grid-row: ~"1 / 3";
      grid-column: ~"1 / 2";
    }
    &.row-3 {
      grid-row: ~"1 / 4";
      grid-column: ~"1 / 2";
    }
    &.col-grid-12 {
      grid-column: ~"1 / 3";
      grid-row: auto;
      min-height: 300px;
      .md-block({
        grid-column: ~"1 / 2";
        min-height: 200px;
      });
      .xs-block({
        min-height: 150px;
      });
    }
    &__wrapper {
      position: relative;
      flex-grow: 2;
      margin-bottom: 30px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      transition: 0.3s;
      .sm-block({
        margin-bottom: 20px;
      });
      .xs-block({
        margin-bottom: 15px;
      });
      &:hover {
        .photo__link--change {
          opacity: 1;
        }
        .photo__link--add {
          border-color: #000;
          .g-icon {
            color: #000;
          }
          .photo__text {
            color: #000;
          }
        }
      }
      &.upload {
        pointer-events: none;
        .photo__link--change {
          opacity: 1;
        }
      }
      .progress {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        font-size: 3rem;
        font-weight: bold;
        color: #fff;
        z-index: 5;
      }
      .text-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .photo__link {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: 0.3s;
        cursor: pointer;
        .app-border-radius();
        &--add {
          z-index: 1;
          background-color: #fff;
          border: 1px solid #fff;
          .g-icon {
            color: #d7d7d7;
          }
          .photo__text {
            color: #d7d7d7;
          }
        }
        &--change {
          opacity: 0;
          background: rgba(226, 58, 58, 0.8);
          .g-icon {
            color: #fff;
          }
          .photo__text {
            color: #fff;
          }
        }
      }
    }

    .g-icon {
      margin-bottom: 15px;
      width: 50px;
      height: 50px;
      transition: 0.3s;
      .sm-block({
        width: 35px;
        height: 35px;
      });
    }
    &__text {
      font-size: 1.6rem;
      font-weight: 400;
      text-decoration: underline;
      transition: 0.3s;
    }
  }
</style>
