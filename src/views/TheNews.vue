<template>
  <section class="p-news p-default p-default-inner">
    <bread-crumbs :arrCrumbs="[]"/>
    <div class="container">
      <h1 class="g-caption g-caption-inner">Новости</h1>
      <div class="news-wrapper">
        <article class="news" v-for="(news, index) in  newsData" :key="index">
          <div class="img" :style="{backgroundImage: `url(${news.img})`}"></div>
          <div class="content">
            <a href="#" class="title-link">
              <h1 class="title">{{news.title}}</h1>
            </a>
            <div class="data">
              <img class="svg-icon" svg-inline src="../assets/img/icon/clock.svg" alt="">
              <span>{{news.data}}</span>
            </div>
            <p class="desc">{{news.desc}}</p>
            <div class="hash-wrapper">
              <strong class="hashtag" v-for="(hash, index) in news.hashtag" :key="index">{{hash}}</strong>
            </div>
          </div>
        </article>
      </div>
      <div class="more">
        Показать больше
      </div>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '../components/BreadCrumbs'

export default {
  name: 'TheNews',
  components: {
    BreadCrumbs
  },
  data() {
    return {
      newsData: [
        {
          title: 'Business of Life открывает раздел новостей',
          img: 'https://api.businessof.life/event.jpg',
          data: '15.12.2019 10:00',
          desc: 'На старт семинарах вы получите четкие рекомендации, услышите удивительные истории о том, как действуют профи. Вы лично сможете познакомиться и пообщаться с состоявшимися сетевиками, избежать ошибок и отказаться от ненужных экспериментов.',
          hashtag: ['#новостьдня', '#nayuta', '#разработка']
        },
        {
          title: 'Business of Life открывает раздел новостей',
          img: 'https://api.businessof.life/event.jpg',
          data: '15.12.2019 10:00',
          desc: 'На старт семинарах вы получите четкие рекомендации, услышите удивительные истории о том, как действуют профи. Вы лично сможете познакомиться и пообщаться с состоявшимися сетевиками, избежать ошибок и отказаться от ненужных экспериментов.',
          hashtag: ['#новостьдня', '#nayuta', '#разработка']
        },
        {
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
    .news-wrapper {
      margin-bottom: 30px;
      .sm-block({
        margin-bottom: 20px;
      });
      .news {
        display: flex;
        padding: 40px;
        margin-bottom: 20px;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        &:last-child {
          margin-bottom: 0;
        }
        .sm-block({
          padding: 25px;
          margin-bottom: 10px;
          box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        });
        .xs-block({
          padding: 18px;
        });
        .img {
          flex-shrink: 0;
          margin-right: 50px;
          height: 260px;
          width: 360px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-color: #f3f3f3;
          .lg-block({
            width: 280px;
            height: 200px;
            margin-right: 30px;
          });
          .sm-block({
            display: none;
          })
        }
        .content {
          display: flex;
          flex-direction: column;
          .title-link {
            display: block;
            margin-bottom: 30px;
            color: #000;
            .lg-block({
              margin-bottom: 20px;
            });
            .xs-block({
              margin-bottom: 10px;
            });
            .title {
              font-size: 2.2rem;
              font-weight: 800;
              text-transform: uppercase;
              text-decoration: underline;
              .lg-block({
                font-size: 2rem;
              });
              .xs-block({
                font-size: 1.8rem;
              });
              &:hover {
                text-decoration: none;
              }
            }
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
          .desc {
            margin-bottom: auto;
            font-size: 1.6rem;
            line-height: 2.5rem;
          }
          .hash-wrapper {
            margin-top: 15px;
            .xs-block({
              margin-top: 10px;
            });
          }
        }
      }
    }
    .more {
      margin-bottom: auto;
      padding: 20px;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 2rem;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
      border-radius: 10px;
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
