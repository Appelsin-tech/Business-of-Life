<template>
  <section class="p-control-event p-inner-admin">
    <preloader v-if="activePreloader"/>
    <div class="container page">
      <h1 class="g-caption-inner">Управление мероприятиями</h1>
      <div class="event">
        <div class="event-create" v-if="!eventsMy">
          <button-add class="btn-add" @click.native="$router.push({path: '/admin/event-create'})"/>
        </div>
        <div class="item-wrapper" v-else>
          <button-add class="admin-default" v-if="!relationEditors" @click.native="$router.push({path: '/admin/event-create'})"/>
          <router-link class="event__item" v-for="(event, index) in eventsMy" :key="index" :to="`/admin/event-editing/${event.id}`">
            <div class="event__img" :style="{backgroundImage: `url(${event.img})`}">
            </div>
            <p class="g-caption-element">{{event.title}}</p>
          </router-link>
        </div>
      </div>
    </div>
    <div class="container page container--btn-back">
      <router-link to="/admin/menu" class="back-btn">Назад</router-link>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import { mapState, mapGetters } from 'vuex'
import ButtonAdd from '@/components/ui/ButtonAdd'
import Preloader from '@/components/ui/Preloader'
import API from '@/api/index'

export default {
  name: 'AdminEventControl',
  components: {
    ButtonAdd,
    Preloader
  },
  data() {
    return {
      activePreloader: false
    }
  },
  methods: {
    getImgUrl(src) {
      const image = require(`@/assets/img/${src}.png`)
      return image
    },
    background(img) {
      return !!img ? { backgroundImage: `url(${this.getImgUrl(img)}` } : { backgroundImage: 'none' }
    },
    createEvent() {
      this.loading = true
      API.events.create({title: 'Новое мероприятие'}).then(response => {
        API.response.success('Мероприятие создано')
        this.$router.push({ path: `/admin/event-editing/${response.data.id}` })
        this.$store.dispatch('event/getMyEvents')
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    }
  },
  computed: {
    ...mapState('event', [
      'eventsMy'
    ]),
    ...mapGetters('user', [
      'relationEditors'
    ]),
  },
  mounted() {
    if (this.eventsMy.length === 0) {
      this.activePreloader = true
      this.$store.dispatch('event/getMyEvents').then(() => {
        this.activePreloader = false
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .p-control-event {

    .event {
      .event-create {
        .row-flex();
        .lg-block({ justify-content: center;});
      }
      .admin-default {
        .col();
        .size(3);
        .size-xl(4);
        .size-sm(10);
        .size-xs(12);
      }
      .item-wrapper {
        .row-flex();
        .lg-block({ justify-content: center;});
      }
      &__item {
        .col();
        .size(3);
        .size-xl(4);
        .size-sm(10);
        .size-xs(12);
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        .default-panel-style(40px);
        .sm-block({
          margin-bottom: 15px;
          flex-direction: row;
          align-items: center;
        });
        &:hover {
          .g-caption-element {
            text-decoration: none;
          }
        }
        &--past {
          box-shadow: none;
          background: none;
          border-radius: 0;
        }
      }
      &__img {
        position: relative;
        margin-bottom: 40px;
        height: 240px;
        width: 240px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        transition: 0.3s;
        background-color: @colorBorder;
        .to(1430px, { width: auto;});
        .lg-block({
          height: 220px;
          margin-bottom: 30px;
        });
        .md-block({
          height: 210px;
        });
        .sm-block({
          width: 70px;
          height: 70px;
          margin-bottom: 0;
          margin-right: 20px;
          flex-shrink: 0
        });
        .xs-block({
          width: 40px;
          height: 40px;
        });
        &:hover {
          .img-link--change {
            opacity: 1;
          }
          .img-link--add {
            .img-link__icon {
              path {
                fill: #000;
              }
            }
            .img-link__text {
              color: #000;
            }
          }
        }
        .img-link {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
          &--add {
            z-index: 1;
            background-color: @colorBgGray;
            .img-link__icon {
              path {
                fill: #d7d7d7;
              }
            }
            .img-link__text {
              color: #d7d7d7;
            }
          }
          &--change {
            opacity: 0;
            background: rgba(226,58,58,0.8);
            .img-link__icon {
              path {
                fill: #fff;
              }
            }
            .img-link__text {
              color: #fff;
            }
          }
          &__icon {
            margin-bottom: 15px;
            width: 50px;
            height: 50px;
            path {
              transition: 0.3s;
            }
          }
          &__text {
            font-size: 1.6rem;
            font-weight: 400;
            text-decoration: underline;
            transition: 0.3s;
          }
        }
      }
      &__title {
        font-weight: 800;
        font-size: 2rem;
        text-transform: uppercase;
        text-decoration: underline;
        color: #000;
        .md-block({font-size: 1.6rem;});
        &:hover {
          text-decoration: none;
        }
      }
      &__ticket-sold {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &-text {
          display: block;
          margin-bottom: 10px;
          font-weight: 400;
          color: @colorSecondFonts;
        }
        &-number {
          font-size: 2.6rem;
          font-weight: 800;
        }
      }
    }
    .past-events {
      .row-flex();
      .lg-block({ justify-content: center;});
    }
    .g-btn--event-pasts {
      width: 100%;
      justify-content: center;
      span {
        position: relative;
        margin-left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 0;
      }
    }
  }
</style>
