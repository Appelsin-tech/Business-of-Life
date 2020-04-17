<template>
  <div class="panel g-panel">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PanelInfo'
}
</script>

<style scoped lang="less">
  @import '../../assets/less/_importants';
  .panel {
    margin-bottom: auto;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 2rem;
    color: var(--app_title-panel__color);
    .sm-block({
      font-size: 1.6rem;
    })
  }
</style>
