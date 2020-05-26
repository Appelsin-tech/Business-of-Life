<template>
  <div class="enter mb-30" v-if="vebinarInfo">
    <h2 class="g-caption-section">Вход</h2>
    <div class="wrapper-btn">
      <button-app @click.native="controlFreeJoin" >
        <template v-if="vebinarInfo.freejoin">Убрать общий доступ</template>
        <template  v-else>Открыть общий доступ</template>
      </button-app>
      <button-app @click.native="controlModeration">
        <template v-if="vebinarInfo.moderation">Выключить модерирование</template>
        <template  v-else>Включить модерирование</template>
      </button-app>
    </div>

  </div>
</template>

<script>
import API from '@/api/index'
export default {
  name: 'AdminRelationInfoVebinar',
  props: {
    idRelation: {}
  },
  data() {
    return {
      vebinarInfo: null
    }
  },
  methods: {
    controlFreeJoin () {
      if (this.vebinarInfo.freejoin) {
        API.meeting.close({id: this.idRelation}).then(response => {
          API.response.success('Мероприятие закрыто')
          this.vebinarInfo.freejoin = false
        }).catch(e => API.response.error('Сначала необходимо начать вебинар'))
      } else {
        API.meeting.open({id: this.idRelation}).then(response => {
          API.response.success('Мероприятие открыто для всех')
          this.vebinarInfo.freejoin = true
        }).catch(e => API.response.error('Сначала необходимо начать вебинар'))
      }
    },
    controlModeration () {
      if (this.vebinarInfo.moderation) {
        API.meeting.disable({id: this.idRelation}).then(response => {
          API.response.success('Модерация отключена')
          this.vebinarInfo.moderation = false
        }).catch(e => API.response.error('Сначала необходимо начать вебинар'))
      } else {
        API.meeting.enable({id: this.idRelation}).then(response => {
          API.response.success('Модерация включена')
          this.vebinarInfo.moderation = true
        }).catch(e => API.response.error('Сначала необходимо начать вебинар'))
      }
    },
    getInfoVebinar () {
      API.meeting.info(this.idRelation).then(response => {
        this.vebinarInfo = response
      })
    }
  },
  mounted () {
    this.getInfoVebinar()
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .enter {
    .btn-app {
      margin-bottom: 20px;
      &:first-child {
        margin-right: 15px;
      }
    }
  }

</style>
