<template>
  <div class="status">
    <div class="status-content" >
      <template v-if="status === 0">
        <div class="g-icon-circle" :class="dataStatus[status].classIcon">
          <img svg-inline class="svg-icon" src="@/assets/img/icon/close.svg" alt="">
        </div>
        <span class="text">{{dataStatus[status].tooltip}}</span>
      </template>
      <template v-else-if="status === 1">
        <div class="g-icon-circle" :class="dataStatus[status].classIcon">
          <img svg-inline class="svg-icon" src="@/assets/img/icon/time-my.svg" alt="">
        </div>
        <span class="text">{{dataStatus[status].tooltip}}</span>
      </template>
      <template v-else>
        <div class="g-icon-circle" :class="dataStatus[status].classIcon">
          <img svg-inline class="svg-icon" src="@/assets/img/icon/check.svg" alt="">
        </div>
        <span class="text">{{dataStatus[status].tooltip}}</span>
      </template>
    </div>
    <div class="btn-wrapper" v-if="source === 'lesson'">
      <button class="g-btn g-btn--no-icon g-btn--white" v-if="status !== 2">
        <span>Отметить как пройденный</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelStatusProcessCourseLesson',
  props: {
    source: {
      required: true
    },
    status: {
      required: true
    }
  },
  data() {
    return {
      newStatus: 0,
      dataStatus: [
        {
          classIcon: 'created',
          tooltip: 'Не пройден'
        },
        {
          classIcon: 'waiting',
          tooltip: 'В процессе прохождения'
        },
        {
          classIcon: 'public',
          tooltip: 'Пройден'
        }
      ]
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
