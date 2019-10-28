<template>
  <ul class="tab-chart">
    <li class="tab-chart__item"
        v-for="(item, index) in dataTabs"
        :key="index"
        :class="{active: activeIndex === index}"
        @click="getDataTimeInterval(index, item.id)"
    >{{item.name}}</li>
  </ul>
</template>

<script>
export default {
  name: 'Tabs',
  props: ['dataTabs'],
  data() {
    return {
      activeIndex: 0
    }
  },
  created() {
    // console.log(this.$style)
  },
  methods: {
    getDataTimeInterval (i, item) {
      this.activeIndex = i
      let date = new Date()
      switch (item) {
        case 'd':
          this.$emit('interval', date.getDay())
          break
        case 'm':
          this.$emit('interval', [ 1, new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() ])
          break
        case 'hy':
          this.$emit('interval', [ 1, new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() ])
          break
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .tab-chart {
    display: flex;
    &__item {
      position: relative;
      font-size: 1.4rem;
      color: @colorSecondFonts;
      cursor: pointer;
      .to(380px, { font-size: 1.2rem;});
      &:not(:last-child) {
        margin-right: 3vw;
      }
      &::after {
        position: absolute;
        content: '';
        left: 0;
        right: 0;
        bottom: -15px;
        height: 2px;
        background: transparent;
        .xs-block({ bottom: -8px; height: 1px;})
      }
      &.active {
        &::after {
          background: @colorMainRed;
        }
      }
    }
  }
</style>
