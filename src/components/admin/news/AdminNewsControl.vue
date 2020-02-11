<template>
  <section class="p-news-control p-default-block">
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class="container">
      <h1 class="g-caption-inner">Управление новостями</h1>
      <button-add class="row" @click.native="$router.push('/admin/news-create')"/>
      <news-item v-for="news in newsData" :news="news" :control="true" :key="news.id"/>
      <router-link :to='`/admin/menu`' class='back-btn'>Назад</router-link>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '@/components/BreadCrumbs'
import ButtonAdd from '@/components/ui/ButtonAdd'
import NewsItem from '@/components/NewsItem'

export default {
  name: 'AdminNewsControl',
  components: {
    BreadCrumbs,
    ButtonAdd,
    NewsItem
  },
  data() {
    return {
      breadCrumbs: [
        {
          path: '/admin/menu',
          title: 'Личный кабинет'
        }
      ],
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
        },
      ],
    }
  },
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
</style>
