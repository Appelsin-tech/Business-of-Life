<template>
  <section class="p-control-course p-default-block">
    <preloader v-if="loading"/>
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class="container page">
      <h1 class="g-caption-inner">Редактор курсов</h1>
      <div class="c-wrapper">
        <div class="course-create" v-if="isMyCourse && isMyCourse.length === 0">
          <button-add class="admin-default item-grid" @click.native="createCourse"/>
        </div>
        <div class="item-wrapper"  v-if="isMyCourse && isMyCourse.length !== 0" >
          <button-add @click.native="createCourse" class="admin-default item-grid"/>
          <admin-course-control-panel class="item-grid" v-for="course in isMyCourse" :course="course" :key="course.id"/>
        </div>
      </div>
      <panel-info v-if="isMyCourse && isMyCourse.length === 0">Курсов нет</panel-info>
      <router-link to="/admin/menu" class="back-btn">Назад</router-link>
    </div>
  </section>
</template>

<script>
import AdminCourseControlPanel from '@/components/admin/course/AdminCourseControlPanel'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import { mapState, mapGetters } from 'vuex'
import Preloader from '@/components/ui/Preloader'
import API from '@/api/index'
import ButtonAdd from '@/components/ui/ButtonAdd'
import PanelInfo from '@/components/ui/PanelInfo'

export default {
  name: 'AdminCourseControl',
  components: {
    BreadCrumbs,
    AdminCourseControlPanel,
    Preloader,
    ButtonAdd,
    PanelInfo
  },
  data() {
    return {
      loading: false,
      breadCrumbs: [
        {
          path: 'menu',
          title: 'Личный кабинет'
        }
      ]
    }
  },
  computed: {
    ...mapState('courses', [
      'coursesMy'
    ]),
    ...mapGetters('courses', [
      'isMyCourse',
      'isCourses'
    ])
  },
  methods: {
    createCourse() {
      this.loading = true
      API.courses.courses.create({title: 'Новый курс'}).then(response => {
        API.response.success('Курс создан')
        this.$router.push({ path: `/admin/course-editing/${response.id}` })
        this.$store.dispatch('news/getMyNews')
        this.loading = false
      })
    }
  },
  mounted() {
    if (this.isMyCourse === null) {
      this.loading = true
      this.$store.dispatch('courses/getMyCourses').then(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .p-control-course {
    .c-wrapper {
      .item-wrapper,
      .course-create {
        .row-flex();
        .lg-block({
          justify-content: center;
        });
      }
      .item-grid {
        .col();
        .size(3);
        .size-xl(4);
        .size-sm(10);
        .size-xs(12);
      }
    }
    .course {
      .btn-add {
        .col();
        .size(3);
        .size-xl(4);
        .size-sm(10);
        .size-xs(12);
        margin-bottom: 20px;
        min-height: 350px;
        height: auto;
        .md-block({
          min-height: 300px;
        });
        .sm-block({
          min-height: 110px;
          margin-bottom: 15px;
        });
        .ss-block({
          min-height: min-content;
        });
      }
    }
  }
</style>
