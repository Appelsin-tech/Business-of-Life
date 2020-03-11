<template>
  <section class="p-lesson p-default-block">
    <preloader v-if="loading"/>
    <div v-if="!loading">
      <status-preview :idCourse="course.id" section="course" :idStatus="statusMyCourse" v-if="myCourse" @newStatus="statusInfo"/>
      <bread-crumbs :arrCrumbs="breadCrumbs"/>
      <div class="container" >
        <h1 class="g-caption-inner">{{course.title}}</h1>
        <section class="preview-lesson g-subsection">
          <div class="img" :style="{backgroundImage: `url(${course.img})`}"></div>
          <div class="info">
            <panel-status-process-course-lesson source="course" :statusProgress="statusProgress"/>
            <div class="text-wrapper">
              <div class="editor" v-html="course.snippet"></div>
            </div>
            <button href="#" class="g-btn g-btn--no-icon" @click="scrollToSection('section-lessons')">
              <span v-if="statusProgress === 0">Начать изучение</span>
              <span v-if="statusProgress > 0">Продолжить изучение</span>
            </button>
          </div>
        </section>
        <section class="description g-subsection">
          <h2 class="g-caption-section">Описание</h2>
          <div class="editor" v-html="course.description"></div>
        </section>
        <section class="lessons" ref="section-lessons">
          <h2 class="g-caption-section">Программа курса</h2>
          <panel-lesson v-for="(lesson, index) in course.lessons" :key="lesson.id" :lesson="lesson" :url-course="url" :showBtnProgress="showBtnProgressLesson(index)" :statusProgressLesson="statusProgressLesson(index)"/>
        </section>
        <router-link to="/knowledge/menu" class="back-btn">Назад</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '@/components/BreadCrumbs'
import API from '@/api/index'
import { mapGetters } from 'vuex'
import PanelStatusProcessCourseLesson from '@/components/knowledge/components/PanelStatusProcessCourseLesson'
import Preloader from '@/components/ui/Preloader'
import ScrollMixin from '@/mixins/scrollToSection'
import PanelLesson from '@/components/knowledge/components/PanelLesson'

export default {
  name: 'KnowledgeCourse',
  props: ['url'],
  components: {
    StatusPreview: () => import('@/components/StatusPreview'),
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
      myCourse: false,
      loading: true
    }
  },
  computed: {
    ...mapGetters('user', [
      'logged',
      'status'
    ]),
    ...mapGetters('courses', [
      'isMyCourse'
    ]),
    statusMyCourse () {
      return this.$store.getters[`courses/statusMyCourse`](this.url)
    },
    statusProgress () {
      return this.course.progress === 0 ? 0 : this.course.progress === this.course.lessons.length ? 1 : 2
    }
  },
  methods: {
    getInfoCourse() {
      API.courses.courses.info({ url: this.url }).then(response => {
        this.course = response
        this.loading = false
        this.statusInfo()
      }).catch(e => {
        this.$router.push({ path: '/404' })
      })
    },
    statusInfo() {
      if (this.status > 1) {
        if (this.isMyCourse === null) {
          this.$store.dispatch('courses/getMyCourses').then(() => {
            if (this.isMyCourse.some(item => item.id === this.course.id)) {
              this.myCourse = true
            }
          })
        } else {
          if (this.isMyCourse.some(item => item.id === this.course.id)) {
            this.myCourse = true
          }
        }
      }
    },
    statusProgressLesson (index) {
      if (this.course.progress === 0 && index === 0) {
        return 1
      } else if (this.course.progress === index) {
        return 1
      } else if (this.course.progress > index) {
        return 0
      } else {
        return 1
      }
    },
    showBtnProgressLesson (index) {
      if (this.course.progress === 0 && index === 0) {
        return 1
      } else if (this.course.progress === index && this.course.progress !== 0) {
        return 2
      } else {
        return 0
      }
    }
    // progressStatusLesson () {
    //
    // }
  },
  mounted () {
    this.getInfoCourse()
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
