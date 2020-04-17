<template>
  <div class="panel">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PanelInfo',
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
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    .default-panel-style();
    .sm-block({
      font-size: 1.6rem;
    })
  }
</style>
