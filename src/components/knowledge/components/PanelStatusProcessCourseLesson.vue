<template>
  <div class="status">
    <div class="status-content" >
      <template v-if="statusProcessed === 0">
        <div class="g-icon-circle" :class="dataStatus[statusProcessed].classIcon">
          <img svg-inline class="svg-icon" src="@/assets/img/icon/close.svg" alt="">
        </div>
        <span class="text">{{dataStatus[statusProcessed].tooltip}}</span>
      </template>
      <template v-else-if="statusProcessed === 1">
        <div class="g-icon-circle" :class="dataStatus[statusProcessed].classIcon">
          <img svg-inline class="svg-icon" src="@/assets/img/icon/time-my.svg" alt="">
        </div>
        <span class="text">{{dataStatus[statusProcessed].tooltip}}</span>
      </template>
      <template v-else>
        <div class="g-icon-circle" :class="dataStatus[statusProcessed].classIcon">
          <img svg-inline class="svg-icon" src="@/assets/img/icon/check.svg" alt="">
        </div>
        <span class="text">{{dataStatus[statusProcessed].tooltip}}</span>
      </template>
    </div>
    <div class="btn-wrapper" v-if="source === 'lesson'">
      <router-link :to="`/admin/lesson/${urlMyCourse}`" class="g-btn g-btn--no-icon" v-if="urlMyCourse">
        <span>Редактировать</span>
      </router-link>
      <button class="g-btn g-btn--no-icon g-btn--white" v-if="statusProcessed !== 2">
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
    statusProcessed: {
      required: true
    },
    urlMyCourse: {
      required: false,
      default: null
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
    flex-wrap: wrap;
    margin-bottom: 30px;
    .md-block({ flex-direction: column; align-items: flex-start;});
    .ss-block({align-items: center;});
    .default-panel-style();
    .status-content {
      display: flex;
      align-items: center;
      margin-right: 20px;
      .ss-block({
        margin-right: 0;});
      .text {
        color: #000;
        text-transform: uppercase;
        font-weight: 600;
      }
    }
    .btn-wrapper {
      .md-block({
        margin-top: 20px;});
      .ss-block({
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 0;
      });
      .g-btn:last-child {
        margin-left: 20px;
        .ss-block({
          margin-left: 0;
          margin-top: 10px;
        });
      }
    }
  }
</style>
