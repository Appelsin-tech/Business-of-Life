<template>
  <section class="p-news-full p-default p-default-inner">
    <div class="container">
      <news-status :idStatus="3"/>
      <div class="img" :style="{backgroundImage: `url(https://picsum.photos/1000)`}"></div>
    </div>
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class="container">
      <h1 class="g-caption g-caption-inner">Бизнес-акселератор и краудфандинговая платформа Crowdsale Network проводит
        акцию на бирже coins.bit</h1>
      <div class="data">
        <img class="svg-icon" svg-inline src="../assets/img/icon/clock.svg" alt="">
        <span>15 декабря 2019 г. 10:00</span>
      </div>
      <social-sharing-my :shareObject="news"/>
      <div class="text-wrapper editor" v-html="news.description"></div>
      <div class="hash-wrapper">
        <span class="desc">Теги:</span>
        <div>
          <strong class="hashtag" v-for="(hash, index) in news.tags" :key="index">{{hash}}</strong>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import NewsStatus from '../components/NewsStatus'
import BreadCrumbs from '../components/BreadCrumbs'
import SocialSharingMy from '../components/SocialSharingMy'

export default {
  name: 'TheNewsFull',
  components: {
    NewsStatus,
    BreadCrumbs,
    SocialSharingMy
  },
  data() {
    return {
      breadCrumbs: [
        {
          path: '/news',
          title: 'Новости'
        }
      ],
      news: {
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
      background-color: #f3f3f3;
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
          fill: @colorMainRed;
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
      .hashtag {
        display: inline-block;
        margin-right: 10px;
        font-weight: 800;
        font-size: 1.8rem;
        line-height: 2.5rem;
        color: @colorBlue;
        text-decoration: underline;
        cursor: pointer;
        .xs-block({
          font-size: 1.6rem;
          margin-right: 5px;
        });
        &:hover {
          text-decoration: none;
        }
      }
    }
  }
</style>
