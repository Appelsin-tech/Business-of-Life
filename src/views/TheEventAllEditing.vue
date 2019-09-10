<template>
  <section class="p-event-all-editing p-default p-default-inner">
    <bread-crumbs/>
    <div class="container page">
      <h1 class="g-caption g-caption-inner">Редактирование событий</h1>
      <div class="btn-wrapper">
        <a href="#" class="g-btn g-btn--icon-left">
          <span>
            <img svg-inline class="svg-icon" src="../assets/img/icon/plus-circle.svg" alt="">
            Добавить событие
          </span>
        </a>
        <a href="#" class="g-btn g-btn--no-arrow g-btn--white g-btn--border">
          <span>Опубликовать все</span>
        </a>
      </div>
      <div class="event-wrapper">
        <div class="event" v-for="(event, i) in eventArr" :key="i">
          <div class="status" :class="event.status" v-tooltip.left="event.statusDesc">
            <img svg-inline class="status__icon"  src="../assets/img/icon/check.svg" alt="">
          </div>
          <div class="event__info-wrapper">
            <div class="event__info">
              <a href="#" class="event__title">{{event.name}}</a>
              <p class="event__location location">
                <img svg-inline class="location__icon" src="../assets/img/icon/location.svg" alt="">
                <span class="location__text">{{event.location}}</span>
              </p>
            </div>
            <control-icon/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '../components/BreadCrumbs.vue'
import ControlIcon from '../components/ControlIcon.vue'

export default {
  name: 'TheEvenAllEditing',
  components: { BreadCrumbs, ControlIcon },
  data() {
    return {
      eventArr: [
        {
          name: 'Тренинг “искусство продаж”',
          status: 'success',
          location: 'Moscow',
          statusDesc: 'Опубликованно'
        },
        {
          name: 'Тренинг “искусство продаж” Тренинг “искусство продаж” Тренинг “искусство продаж”',
          status: 'success',
          location: 'SpB',
          statusDesc: 'Опубликованно'
        },
        {
          name: 'Тренинг “искусство продаж”',
          status: 'error',
          location: 'Rostov na Donu',
          statusDesc: 'Отклонено'
        }
      ]
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";

  .btn-wrapper {
    display: flex;
    justify-content: flex-start;
    margin-left: 50px;
    margin-bottom: 60px;
    .sm-block({ margin-left: 0; margin-bottom: 40px;});
    .ss-block({ flex-direction: column; align-items: flex-start;});
    .g-btn {
      .ss-block({ min-width: 230px;});
      &:first-child {
        margin-right: 20px;
        .ss-block({ margin-right: 0; margin-bottom: 10px;});
      }
    }
  }
  .event-wrapper {
    display: flex;
    flex-direction: column;
    padding-left: 50px;
    .sm-block({ padding-left: 0;});
    .event {
      display: flex;
      padding: 50px 60px;
      margin-bottom: 15px;
      box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);
      .md-block({ padding: 40px 50px;});
      .sm-block({ padding: 30px 30px 30px 20px;});
      .xs-block({padding: 20px;});
      .status {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 60px;
        width: 50px;
        height: 50px;
        border-width: 1px;
        border-style: solid;
        border-color: #000;
        border-radius: 50%;
        flex-shrink: 0;
        .md-block({ width: 40px; height: 40px; margin-right: 45px;});
        .sm-block({ margin-right: 30px;});
        .ss-block({ width: 30px; height: 30px; margin-right: 15px;});
        &__icon {
          width: 25px;
          height: 25px;
          .md-block({ width: 20px; height: 20px;});
          .ss-block({ width: 15px; height: 15px;});
          path {
            fill: #000;
          }
        }
        &.success {
          border-color: @colorSuccess;
          .status__icon {
            path {
              fill: @colorSuccess;
            }
          }
        }
        &.error {
          border-color: @colorMainRed;
          .status__icon {
            path {
              fill: @colorMainRed;
            }
          }
        }
      }
      &__info-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-grow: 1;
        .ss-block({ flex-direction: column; align-items: flex-start;})
      }
      &__info {
        margin-right: auto;
        padding-right: 50px;
        .sm-block({ padding-right: 30px;});
        .ss-block({ margin-bottom: 30px; padding-right: 0;});
      }
      &__title {
        display: block;
        margin-bottom: 20px;
        font-weight: 800;
        font-size: 2rem;
        text-transform: uppercase;
        text-decoration: underline;
        color: #000;
        .md-block({ font-size: 1.6rem; margin-bottom: 12px;});
        &:hover {
          text-decoration: none;
        }
      }
      .location {
        display: flex;
        align-items: center;
        &__icon {
          margin-right: 15px;
          width: 15px;
          height: 15px;
          path {
            fill: #dedede;
          }
        }
        &__text {
          color: @colorSecondFonts;
        }
      }
    }
  }
</style>
