<template>
  <div class="event">
<!--    <div class="g-icon-circle" :class="status[relation.status].class" v-tooltip.left="`${status[relation.status].tooltip}`">-->
<!--      <template v-if="status[relation.status].class === 'created'">-->
<!--        <icon-close class="g-icon"/>-->
<!--      </template>-->
<!--      <template v-else-if="status[relation.status].class === 'waiting' || status[relation.status].class === 'past'">-->
<!--        <img svg-inline class="svg-icon" src="@/assets/img/icon/time-my.svg" alt="">-->
<!--      </template>-->
<!--      <template v-else>-->
<!--        <icon-check class="g-icon"/>-->
<!--      </template>-->
<!--    </div>-->
    <div class="event__info-wrapper">
      <div class="event__info">
        <div class="content">
          <router-link :to="`/office/events/${idEvent}/relation/${relation.id}`" class="g-caption-element">{{relation.title}} </router-link>
          <p class="event__info-item location">
            <icon-map-marker class="g-icon"/>
            <span class="text">{{relation.country}} {{relation.city}}</span>
          </p>
          <p class="event__info-item date">
            <icon-calendar-clock class="g-icon"/>
            <span class="text">{{relation.date}}</span>
          </p>
        </div>
      </div>
      <div class="wrapper-control">
        <span class="status" :class="status[relation.status].class">
          {{status[relation.status].tooltip}}
        </span>
        <div class="g-wrapper-btn-f ">
          <button-app-function @click.native="$emit('delete-relation', relation.id)" icon="icon-delete" v-if="this.checkMyEvent && this.relation.status <= 1" v-tooltip.bottom="'Удалить'"></button-app-function>
          <button-app-function :to="`/office/participant/${relation.id}`" icon="icon-account" v-tooltip.bottom="'Участники'" ></button-app-function>
        </div>
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
    },
    checkMyEvent: {
      default: false
    }
  },
  data() {
    return {
      status: {
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
      }
    }
  },
  computed: {
    showBtnDelete () {
      if (this.checkMyEvent && this.relation.status <= 1) {
        return true
      } else {
        return false
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
      .g-wrapper-btn-f {
        .sm-block({
          flex-direction: row;});
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
      .g-icon {
        margin-right: 15px;
        width: 20px;
        height: 20px;
        color: #dedede;
        .ss-block({
          width: 15px;
          height: 15px;});
      }
      .text {
        color: @colorSecondFonts;
        word-break: break-all;
      }
    }
    .wrapper-control {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .status {
        font-weight: bold;
        .sm-block({
          margin-bottom: 10px;});
        &.public {
          color: var(--app_emphasis__color);
        }
        &.waiting,
        &.past,
        &.created {
          color: var(--app_font-secondary__color);
        }
      }
      .g-wrapper-btn-f {
        .sm-block({
          justify-content: flex-start;});
      }
    }
  }
</style>
