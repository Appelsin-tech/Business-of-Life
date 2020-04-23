<template>
  <div class="status">
    <div class="status-content" >
      <template v-if="statusProgress === 0">
        <div class="g-icon-circle" :class="dataStatus[statusProgress].classIcon">
          <icon-close class="g-icon"/>
        </div>
        <span class="text">{{dataStatus[statusProgress].tooltip}}</span>
      </template>
      <template v-else-if="statusProgress === 1">
        <div class="g-icon-circle" :class="dataStatus[statusProgress].classIcon">
          <icon-check class="g-icon"/>
        </div>
        <span class="text">{{dataStatus[statusProgress].tooltip}}</span>
      </template>
      <template v-else>
        <div class="g-icon-circle" :class="dataStatus[statusProgress].classIcon">
          <img svg-inline class="svg-icon" src="@/assets/img/icon/time-my.svg" alt="">
        </div>
        <span class="text">{{dataStatus[statusProgress].tooltip}}</span>
      </template>
    </div>
    <div class="btn-wrapper" v-if="source === 'lesson'">
      <button-app :to="`/office/lesson/${urlMyCourse}`"  v-if="urlMyCourse">
        Редактировать
      </button-app>
      <button-app class="btn-app--white" v-if="statusProgress !== 2" @click.native="$emit('set-progress')" :class="{'disabled': statusProgress > 0}">
        Отметить как пройденный
      </button-app>
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
    statusProgress: {
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
          classIcon: 'public',
          tooltip: 'Пройден'
        },
        {
          classIcon: 'waiting',
          tooltip: 'В процессе прохождения'
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
      .btn-app:last-child {
        margin-left: 20px;
        .ss-block({
          margin-left: 0;
          margin-top: 10px;
        });
      }
    }
  }
</style>
