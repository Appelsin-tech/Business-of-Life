<template>
  <div class="status">
    <div class="status-content" >
      <template v-if="currentStatus === 0">
        <div class="g-icon-circle" :class="status[currentStatus].classIcon">
          <img svg-inline class="svg-icon" src="@/assets/img/icon/close.svg" alt="">
        </div>
        <span class="text">{{status[currentStatus].tooltip}}</span>
      </template>
      <template v-else>
        <div class="g-icon-circle" :class="status[currentStatus].classIcon">
          <img svg-inline class="svg-icon" src="@/assets/img/icon/check.svg" alt="">
        </div>
        <span class="text">{{status[currentStatus].tooltip}}</span>
      </template>
    </div>
    <button class="g-btn g-btn--no-icon g-btn--white" v-if="newStatus !== 1" @click="newStatus = 1">
      <span>Отметить как пройденный</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'PanelStatusLesson',
  data() {
    return {
      status: [
        {
          classIcon: 'created',
          tooltip: 'Урок не пройден'
        },
        {
          classIcon: 'public',
          tooltip: 'Урок пройден'
        }
      ],
      newStatus: 0
    }
  },
  computed: {
    currentStatus() {
      return this.newStatus
    },
  },
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    .sm-block({ flex-direction: column; align-items: flex-start;});
    .ss-block({align-items: center;});
    .default-panel-style();
    .status-content {
      display: flex;
      align-items: center;
      margin-right: 20px;
      .sm-block({
        margin-bottom: 20px;
      });
      .text {
        color: #000;
        text-transform: uppercase;
        font-weight: 600;
      }
    }
  }
</style>
