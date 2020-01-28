<template>
  <div class="video">
    <div class="iframe">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/GeynnBoxBjs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="desc">
      <img svg-inline class="g-svg-icon" src="@/assets/img/icon/video-camera.svg" alt="">
      <p class="g-item-form__label">Что такое финансовая пирамида</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelVideoLesson'
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .video {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    box-sizing: border-box;
    .default-panel-style(35px);
    .iframe {
      margin-bottom: 20px;
      width: 100%;
      iframe {
        width: 100%;
        .ss-block({max-height: 200px;});
      }
    }
    .desc {
      display: flex;
      align-items: center;
      .g-item-form__label {
        margin-bottom: 0;
      }
    }
  }
</style>
