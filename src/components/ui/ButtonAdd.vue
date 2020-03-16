<template>
  <div class="button-create">
    <div class="text">
      <img svg-inline src="../../assets/img/icon/plus-circle.svg" alt="">
      <span class="g-caption-element g-caption-element--static">{{text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonAdd',
  props: {
    text: {
      default: 'Добавить'
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/_importants";
  .button-create {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    box-sizing: border-box;
    cursor: pointer;
    .default-panel-style();
    .xs-block({justify-content: flex-start;});
    &:hover {
      .text {
        .g-caption-element {
          text-decoration: none;
        }
      }
    }
    &.disabled {
      pointer-events: none;
      opacity: 0.6;
    }
    &.row {
      justify-content: flex-start;
      margin-bottom: 20px;
      .sm-block({
        margin-bottom: 15px;});
      .text {
        flex-direction: row;
        svg {
          margin-right: 35px;
          margin-bottom: 0;
          .sm-block({
            margin-right: 20px;
            margin-bottom: 0;
          })
        }
      }
    }
    &.admin-default {
      height: auto;
      margin-bottom: 20px;
      min-height: 350px;
      .md-block({
        min-height: 300px;
      });
      .sm-block({
        min-height: 110px;
        margin-bottom: 15px;
      });
      .ss-block({
        min-height: min-content;
      });
    }
    .text {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #000;
      .sm-block({flex-direction: row;});
      svg {
        width: 35px;
        height: 35px;
        margin-bottom: 35px;
        .sm-block({
          width: 28px;
          height: 28px;
          margin-right: 20px;
          margin-bottom: 0;});
        .xs-block({
          width: 20px;
          height: 20px;
        });
        path {
          fill: @colorMain;
        }
      }
      .g-caption-element {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
</style>
