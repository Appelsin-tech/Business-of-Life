<template>
  <section class='p-statistic p-inner-admin'>
    <div class='container page'>
      <div class="wrapper-col">
        <div class="col col--role">
          <button-change-section :BtnArr="btnArr" v-on:clickBtnChangeSection="changeSection"/>
        </div>
        <div class="col col--access">
          <admin-role-form :role="currentTab"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AdminRoleForm from '@admin/inner/AdminRoleForm'
import API from '@/api/index'
import ButtonChangeSection from '@/components/ui/ButtonChangeSection'

export default {
  name: 'AdminRole',
  components: {
    ButtonChangeSection,
    AdminRoleForm
  },
  data() {
    return {
      btnArr: [
        {
          id: 1,
          text: 'Редактор курсов'
        },
        {
          id: 2,
          text: 'Редактор новостей'
        },
        {
          id: 3,
          text: 'Редактор мероприятий'
        }
      ],
      currentTab: 2
    }
  },
  methods: {
    changeSection (e) {
      this.currentTab = e
    }
  }
}
</script>

<style scoped lang="less">
  @import '../../assets/less/_importants';

  .wrapper-col {
    .row-flex();
    .col {
      .col();
      &--role {
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
          width: 100%;
          .lg-block({max-width: 300px; margin: 0 auto;});
          .sm-block({max-width: 210px;})
        }
        .btn-role {
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
            padding: 30px 20px;
          });
          .sm-block({
            padding: 20px 15px;
            border-width: 2px;
          });
          &.active {
            border: 3px solid @colorMain;
            .sm-block({border-width: 2px;});
          }

        }
        .btn-app {
          min-width: 100%;
        }
      }
      &--access {
        .size(8.8);
        .size-lg(12);
        padding-left: 30px;
        .lg-block({
          padding-left: 0;
          padding-top: 20px;
        });
      }
    }
  }
</style>
