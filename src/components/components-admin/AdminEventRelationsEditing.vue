<template>
  <section class="p-event-all-editing p-default p-default-inner">
    <bread-crumbs/>
    <div class="container page">
      <h1 class="g-caption g-caption-inner">Мероприятие</h1>
      <div class="event-description">
        <h2 class="g-caption g-caption-section">
          <template v-if="id">Редактирование мероприятия</template>
          <template v-else>Создание мероприятия</template>
        </h2>
        <event-editing-form :idEvent="id" :event="myEvent" :btnDelete="showButtonDelete"/>
      </div>
      <div class="relations-list">
        <h2 class="g-caption g-caption-section">Редактирование событий</h2>
        <div class="btn-wrapper" v-if="id">
          <a href="#" class="g-btn g-btn--icon-left" @click.prevent="$router.push({path: `/admin/editing/${id}/${'new'}`})">
            <span>
              <img svg-inline class="svg-icon" src="../../assets/img/icon/plus-circle.svg" alt="">
              Добавить событие
            </span>
          </a>
          <a href="#" class="g-btn g-btn--no-icon g-btn--white g-btn--border" v-if="showButtonDelete">
            <span>Опубликовать все</span>
          </a>
        </div>
        <div class="event-wrapper" v-if="showRelations === 0">
          <div class="event" v-for="(relation, i) in myEvent.relations" :key="relation.id">
            <div class="status" :class="status[relation.status].class" v-tooltip.left="`${status[relation.status].tooltip}`">
              <template v-if="status[relation.status].status === 'created'"><img svg-inline class="status__icon" src="../../assets/img/icon/close.svg" alt=""></template>
              <template v-else-if="status[relation.status].status === 'waiting'"><img svg-inline class="status__icon" src="../../assets/img/icon/watch.svg" alt=""></template>
              <template v-else><img svg-inline class="status__icon" src="../../assets/img/icon/check.svg" alt=""></template>
            </div>
            <div class="event__info-wrapper">
              <div class="event__info">
                <a :href="`/event/${relation.id}`" class="event__title" target="_blank">{{relation.title}}</a>
                <p class="event__info-item location">
                  <img svg-inline class="icon" src="../../assets/img/icon/location.svg" alt="">
                  <span class="text">{{relation.country}} {{relation.city}}</span>
                </p>
                <p class="event__info-item date">
                  <img svg-inline class="icon" src="../../assets/img/icon/timetable.svg" alt="">
                  <span class="text">{{relation.date}}</span>
                </p>
                <p class="event__info-item link">
                  <img svg-inline class="icon" src="../../assets/img/icon/earth-globe.svg" alt="">
                  <span class="text">https://businessof.life/event/{{relation.id}}</span>
                </p>
              </div>
              <div class="control">
                <button class="control__link control-link control-link--refractor" v-tooltip.bottom="'Редактировать'" @click="$router.push({path: `/admin/editing/${id}/${relation.id}`})">
                  <img svg-inline class="control-link__icon" src="../../assets/img/icon/pencil.svg" alt="">
                </button>
                <button class="control__link control-link control-link--delete" v-tooltip.bottom="'Удалить'" @click="deleteRelation(relation.id)" v-if="relation.status <= 1">
                  <img svg-inline class="control-link__icon" src="../../assets/img/icon/basket.svg" alt="">
                </button>
              </div>
            </div>
          </div>
        </div>
        <strong class="event-null" v-else-if="showRelations === 1">Событий не найдено</strong>
        <strong class="event-null" v-else>Чтобы создать событие - заполните информацию о мероприятии</strong>
        <router-link to="/admin/event-control" class="back-btn">Назад</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import API from '../../api/index'
import BreadCrumbs from '../BreadCrumbs.vue'
import { mapState } from 'vuex'
import EventEditingForm from './EventEditingForm'

export default {
  name: 'AdminEvenAllEditing',
  components: { BreadCrumbs, EventEditingForm },
  props: ['id'],
  data() {
    return {
      myEvent: false,
      showRelations: 2,
      status: {
        0: {
          class: 'created',
          tooltip: 'Создано, но не опубликовано'
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
        }
      }
    }
  },
  computed: {
    ...mapState('user', [
      'myParentEvents'
    ]),
    showButtonDelete() {
      if(this.showRelations === 0) {
        return !this.myEvent.relations.some(item => { return item.status === 3})
      } else {
        return false
      }
    }
  },
  methods: {
    deleteRelation(id) {
      API.relations.delete({id: id}).then(() => {
        API.response.success('Событие удалено')
      })
    }
  },
  mounted() {
    if(this.id) {
      API.events.info({id: this.id}).then(response => {
        this.myEvent = response.data
        if (this.myEvent.relations.length !== 0 ) {
          this.showRelations = 0
        } else {
          this.showRelations = 1
        }
      })
    }
  },
  watch: {
    '$route' (to, from) {
      if(this.id) {
        API.events.info({id: this.id}).then(response => {
          this.myEvent = response.data
          if (this.myEvent.relations.length !== 0 ) {
            this.showRelations = 0
          } else {
            this.showRelations = 1
          }
        })
      } else {
        this.myEvent = false
        this.showRelations = 2
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/_importants";
  .btn-wrapper {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 60px;
    .sm-block({ margin-bottom: 40px;});
    .ss-block({ flex-direction: column; align-items: flex-start;});
    .g-btn {
      .ss-block({ min-width: 230px;});
      &:first-child {
        margin-right: 20px;
        .ss-block({ margin-right: 0; margin-bottom: 10px;});
      }
    }
  }
  .event-description {
    padding-left: 50px;
    margin-bottom: 60px;
    .sm-block({ padding-left: 0;});
  }
  .relations-list {
    padding-left: 50px;
    .sm-block({ padding-left: 0;});
    .event-wrapper {
      display: flex;
      flex-direction: column;
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
          &.created {
            border-color: @colorMainRed;
            .status__icon {
              path {
                fill: @colorMainRed;
              }
            }
          }
          &.waiting {
            border-color: @colorWait;
            .status__icon {
              path {
                fill: @colorWait;
              }
            }
          }
          &.public {
            border-color: @colorSuccess;
            .status__icon {
              path {
                fill: @colorSuccess;
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
          margin-bottom: 25px;
          font-weight: 800;
          font-size: 2rem;
          text-transform: uppercase;
          text-decoration: underline;
          color: #000;
          .md-block({ font-size: 1.6rem; margin-bottom: 15px;});
          &:hover {
            text-decoration: none;
          }
        }
        &__info-item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          .md-block({ margin-bottom: 10px;});
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
          }
        }
      }
    }
    .tooltip {
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 5px 10px;
      background: #fff;
      border-radius: 3px;
      &__text {
        &::after {
          content: " ";
          position: absolute;
          bottom: 100%;  /* At the top of the tooltip */
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent black transparent;
        }
      }
    }
    .control {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .control-link {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        border: 1px solid #d6d6d6;
        transition: 0.3s;
        cursor: pointer;
        .md-block({ width: 40px; height: 40px; });
        &--refractor {
          &:hover {
            border-color: @colorSuccess;
            .control-link__icon {
              path {
                fill: @colorSuccess;
              }
            }
          }
        }
        &--delete {
          margin-left: 10px;
          &:hover {
            border-color: @colorError;
            .control-link__icon {
              path {
                fill: @colorError;
              }
            }
          }
        }
        &__icon {
          width: 25px;
          height: 25px;
          .md-block({ width: 18px; height: 18px; });
          path {
            transition: 0.3s;
            fill: #d6d6d6;
          }
        }
      }
    }
    .event-null {
      display: block;
      font-weight: 600;
      font-size: 2.4rem;
      margin-top: 120px;
      margin-left: 50px;
      .lg-block({ margin-top: 90px;});
      .sm-block({ margin-left: 0; margin-top: 50px;});
      .xs-block({ font-size: 2rem; margin-top: 50px;});
    }
  }
</style>
