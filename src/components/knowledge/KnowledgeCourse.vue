<template>
  <section class="p-lesson p-default p-default-inner">
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class="container" >
      <status-preview :idEvent="5" :idStatus="3" :idRelation="10"/>
      <h1 class="g-caption-inner">Техника построения бизнеса</h1>
      <div class="lesson-select">
        <p class="desc">Урок</p>
        <v-select :value="activeLesson.val" :multiple="false" :transition="'fade'" :class="'v-select__event'" :searchable="false"  label="name" :options="selectLesson"></v-select>
      </div>
      <section class="preview-lesson">
        <div class="img" :style="{backgroundImage: `url(${activeLesson.img})`}"></div>
        <div class="info">
          <panel-status-lesson/>
          <strong class="g-item-form__label">В этом уроке вы узнаете</strong>
          <div class="text-wrapper">
            <div class="editor ul-pdl-0">
              <ul>
                <li>Что такое финансовая пирамида</li>
                <li>Отличие МЛМ от пирамиды</li>
                <li>Пять основных видов «финансовых пирамид»</li>
                <li>Особенности предлагаемого к заключению договора</li>
              </ul>
            </div>
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
          <div class="editor">
            <p>Ежемесячные стартинг семинары, проводимые в регионах, странах, силами лидеров компании Наюта, по программе образования обучающей системы Академии "Business of Life"</p>
            <br>
            <p>«Стартовые семинары» создаются для новичков - сетевиков, которые только открыли свой бизнес. Благодаря специальной программе сетевой индустрии новичок разберется быстро и сможет расставить приоритеты своего бизнеса, создав прочный фундамент для быстрого старта и успешного развития своего бизнеса.</p>
            <br>
            <p>На старт семинарах вы получите четкие рекомендации, услышите удивительные истории о том, как и с чего начинается бизнес, какие ошибки допускают новички и как действуют профи. Вы лично сможете познакомиться и пообщаться с состоявшимися сетевиками, которые помогут ва найти ответы на многие вопросы, избежать ошибок и отказаться от ненужных экспериментов.</p>
          </div>
        </div>
        <div class="g-subsection audio-wrapper">
            <panel-audio-lesson></panel-audio-lesson>
        </div>
        <div class="g-subsection file-wrapper">
          <panel-file-lesson></panel-file-lesson>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import PanelVideoLesson from '@/components/knowledge/components/PanelVideoLesson'
import PanelAudioLesson from '@/components/knowledge/components/PanelAudioLesson'
import PanelFileLesson from '@/components/knowledge/components/PanelFileLesson'
import StatusPreview from '@/components/StatusPreview'
import BreadCrumbs from '@/components/BreadCrumbs'

import API from '@/api/index'
import { mapState, mapGetters } from 'vuex'
import PanelStatusLesson from '@/components/knowledge/components/PanelStatusLesson'

export default {
  name: 'KnowledgeCourse',
  components: {
    StatusPreview,
    BreadCrumbs,
    PanelStatusLesson,
    PanelAudioLesson,
    PanelFileLesson,
    PanelVideoLesson
  },
  data() {
    return {
      breadCrumbs: [
        {
          path: '/knowledge/menu',
          title: 'База знаний'
        }
      ],
      activeLesson: {
        val: '23. Основные признаки финансовых пирамид',
        img: 'https://picsum.photos/500/500'
      },
      selectLesson: [
        {
          name: '23. Основные признаки финансовых пирамид',
          val: 'lesson_23'
        },
        {
          name: '24. Основные признаки финансовых пирамид',
          val: 'lesson_24'
        },
        {
          name: '25. Основные признаки финансовых пирамид',
          val: 'lesson_25'
        },
      ]
    }
  },
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
