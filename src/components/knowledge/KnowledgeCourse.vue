<template>
  <section class="p-lesson p-default-block">
    <preloader v-if="!activeLesson"/>
    <div v-if="activeLesson">
      <status-preview-course :idCourse="course.id" :idStatus="statusCourse" v-if="myCourses"/>
      <bread-crumbs :arrCrumbs="breadCrumbs"/>
      <div class="container" >
        <h1 class="g-caption-inner">{{course.title}}</h1>
        <div class="lesson-select">
          <p class="desc">Урок</p>
          <v-select @input="newActiveLesson" :value="activeLesson.title" :multiple="false" :transition="'fade'" :class="'v-select__event'" :searchable="false"  label="title" :options="course.lessons"></v-select>
        </div>
        <section class="preview-lesson">
          <div class="img" :style="{backgroundImage: `url(${course.img})`}"></div>
          <div class="info">
            <panel-status-lesson/>
            <strong class="g-item-form__label">В этом уроке вы узнаете</strong>
            <div class="text-wrapper">
              <div class="editor ul-pdl-0" v-html="activeLesson.description"></div>
            </div>
            <a href="#" class="g-btn g-btn--no-icon">
              <span>Начать</span>
            </a>
          </div>
        </section>
        <section class="materials-lesson">
          <h2 class="g-caption-section">Материалы урока</h2>
          <div class="g-subsection video-wrapper">
            <panel-video-lesson></panel-video-lesson>
          </div>
          <div class="g-subsection editors-wrapper">
            <div class="editor" v-html="course.description"></div>
          </div>
          <div class="g-subsection audio-wrapper">
            <panel-audio-lesson></panel-audio-lesson>
          </div>
          <div class="g-subsection file-wrapper">
            <panel-file-lesson></panel-file-lesson>
          </div>
        </section>
      </div>
    </div>

  </section>
</template>

<script>
import PanelVideoLesson from '@/components/knowledge/components/PanelVideoLesson'
import PanelAudioLesson from '@/components/knowledge/components/PanelAudioLesson'
import PanelFileLesson from '@/components/knowledge/components/PanelFileLesson'
import StatusPreviewCourse from '@/components/StatusPreviewCourse'
import BreadCrumbs from '@/components/BreadCrumbs'

import API from '@/api/index'
import { mapState, mapGetters } from 'vuex'
import PanelStatusLesson from '@/components/knowledge/components/PanelStatusLesson'
import Preloader from '@/components/ui/Preloader'

export default {
  name: 'KnowledgeCourse',
  props: ['url', 'id'],
  components: {
    StatusPreviewCourse,
    BreadCrumbs,
    PanelStatusLesson,
    PanelAudioLesson,
    PanelFileLesson,
    PanelVideoLesson,
    Preloader
  },
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
      API.courses.lesson.info({id: response.lessons[0].id}).then(lesson => {
        this.activeLesson = lesson
        if(!this.id) {
          this.$router.push({ path: `/knowledge/${this.url}/${lesson.id}` })
        }
      })
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
      margin-bottom: 100px;
      .sm-block({ margin-bottom: 80px; });
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
          margin-bottom: 30px;
          .sm-block({
            margin-bottom: 20px;});
        }
        .g-btn {
          align-self: flex-start;
        }
      }
    }
    .materials-lesson {
      .video-wrapper,
      .audio-wrapper,
      .file-wrapper{
        max-width: 680px;
      }
    }

  }
</style>
