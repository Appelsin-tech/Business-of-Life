<template>
  <section class='p-statistic p-default p-default-inner'>
    <bread-crumbs/>
    <div class='container page'>
      <h1 class='g-caption g-caption-inner'>Статистика </h1>
      <div class='wrapper' v-if="responseData.length > 0">
        <div class='chart'>
          <div class='chart__wrapper-text'>
            <h2 class='chart__title'>Статистика продаж</h2>
            <div class='chart__wrapper-filters'>
              <tabs class='tabs' :dataTabs='dataTabs' v-on:interval='setIntervalGraph'/>
            </div>
          </div>
          <highcharts class="hc" :options="chartOptions" :updateArgs="updateArgs"></highcharts>
        </div>
        <!--<div class='chart'>-->
        <!--<div class='chart__wrapper-text'>-->
        <!--<h2 class='chart__title'>География</h2>-->
        <!--<div class='chart__wrapper-filters chart__wrapper-filters&#45;&#45;btn'>-->
        <!--<button-filters :button="['Страна', 'Город']"/>-->
        <!--<tabs class='tabs' :dataTabs='dataTabs' v-on:interval='setIntervalGraph'/>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class='chart__pie-wrapper chart-pie'>-->
        <!--<div class='chart-pie__data'>-->
        <!--<strong class='chart-pie__label'>{{activePie}}</strong>-->
        <!--<ul class='chart-pie__list'>-->
        <!--<li class='chart-pie__item item'>-->
        <!--<span class='item__dots'></span>-->
        <!--<span class='item__label'></span>-->
        <!--<span class='item__value'></span>-->
        <!--</li>-->
        <!--</ul>-->
        <!--</div>-->
        <!--<div class='chart-pie__col-pie'>-->
        <!--&lt;!&ndash;<pie-sale-statistic :chart-data='dataPieSales' :options='optionsPie' :class='"chart-container-pie"'/>&ndash;&gt;-->
        <!--</div>-->
        <!--</div>-->
        <!--&lt;!&ndash;<button class='test-btn' @click='pieDataCity'>RANDOM VAL</button>&ndash;&gt;-->
        <!--</div>-->
      </div>
      <div class='no-event' v-else>У вас еще нет мероприятий</div>
      <router-link :to='`/admin/me`' class='back-btn'>Назад</router-link>
    </div>
  </section>
</template>

<script>
import { Chart } from 'highcharts-vue'
import API from '../../api/index'
import BreadCrumbs from '../BreadCrumbs.vue'
import Tabs from '../Tabs'
import ButtonFilters from '../ButtonFilters'
import { mapState } from 'vuex'

export default {
  name: 'AdminStatistic',
  components: { BreadCrumbs, Tabs, ButtonFilters, highcharts: Chart },
  data() {
    return {
      categoryArr: [],
      ticketsArr: [],
      activePie: 'Страна',
      updateArgs: [true, true, true],
      currentTab: 'm',
      dataTabs: [
        {
          name: 'За месяц',
          id: 'm',
          time: 30
        },
        {
          name: 'За полгода',
          id: 'hy',
          time: 180
        },
        {
          name: 'За год',
          id: 'y',
          time: 365
        },
        // {
        //   name: 'За все время',
        //   id: 'all'
        // }
      ],
      responseData: [],
      testStatistic: [
        {
          id: '2222',
          currency: 'KZT',
          amount: 1000,
          date: '24.10.2019 11:52',
          stamp: 1572613350, // 1 ноября
          relation: 'Тестовое событие',
          ticket: 'Премиум билет'
        },
        {
          id: '225706779',
          currency: 'KZT',
          amount: 1000,
          date: '24.10.2019 11:52',
          stamp: 1572519348, // 1 дней назад
          relation: 'Тестовое событие',
          ticket: 'Премиум билет'
        },
        {
          id: '226089131',
          currency: 'KZT',
          amount: 5000,
          date: '25.10.2019 07:18',
          stamp: 1572173846, // 5 дней назад
          relation: 'Starting seminar - Донецк',
          ticket: 'СТАНДАРТ'
        },
        {
          id: '227792040',
          currency: 'KZT',
          amount: 100,
          date: '28.10.2019 12:38',
          stamp: 1572173846, // 5 дней назад
          relation: 'Тестовое событие',
          ticket: 'стандарт'
        },
        {
          id: '227793845',
          currency: 'KZT',
          amount: 100,
          date: '28.10.2019 12:43',
          stamp: 1570100290, // 29 дней назад
          relation: 'Тестовое событие',
          ticket: 'стандарт'
        },
        {
          id: '1111',
          currency: 'KZT',
          amount: 100,
          date: '28.10.2019 12:43',
          stamp: 1568285971, // 50 дней назад
          relation: 'Тестовое событие',
          ticket: 'стандарт'
        }
      ],
    }
  },
  computed: {
    category() {
      return this.categoryArr
    },
    tickets() {
      return [{
        name: 'Билеты',
        data: this.ticketsArr // sample data
      }]
    },
    chartOptions() {
      return {
        title: false,
        chart: {
          type: 'column'
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: { // don't display the dummy year
            day: '%e. %b'
          },
          categories: this.category.map(i => i.string)
        },
        yAxis: {
          allowDecimals: false,
          title: {
            text: 'Количество'
          }
        },
        // series: this.filterTickets
        series: this.tickets
      }
    },
    ...mapState('user', [
      'myParentEvents',
      'logged'
    ]),
  },
  methods: {
    setIntervalGraph(e) {
      this.currentTab = e.id
    },
    sortingDate(interval) {
      switch (interval) {
        case 'm':
          this.getInterval(this.$moment().subtract(30, 'days').valueOf())
          this.categoryArr = []
          this.ticketsArr = []
          for (let i = 0; i < 31; i++) {
            this.ticketsArr[i] = 0
            this.categoryArr.unshift({
              time: this.$moment().subtract(i, 'days'),
              string: this.$moment().subtract(i, 'days').format('D, MMM')
            })
            this.responseData.forEach(item => {
              if (this.$moment(item.stamp * 1000).isBetween(this.$moment().subtract(i + 1, 'days'), this.$moment().subtract(i, 'days'))) {
                this.ticketsArr[i] += 1
              }
            })
          }
          this.ticketsArr.reverse()
          break
        case 'hy':
          this.getInterval(this.$moment().subtract(6, 'month').valueOf())
          this.categoryArr = []
          this.ticketsArr = []
          for (let i = 0; i < 6; i++) {
            this.ticketsArr[i] = 0
            this.categoryArr.unshift({
              time: this.$moment().subtract(i, 'month'),
              string: this.$moment().subtract(i, 'month').format('MMM, Y')
            })
            this.responseData.forEach(item => {
              if (this.$moment(item.stamp * 1000).isBetween(this.$moment().subtract(i + 1, 'month'), this.$moment().subtract(i, 'month'), 'month', '(]')) {
                this.ticketsArr[i] += 1
              }
            })
          }
          this.ticketsArr.reverse()
          break
        case 'y':
          this.getInterval(this.$moment().subtract(12, 'month').valueOf())
          this.categoryArr = []
          this.ticketsArr = []
          for (let i = 0; i < 12; i++) {
            this.ticketsArr[i] = 0
            this.categoryArr.unshift({
              time: this.$moment().subtract(i, 'month'),
              string: this.$moment().subtract(i, 'month').format('MMM, Y')
            })
            this.responseData.forEach(item => {
              if (this.$moment(item.stamp * 1000).isBetween(this.$moment().subtract(i + 1, 'month'), this.$moment().subtract(i, 'month'), 'month', '(]')) {
                this.ticketsArr[i] += 1
              }
            })
          }
          this.ticketsArr.reverse()
          break
        case 'all':
          this.getInterval()
          this.categoryArr = []
          this.ticketsArr = []
          for (let i = 0; i < 30; i++) {
            // categoryArr.unshift(this.addDays(date, i).getDate())
          }
          break
      }
    },
    async getInterval(fromTime) {
      await API.statistics.orders({
        from: fromTime / 1000,
        to: this.$moment().valueOf() / 1000
      }).then(response => {
        this.responseData = response
        console.log(response)
      })
    }
  },
  watch: {
    currentTab(newVal) {
      this.sortingDate(newVal)
    }
  },
  async mounted() {
    await this.getInterval(this.$moment().subtract(30, 'days').valueOf())
    if (this.responseData.length > 0) {
      this.sortingDate('m')
    }
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
  .chart {
    margin-bottom: 100px;
    .xs-block({ margin-bottom: 70px; });
    &--inner {
      margin-bottom: 70px;
      .xs-block({ margin-bottom: 50px; });
    }
    &__wrapper-text {
      margin-bottom: 80px;
      .sm-block({ margin-bottom: 50px; });
      .xs-block({ margin-bottom: 35px; });
    }
    &__title {
      margin-bottom: 25px;
      font-size: 3.6rem;
      font-weight: 800;
      .sm-block({ font-size: 2.6rem; margin-bottom: 18px; });
      .xs-block({ font-size: 2rem; });
    }
    &__wrapper-filters {
      display: flex;
      justify-content: space-between;
      .md-block({ flex-direction: column; align-items: center; });
      &--btn {
        align-items: center;
      }
    }
    &__date {
      font-size: 1.4rem;
      .md-block({ margin-bottom: 18px; });
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
    .xs-block({ height: 30vh })
  }
  .chart-container-pie {
    position: relative;
    width: 100%;
    height: 40vh;
    .sm-block({ height: 30vh })
  }
  .tabs {
    margin-left: auto;
  }
  .no-event {
    margin-bottom: auto;
    padding: 20px 20px 20px 30px;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 2rem;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    .sm-block({ padding: 15px; font-size: 1.6rem; border-radius: 5px; })
  }
  .back-btn {
    align-self: flex-start;
  }
</style>
