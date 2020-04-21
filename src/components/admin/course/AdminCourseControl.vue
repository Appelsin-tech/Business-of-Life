<template>
  <section class="p-control-course p-inner-admin">
    <preloader v-if="loading"/>
    <div class="container page">
      <button-app-function icon="icon-plus-circle" :text="true" @click.native="createCourse">Создать</button-app-function>
      <div class="wrapper-course"  v-if="listMyCourses && listMyCourses.length !== 0" >
        <admin-course-control-panel class="item-grid" v-for="course in listMyCourses" :course="course" :key="course.id"/>
      </div>
      <panel-info v-if="listMyCourses && listMyCourses.length === 0">Курсов нет</panel-info>
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
import ButtonAppFunction from '@/components/ui/ButtonAppFunction'

export default {
  name: 'AdminCourseControl',
  components: {
    AdminCourseControlPanel,
    Preloader,
    ButtonAdd,
    PanelInfo,
    ButtonAppFunction
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapState('courses', [
      'coursesMy'
    ]),
    ...mapGetters('courses', [
      'listMyCourses',
      'listCourses'
    ])
  },
  methods: {
    createCourse() {
      this.loading = true
      API.courses.courses.create({title: 'Новый курс', snippet: 'Краткое описание', description: 'Полное и подробное описание содержания курса'}).then(response => {
        API.response.success('Курс создан')
        this.$router.push({ path: `/admin/course-editing/${response.id}` })
        this.$store.dispatch('courses/getMyCourses')
        this.loading = false
      })
    }
  },
  mounted() {
    if (this.listMyCourses === null) {
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
    .btn-app-f {
      margin-bottom: 30px;
    }
    .wrapper-course {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 30px;
      .xxl-block({grid-template-columns: repeat(3, 1fr);});
      .sm-block({grid-template-columns: 1fr; grid-gap: 20px;});
      .xs-block({grid-gap: 10px;});
    }
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
