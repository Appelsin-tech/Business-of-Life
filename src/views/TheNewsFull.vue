<template>
  <section class="p-news-full p-default-block">
    <preloader v-if="loading"/>
    <status-preview v-if="myNews" :idStatus="statusMyNews" :idNews="news.id" section="news" @newStatus="statusInfo"/>
    <div class="container">
      <div class="img-wrapper" v-if="!loading">
        <div class="img" :style="{backgroundImage: `url(${news.img})`}" ></div>
      </div>
    </div>
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class="container" v-if="!loading">
      <h1 class="g-caption-inner">{{news.title}}</h1>
      <div class="data">
        <img class="svg-icon" svg-inline src="../assets/img/icon/clock.svg" alt="">
        <span>{{(news.published * 1000) | moment("DD.MM.YYYY HH.mm")}}</span>
      </div>
      <social-sharing-my :shareObject="news"/>
      <div class="text-wrapper editor" v-html="news.content"></div>
      <div class="hash-wrapper" v-if="news.hashtag">
        <span class="desc">Теги:</span>
        <div>
          <strong class="g-hashtag" v-for="(hash, index) in newsTest.tags" :key="index">{{hash}}</strong>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import API from '@/api/index'
import Preloader from '@/components/ui/Preloader'
import { mapGetters } from 'vuex'
import Vue from 'vue'
import BreadCrumbs from '@/components/BreadCrumbs'
import SocialSharingMy from '@/components/SocialSharingMy'
const SocialSharing = require('vue-social-sharing')
Vue.use(SocialSharing)

export default {
  name: 'TheNewsFull',
  components: {
    StatusPreview: () => import('@/components/StatusPreview'),
    BreadCrumbs,
    SocialSharingMy,
    Preloader
  },
  data() {
    return {
      loading: true,
      breadCrumbs: [
        {
          path: '/news',
          title: 'Новости'
        }
      ],
      news: null,
      myNews: false,
      statusPublished: null
    }
  },
  computed: {
    ...mapGetters('news', [
      'isMyNews'
    ]),
    ...mapGetters('user', [
      'status'
    ]),
    statusMyNews () {
      return this.$store.getters[`news/statusMyNews`](this.news.id)
    }
  },
  methods: {
    getNewsFull() {
      API.news.info(this.$route.params.url).then(response => {
        this.news = response
        this.loading = false
        this.statusInfo()
      }).catch(e => console.log(e))
    },
    statusInfo () {
      if (this.status > 1) {
        this.$store.dispatch('news/getMyNews').then(() => {
          if (this.isMyNews.some(item => item.id === this.news.id)) {
            this.myNews = true
          }
        })
      }
    },
  },
  mounted() {
    this.getNewsFull()
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .p-news-full {
    .img {
      margin-bottom: 20px;
      height: 300px;
      width: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: @colorBgGray;
      .lg-block({
        height: 200px;
      });
      .sm-block({

      })
    }
    .breadcrumbs {
      padding-left: 0;
    }
    .data {
      display: inline-flex;
      align-items: center;
      margin-bottom: 30px;
      .lg-block({
        margin-bottom: 20px;
      });
      .xs-block({
        margin-bottom: 10px;
      });
      .svg-icon {
        margin-right: 10px;
        width: 20px;
        height: 20px;
        flex-shrink: 0;
        .sm-block({
          width: 15px;
          height: 15px;
          margin-top: 0;
        });
        path {
          fill: @colorMain;
        }
      }
    }
    .text-wrapper {
      margin-top: 50px;
      margin-bottom: 50px;
      .sm-block({
        margin-bottom: 30px;
        margin-top: 30px;
      });
    }
    .hash-wrapper {
      display: flex;
      align-items: baseline;
      .desc {
        display: inline-block;
        margin-right: 20px;
        font-weight: 800;
        font-size: 2.6rem;
        text-transform: uppercase;
        .xs-block({font-size: 2rem; margin-right: 12px;});
      }
    }
  }
</style>
