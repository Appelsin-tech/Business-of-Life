<template>
  <a class="button-create" href="#">
    <p class="text">
      <img svg-inline src="../../assets/img/icon/plus-circle.svg" alt="">
      <span class="g-caption-element g-caption-element--static">{{text}}</span>
    </p>
  </a>
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
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    height: 100%;
    box-sizing: border-box;
    .sm-block({
      padding:  20px 20px 20px 30px;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    });
    .xs-block({justify-content: flex-start; padding: 20px;});
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
      padding: 30px 30px 30px 50px;
      height: 120px;
      .sm-block({padding: 20px 20px 20px 30px; height: 70px;});
      .xs-block({
        padding: 20px;
      });
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
    .text {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #000;
      .xs-block({flex-direction: row;});
      svg {
        width: 35px;
        height: 35px;
        margin-bottom: 35px;
        .sm-block({
          width: 28px;
          height: 28px;
          margin-bottom: 25px;});
        .xs-block({
          margin-right: 20px;
          margin-bottom: 0;
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
