<template>
  <div class="control">
    <button class="control__link control-link control-link--refractor" v-tooltip.bottom="'Редактировать'" @click="$modal.show(modal)">
      <img svg-inline class="control-link__icon" src="../assets/img/icon/pencil.svg" alt="">
    </button>
    <button class="control__link control-link control-link--delete" v-tooltip.bottom="'Удалить'">
      <img svg-inline class="control-link__icon" src="../assets/img/icon/basket.svg" alt="">
    </button>
  </div>
</template>

<script>
export default {
  name: 'ControlIcon',
  props: ['modal']
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .control-link {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      border: 1px solid #d6d6d6;
      transition: 0.3s;
      .md-block({ width: 40px; height: 40px; });
      &:first-child {
        margin-right: 10px;
      }
      &--refractor {
        &:hover {
          border-color: @colorSuccess;
          .control-link__icon {
            path {
              fill: @colorSuccess;
            }
          }
        }
      }
      &--delete {
        &:hover {
          border-color: @colorError;
          .control-link__icon {
            path {
              fill: @colorError;
            }
          }
        }
      }
      &__icon {
        width: 25px;
        height: 25px;
        .md-block({ width: 18px; height: 18px; });
        path {
          transition: 0.3s;
          fill: #d6d6d6;
        }
      }
    }
  }
  .tooltip {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 5px 10px;
    background: #fff;
    border-radius: 3px;
    &__text {
      &::after {
        content: " ";
        position: absolute;
        bottom: 100%;  /* At the top of the tooltip */
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent black transparent;
      }
    }
  }
</style>
