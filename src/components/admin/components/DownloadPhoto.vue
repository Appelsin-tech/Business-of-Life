<template>
  <div class="photo" :style="{backgroundImage: `url(${image})`}" :class="`row-${row}`">
    <span class="g-item-form__label">{{label}}</span>
    <div class="photo__wrapper">
      <input type="file" class="visually-hidden" :id="`form__file_${id}`">
      <label class="photo__link" :class="[img ? 'photo__link--change' : 'photo__link--add']" :for="`form__file_${id}`">
        <img svg-inline class="svg-icon" src="@/assets/img/icon/camera.svg" alt="">
        <span class="photo__text">
          <template v-if="img">Изменить фото</template>
          <template v-else>Загрузить фото</template>
        </span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DownloadFoto',
  props: {
    id: {},
    image: {
      default: null
    },
    label: {
      default: 'Фото'
    },
    row: {
      default: 2
    }
  },
  computed: {
    img() {
      return !!this.image
    }
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
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: 0.3s;
    .md-block({
      grid-column: ~"1 / 2";
      min-height: 200px;
    });
    .xs-block({
      min-height: 150px;
    });
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
    &:hover {
      .photo__link--change {
        opacity: 1;
      }
      .photo__link--add {
        border-color: #000;
        .svg-icon {
          path {
            fill: #000;
          }
        }
        .photo__text {
          color: #000;
        }
      }
    }
    &__wrapper {
      position: relative;
      flex-grow: 2;
      margin-bottom: 30px;
      .sm-block({
        margin-bottom: 20px;
      });
      .xs-block({ margin-bottom: 15px;});
    }
    &__link {
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
      &--add {
        z-index: 1;
        border: 1px solid #d7d7d7;
        .svg-icon {
          path {
            fill: #d7d7d7;
          }
        }
        .photo__text {
          color: #d7d7d7;
        }
      }
      &--change {
        opacity: 0;
        background: rgba(226, 58, 58, 0.8);
        .svg-icon {
          path {
            fill: #fff;
          }
        }
        .photo__text {
          color: #fff;
        }
      }
    }
    .svg-icon {
      margin-bottom: 15px;
      width: 50px;
      height: 50px;
      .sm-block({
        width: 35px;
        height: 35px;});
      path {
        transition: 0.3s;
      }
    }
    &__text {
      font-size: 1.6rem;
      font-weight: 400;
      text-decoration: underline;
      transition: 0.3s;
    }
  }
</style>
