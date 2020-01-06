<template>
  <section class='p-statistic p-default p-default-inner'>
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class='container page'>
      <h1 class='g-caption g-caption-inner'>Профиль</h1>
      <div class="wrapper-col">
        <div class="col col--btn">
          <div class="btn-wrapper">
            <button class="btn" :class="currentTab === 'AdminProfileMain' ? 'active' : ''"  v-on:click="currentTab = 'AdminProfileMain'">Основные</button>
            <button class="btn"  :class="currentTab === 'AdminProfileSecurity' ? 'active' : ''" v-on:click="currentTab = 'AdminProfileSecurity'">Безопасность</button>
          </div>
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
import AdminProfileMain from '../AdminProfileMain'
import AdminProfileSecurity from '../AdminProfileSecurity'

export default {
  name: 'AdminProfile',
  components: {
    BreadCrumbs,
    AdminProfileMain,
    AdminProfileSecurity
  },
  data() {
    return {
      breadCrumbs: [
        {
          path: '/admin/me',
          title: 'Личный кабинет'
        }
      ],
      tabs: ['AdminProfileMain', 'AdminProfileSecurity'],
      currentTab: 'AdminProfileMain'
    }
  },
  methods: {
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
        .btn-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          .lg-block({flex-direction: row;});
          .sm-block({flex-direction: column;});
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 35px 25px;
          font-size: 1.3rem;
          font-weight: 900;
          text-transform: uppercase;
          min-width: 100%;
          margin-bottom: 20px;
          box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
          cursor: pointer;
          border: 3px solid transparent;
          .lg-block({
            min-width: 250px;
            margin-right: 20px;
            margin-bottom: 0;
            padding: 30px 20px;
          });
          .sm-block({
            padding: 20px 15px;
            margin-bottom: 20px;
            margin-right: 0;
            min-width: 210px;
            border-width: 2px;
          });
          &:last-child {
            margin-bottom: 0;
          }
          &.active {
            border: 3px solid @colorMainRed;
            .sm-block({border-width: 2px;});
          }

        }
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
