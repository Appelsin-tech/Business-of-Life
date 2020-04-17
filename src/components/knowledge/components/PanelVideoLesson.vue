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
      <div class="g-icon-circle drag g-icon-circle--control g-icon-circle--control-drag">
        <icon-drag-variant class="g-icon"/>
      </div>
      <div class="g-control-icon static" >
        <button class="g-icon-circle g-icon-circle--control g-icon-circle--control-green" v-tooltip.bottom="'Редактировать'" @click="$emit('edit-video')">
          <icon-lead-pencil class="g-icon"/>
        </button>
        <button class="g-icon-circle  g-icon-circle--control g-icon-circle--control-red" v-tooltip.bottom="'Удалить'" @click="$emit('delete-video')">
          <icon-delete class="g-icon"/>
        </button>
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
        width: 540px;
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
