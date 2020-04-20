<template>
  <div class="video" :class="{editing: editing}">
    <div class="content">
      <div class="iframe" v-if="video">
        <iframe width="560" height="315" :src="video.content" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div class="desc-wrapper">
        <div class="desc">
          <icon-camera class="g-icon"/>
          <p class="g-caption-element g-caption-element--static">{{video.title}}</p>
        </div>
      </div>
    </div>
    <div class="icon-wrapper" v-if="editing">
      <button-app-function icon="icon-drag-variant" class="drag"></button-app-function>
      <div class="g-wrapper-btn-f g-wrapper-btn-f--static">
        <button-app-function icon="icon-lead-pencil" v-tooltip.bottom="'Редактировать'" @click.native="$emit('edit-video')"></button-app-function>
        <button-app-function icon="icon-delete" v-tooltip.bottom="'Удалить'" @click.native="$emit('delete-video')"></button-app-function>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelVideoLesson',
  props: {
    video: {
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
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    .sm-block({flex-direction: column;});
    &.editing {
      width: 100%;
      .default-panel-style(35px);
    }
    .content {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      .iframe {
        margin-bottom: 20px;
        width: 520px;
        .sm-block({
          width: 500px;});
        .ss-block({
          width: 100%;});
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
          .g-icon {
            margin-right: 25px;
          }
        }
        .g-item-form__label {
          margin-bottom: 0;
        }
      }
    }
    .icon-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      flex-shrink: 0;
      .sm-block({flex-direction: row-reverse;
        margin-top: 15px;});
    }
  }
</style>
