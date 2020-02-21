<template>
  <div class="event">
    <div class="g-icon-circle" :class="status[relation.status].class" v-tooltip.left="`${status[relation.status].tooltip}`">
      <template v-if="status[relation.status].class === 'created'">
        <img svg-inline class="svg-icon" src="@/assets/img/icon/close.svg" alt="">
      </template>
      <template v-else-if="status[relation.status].class === 'waiting' || status[relation.status].class === 'past'">
        <img svg-inline class="svg-icon" src="@/assets/img/icon/time-my.svg" alt="">
      </template>
      <template v-else>
        <img svg-inline class="svg-icon" src="@/assets/img/icon/check.svg" alt="">
      </template>
    </div>
    <div class="event__info-wrapper">
      <div class="event__info">
        <div class="content">
          <a :href="`/event/${relation.id}`" class="g-caption-element" target="_blank">{{relation.title}} </a>
          <p class="event__info-item location">
            <img svg-inline class="icon" src="@/assets/img/icon/location.svg" alt="">
            <span class="text">{{relation.country}} {{relation.city}}</span>
          </p>
          <p class="event__info-item date">
            <img svg-inline class="icon" src="@/assets/img/icon/timetable.svg" alt="">
            <span class="text">{{relation.date}}</span>
          </p>
          <p class="event__info-item link">
            <img svg-inline class="icon" src="@/assets/img/icon/earth-globe.svg" alt="">
            <span class="text">https://businessof.life/event/{{relation.id}}</span>
          </p>
        </div>
      </div>
      <div class="g-control-icon static">
        <button class="g-icon-circle g-icon-circle--control g-icon-circle--control-green" v-tooltip.bottom="'Редактировать'" @click="$router.push({path: `/admin/relation/${idEvent}/${relation.id}`})">
          <img svg-inline class="svg-icon" src="@/assets/img/icon/pencil.svg" alt="">
        </button>
        <button class="g-icon-circle  g-icon-circle--control g-icon-circle--control-red" v-tooltip.bottom="'Удалить'" @click="$emit('delete-relation', relation.id)" v-if="relation.status <= 1">
          <img svg-inline class="svg-icon" src="@/assets/img/icon/basket.svg" alt="">
        </button>
        <router-link :to="`/admin/members/${relation.id}`" class="g-icon-circle g-icon-circle--control g-icon-circle--control-black" v-tooltip.bottom="'Участники'">
          <img svg-inline class="svg-icon" src="@/assets/img/icon/avatar.svg" alt="">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminRelationItem',
  props: {
    relation: {
      required: true
    },
    idEvent: {
      required: true
    },
    pastEvents: {
      default: false
    }
  },
  data() {
    return {
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
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .event {
    display: flex;
    margin-bottom: 20px;
    .default-panel-style();
    .sm-block({
      margin-bottom: 15px;
    });
    .g-caption-element {
      margin-bottom: 25px;
      .md-block({
        margin-bottom: 15px;
      });
    }
    &__info-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-grow: 1;
      .sm-block({
        flex-direction: column;
        align-items: flex-start;
      });
      .g-control-icon {
        .g-icon-circle {
          margin-right: 0;
          margin-left: 10px;
          margin-bottom: 5px;
          margin-top: 5px;
          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
    &__info {
      margin-right: auto;
      padding-right: 50px;
      .sm-block({
        margin-bottom: 25px;
        padding-right: 0;
      });
    }
    &__info-item {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      .md-block({
        margin-bottom: 7px;
      });
      &:last-of-type {
        margin-bottom: 0;
      }
      .icon {
        margin-right: 15px;
        width: 15px;
        height: 15px;
        path {
          fill: #dedede;
        }
      }
      .text {
        color: @colorSecondFonts;
        word-break: break-all;
      }
    }
  }
</style>
