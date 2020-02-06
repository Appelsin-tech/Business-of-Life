<template>
  <section class="p-event-all-editing p-default-block">
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class="container page">
      <h1 class="g-caption-inner">Курс</h1>
      <div class="course-editing">
        <h2 class="g-caption-section">
          <template v-if="id">Редактирование курса</template>
          <template v-else>Создание курса</template>
        </h2>
        <course-editing-form :idCourse="id" :course="myCourse" :btnDelete="showButtonDelete"/>
      </div>
      <div class="lesson-list">
        <h2 class="g-caption-section">Редактирование уроков</h2>
        <div class="lesson-wrapper ">
          <div class="item item-btn" :class="counterLesson === 1 ? '' : 'line'">
            <span class="counter-lesson">{{counterLesson}}</span>
            <button-add class="row" @click.native.prevent="$router.push(`/admin/lesson/${id}`)"></button-add>
          </div>
          <div v-if="counterLesson !== 1">
            <admin-course-lesson-editing-lesson  v-for="(lesson, index) in reverseLesson" :key="lesson.id" :course="id" :lesson="lesson" :counter="counterLesson - index - 1" v-on:delete-lesson="getInfoCourse"/>
          </div>
        </div>
        <router-link to="/admin/course-control" class="back-btn">Назад</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import API from '@/api/index'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import { mapState, mapGetters } from 'vuex'
import CourseEditingForm from '@admin/course/CourseEditingForm'
import PanelInfo from '@/components/ui/PanelInfo'
import ButtonAdd from '@/components/ui/ButtonAdd'
import AdminCourseLessonEditingLesson from '@admin/course/AdminCourseLessonEditingLesson'

export default {
  name: 'AdminCourseLessonEditing',
  props: ['id'],
  components: {
    BreadCrumbs,
    CourseEditingForm,
    PanelInfo,
    ButtonAdd,
    AdminCourseLessonEditingLesson
  },
  data() {
    return {
      breadCrumbs: [
        {
          path: '/admin/menu',
          title: 'Личный кабинет'
        },
        {
          path: '/admin/course-control',
          title: 'Редактирование курсов'
        }
      ],
      myCourse: null,
      showButtonDelete: true,
    }
  },
  computed: {
    counterLesson () {
      if(this.myCourse !== null) {
        if(this.myCourse.lessons.length > 0) {
          return this.myCourse.lessons.length + 1
        } else {
          return 1
        }
      } else {
        return 1
      }
    },
    reverseLesson() {
      if (this.myCourse !== null) {
        return this.myCourse.lessons.reverse()
      }
    }
  },
  methods: {
    getInfoCourse() {
      API.courses.courses.details({id: this.id}).then(response => {
        this.myCourse = response
      }).catch(e => console.log(e))
    }
  },
  mounted() {
    if (this.id) {
      this.getInfoCourse()
    }
  },
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .course-editing {
    margin-bottom: 60px;
  }
  .lesson-list {
    .lesson-wrapper {
      .item-btn {
        position: relative;
        padding-left: 100px;
        .sm-block({padding-left: 80px;});
        .ss-block({padding-left: 50px;});
        .counter-lesson {
          position: absolute;
          left: 50px;
          top: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
          border-width: 1px;
          border-style: solid;
          border-color: @colorMainSecondary;
          color: @colorMainSecondary;
          font-size: 1.6rem;
          font-weight: 800;
          border-radius: 50%;
          flex-shrink: 0;
          box-sizing: border-box;
          background: #fff;
          z-index: 3;
          .sm-block({left: 40px;});
          .ss-block({
            width: 30px;
            height: 30px;
            left: 0;
            transform: translate(0, -50%);
          });
        }
        &.line {
          &::before {
            content: '';
            display: block;
            position: absolute;
            left: 50px;
            top: 50%;
            bottom: -20px;
            width: 1px;
            background: #000;
            .sm-block({
              bottom: -15px;
              left: 40px;});
            .ss-block({
              left: 15px;});
          }
        }

      }
    }
  }

</style>
