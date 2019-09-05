<template>
  <div class="filters">
    <button class="filters__btn"
            v-for="(btn, index) in button"
            :key="index"
            :class="{active: activeIndex === index}"
            @click="activeBtn(index)"
    >{{btn}}</button>
  </div>
</template>

<script>
export default {
  name: 'ButtonFilters',
  props: ['button'],
  data() {
    return {
      activeIndex: 0
    }
  },
  methods: {
    activeBtn(i) {
      this.activeIndex = i
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .filters {
    display: flex;
    align-items: center;
    &__btn {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 15px;
      min-width: 140px;
      flex-shrink: 0;
      height: 65px;
      border-top: 1px solid @colorBorder;
      border-bottom: 1px solid @colorBorder;
      border-right: 1px solid @colorBorder;
      box-sizing: border-box;
      font-weight: 800;
      font-size: 1.4rem;
      color: @colorSecondFonts;
      cursor: pointer;
      .md-block({ height: 50px; margin-bottom: 25px;});
      .sm-block({min-width: 100px});
      .xs-block({ height: 40px; padding: 0 10px;});
      &:first-child {
        border-bottom-left-radius: 3px;
        border-top-left-radius: 3px;
        border-left: 1px solid @colorBorder;
      }
      &:last-child {
        border-bottom-right-radius: 3px;
        border-top-right-radius: 3px;
      }
      &.active {
        color: #000;
        background: #f6f6f6;
      }
    }
  }
</style>
