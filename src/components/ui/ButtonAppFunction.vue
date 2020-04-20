<template>
  <component :is="type" :href="href" class="btn-app-f" :to="to">
    <component v-if="icon" :is="icon" class="g-icon"></component>
    <span class="text" v-if="text"><slot></slot></span>
  </component>
</template>

<script>
export default {
  name: 'ButtonAppFunction',
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
      type: Boolean,
      default: false
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

  .btn-app-f {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 12px 15px;
    background: var(--app_btn-functional__color);
    color: var(--app_btn-functional-font-and-icon__color);
    box-sizing: border-box;
    transition: 0.3s;
    cursor: pointer;
    border-radius: 8px;
    .lg-block({
      padding: 10px;
    });
    .sm-block({
      padding: 8px;
      border-radius: 5px;
    });
    .xs-block({
      padding: 6px;
      border-radius: 5px;
    });
    &:hover,
    &:focus {
      opacity: 0.8;
    }
    &:disabled,
    &.disabled {
      opacity: 0.7;
      pointer-events: none;
    }
    .g-icon {
      width: 25px;
      height: 25px;
      flex-shrink: 0;
      color: var(--app_btn-functional-font-and-icon__color);
      transition: 0.3s;
      .sm-block({
        width: 20px;
        height: 20px;});
      .xs-block({
        width: 16px;
        height: 16px;});
    }
    .text {
      margin-left: 7px;
      font-size: 1.6rem;
      color: var(--app_btn-functional-font-and-icon__color);
      font-weight: 600;
      transition: 0.3s;
    }
  }
</style>
