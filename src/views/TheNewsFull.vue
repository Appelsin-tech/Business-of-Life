<template>
  <section class="p-news-full p-default-block">
    <preloader v-if="loading"/>
    <status-preview :idStatus="3" v-if="myNews"/>
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
import StatusPreview from '@/components/StatusPreview'
import BreadCrumbs from '@/components/BreadCrumbs'
import SocialSharingMy from '@/components/SocialSharingMy'
const SocialSharing = require('vue-social-sharing')
Vue.use(SocialSharing)

export default {
  name: 'TheNewsFull',
  components: {
    StatusPreview,
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
      newsTest: {
        title: 'Бизнес-акселератор и краудфандинговая платформа Crowdsale Network',
        tags: ['#nayuta', '#новостьдня', '#хэштег'],
        description: `
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus assumenda blanditiis error excepturi in ipsam ipsum nam nesciunt, nobis odio porro suscipit vero voluptates. Beatae consequatur dolorem esse fuga iusto nostrum possimus, quo saepe suscipit unde voluptas, voluptatem. Libero, voluptatibus?</p><br>
          <a href="#">nayuta.coin</a>
          <h2>Title</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi architecto at dolor error impedit modi officiis quam ratione veritatis!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad, architecto blanditiis consequuntur dolorum ducimus eius error fuga, fugit ipsum, possimus quasi quibusdam ratione recusandae sapiente suscipit veritatis vero? Corporis ducimus facilis illum molestias officiis omnis pariatur soluta? Ad id incidunt quasi quod repellat vel. Enim harum nemo officiis quisquam vero! Accusantium commodi cum debitis, deleniti earum enim fuga ipsum iste minima nam possimus qui quis rem suscipit unde, vitae, voluptate. Adipisci alias aliquam aperiam autem debitis distinctio dolores fugit labore mollitia neque odit, optio quas qui, quidem repellendus repudiandae saepe sequi tenetur ut vel? Dicta expedita itaque iusto quibusdam?</p>
        `
      }
    }
  },
  computed: {
    ...mapGetters('news', [
      'isMyNews'
    ]),
    ...mapGetters('user', [
      'status'
    ])
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
