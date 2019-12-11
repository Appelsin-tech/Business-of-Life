<template>
  <div class="panel">
    {{text}}
  </div>
</template>

<script>
export default {
  name: 'PanelInfo',
  props: ['text']
}
</script>

<style scoped lang="less">
  @import '../../assets/less/_importants';
  .panel {
    margin-bottom: auto;
    padding: 20px 20px 20px 30px;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 2rem;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    .sm-block({
      padding: 15px;
      font-size: 1.6rem;
      border-radius: 5px;
    })
  }
</style>
