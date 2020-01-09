<template>
  <section class='p-statistic p-default p-default-inner'>
    <bread-crumbs :arrCrumbs="breadCrumbs"/>
    <div class='container page'>
      <h1 class='g-caption-inner'>Статистика </h1>
      <div class='wrapper' v-if="responseData.length > 0">
        <admin-statistic-chart-sales :defaultResponse="responseData"/>
        <admin-statistic-chart-location :defaultResponse="responseData"/>
      </div>
      <panel-info v-else>У вас еще нет мероприятий с продажами</panel-info>
      <router-link :to='`/admin/me`' class='back-btn'>Назад</router-link>
    </div>
  </section>
</template>

<script>
import API from '../../api/index'
import BreadCrumbs from '../BreadCrumbs.vue'
import { mapGetters, mapState } from 'vuex'
import AdminStatisticChartSales from './inner/AdminStatisticChartSales'
import AdminStatisticChartLocation from './inner/AdminStatisticChartLocation'
import PanelInfo from '../ui/PanelInfo'

export default {
  name: 'AdminStatistic',
  components: {
    BreadCrumbs,
    AdminStatisticChartSales,
    AdminStatisticChartLocation,
    PanelInfo
  },
  data() {
    return {
      breadCrumbs: [
        {
          path: '/admin/me',
          title: 'Личный кабинет'
        }
      ],
      responseData: [],
    }
  },
  computed: {
    ...mapState('user', [
      'myParentEvents',
    ]),
    ...mapGetters('user', [
      'logged'
    ]),
  },
  methods: {
    async getInterval(fromTime) {
      if (this.logged) {
        await API.statistics.orders({
          from: fromTime / 1000,
          to: this.$moment().valueOf() / 1000
        }).then(response => {
          this.responseData = response
        })
      }

    }
  },
  async mounted() {
    await this.getInterval(this.$moment().subtract(31, 'days').valueOf())
  }
}
</script>

<style scoped lang='less'>
  @import '../../assets/less/_importants';
  .p-statistic {
    display: flex;
    flex-direction: column;
    .breadcrumbs {
      align-self: stretch;
    }
    .container.page {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
  }
  .chart-pie {
    .row-flex();

    &__data {
      .col();
      .size(4);
      .size-ss(12);
      .shift-right(3);
      .shift-sm-right(2);
      .shift-ss-right(0);
    }
    &__label {
      display: inline-block;
      margin-bottom: 30px;
      font-weight: 800;
      font-size: 2.4rem;
    }
    &__col-pie {
      .col();
      .size(4);
      .size-sm(5);
      .size-ss(12);
    }
    &__list {
      display: flex;
      flex-direction: column;
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        &__dots {
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-right: 30px;
          border-radius: 50%;
        }
        &__label {
          margin-right: auto;
        }
      }
    }
  }
  .chart-container {
    position: relative;
    width: 100%;
    height: 40vh;
    .xs-block({
      height: 30vh
    })
  }
  .chart-container-pie {
    position: relative;
    width: 100%;
    height: 40vh;
    .sm-block({
      height: 30vh
    })
  }
  .back-btn {
    align-self: flex-start;
  }
</style>
