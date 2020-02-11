<template>
  <div class="video" :class="{editing: editing}">
    <div class="iframe" v-if="srcVideo">
      <iframe width="560" height="315" :src="srcVideo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="desc-wrapper">
      <div class="desc">
        <img svg-inline class="g-svg-icon" src="@/assets/img/icon/video-camera.svg" alt="">
        <p class="g-caption-element g-caption-element--static">Что такое финансовая пирамида</p>
      </div>
      <div class="g-control-icon static" v-if="editing">
        <button class="g-icon-circle g-icon-circle--control g-icon-circle--control-green" v-tooltip.bottom="'Редактировать'" @click="$emit('edit-video')">
          <img svg-inline class="svg-icon" src="@/assets/img/icon/pencil.svg" alt="">
        </button>
        <button class="g-icon-circle  g-icon-circle--control g-icon-circle--control-red" v-tooltip.bottom="'Удалить'" @click="">
          <img svg-inline class="svg-icon" src="@/assets/img/icon/basket.svg" alt="">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelVideoLesson',
  props: {
    srcVideo: {
      required: true
    },
    editing: {
      required: false,
      default: false
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .video {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    .default-panel-style(35px);
    &.editing {
      width: 100%;
    }
    .iframe {
      margin-bottom: 20px;
      max-width: 540px;
      width: 100%;
      iframe {
        width: 100%;
        .ss-block({max-height: 200px;});
      }
    }
    .desc-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      align-self: stretch;
      .sm-block({flex-direction: column; align-items: flex-start;});
      .desc {
        display: flex;
        align-items: center;
      }
      .g-control-icon {
        .sm-block({
          margin-top: 15px;});
      }
      .g-item-form__label {
        margin-bottom: 0;
      }
    }
  }
</style>
