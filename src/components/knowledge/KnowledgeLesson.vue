<template>
  <section class="p-lesson p-default-block">
    <preloader v-if="!lesson"/>
    <div v-if="lesson">
      <bread-crumbs :arrCrumbs="breadCrumbs"/>
      <div class="container" >
        <h1 class="g-caption-inner">{{lesson.title}}</h1>
        <section class="preview-lesson">
          <div class="info">
            <panel-status-process-course-lesson source="lesson" :statusProgress="statusProgress" :urlMyCourse="pathMyCourse" v-on:set-progress="setProgress"/>
            <strong class="g-item-form__label">В этом уроке вы узнаете</strong>
            <div class="text-wrapper">
              <div class="editor ul-pdl-0" v-html="lesson.description"></div>
            </div>
            <button class="g-btn g-btn--no-icon" @click="scrollToSection('section-materials')">
              <span class="text">Начать</span>
            </button>
          </div>
        </section>
        <section class="materials-lesson" ref="section-materials">
          <h2 class="g-caption-section">Материалы урока</h2>
          <div class="g-subsection-15" v-for="item in lesson.content" :key="item.id">
            <panel-video-lesson :video="item" v-if="item.type === 'video'"/>
            <div class="editor" v-html="item.content" v-else></div>
          </div>
<!--          <div class="g-subsection">-->
<!--            <panel-audio-lesson></panel-audio-lesson>-->
<!--          </div>-->
<!--          <div class="g-subsection">-->
<!--            <panel-file-lesson></panel-file-lesson>-->
<!--          </div>-->
        </section>
        <router-link :to="`/knowledge/${url}`" class="back-btn">Назад</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import PanelVideoLesson from '@/components/knowledge/components/PanelVideoLesson'
import PanelAudioLesson from '@/components/knowledge/components/PanelAudioLesson'
import PanelFileLesson from '@/components/knowledge/components/PanelFileLesson'
import BreadCrumbs from '@/components/BreadCrumbs'
import API from '@/api/index'
import { mapState, mapGetters } from 'vuex'
import PanelStatusProcessCourseLesson from '@/components/knowledge/components/PanelStatusProcessCourseLesson'
import Preloader from '@/components/ui/Preloader'
import ScrollMixin from '@/mixins/scrollToSection'

export default {
  name: 'KnowledgeLesson',
  props: ['url', 'id', 'progress'],
  components: {
    BreadCrumbs,
    PanelStatusProcessCourseLesson,
    PanelAudioLesson,
    PanelFileLesson,
    PanelVideoLesson,
    Preloader
  },
  mixins: [ScrollMixin],
  data() {
    return {
      breadCrumbs: [
        {
          path: '/knowledge/menu',
          title: 'База знаний'
        },
        {
          path: `/knowledge/${this.url}`,
          title: 'Курс'
        },
      ],
      course: null,
      lesson: null,
      valueSelectLesson: null,
      activeLesson: null,
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
    pathMyCourse () {
      if (this.$store.getters[`courses/statusMyCourse`](this.url)) {
        return `${this.url}/${this.id}`
      } else {
        return null
      }
    },
    statusProgress () {
      if (this.lesson.progress === 0) {
        return 0
      } else if (this.lesson.number <= this.lesson.progress) {
        return 1
      } else {
        return 0
      }
    }
  },
  methods: {
    setProgress () {
      API.courses.courses.progress({course_id: this.lesson.course_id, progress: this.lesson.number}).then(response => {
        this.lesson.progress = this.lesson.number
        API.response.success('Урок пройден')
      }).catch(e => console.log(e))
    }
  },
  mounted () {
    API.courses.lesson.info({id: this.id}).then(response => {
      this.lesson = response
      // this.statusInfo()
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
      margin-bottom: 100px;
      .sm-block({ margin-bottom: 80px; });
      .info {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        .md-block({ padding-top: 0; });
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
    .materials-lesson {
      .video-wrapper {

      }
    }
  }
</style>
