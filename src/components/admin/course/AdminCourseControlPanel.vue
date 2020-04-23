<template>
  <article class="course g-panel--img">
      <router-link class="content-wrapper" :to="`/knowledge/${course.id}`">
        <div class="img" :style="{backgroundImage: `url(${course.img})`}"></div>
        <p class="g-caption-element">{{course.title}}</p>
      </router-link>
    <div class="content">
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
      <div class="g-wrapper-btn-f g-wrapper-btn-f--static">
        <button-app-function icon="icon-lead-pencil" v-tooltip.bottom="'Редактировать курс'" :to="`/office/courses/${course.id}`"></button-app-function>
        <button-app-function icon="icon-delete" v-tooltip.bottom="'Удалить курс'" v-if="course.status !== 1" @click.native="deleteCourse(course.id)"></button-app-function>
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
  .course {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    .sm-block({
      margin-bottom: 15px;
    });
    .content-wrapper {
      .sm-block({
        display: flex;
        margin-bottom: 20px;
        align-items: center;});
      &:hover {
        .g-caption-element {
          text-decoration: none;
        }
      }
      .img {
        position: relative;
        margin-bottom: 20px;
        height: 240px;
        width: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        transition: 0.3s;
        background-color: @colorBorder;
        .lg-block({
          height: 220px;
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
      }
      .g-caption-element {
        margin-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
        .sm-block({
          margin-bottom: 0;});
      }
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px 20px;
    }
    .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
    }
  }
</style>
