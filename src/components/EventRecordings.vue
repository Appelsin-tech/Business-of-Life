<template>
  <section class="recordings">
    <h2 class="g-caption-section">Запись вебинара</h2>
    <ul class="wrapper-recordings" v-if="recordings.length">
      <li class="item g-panel" v-for="(item, index) in recordings" :key="item.internalMeetingID">
        <div class="info">
          <a :href="item.playback.format.url" class="title g-caption-element" target="_blank">Часть {{index + 1}}</a>
        </div>
        <button-app-function @click.native="deleteRecord(item.internalMeetingID)" icon="icon-delete" v-tooltip.bottom="'Удалить'"></button-app-function>
      </li>
    </ul>
    <div class="g-panel" v-else>Записей нет</div>
  </section>
</template>

<script>
import API from '@/api/index'
export default {
  name: 'EventRecordings',
  props: ['idEvent'],
  data() {
    return {
      recordings: []
    }
  },
  computed: {

  },
  methods: {
    deleteRecord (id) {
      API.meeting.recordingsDelete(id).then(() => {
        API.response.success('Запись удалена')
        this.infoRecordings()
      })
    },
    infoRecordings () {
      API.meeting.recordingsGet(this.idEvent).then(response => {
        this.recordings = response
      })
    }
  },
  mounted () {
    this.infoRecordings()
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
.wrapper-recordings {
  display: flex;
  flex-direction: column;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 500px;
    margin-bottom: 20px;
    .info {
      .time {
        display: flex;
        align-items: center;
        .g-icon {
          margin-right: 15px;
          width: 20px;
          height: 20px;
          color: #dedede;
          .ss-block({
            width: 15px;
            height: 15px;});
        }
      }
    }
  }

}
</style>
