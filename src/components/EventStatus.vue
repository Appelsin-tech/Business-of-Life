<template>
  <div class="status">
    <div class="status-wrapper">
      <div class="status-content" >
        <template v-if="status[idStatus].class === 'created'">
          <div class="g-icon-circle" :class="status[idStatus].class">
            <img svg-inline class="svg-icon" src="../assets/img/icon/close.svg" alt="">
          </div>
          <span class="text">{{status[idStatus].tooltip}}</span>
        </template>
        <template v-else-if="status[idStatus].class === 'waiting'">
          <div class="g-icon-circle" :class="status[idStatus].class">
            <img svg-inline class="svg-icon" src="../assets/img/icon/time-my.svg" alt="">
          </div>
          <span class="text">{{status[idStatus].tooltip}}</span>
        </template>
        <template v-else-if="status[idStatus].class === 'past'">
          <div class="g-icon-circle" :class="status[idStatus].class">
            <img svg-inline class="svg-icon" src="../assets/img/icon/time-my.svg" alt="">
          </div>
          <span class="text">{{status[idStatus].tooltip}}</span>
        </template>
        <template v-else>
          <div class="g-icon-circle" :class="status[idStatus].class">
            <img svg-inline class="svg-icon" src="../assets/img/icon/check.svg" alt="">
          </div>
          <span class="text">{{status[idStatus].tooltip}}</span>
        </template>
      </div>
      <div class="btn-wrapper">
        <button class="g-btn g-btn--no-icon" @click="$router.push({path: `/admin/editing/${idEvent}/${idRelation}`})">
          <span>Редактировать</span>
        </button>
        <button class="g-btn g-btn--no-icon g-btn--white"  @click="newStatus">
          <span v-if="idStatus === 3 || idStatus === 4">Снять с публикации</span>
          <span v-else>Опубликовать</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import API from '../api/index'

export default {
  name: 'EventStatus',
  props: ['idEvent', 'idStatus', 'idRelation'],
  data() {
    return {
      statusRelation: 0,
      status: {
        0: {
          class: 'created',
          tooltip: 'Событие не опубликовано'
        },
        1: {
          class: 'waiting',
          tooltip: 'Отправлено на модерацию'
        },
        2: {
          class: 'waiting',
          tooltip: 'Принято на модерацию'
        },
        3: {
          class: 'public',
          tooltip: 'Опубликовано'
        },
        4: {
          class: 'past',
          tooltip: 'Прошедшее событие'
        }
      }
    }
  },
  methods: {
    newStatus() {
      if(this.idStatus === 3 || this.idStatus === 4) {
        API.relations.unpublish({id: this.idRelation}).then((response) => {
          this.statusRelation = response.status
          this.$emit('newStatus')
          API.response.success('Событие снято с публикации')
        })
      } else {
        API.relations.publish({id: this.idRelation}).then((response) => {
          this.statusRelation = response.status
          this.$emit('newStatus')
          API.response.success('Событие опубликовано')
        })
      }
    },
  },
  mounted() {
    this.statusRelation = this.idStatus
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .status {
    padding: 30px;
    margin-bottom: 80px;
    box-shadow: 0 0 30px 0 rgba(0,0,0,0.2);
    .sm-block({box-shadow: 0 0 20px 0 rgba(0,0,0,0.2); margin-bottom: 50px;});
    .status-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .sm-block({ flex-direction: column; align-items: flex-start;});
      .ss-block({align-items: center;});
      .status-content {
        display: flex;
        align-items: center;
        .sm-block({ margin-bottom: 20px;});
        .text {
          color: #000;
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      .btn-wrapper {
        display: flex;
        justify-content: flex-start;
        .ss-block({ flex-direction: column; align-items: flex-start;});
        .g-btn {
          &:first-child {
            margin-right: 20px;
            .ss-block({ margin-right: 0; margin-bottom: 10px;});
          }
        }
      }
    }
  }
</style>
