<template>
  <section class='p-wallet p-inner-admin'>
    <div class='container page'>
      <app-tabs :dataTabs="btnArr" v-on:change-tab="changeSection"/>
      <keep-alive>
        <component
          v-bind:is="currentTab"
        ></component>
      </keep-alive>
    </div>
  </section>
</template>

<script>
import AdminWalletMain from './inner/AdminWalletMain'
import AdminWalletTransaction from './inner/AdminWalletTransaction'
import AppTabs from '@/components/ui/AppTabs'

export default {
  name: 'AdminWallet',
  components: {
    AdminWalletMain,
    AdminWalletTransaction,
    AppTabs
  },
  data() {
    return {
      btnArr: [
        {
          id: 'AdminWalletMain',
          name: 'Кошелек'
        },
        {
          id: 'AdminWalletTransaction',
          name: 'История транзакций'
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
        .btn-app {
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
