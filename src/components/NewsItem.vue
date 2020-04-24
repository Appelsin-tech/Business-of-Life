<template>
  <article class="news g-panel--img" :class="page">
<!--    <div class="g-icon-circle" v-if="control" :class="status[news.status].class" v-tooltip.left="`${status[news.status].tooltip}`">-->
<!--      <template v-if="status[news.status].class === 'created'">-->
<!--        <icon-close class="g-icon"/>-->
<!--      </template>-->
<!--      <template v-else-if="status[news.status].class === 'public'">-->
<!--        <icon-check class="g-icon"/>-->
<!--      </template>-->
<!--      <template v-else-if="status[news.status].class === 'waiting'">-->
<!--        <img svg-inline class="svg-icon" src="../assets/img/icon/time-my.svg" alt="">-->
<!--      </template>-->
<!--    </div>-->
    <div class="content-news">
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
        <div class="hashtag-wrapper" v-if="false">
          <strong class="g-hashtag" v-for="(hash, index) in hashtag" :key="index">{{hash}}</strong>
        </div>
      </div>
      <div class="wrapper-control" v-if="control">
          <span class="status" :class="status[news.status].class">
            {{status[news.status].tooltip}}
          </span>
        <div class="g-wrapper-btn-f g-wrapper-btn-f--static" >
          <button-app-function icon="icon-lead-pencil" v-tooltip.bottom="'Редактировать'" :to="`/office/news/${news.id}`"></button-app-function>
          <button-app-function icon="icon-delete" v-tooltip.bottom="'Удалить'" @click.native="deleteNews(news.id)"></button-app-function>
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
          tooltip: 'Не опубликована'
        },
        1: {
          class: 'public',
          tooltip: 'Опубликована'
        },
        2: {
          class: 'waiting',
          tooltip: 'Принято на модерацию'
        },
        3: {
          class: 'public',
          tooltip: 'Опубликована'
        },
      },
      hashtag: ['#nayuta', '#crowdsale']
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
    .sm-block({
      margin-bottom: 10px;
    });
    &:last-child {
      margin-bottom: 0;
    }
    &.page-hero {
      .content-news {
        display: flex;
        flex-direction: column;
      }
      .img {
        width: 100%;
        margin-right: 0;
        margin-bottom: 30px;
        height: 260px;
        min-height: 0;
        .lg-block({
          width: 100%;
          height: 200px;
          margin-right: 0;});
        .sm-block({
          margin-bottom: 20px;});
        .ss-block({
          height: 120px;});
      }
      .content-news {
        display: flex;
        flex-direction: column;
        .title-link {
          padding-top: 0;
          padding-right: 40px;
          padding-left: 40px;
          .sm-block({
            padding-left: 20px;
            padding-right: 20px;})
        }
        .info-wrapper {
          padding-left: 40px;
          padding-right: 40px;
          padding-bottom: 40px;
          .sm-block({
            padding-bottom: 20px;
            padding-left: 20px;
            padding-right: 20px;})
        }
      }
    }
    &.page-control {
      .content-news {
        grid-template-columns: min-content 1fr 1fr;
        padding-right: 40px;
        .xl-block({
          padding-right: 20px;});
        .sm-block({
          padding-right: 0;});
        .title-link {
          .sm-block({
            grid-column: ~"2 / 4";;});
        }
        .info-wrapper {
          .sm-block({
            grid-column: ~"1 / 4";});
        }
      }
      .wrapper-control {
        grid-column: ~"3 / 4";
        grid-row: ~"1 / 3";
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        padding: 40px 0;
        .xl-block({
          padding: 30px 0;
        });
        .lg-block({
          padding: 20px 0;
        });
        .sm-block({grid-column: ~"1 / 4"; grid-row: ~"3 / 4";
          padding-top: 0; align-items: flex-start;
          padding-left: 15px;});
        .ss-block({flex-direction: column; align-items: flex-start;});
        .status {
          font-weight: bold;
          .sm-block({
            margin-bottom: 10px;});
          &.public {
            color: var(--app_emphasis__color);
          }
          &.waiting,
          &.past,
          &.created {
            color: var(--app_font-secondary__color);
          }
        }
        .g-wrapper-btn-f {
          margin-bottom: -5px;
          .sm-block({align-self: flex-start;});
        }
      }
    }
    .img {
      flex-shrink: 0;
      margin-right: 50px;
      min-height: 100%;
      width: 360px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: var(--app_image-bg__color);
      grid-row: ~"1 / 3";
      .xl-block({
        width: 320px;
      });
      .lg-block({
        width: 280px;
        margin-right: 30px;
      });
      .sm-block({
        width: 70px;
        height: 70px;
        margin-right: 20px;
        grid-row: ~"1 / 2";
        min-height: 0;
      });
    }
    .content-news {
      display: grid;
      grid-template-columns: min-content 1fr;
      grid-template-rows: min-content 1fr;
      flex-grow: 1;
      .title-link {
        display: block;
        margin-bottom: 30px;
        grid-column: ~"2 / 3";
        padding-top: 40px;
        .xl-block({
          padding-top: 30px;
        });
        .lg-block({
          padding-top: 20px;
          margin-bottom: 20px;
        });
        .sm-block({
          grid-column: ~"2 / 3";
          margin-bottom: 0;});
      }
      .info-wrapper {
        grid-column: ~"2 / 3";
        display: flex;
        flex-direction: column;
        padding-bottom: 40px;
        padding-right: 40px;
        .xl-block({
          padding-right: 20px;
          padding-bottom: 30px;
        });
        .lg-block({
          padding-right: 15px;
          padding-bottom: 20px;
        });
        .sm-block({
          grid-column: ~"1 / 3";
          margin-top: 15px;
          padding-left: 15px;
          padding-right: 15px;
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
        .hashtag-wrapper {
          margin-top: 20px;
          &.control {
            margin-top: 0;
          }
        }
      }
    }
  }
</style>
