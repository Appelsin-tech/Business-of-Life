<template>
  <section class='p-wallet p-inner-admin'>
    <div class='container page'>
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
import AdminWalletMain from './inner/AdminWalletMain'
import AdminWalletTransaction from './inner/AdminWalletTransaction'
import ButtonChangeSection from '../ui/ButtonChangeSection'

export default {
  name: 'AdminWallet',
  components: {
    AdminWalletMain,
    AdminWalletTransaction,
    ButtonChangeSection
  },
  data() {
    return {
      btnArr: [
        {
          id: 'AdminWalletMain',
          text: 'Кошелек'
        },
        {
          id: 'AdminWalletTransaction',
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
