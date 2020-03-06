<template>
  <section class="p-control-course p-default-block">
    <preloader v-if="loading"/>
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class="container page">
      <h1 class="g-caption-inner">Редактор курсов</h1>
      <div class="course">
        <admin-course-control-panel v-if="isMyCourse && isMyCourse.length !== 0"/>
      </div>
      <router-link to="/admin/menu" class="back-btn">Назад</router-link>
    </div>
  </section>
</template>

<script>
import AdminCourseControlPanel from '@/components/admin/course/AdminCourseControlPanel'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import { mapState, mapGetters } from 'vuex'
import Preloader from '@/components/ui/Preloader'

export default {
  name: 'AdminCourseControl',
  components: {
    BreadCrumbs,
    AdminCourseControlPanel,
    Preloader
  },
  data() {
    return {
      loading: false,
      breadCrumbs: [
        {
          path: 'menu',
          title: 'Личный кабинет'
        }
      ],
    }
  },
  methods: {

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
    .course-create {
      .row-flex();
      .lg-block({
        justify-content: center;
      });
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
