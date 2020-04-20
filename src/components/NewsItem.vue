<template>
  <article class="news g-panel g-panel--img" :class="page">
    <div class="g-icon-circle" v-if="control" :class="status[news.status].class" v-tooltip.left="`${status[news.status].tooltip}`">
      <template v-if="status[news.status].class === 'created'">
        <icon-close class="g-icon"/>
      </template>
      <template v-else-if="status[news.status].class === 'public'">
        <icon-check class="g-icon"/>
      </template>
      <template v-else-if="status[news.status].class === 'waiting'">
        <img svg-inline class="svg-icon" src="../assets/img/icon/time-my.svg" alt="">
      </template>
    </div>
    <div class="content">
      <div class="img" :style="{backgroundImage: `url(${news.img})`}"></div>
      <router-link :to="`/news/${news.url}`" class="title-link">
        <h1 class="g-caption-element">{{news.title}}</h1>
      </router-link>
      <div class="info-wrapper">
        <div class="data">
          <icon-clock-outline class="g-icon"/>
          <span>{{(news.published * 1000) | moment("DD.MM.YYYY HH.mm")}}</span>
        </div>
        <p class="desc editor">{{news.snippet}}</p>
        <div class="hash-wrapper">
          <div class="hashtag-wrapper" v-if="news.hashtag" :class="{'control': control}">
            <strong class="g-hashtag" v-for="(hash, index) in news.hashtag" :key="index">{{hash}}</strong>
          </div>
          <div class="g-wrapper-btn-f g-wrapper-btn-f--static" v-if="control">
            <button-app-function icon="icon-lead-pencil" v-tooltip.bottom="'Редактировать'" :to="`/admin/news-editing/${news.id}`"></button-app-function>
            <button-app-function icon="icon-delete" v-tooltip.bottom="'Удалить'" @click.native="deleteNews(news.id)"></button-app-function>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import API from '@/api/index'

export default {
  name: 'NewsItem',
  props: {
    news: {},
    control: {
      default: false
    },
    page: {
      required: false,
      default: 'page-news'
    }
  },
  data() {
    return {
      status: {
        0: {
          class: 'created',
          tooltip: 'Новость не опубликована'
        },
        1: {
          class: 'public',
          tooltip: 'Опубликовано'
        },
        2: {
          class: 'waiting',
          tooltip: 'Принято на модерацию'
        },
        3: {
          class: 'public',
          tooltip: 'Опубликовано'
        },
        4: {
          class: 'past',
          tooltip: 'Прошедшее событие'
        }
      }
    }
  },
  methods: {
    deleteNews(id) {
      API.news.delete({id: id}).then(response => {
        API.response.success('Новость удалена')
        this.$store.dispatch('news/getMyNews')
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .news {
    display: flex;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .sm-block({
      margin-bottom: 10px;
    });
    &.page-hero {
      .img {
        width: 100%;
        margin-right: 0;
        margin-bottom: 30px;
        .lg-block({
          width: 100%;
          margin-right: 0;});
        .sm-block({
          width: 100%;
          margin-bottom: 20px;
          height: 120px;
          margin-right: 0;});
      }
      .content {
        display: flex;
        flex-direction: column;
      }
    }
    .img {
      flex-shrink: 0;
      margin-right: 50px;
      height: 260px;
      width: 360px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: var(--app_image-bg__color);
      grid-row: ~"1 / 3";
      .lg-block({
        width: 280px;
        height: 200px;
        margin-right: 30px;
      });
      .sm-block({
        width: 70px;
        height: 70px;
        margin-right: 20px;
        grid-row: ~"1 / 2";
      });
      .xs-block({
        width: 40px;
        height: 40px;
      });
    }
    .content {
      display: grid;
      grid-template-columns: min-content 1fr;
      grid-template-rows: min-content 1fr;
      flex-grow: 1;
      .title-link {
        display: block;
        margin-bottom: 30px;
        grid-column: ~"2 / 3";
        .lg-block({
          margin-bottom: 20px;
        });
        .sm-block({
          margin-bottom: 0;});
        .title {
          font-size: 2.2rem;
          font-weight: 800;
          text-transform: uppercase;
          text-decoration: underline;
          .sm-block({
            padding-top: 5px;
          });
          &:hover {
            text-decoration: none;
          }
        }
      }
      .info-wrapper {
        grid-column: ~"2 / 3";
        display: flex;
        flex-direction: column;
        .sm-block({
          grid-column: ~"1 / 3";
          margin-top: 15px;
        });
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
          .g-icon {
            margin-right: 10px;
            width: 20px;
            height: 20px;
            flex-shrink: 0;
            .sm-block({
              width: 15px;
              height: 15px;
              margin-top: 0;
            });
          }
        }
        .desc {
          margin-bottom: auto;
        }
        .hash-wrapper {
          margin-top: 15px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .ss-block({flex-direction: column; align-items: flex-start;});
          .xs-block({
            margin-top: 10px;
          });
          .hashtag-wrapper.control {
            .ss-block({margin-bottom: 30px;});
          }
        }
      }
    }
  }
</style>
