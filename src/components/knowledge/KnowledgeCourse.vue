<template>
  <section class="p-lesson p-default-block">
    <preloader v-if="!course"/>
    <div v-if="course">
      <status-preview-course :idCourse="course.id" :idStatus="statusCourse" v-if="myCourses"/>
      <bread-crumbs :arrCrumbs="breadCrumbs"/>
      <div class="container" >
        <h1 class="g-caption-inner">{{course.title}}</h1>
        <section class="preview-lesson g-subsection">
          <div class="img" :style="{backgroundImage: `url(${course.img})`}"></div>
          <div class="info">
            <panel-status-process-course-lesson source="course" :status="1"/>
            <div class="text-wrapper">
              <div class="editor" v-html="course.snippet"></div>
            </div>
            <button href="#" class="g-btn g-btn--no-icon" @click="scrollToSection('section-lessons')">
              <span>Продолжить изучение</span>
            </button>
          </div>
        </section>
        <section class="description g-subsection">
          <h2 class="g-caption-section">Описание</h2>
          <div class="editor" v-html="course.description"></div>
        </section>
        <section class="lessons" ref="section-lessons">
          <h2 class="g-caption-section">Программа курса</h2>
          <panel-lesson v-for="lesson in course.lessons" :key="lesson.id" :lesson="lesson" :url-course="url"/>
        </section>
        <router-link to="/knowledge/menu" class="back-btn">Назад</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import StatusPreviewCourse from '@/components/StatusPreviewCourse'
import BreadCrumbs from '@/components/BreadCrumbs'
import API from '@/api/index'
import { mapState, mapGetters } from 'vuex'
import PanelStatusProcessCourseLesson from '@/components/knowledge/components/PanelStatusProcessCourseLesson'
import Preloader from '@/components/ui/Preloader'
import ScrollMixin from '@/mixins/scrollToSection'
import PanelLesson from '@/components/knowledge/components/PanelLesson'


export default {
  name: 'KnowledgeCourse',
  props: ['url'],
  components: {
    StatusPreviewCourse,
    BreadCrumbs,
    PanelStatusProcessCourseLesson,
    Preloader,
    PanelLesson
  },
  mixins: [ScrollMixin],
  data() {
    return {
      breadCrumbs: [
        {
          path: '/knowledge/menu',
          title: 'База знаний'
        }
      ],
      course: null,
      valueSelectLesson: null,
      activeLesson: null,
      myCourses: false,
      statusCourse: 0
    }
  },
  computed: {
    ...mapState('courses', [
      'coursesMy'
    ]),
    ...mapGetters('user', [
      'logged',
      'status'
    ]),
  },
  methods: {
    newActiveLesson(value) {
      this.valueSelectLesson = value.id
      this.$router.push({ path: `/knowledge/${this.url}/${ value.id}`})
      API.courses.lesson.info({id: this.valueSelectLesson}).then(response => {
        this.activeLesson = response
      })
    },
    statusInfo () {
      if (this.status > 1) {
        this.$store.dispatch('courses/getMyCourses').then(() => {
          this.coursesMy.map(item => {
            if (item.id === this.course.id) {
              this.myCourses = true
              this.statusCourse = item.status
            }
          })
        })
      }
    },
  },
  mounted () {
    API.courses.courses.info({url: this.url}).then(response => {
      this.course = response
      this.statusInfo()
    }).catch(e => {
      this.$router.push({ path: '/404' })
    })
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .p-lesson {
    .lesson-select {
      display: flex;
      align-items: center;
      margin-bottom: 80px;
      .lg-block({ margin-bottom: 50px; });
      .md-block({ margin-bottom: 30px; });
      .xs-block({ margin-bottom: 20px; });
      .desc {
        margin-right: 20px;
        margin-bottom: 10px;
        font-size: 2.4rem;
        font-weight: 800;
        color: @colorMainSecondary;
        .xs-block({ font-size: 1.8rem; })
      }
    }
    .preview-lesson {
      display: flex;
      .img {
        flex-shrink: 1;
        max-width: 470px;
        width: 100%;
        height: 470px;
        min-height: 200px;
        margin-right: 10%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        .lg-block({ width: 300px; height: 300px; });
        .md-block({ display: none; });
      }
      .info {
        display: flex;
        flex-direction: column;
        max-width: min-content;
        min-width: 50%;
        .md-block({ padding-top: 0; max-width: 80%; });
        .sm-block({ max-width: 100%; });
        .text-wrapper {
          margin-bottom: 80px;
          .xs-block({
            margin-bottom: 50px;});
        }
        .g-btn {
          align-self: flex-start;
        }
      }
    }
  }
</style>
