<template>
  <section class="p-control-course p-default-block">
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class="container page">
      <h1 class="g-caption-inner">Редактор курсов</h1>
      <div class="course">
        <div class="course-create" v-if="!coursesMy">
          <button-add class="btn-add" @click.native="$router.push({path: '/admin/course-create'})"/>
        </div>
        <admin-course-control-panel v-else/>
      </div>
      <router-link to="/admin/menu" class="back-btn">Назад</router-link>
    </div>
  </section>
</template>

<script>
import AdminCourseControlPanel from '@/components/admin/course/AdminCourseControlPanel'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import { mapState, mapGetters } from 'vuex'
import ButtonAdd from '@/components/ui/ButtonAdd'

export default {
  name: 'AdminCourseControl',
  components: {
    BreadCrumbs,
    ButtonAdd,
    AdminCourseControlPanel
  },
  data() {
    return {
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
  },
  mounted() {
    if (this.coursesMy.length === 0) {
      this.$store.dispatch('courses/getMyCourses')
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
