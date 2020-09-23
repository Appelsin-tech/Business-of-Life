<template>
  <component :is="type" :href="href" class="btn-app" :to="to" :class="{'no-text': !text}">
    <span class="text" :class="{'text-center': !icon}" v-if="text"><slot></slot></span>
    <component v-if="icon" :is="icon" class="g-icon" decorative ></component>
  </component>
</template>

<script>
export default {
  name: 'ButtonApp',
  props: {
    href: {
      type: String,
      default: null
    },
    to: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    text: {
      default: true
    }
  },
  computed: {
    type () {
      return this.href ? 'a' : this.to ? 'router-link' : 'button'
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .btn-app {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 12px 25px;
    background: var(--app_btn__color);
    border: 3px solid var(--app_btn__color);
    box-sizing: border-box;
    transition: 0.3s;
    min-width: 200px;
    cursor: pointer;
    border-radius: 8px;
    line-height: 1;
    .sm-block({
      padding: 10px 20px;
      border-width: 2px;
      border-radius: 5px;
      min-width: 150px;
    });
    &:hover,
    &:focus {
      background: #fff;
      .text {
        color: #000;
      }
      .g-icon {
        color: #000;
      }
    }
    &:disabled,
    &.disabled{
      opacity: 0.7;
      pointer-events: none;
    }
    &.marathon {
      background: #FFCC00;
      border-color: #FFCC00;
      &:hover,
      &:focus {
        background: #fff;
      }
      .g-icon,
      .text {
        color: #000;
      }
    }
    &.no-text {
      min-width: auto;
      .g-icon {
        margin-left: 0;
      }
    }
    .text {
      position: relative;
      display: inline-flex;
      flex-grow: 1;
      margin-right: auto;
      align-items: center;
      font-size: 1.8rem;
      color: var(--app_btn-font__color);
      font-weight: 600;
      transition: 0.3s;
      &.text-center {
        justify-content: center;
      }
    }
    .g-icon {
      margin-left: 30px;
      width: 25px;
      height: 25px;
      flex-shrink: 0;
      color: var(--app_btn-font__color);
      transition: 0.3s;
      .sm-block({
        margin-left: 20px;});
    }
  /*  &--icon-left {
      min-width: 250px;
      .sm-block({
        min-width: 180px;
      });
      .g-icon {
        left: 0;
        right: auto;
      }
      .text {
        margin-right: 0;
        padding-left: 60px;
        padding-right: 0;
        .sm-block({
          padding-left: 50px;
          padding-right: 0;
        });
      }
    }*/
    &--white {
      padding: 14px 24px;
      background: transparent;
      border: 1px solid @colorBorder;
      .sm-block({
        padding: 11px 20px;
        border-width: 1px;
      });
      &:hover,
      &:focus {
        border-color: var(--app_btn__color);
      }
      .text {
        color: #000;
      }
    }
  }
</style>
