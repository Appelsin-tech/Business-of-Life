<template>
  <section class='p-profile p-default p-default-inner'>
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class='container page'>
      <h1 class='g-caption g-caption-inner'>Профиль</h1>
      <div class="wrapper-col">
        <div class="col col--btn">
          <button-change-section :BtnArr="btnArr" v-on:clickBtnChangeSection="changeSection"/>
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
import AdminProfileMain from './inner/AdminProfileMain'
import AdminProfileSecurity from './inner/AdminProfileSecurity'
import ButtonChangeSection from './inner/ButtonChangeSection'

export default {
  name: 'AdminProfile',
  components: {
    BreadCrumbs,
    AdminProfileMain,
    AdminProfileSecurity,
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
          component: 'AdminProfileMain',
          text: 'Основные'
        },
        {
          component: 'AdminProfileSecurity',
          text: 'Безопасность'
        }
      ],
      currentTab: 'AdminProfileMain'
    }
  },
  methods: {
    changeSection(e) {
      this.currentTab = e
    }
  },
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
