<template>
  <section class="p-control-event p-inner-admin">
    <preloader v-if="loading"/>
    <div class="container page">
      <button-app-function class="mb-30" icon="icon-plus-circle" :text="true" to="/office/events/create">Создать</button-app-function>
      <div class="event">
        <panel-event-menu v-for="item in eventsMy" :key="item.name" :item="item" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Preloader from '@/components/ui/Preloader'
import API from '@/api/index'
import ButtonAppFunction from '@/components/ui/ButtonAppFunction'
import PanelEventMenu from '@admin/event/inner/PanelEventMenu'


export default {
  name: 'AdminEventControl',
  components: {
    Preloader,
    ButtonAppFunction,
    PanelEventMenu
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    getImgUrl(src) {
      const image = require(`@/assets/img/${src}.png`)
      return image
    },
    background(img) {
      return !!img ? { backgroundImage: `url(${this.getImgUrl(img)}` } : { backgroundImage: 'none' }
    },
    createEvent() {
      this.loading = true
      API.events.create({title: 'Новое мероприятие'}).then(response => {
        API.response.success('Мероприятие создано')
        this.$router.push({ path: `/office/events/${response.data.id}` })
        this.$store.dispatch('event/getMyEvents')
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    }
  },
  computed: {
    ...mapState('event', [
      'eventsMy'
    ]),
    ...mapGetters('user', [
      'relationEditors'
    ]),
  },
  mounted() {
    if (this.eventsMy.length === 0) {
      this.loading = true
      this.$store.dispatch('event/getMyEvents').then(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .p-control-event {

    .event {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 30px;
      .xxl-block({grid-template-columns: repeat(3, 1fr);});
      .sm-block({grid-template-columns: 1fr; grid-gap: 20px;});
      .xs-block({grid-gap: 10px;});
    }
  }
</style>
