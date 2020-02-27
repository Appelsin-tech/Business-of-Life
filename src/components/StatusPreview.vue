<template>
  <div class="container">
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
          <template v-else-if="status[idStatus].class === 'public'">
            <div class="g-icon-circle" :class="status[idStatus].class">
              <img svg-inline class="svg-icon" src="../assets/img/icon/check.svg" alt="">
            </div>
            <span class="text">{{status[idStatus].tooltip}}</span>
          </template>
        </div>
        <div class="btn-wrapper">
          <router-link :to="linkEdit" class="g-btn g-btn--no-icon">
            <span>Редактировать</span>
          </router-link>
          <button class="g-btn g-btn--no-icon g-btn--white"  @click="newStatus">
            <span v-if="btnText">Снять с публикации</span>
            <span v-else>Опубликовать</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '../api/index'

export default {
  name: 'StatusPreview',
  props: ['idEvent', 'idStatus', 'idRelation', 'idCourse', 'idNews', 'section'],
  data() {
    return {
    }
  },
  computed: {
    status() {
      let obj = {}
      if (this.section === 'event') {
        obj = {
          0: {
            class: 'created',
            tooltip: 'Не опубликовано'
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
      } else if (this.section === 'news') {
        obj = {
          0: {
            class: 'created',
            tooltip: 'Не опубликована'
          },
          1: {
            class: 'public',
            tooltip: 'Опубликована'
          }
        }
      } else if (this.section === 'course') {
        obj = {
          0: {
            class: 'created',
            tooltip: 'Не опубликован'
          },
          1: {
            class: 'public',
            tooltip: 'Опубликован'
          }
        }
      }
      return obj
    },
    linkEdit() {
      if (this.section === 'event') {
        return `/admin/relation/${this.idEvent}/${this.idRelation}`
      } else if (this.section === 'news') {
        return `/admin/news-editing/${this.idNews}`
      } else if (this.section === 'course') {
        return `/admin/course-editing/${this.idCourse}`
      }
    },
    btnText() {
      if (this.section === 'event') {
        return (this.idStatus === 3 || this.idStatus === 4)
      } else if (this.section === 'news') {
        return this.idStatus === 1
      } else if (this.section === 'course') {
        return this.idStatus === 1
      }
    },
  },
  methods: {
    newStatus () {
      if (this.section === 'event') {
        this.newStatusEvent()
      } else if (this.section === 'news') {
        this.newStatusNews()
      } else if (this.section === 'course') {
        this.newStatusCourse()
      }
    },
    newStatusEvent () {
      if (this.idStatus === 3 || this.idStatus === 4) {
        API.relations.unpublish({id: this.idRelation}).then((response) => {
          this.$emit('newStatus')
          API.response.success('Событие снято с публикации')
        })
      } else {
        API.relations.publish({id: this.idRelation}).then((response) => {
          this.$emit('newStatus')
          API.response.success('Событие опубликовано')
        })
      }
    },
    newStatusNews () {
      if (this.idStatus === 1) {
        API.news.unpublish({id: this.idNews}).then((response) => {
          this.$emit('newStatus')
          API.response.success('Новость снята с публикации')
        })
      } else {
        API.news.publish({id: this.idNews}).then((response) => {
          this.$emit('newStatus')
          API.response.success('Новость опубликована')
        })
      }
    },
    newStatusCourse () {
      if (this.idStatus === 1) {
        API.courses.courses.unpublish({id: this.idCourse}).then((response) => {
          this.$emit('newStatus')
          API.response.success('Курс снят с публикации')
        })
      } else {
        API.courses.courses.publish({id: this.idCourse}).then((response) => {
          this.$emit('newStatus')
          API.response.success('Курс опубликован')
        })
      }
    }
  },
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .status {
    padding: 30px;
    margin-bottom: 80px;
    box-shadow: 0 0 30px 0 rgba(0,0,0,0.2);
    .sm-block({box-shadow: 0 0 20px 0 rgba(0,0,0,0.2); margin-bottom: 50px; padding: 20px;});
    .xs-block({padding: 15px;});
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
