<template>
  <section class="p-news p-default-block">
    <preloader v-if="loading"/>
    <bread-crumbs/>
    <div class="container">
      <h1 class="g-caption-inner">Новости</h1>
      <div class="news-wrapper" v-if="isNews && isNews.length !== 0">
        <news-item v-for="news in isNews" :news="news" :key="news.id"/>
<!--        <div class="more">-->
<!--          Показать больше-->
<!--        </div>-->
      </div>
      <panel-info v-else>Новостей Нет</panel-info>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '../components/BreadCrumbs'
import NewsItem from '../components/NewsItem'
import Preloader from '@/components/ui/Preloader'
import { mapGetters } from 'vuex'
import PanelInfo from '@/components/ui/PanelInfo'

export default {
  name: 'TheNews',
  components: {
    BreadCrumbs,
    NewsItem,
    Preloader,
    PanelInfo
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
          hashtag: ['#новостьдня', '#nayuta', '#разработка']
        },
        {
          id: 2,
          title: 'Business of Life открывает раздел новостей',
          img: 'https://api.businessof.life/event.jpg',
          data: '15.12.2019 10:00',
          desc: 'На старт семинарах вы получите четкие рекомендации, услышите удивительные истории о том, как действуют профи. Вы лично сможете познакомиться и пообщаться с состоявшимися сетевиками, избежать ошибок и отказаться от ненужных экспериментов.',
          hashtag: ['#новостьдня', '#nayuta', '#разработка']
        },
        {
          id: 3,
          title: 'Business of Life открывает раздел новостей',
          img: 'https://api.businessof.life/event.jpg',
          data: '15.12.2019 10:00',
          desc: 'На старт семинарах вы получите четкие рекомендации, услышите удивительные истории о том, как действуют профи. Вы лично сможете познакомиться и пообщаться с состоявшимися сетевиками, избежать ошибок и отказаться от ненужных экспериментов.',
          hashtag: ['#новостьдня', '#nayuta', '#разработка']
        },
      ]
    }
  },
  computed: {
    ...mapGetters('news', [
      'isNews'
    ])
  },
  methods: {},
  mounted() {
    if(this.isNews === null) {
      this.loading = true
      this.$store.dispatch('news/getNews').then(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";

  .p-news {
    .more {
      margin-bottom: auto;
      padding: 20px;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 2rem;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      text-align: center;
      cursor: pointer;
      text-decoration: underline;
      &:hover {
        text-decoration: none;
      }
      .sm-block({
        padding: 15px;
        font-size: 1.6rem;
        border-radius: 5px;
      })
    }
  }
</style>
