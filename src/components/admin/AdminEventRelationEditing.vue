<template>
  <section class="p-event-all-editing p-default p-default-inner">
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class="container page">
      <h1 class="g-caption-inner">Мероприятие</h1>
      <div class="event-editing">
        <h2 class="g-caption-section">
          <template v-if="id">Редактирование мероприятия</template>
          <template v-else>Создание мероприятия</template>
        </h2>
        <event-editing-form :idEvent="id" :event="myEvent" :btnDelete="showButtonDelete"/>
      </div>
      <div class="relations-list">
        <h2 class="g-caption-section">Редактирование событий</h2>
        <button-add v-if="id" :class="'row'" @click.prevent.native="$router.push({path: `/admin/editing/${id}/new`})"/>
        <div class="event-wrapper" v-if="showRelations === 1">
          <div class="event-wrapper--inner">
            <admin-event-relation-editing-relation  v-for="(relation, i) in myFutureEvents" :key="relation.id" :relation="relation" :idEvent="id" v-on:delete-relation="deleteRelation"/>
          </div>
          <h3 class="g-caption-section">Прошедшие события</h3>
          <div class="event-wrapper--inner" v-if="myPastEvents.length">
            <admin-event-relation-editing-relation  v-for="(relation, i) in myPastEvents" :key="relation.id" :relation="relation" :idEvent="id" v-on:delete-relation="deleteRelation" :pastEvents="true"/>
<!--            <div class="event" v-for="(relation, i) in myPastEvents" :key="relation.id">-->
<!--              <div class="g-icon-circle waiting" v-tooltip.left="'Прошедшее событие'">-->
<!--                <img svg-inline class="svg-icon" src="../../assets/img/icon/time-my.svg" alt="">-->
<!--              </div>-->
<!--              <div class="event__info-wrapper">-->
<!--                <div class="event__info">-->
<!--                  <a :href="`/event/${relation.id}`" class="g-caption-element" target="_blank">{{relation.title}} </a>-->
<!--                  <p class="event__info-item location">-->
<!--                    <img svg-inline class="icon" src="../../assets/img/icon/location.svg" alt="">-->
<!--                    <span class="text">{{relation.country}} {{relation.city}}</span>-->
<!--                  </p>-->
<!--                  <p class="event__info-item date">-->
<!--                    <img svg-inline class="icon" src="../../assets/img/icon/timetable.svg" alt="">-->
<!--                    <span class="text">{{relation.date}}</span>-->
<!--                  </p>-->
<!--                  <p class="event__info-item link">-->
<!--                    <img svg-inline class="icon" src="../../assets/img/icon/earth-globe.svg" alt="">-->
<!--                    <span class="text">https://businessof.life/event/{{relation.id}}</span>-->
<!--                  </p>-->
<!--                </div>-->
<!--                <div class="g-control-icon">-->
<!--                  <button class="g-icon-circle g-icon-circle&#45;&#45;control g-icon-circle&#45;&#45;control-green" v-tooltip.bottom="'Редактировать'" @click="$router.push({path: `/admin/editing/${id}/${relation.id}`})">-->
<!--                    <img svg-inline class="svg-icon" src="../../assets/img/icon/pencil.svg" alt="">-->
<!--                  </button>-->
<!--                  <button class="g-icon-circle  g-icon-circle&#45;&#45;control g-icon-circle&#45;&#45;control-red" v-tooltip.bottom="'Удалить'" @click="deleteRelation(relation.id)" v-if="relation.status <= 1">-->
<!--                    <img svg-inline class="svg-icon" src="../../assets/img/icon/basket.svg" alt="">-->
<!--                  </button>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
          </div>
          <panel-info v-if="!myPastEvents.length">
            У вас еще нет прошедших событий
          </panel-info>
        </div>
        <panel-info v-if="showRelations === 2">Чтобы создать событие - заполните информацию о мероприятии</panel-info>
        <router-link to="/admin/event-control" class="back-btn">Назад</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import API from '../../api/index'
import BreadCrumbs from '../BreadCrumbs.vue'
import { mapState } from 'vuex'
import EventEditingForm from './components/EventEditingForm'
import PanelInfo from '../ui/PanelInfo'
import ButtonAdd from '../ui/ButtonAdd'
import AdminEventRelationEditingRelation from './inner/AdminEventRelationEditingRelation'


export default {
  name: 'AdminEventRelationEditing',
  components: {
    BreadCrumbs,
    EventEditingForm,
    PanelInfo,
    ButtonAdd,
    AdminEventRelationEditingRelation
  },
  props: ['id'],
  data() {
    return {
      breadCrumbs: [
        {
          path: '/admin/me',
          title: 'Личный кабинет'
        },
        {
          path: '/admin/event-control',
          title: 'Управление мероприятиями'
        },
      ],
      myEvent: false,
      myFutureEvents: [],
      myPastEvents: [],
      ev1: '',
      ev2: '',
      showRelations: 2,
    }
  },
  computed: {
    ...mapState('user', [
      'myParentEvents'
    ]),
    showButtonDelete() {
      if (this.showRelations === 1) {
        return !this.myEvent.relations.some(item => {
          return item.status === 3
        })
      } else if (this.showRelations === 0) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    deleteRelation(e) {
      API.relations.delete({ id: e }).then(() => {
        this.myPastEvents = []
        this.myFutureEvents = []
        API.response.success('Событие удалено')
        this.getInfoEvent()
      })
    },
    filterRelations() {
      this.myEvent.relations.forEach(item => {
        let currentMoment = this.$moment()
        let itemStamp = item.stamp * 1000
        if (currentMoment - itemStamp > 0 && item.status === 3) {
          item.status = 4
          this.myPastEvents.push(item)
        } else {
          this.myFutureEvents.push(item)
        }
      })
    },
    getInfoEvent() {
      API.events.info({ id: this.id }).then(response => {
        this.myEvent = response.data
        this.filterRelations()
        if (this.myEvent.relations.length !== 0) {
          this.showRelations = 1
        } else {
          this.showRelations = 0
        }
      })
    },
  },
  mounted() {
    if (this.id) {
      this.getInfoEvent()
    }
  },
  watch: {
    '$route'(to, from) {
      if (this.id) {
        API.events.info({ id: this.id }).then(response => {
          this.myEvent = response.data
          if (this.myEvent.relations.length !== 0) {
            this.showRelations = 1
          } else {
            this.showRelations = 0
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
    .sm-block({
      margin-bottom: 40px;
    });
    .ss-block({
      flex-direction: column;
      align-items: flex-start;
    });
    .g-btn {
      .ss-block({
        min-width: 230px;
      });
      &:first-child {
        margin-right: 20px;
        .ss-block({
          margin-right: 0;
          margin-bottom: 10px;
        });
      }
    }
  }
  .event-editing {
    margin-bottom: 60px;
  }
  .relations-list {
    .event-wrapper {
      display: flex;
      flex-direction: column;
      &--inner {
        margin-bottom: 30px;
      }
    }
    .event-null {
      display: block;
      font-weight: 600;
      font-size: 2.4rem;
      margin-top: 120px;
      margin-left: 50px;
      .lg-block({
        margin-top: 90px;
      });
      .sm-block({
        margin-left: 0;
        margin-top: 50px;
      });
      .xs-block({
        font-size: 2rem;
        margin-top: 50px;
      });
    }
  }
</style>
