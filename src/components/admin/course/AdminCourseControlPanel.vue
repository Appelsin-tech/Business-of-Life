<template>
  <article class="course">
      <router-link class="content-wrapper" :to="`/knowledge/${course.id}`">
        <div class="img" :style="{backgroundImage: `url(${course.img})`}">
        </div>
        <p class="g-caption-element">{{course.title}}</p>
      </router-link>
      <div class="icon-wrapper">
        <template v-if="statusTest[course.status].class === 'waiting'">
          <div class="g-icon-circle" :class="statusTest[course.status].class" v-tooltip.bottom="statusTest[course.status].tooltip">
            <img svg-inline class="svg-icon" src="@/assets/img/icon/time-my.svg" alt="">
          </div>
        </template>
        <template  v-else-if="statusTest[course.status].class === 'public'">
          <div class="g-icon-circle" :class="statusTest[course.status].class" v-tooltip.bottom="statusTest[course.status].tooltip">
            <icon-check class="g-icon"/>
          </div>
        </template>
        <template  v-else-if="statusTest[course.status].class === 'close'">
          <div class="g-icon-circle" :class="statusTest[course.status].class" v-tooltip.bottom="statusTest[course.status].tooltip">
            <icon-close class="g-icon"/>
          </div>
        </template>
        <template v-else>
          <div class="g-icon-circle" :class="statusTest[course.status].class" v-tooltip.bottom="statusTest[course.status].tooltip">
            <icon-close class="g-icon"/>
          </div>
        </template>
        <div class="g-control-icon static">
          <button class="g-icon-circle g-icon-circle--control g-icon-circle--control-green" v-tooltip.bottom="'Редактировать курс'" @click="$router.push({path: `/admin/course-editing/${course.id}`})">
            <icon-lead-pencil class="g-icon"/>
          </button>
          <button class="g-icon-circle g-icon-circle--control g-icon-circle--control-red" v-tooltip.bottom="'Удалить курс'" @click="deleteCourse(course.id)">
            <icon-delete class="g-icon"/>
          </button>
        </div>
      </div>
  </article>
</template>

<script>
import API from '@/api/index'
import { mapState } from 'vuex'

export default {
  name: 'AdminCourseControlPanel',
  props: ['course'],
  components: {},
  data() {
    return {
      statusTest: {
        0: {
          class: 'created',
          tooltip: 'Курс не опубликован'
        },
        1: {
          class: 'public',
          tooltip: 'Курс опубликован'
        },
      },
      status: {
        0: {
          class: 'created',
          tooltip: 'Курс не опубликован'
        },
        1: {
          class: 'waiting',
          tooltip: 'Отправлено на модерацию'
        },
        2: {
          class: 'waiting',
          tooltip: 'Принято на модерацию'
        },
        3: {
          class: 'public',
          tooltip: 'Курс опубликован'
        },
      }
    }
  },
  computed: {
    ...mapState('courses', [
      'coursesMy'
    ]),
  },
  methods: {
    getImgUrl(src) {
      const image = require(`@/assets/img/${src}.png`)
      return image
    },
    background(img) {
      !!img ? { backgroundImage: `url(${this.getImgUrl(img)}` } : { backgroundImage: 'none' }
    },
    deleteCourse(id) {
      API.courses.courses.delete({ id: id }).then(() => {
        API.response.success('Курс удален')
        this.$store.dispatch('courses/getMyCourses')
      })
    },
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .item-wrapper {
    .row-flex();
    .lg-block({
      justify-content: center;
    });
  }
  .course {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    .default-panel-style(40px);
    .sm-block({
      margin-bottom: 15px;
    });
    .content-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 25px;
      .sm-block({
        margin-bottom: 20px;
        flex-direction: row;
        align-items: center;
      });
      &:hover {
        .g-caption-element {
          text-decoration: none;
        }
      }
    }
    .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
    }
    .img {
      position: relative;
      margin-bottom: 40px;
      height: 240px;
      width: 240px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      transition: 0.3s;
      background-color: @colorBorder;
      .to(1430px, {
        width: auto;
      });
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
            color: #000;
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
            color: #d7d7d7;
          }
          .img-link__text {
            color: #d7d7d7;
          }
        }
        &--change {
          opacity: 0;
          background: rgba(226, 58, 58, 0.8);
          .img-link__icon {
            color: #fff;
          }
          .img-link__text {
            color: #fff;
          }
        }
        &__icon {
          margin-bottom: 15px;
          width: 50px;
          height: 50px;
          transition: 0.3s;
        }
        &__text {
          font-size: 1.6rem;
          font-weight: 400;
          text-decoration: underline;
          transition: 0.3s;
        }
      }
    }
  }
</style>
