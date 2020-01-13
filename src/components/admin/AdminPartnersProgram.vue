<template>
  <section class='p-partners-program p-default p-default-inner'>
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class='container page'>
      <h1 class='g-caption-inner'>Партнерская программа</h1>
      <div class="wrapper-col">
        <div class="col col--btn">
          <button-change-section :BtnArr="buttonMy" v-on:clickBtnChangeSection="changeSection"/>
        </div>
        <div class="col col--content">
          <keep-alive>
            <component
              v-bind:is="currentTab"
            ></component>
          </keep-alive>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '../BreadCrumbs.vue'
import AdminPartnersProgramStructure from './inner/AdminPartnersProgramStructure'
import AdminPartnersProgramStatistic from './inner/AdminPartnersProgramStatistic'
import AdminPartnersProgramReferal from './inner/AdminPartnersProgramReferal'
import AdminPartnersProgramConditions from './inner/AdminPartnersProgramConditions'
import ButtonChangeSection from './inner/ButtonChangeSection'
import {mapGetters} from 'vuex'

export default {
  name: 'AdminPartnersProgram',
  components: {
    BreadCrumbs,
    AdminPartnersProgramStructure,
    AdminPartnersProgramStatistic,
    AdminPartnersProgramReferal,
    AdminPartnersProgramConditions,
    ButtonChangeSection
  },
  data() {
    return {
      breadCrumbs: [
        {
          path: '/admin/me',
          title: 'Личный кабинет'
        }
      ],
      btnArr: [
        {
          component: 'AdminPartnersProgramReferal',
          text: 'Реферальные сайты'
        },
        {
          component: 'AdminPartnersProgramStructure',
          text: 'Структура'
        },
        {
          component: 'AdminPartnersProgramConditions',
          text: 'Статистика'
        },
        {
          component: 'AdminPartnersProgramConditions',
          text: 'Условия'
        },
      ],
      currentTab: 'AdminPartnersProgramReferal'
    }
  },
  computed: {
    ...mapGetters('user', [
      'status'
    ]),
    buttonMy() {
      if(this.status > 1) {
        return [
          {
            component: 'AdminPartnersProgramReferal',
            text: 'Реферальные сайты'
          },
          {
            component: 'AdminPartnersProgramStructure',
            text: 'Структура'
          },
          {
            component: 'AdminPartnersProgramConditions',
            text: 'Статистика'
          },
          {
            component: 'AdminPartnersProgramConditions',
            text: 'Условия'
          },
        ]
      } else {
        return [
          {
            component: 'AdminPartnersProgramReferal',
            text: 'Реферальные сайты'
          },
        ]
      }
    }
  },
  methods: {
    changeSection(e) {
      this.currentTab = e
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="less">
  @import '../../assets/less/_importants';

  .wrapper-col {
    .row-flex();
    .col {
      .col();
      &--btn {
        .size(3.2);
        .size-lg(12);
        padding-right: 50px;
        border-right: 1px solid @colorBorder;
        .lg-block({
          border-right: none;
          padding-right: 0;
          padding-bottom: 20px;
          border-bottom: 1px solid @colorBorder;
        });
        .g-btn {
          min-width: 100%;
        }
      }
      &--content {
        .size(8.8);
        .size-lg(12);
        display: flex;
        flex-direction: column;
        padding-left: 30px;
        .lg-block({
          padding-left: 0;
          padding-top: 20px;
        });
      }
    }
  }
</style>
