<template>
  <section class='p-wallet p-default p-default-inner'>
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class='container page'>
      <h1 class='g-caption g-caption-inner'>Кошелек</h1>
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
import AdminWalletMain from './inner/AdminWalletMain'
import AdminWalletTransaction from './inner/AdminWalletTransaction'
import ButtonChangeSection from './inner/ButtonChangeSection'

export default {
  name: 'AdminWallet',
  components: {
    BreadCrumbs,
    AdminWalletMain,
    AdminWalletTransaction,
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
          component: 'AdminWalletMain',
          text: 'Кошелек'
        },
        {
          component: 'AdminWalletTransaction',
          text: 'История транзакций'
        }
      ],
      currentTab: 'AdminWalletMain'
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
