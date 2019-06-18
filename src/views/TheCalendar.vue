<template>
  <section class="p-calendar"></section>
</template>

<script>
export default {
  name: 'TheCalendar'
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .p-calendar {
    display: flex;
    align-items: flex-start;
    min-height: 100vh;
    background: url("../assets/img/bg-calendar.jpg") no-repeat center / cover;
  }

</style>
