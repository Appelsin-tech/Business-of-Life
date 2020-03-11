<template>
  <div class="lesson">
    <div class="g-icon-circle" :class="status[statusProgressLesson].class" v-tooltip.left="`${status[statusProgressLesson].tooltip}`">
      <template v-if="status[statusProgressLesson].class === 'created'">
        <img svg-inline class="svg-icon" src="@/assets/img/icon/close.svg" alt="">
      </template>
      <template v-else>
        <img svg-inline class="svg-icon" src="@/assets/img/icon/check.svg" alt="">
      </template>
    </div>
    <div class="lesson__info-wrapper">
      <div class="lesson__info">
        <router-link :to="`/knowledge/${urlCourse}/${lesson.id}`" class="g-caption-element">{{lesson.title}}</router-link>
        <div class="editor" v-html="lesson.description"></div>
      </div>
      <router-link :to="`/knowledge/${urlCourse}/${lesson.id}`" class="g-btn g-btn--no-icon" v-if="showBtnProgress">
        <span v-if="showBtnProgress === 1">Начать изучение</span>
        <span v-else>Продолжить изучение</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelLesson',
  props: {
    lesson: {
      required: true
    },
    urlCourse: {
      required: true
    },
    // 0 не показывать
    // 1 показать Начать изучение
    // 2 показать Продолжить изучение
    showBtnProgress: {
      required: false,
      default: 2
    },
    statusProgressLesson: {
      required: false,
      default: 1
    }
  },
  data() {
    return {
      status: {
        0: {
          class: 'public',
          tooltip: 'Урок пройден'
        },
        1: {
          class: 'created',
          tooltip: 'Урок не пройден'
        },
      }
    }
  },
  methods: {
    deleteRelation(id) {
      this.$emit('delete-relation', id)
    },
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .lesson {
    display: flex;
    margin-bottom: 20px;
    border-radius: 5px;
    .default-panel-style();
    .sm-block({
      margin-bottom: 15px;
    });
    .g-icon-circle.created {
      border-color: @colorSecondFonts;
      .svg-icon {
        path {
          fill: @colorSecondFonts;
        }
      }
    }
    .g-caption-element {
      margin-bottom: 25px;
      .md-block({
        margin-bottom: 15px;
      });
    }
    &__info-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-grow: 1;
      .md-block({
        flex-direction: column;
        align-items: flex-start;
      });
      .g-btn {
        flex-shrink: 0;
      }
    }
    &__info {
      margin-right: auto;
      padding-right: 50px;
      .md-block({
        padding-right: 0;
        margin-bottom: 20px;
      });
    }
    &__info-item {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      .md-block({
        margin-bottom: 7px;
      });
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
</style>
