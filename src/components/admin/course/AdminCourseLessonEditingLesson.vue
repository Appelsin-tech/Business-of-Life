<template>
  <div class="item ">
    <span class="counter-lesson">{{counter}}</span>
    <div class="item-lesson">
      <h3 class="g-caption-element g-caption-element--static">{{lesson.title}}</h3>
      <div class="g-wrapper-btn-f g-wrapper-btn-f--static">
        <button-app-function icon="icon-lead-pencil" v-tooltip.bottom="'Редактировать'" :to="`/office/courses/${course}/lesson/${lesson.id}`"></button-app-function>
        <button-app-function icon="icon-delete" v-tooltip.bottom="'Удалить урок'" @click.native="deleteLesson()"></button-app-function>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/api/index'
export default {
  name: 'AdminCourseLessonEditingLesson',
  props: {
    course: {
      required: true
    },
    lesson: {
      required: true
    },
    counter: {
      default: 0
    }
  },
  methods: {
    deleteLesson() {
      API.courses.lesson.delete({id: this.lesson.id}).then(response => {
        this.$store.dispatch('courses/getMyCourses')
        API.response.success('Урок удален')
        this.$emit('delete-lesson')
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .item {
    position: relative;
    padding-left: 100px;
    .sm-block({padding-left: 80px;});
    .ss-block({padding-left: 50px;});
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
      background: #000;
      .sm-block({
        bottom: -15px;
        left: 40px;});
      .ss-block({
        left: 15px;});
    }
  }
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
    .g-wrapper-btn-f {
      .sm-block({align-self: flex-start;});
    }
  }
</style>
