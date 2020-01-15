<template>
  <div class="btn-wrapper">
    <button class="btn" v-for="(btn, index) in BtnArr" @click="btnClick(btn, index)" :class="{active: activeIndex === index}">
      {{btn.text}}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ButtonChangeSection',
  props: ['BtnArr'],
  data() {
    return {
      activeIndex: 0
    }
  },
  methods: {
    btnClick(btn, index) {
      this.activeIndex = index
      this.$emit('clickBtnChangeSection', btn.component)
    }
  }
}
</script>

<style scoped lang="less">
  @import '../../assets/less/_importants';
  .btn-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 300px;
    .lg-block({flex-direction: row; max-width: 100%; flex-wrap: wrap;});
    .sm-block({flex-direction: column; align-items: center;});
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 35px 25px;
      font-size: 1.3rem;
      font-weight: 900;
      text-transform: uppercase;
      min-width: 100%;
      margin-bottom: 20px;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
      cursor: pointer;
      border: 3px solid transparent;
      .lg-block({
        min-width: 250px;
        margin-right: 20px;
        padding: 30px 20px;
      });
      .sm-block({
        padding: 20px 15px;
        margin-bottom: 20px;
        margin-right: 0;
        min-width: 210px;
        border-width: 2px;
      });
      &.active {
        border: 3px solid @colorMain;
        .sm-block({border-width: 2px;});
      }
    }
  }
</style>
