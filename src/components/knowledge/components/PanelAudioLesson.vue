<template>
  <div class="audio">
    <div class="desc">
      <img svg-inline class="g-svg-icon" src="@/assets/img/icon/wave.svg" alt="">
      <strong class="g-item-form__label">Виды финансовых махинаций</strong>
    </div>
    <audio class="audio-src" controls src=""></audio>
  </div>
</template>

<script>
export default {
  name: 'AudioLesson'
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .audio {
    .default-panel-style();
    .desc {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .g-item-form__label {
        margin-bottom: 0;
      }
    }
    .audio-src {
      width: 100%;
    }
  }
</style>
