<template>
  <ul class="tab-chart">
    <li class="tab-chart__item"
        v-for="(item, index) in dataTabs"
        :key="item.id"
        :class="{active: activeIndex === index}"
        @click="changeTab(item, index)"
    >{{item.name}}</li>
  </ul>
</template>

<script>
export default {
  name: 'AppTabs',
  props: ['dataTabs'],
  data() {
    return {
      activeIndex: 0
    }
  },
  methods: {
    changeTab(btn, index) {
      this.activeIndex = index
      this.$emit('change-tab', btn.id)
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .tab-chart {
    display: flex;
    margin-bottom: 40px;
    border-bottom: 1px solid var(--app_element-border__color);
    overflow-x: auto;
    .sm-block({
      margin-bottom: 30px;});
    &__item {
      position: relative;
      font-size: 2rem;
      color: var(--app_font__color);
      cursor: pointer;
      padding-bottom: 15px;
      .sm-block({
        padding-bottom: 10px;
        font-size: 1.8rem;});
      &:not(:last-child) {
        margin-right: 32px;
        .sm-block({
          margin-right: 20px;});
      }
      &::after {
        position: absolute;
        content: '';
        left: 0;
        right: 0;
        bottom: 0;
        height: 2px;
        background: transparent;
        .xs-block({ height: 1px;});
      }
      &.active {
        color: var(--app_emphasis__color);
        font-weight: bold;
        &::after {
          background: var(--app_emphasis__color);
        }
      }
    }
  }
</style>
