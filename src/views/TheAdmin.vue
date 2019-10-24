<template>
  <section class="admin">
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: 'TheAdmin'
}
</script>

<style lang="less">
  @import "../assets/less/_importants";
  .back-btn {
    display: inline-block;
    margin-top: 80px;
    font-size: 2.4rem;
    text-transform: uppercase;
    font-weight: 800;
    transition: 0.3s;
    color: @colorSecondFonts;
    border-bottom: 1px solid @colorSecondFonts;
    .sm-block({ margin-top: 50px;});
    &:hover {
      border-bottom-color: transparent;
    }
  }
</style>
