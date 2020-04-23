<template>
  <section class="p-event-all-editing p-inner-admin">
    <preloader v-if="activePreloader"/>
    <div class="container page">
      <div class="course-editing">
        <h2 class="g-caption-section">
          <template v-if="course">Редактирование курса</template>
          <template v-else>Создание курса</template>
        </h2>
        <course-editing-form :idCourse="course" :course="myCourse" :btnDelete="showButtonDelete"/>
      </div>
      <div class="lesson-list">
        <h2 class="g-caption-section">Редактирование уроков</h2>
        <div class="lesson-wrapper" v-if="course">
          <div class="item item-btn" :class="counterLesson === 1 ? '' : 'line'">
            <span class="counter-lesson">{{counterLesson}}</span>
            <button-add class="row" @click.native.prevent="$router.push(`/office/courses/${course}/lesson/create`)"></button-add>
          </div>
          <div v-if="counterLesson !== 1">
            <admin-course-lesson-editing-lesson  v-for="(lesson, index) in reverseLesson" :key="lesson.id" :course="course" :lesson="lesson" :counter="counterLesson - index - 1" v-on:delete-lesson="getInfoCourse"/>
          </div>
        </div>
        <panel-info v-else>Чтобы создать урок - заполните информацию о курсе</panel-info>
        <div class="link-wrapper">
          <button-app class="preview" :to="`/knowledge/${course}`" :class="{disabled: !course}">
            Предпросмотр
          </button-app>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import API from '@/api/index'
import { mapState, mapGetters } from 'vuex'
import CourseEditingForm from '@admin/course/CourseEditingForm'
import PanelInfo from '@/components/ui/PanelInfo'
import ButtonAdd from '@/components/ui/ButtonAdd'
import AdminCourseLessonEditingLesson from '@admin/course/AdminCourseLessonEditingLesson'
import Preloader from '@/components/ui/Preloader'

export default {
  name: 'AdminCourseLessonEditing',
  props: ['course'],
  components: {
    CourseEditingForm,
    PanelInfo,
    ButtonAdd,
    AdminCourseLessonEditingLesson,
    Preloader
  },
  data() {
    return {
      myCourse: null,
      activePreloader: false
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
    },
    showButtonDelete () {
      return !!this.course
    }
  },
  methods: {
    getInfoCourse() {
      API.courses.courses.details({id: this.course}).then(response => {
        this.myCourse = response
        this.activePreloader = false
      }).catch(e => console.log(e))
    }
  },
  mounted() {
    if (this.course) {
      this.activePreloader = true
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
  .link-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 30px;
    margin-top: 30px;
    border-top: 1px solid @colorBorder;
    .ss-block({
      padding-top: 20px;
      margin-top: 20px;});
  }

</style>
