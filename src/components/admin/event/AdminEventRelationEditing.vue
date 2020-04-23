<template>
  <section class="p-event-all-editing p-inner-admin">
    <preloader v-if="activePreloader"/>
    <div class="container page">
      <div class="event-editing" v-if="checkMyEvent">
        <h2 class="g-caption-section" >
          <template v-if="event">Редактирование мероприятия</template>
          <template v-else>Создание мероприятия</template>
        </h2>
        <event-editing-form :idEvent="event" :event="myEvent" :btnDelete="showButtonDelete"/>
      </div>
      <div class="relations-list">
        <h2 class="g-caption-section">Редактирование событий</h2>
        <button-add v-if="checkMyEvent" :class="'row'" @click.native="$router.push({path: `/office/events/${event}/relation/create`})"/>
        <div class="event-wrapper" v-if="showRelations === 1">
          <div class="event-wrapper--inner">
            <admin-relation-item v-for="(relation, i) in myFutureEvents" :key="relation.id" :relation="relation" :idEvent="event" v-on:delete-relation="deleteRelation" :checkMyEvent="checkMyEvent"/>
          </div>
          <h3 class="g-caption-section">Прошедшие события</h3>
          <div class="event-wrapper--inner" v-if="myPastEvents.length">
            <admin-relation-item  v-for="(relation, i) in myPastEvents" :key="relation.id" :relation="relation" :idEvent="event" v-on:delete-relation="deleteRelation" :pastEvents="true" :checkMyEvent="checkMyEvent"/>
          </div>
          <panel-info v-if="!myPastEvents.length">
            У вас еще нет прошедших событий
          </panel-info>
        </div>
        <panel-info v-if="showPanelRelation">Чтобы создать событие - заполните информацию о мероприятии</panel-info>
      </div>
    </div>
  </section>
</template>

<script>
import API from '@/api/index'
import { mapState, mapGetters } from 'vuex'
import EventEditingForm from '@admin/event/EventEditingForm'
import PanelInfo from '@/components/ui/PanelInfo'
import ButtonAdd from '@/components/ui/ButtonAdd'
import AdminRelationItem from '@admin/event/inner/AdminRelationItem'
import Preloader from '@/components/ui/Preloader'

export default {
  name: 'AdminEventRelationEditing',
  props: ['event'],
  components: {
    EventEditingForm,
    PanelInfo,
    ButtonAdd,
    AdminRelationItem,
    Preloader
  },
  data() {
    return {
      myEvent: false,
      myFutureEvents: [],
      myPastEvents: [],
      showRelations: 2,
      activePreloader: false
    }
  },
  computed: {
    ...mapState('event', [
      'eventsMy'
    ]),
    ...mapGetters('user', [
      'editor',
      'myId'
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
    // является ли это мероприятие моим
    checkMyEvent () {
      return this.event ? this.myEvent.owner_id === this.myId : true
    },
    showPanelRelation () {
      return this.checkUserEditor ? false : this.showRelations === 2
    }
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
    filterRelations () {
      this.myEvent.relations.forEach(item => {
        let currentMoment = this.$moment()
        let itemStamp = item.stamp * 1000
        if (this.editor.find(relation => relation.id === item.id)) {
          if (currentMoment - itemStamp > 0 && item.status === 3) {
            item.status = 4
            this.myPastEvents.unshift(item)
          } else {
            this.myFutureEvents.push(item)
          }
        }
      })
    },
    getInfoEvent () {
      API.events.info({ id: this.event }).then(response => {
        this.myEvent = response.data
        this.filterRelations()
        this.activePreloader = false
        if (this.myEvent.relations.length !== 0) {
          this.showRelations = 1
        } else {
          this.showRelations = 0
        }
      })
    },
  },
  mounted() {
    if (this.event) {
      this.activePreloader = true
      this.getInfoEvent()
    }
  },
  watch: {
    '$route'(to, from) {
      if (this.event) {
        API.events.info({ id: this.event }).then(response => {
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
  @import "~@/assets/less/_importants";
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
    .btn-app {
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
