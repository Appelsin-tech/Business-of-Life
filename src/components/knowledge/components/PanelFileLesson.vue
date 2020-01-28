<template>
  <a class="file" href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" download>
    <img svg-inline class="g-svg-icon" src="@/assets/img/icon/info.svg" alt="">
    <strong class="g-item-form__label">СписокКомпаний.pdf</strong>
  </a>
</template>

<script>
export default {
  name: 'PanelFileLesson'
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .file {
    display: flex;
    align-items: center;
    .default-panel-style();
    .g-item-form__label {
      margin-bottom: 0;
    }
  }
</style>
