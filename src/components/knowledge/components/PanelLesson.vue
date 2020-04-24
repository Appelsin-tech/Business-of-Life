<template>
  <div class="lesson">
    <div class="g-icon-circle" :class="status[statusProgressLesson].class" v-tooltip.left="`${status[statusProgressLesson].tooltip}`">
      <template v-if="status[statusProgressLesson].class === 'created'">
        <icon-close class="g-icon"/>
      </template>
      <template v-else>
        <icon-check class="g-icon"/>
      </template>
    </div>
    <div class="lesson__info-wrapper">
      <div class="lesson__info">
        <h3 class="g-caption-element g-caption-element--static">{{lesson.title}}</h3>
        <div class="editor" v-html="lesson.description"></div>
      </div>
      <button-app :to="`/knowledge/${urlCourse}/${lesson.id}`" class="btn-app--white" v-if="statusProgressLesson === 0">
        Повторить
      </button-app>
      <button-app @click.native="$emit('start-training', lesson.id)" v-if="showBtnProgress">
        <template v-if="showBtnProgress === 1">Начать изучение</template>
        <template v-else>Продолжить изучение</template>
      </button-app>
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
    startLesson () {
      this.$router.push({path: `/knowledge/${this.urlCourse}/${this.lesson.id}`})
    }
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
      border-color: #d6d6d6;
      .g-icon {
        color: #d6d6d6;
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
      .btn-app {
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
