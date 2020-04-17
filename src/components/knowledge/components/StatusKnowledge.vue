<template>
  <div class="info">
    <div class="message" >
      <div class="g-icon-circle" :class="status[currentStatus.status].classIcon">
        <img svg-inline class="svg-icon" src="@/assets/img/icon/time-my.svg" alt="" v-if="currentStatus.status === 0 || currentStatus.status === 2">
        <icon-check class="g-icon" v-else-if="currentStatus.status === 1"/>
      </div>
      <p class="g-caption-element g-caption-element--static">{{status[currentStatus.status].message}} <span v-if="currentStatus.exp !== 0 && currentStatus.status === 1">{{activeDate}}</span></p>
    </div>
    <router-link to="/knowledge-package" class="g-btn g-btn--no-icon" v-if="currentStatus.status === 1" >
      <span class="text">Продлить доступ</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'StatusKnowledge',
  data() {
    return {
      status: [
        {
          classIcon: 'waiting',
          message: 'Обработка заявки'
        },
        {
          classIcon: 'public',
          message: 'Доступ активен'
        },
        {
          classIcon: 'waiting',
          message: 'Обработка заявки'
        }
      ],
    }
  },
  computed: {
    currentStatus() {
      return this.$store.getters['user/accessKnowledge']
    },
    activeDate() {
      return this.$moment().to(this.currentStatus.exp * 1000, true)
    },
  },
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";

  .info {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    .default-panel-style();
    .ss-block({
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 25px;
    });
    .message {
      display: flex;
      align-items: center;
      margin-right: auto;
      .text {
        font-size: 2rem;
        text-transform: uppercase;
        font-weight: 800;
      }
    }
    .g-btn {
      .ss-block({
        margin-top: 15px;})
    }
  }
</style>
