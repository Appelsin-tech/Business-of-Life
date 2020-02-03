<template>
  <section class="p-event-all-editing p-default p-default-inner">
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
          <div class="item item-btn">
            <span class="counter-lesson">{{lessonArr.length + 1}}</span>
            <button-add class="row"></button-add>
          </div>
          <div class="item" v-for="(item, index) in lessonArr" :key="item.id">
            <span class="counter-lesson">{{lessonArr.length - index}}</span>
            <div class="item-lesson">
              <a href="#" class="g-caption-element">{{item.title}}</a>
              <div class="g-control-icon static">
                <button class="g-icon-circle g-icon-circle--control g-icon-circle--control-green" v-tooltip.bottom="'Редактировать урок'" @click="$router.push({path: `/admin/lesson/123/123`})">
                  <img svg-inline src="@/assets/img/icon/pencil.svg" class="svg-icon">
                </button>
                <button class="g-icon-circle g-icon-circle--control g-icon-circle--control-black" v-tooltip.bottom="'Редактировать урок'">
                  <img svg-inline src="@/assets/img/icon/info.svg" class="svg-icon">
                </button>
                <button class="g-icon-circle g-icon-circle--control g-icon-circle--control-red" v-tooltip.bottom="'Удалить урок'">
                  <img svg-inline src="@/assets/img/icon/basket.svg" class="svg-icon">
                </button>
              </div>
            </div>
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
export default {
  name: 'AdminCourseLessonEditing',
  props: ['id'],
  components: {
    BreadCrumbs,
    CourseEditingForm,
    PanelInfo,
    ButtonAdd,
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
      myCourse: false,
      showButtonDelete: true,
      counterLesson: 1,
      lessonArr: [
        {
          id: 0,
          title: 'Техника построения бизнеса'
        },
        {
          id: 1,
          title: 'Техника построения '
        },
        {
          id: 2,
          title: 'Техника построения бизнеса Техника построения бизнеса'
        },
        {
          id: 3,
          title: 'Техника построения бизнеса'
        }
      ]
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
      .item {
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
        &:first-child {
          &::before {
            top: 50%;
          }
        }
        &:last-child {
          &::before {
            bottom: 50%;
          }
        }
        &::before {
          content: '';
          position: absolute;
          left: 50px;
          top: 0px;
          bottom: -20px;
          width: 1px;
          background: @colorBorder;
          .sm-block({
            bottom: -15px;
            left: 40px;});
          .ss-block({
            left: 15px;});
        }
      }
      .item-lesson {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        .default-panel-style();
        .sm-block({flex-direction: column; align-items: flex-start;
          margin-bottom: 15px;});
        .g-caption-element {
          margin-right: 20px;
          .sm-block({
            margin-bottom: 15px;
            margin-right: 0;})
        }
      }
    }
  }

</style>
