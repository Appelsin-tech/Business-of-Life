<template>
  <section class="p-news p-default p-default-inner">
    <bread-crumbs/>
    <div class="container">
      <h1 class="g-caption-inner">Новости</h1>
      <news-item v-for="news in newsData" :news="news" :key="news.id"/>
      <div class="more">
        Показать больше
      </div>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '../components/BreadCrumbs'
import NewsItem from '../components/NewsItem'

export default {
  name: 'TheNews',
  components: {
    BreadCrumbs,
    NewsItem
  },
  data() {
    return {
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
  computed: {},
  methods: {}
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
