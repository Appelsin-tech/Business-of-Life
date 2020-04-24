<template>
  <section class="p-news-control p-inner-admin">
    <preloader v-if="loading"/>
    <div class="container page">
      <button-app-function class="mb-30" icon="icon-plus-circle" :text="true" @click.native="createNews">Создать</button-app-function>
      <div class="news-wrapper" v-if="isMyNews && isMyNews.length !== 0">
        <news-item v-for="news in isMyNews" :news="news" page="page-control" :control="true" :key="news.id"/>
      </div>
      <panel-info v-else>Новостей Нет</panel-info>
    </div>
  </section>
</template>

<script>
import ButtonAppFunction from '@/components/ui/ButtonAppFunction'
import NewsItem from '@/components/NewsItem'
import Preloader from '@/components/ui/Preloader'
import PanelInfo from '@/components/ui/PanelInfo'
import { mapGetters } from 'vuex'
import API from '@/api/index'

export default {
  name: 'AdminNewsControl',
  components: {
    NewsItem,
    Preloader,
    PanelInfo,
    ButtonAppFunction
  },
  data() {
    return {
      loading: false,
      newsData: [
        {
          id: 1,
          title: 'Business of Life открывает раздел новостей',
          img: 'https://api.businessof.life/event.jpg',
          data: '15.12.2019 10:00',
          desc: 'На старт семинарах вы получите четкие рекомендации, услышите удивительные истории о том, как действуют профи. Вы лично сможете познакомиться и пообщаться с состоявшимися сетевиками, избежать ошибок и отказаться от ненужных экспериментов.',
          status: 0,
          hashtag: ['#новостьдня', '#nayuta', '#разработка']
        },
        {
          id: 2,
          title: 'Business of Life открывает раздел новостей',
          img: 'https://api.businessof.life/event.jpg',
          data: '15.12.2019 10:00',
          desc: 'На старт семинарах вы получите четкие рекомендации, услышите удивительные истории о том, как действуют профи. Вы лично сможете познакомиться и пообщаться с состоявшимися сетевиками, избежать ошибок и отказаться от ненужных экспериментов.',
          status: 1,
          hashtag: ['#новостьдня', '#nayuta', '#разработка']
        },
        {
          id: 3,
          title: 'Business of Life открывает раздел новостей',
          img: 'https://api.businessof.life/event.jpg',
          data: '15.12.2019 10:00',
          desc: 'На старт семинарах вы получите четкие рекомендации, услышите удивительные истории о том, как действуют профи. Вы лично сможете познакомиться и пообщаться с состоявшимися сетевиками, избежать ошибок и отказаться от ненужных экспериментов.',
          status: 2,
          hashtag: ['#новостьдня', '#nayuta', '#разработка']
        }
      ]
    }
  },
  computed: {
    ...mapGetters('news', [
      'isMyNews'
    ])
  },
  methods: {
    createNews() {
      this.loading = true
      API.news.create({title: 'Новая новость'}).then(response => {
        API.response.success('Новость создана')
        this.$router.push(`/office/news/${response.id}`)
        this.$store.dispatch('news/getMyNews')
        this.loading = false
      })
    }
  },
  mounted() {
    if (this.isMyNews === null) {
      this.loading = true
      this.$store.dispatch('news/getMyNews').then(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .p-news-control {
    .button-create {
      height: auto;
    }
  }
</style>
