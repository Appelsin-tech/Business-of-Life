<template>
  <div class='chart'>
    <div class='chart__wrapper-text'>
      <h2 class='chart__title'>Статистика продаж</h2>
      <div class='chart__wrapper-filters'>
        <tabs class='tabs' :dataTabs='dataTabs' v-on:interval='setIntervalGraph'/>
      </div>
    </div>
    <highcharts class="hc" :options="chartOptions" :updateArgs="updateArgs"></highcharts>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
import API from '../../../api'
import Tabs from '../../Tabs'
export default {
  name: 'AdminStatisticChartSales',
  props: ['defaultResponse'],
  components: {Tabs, highcharts: Chart},
  data() {
    return {
      currentTab: 'm',
      categoryArr: [],
      ticketsArr: [],
      responseData: this.defaultResponse,
      updateArgs: [true, true, true],
      dataTabs: [
        {
          name: 'За месяц',
          id: 'm',
          time: 30
        },
        {
          name: 'За год',
          id: 'y',
          time: 365
        },
        {
          name: 'За все время',
          id: 'all'
        }
      ],
      testStatistic: [
        {
          id: '2222',
          currency: 'KZT',
          amount: 1000,
          date: '24.10.2019 11:52',
          stamp: 1514754000, // 2018-01-01 разница > ГОД
          relation: 'Тестовое событие',
          ticket: 'Премиум билет'
        },
        {
          id: '225706779',
          currency: 'KZT',
          amount: 1000,
          date: '24.10.2019 11:52',
          stamp: 1514754000, // 2018-01-01 разница > ГОД
          relation: 'Тестовое событие',
          ticket: 'Премиум билет'
        },
        {
          id: '226089131',
          currency: 'KZT',
          amount: 5000,
          date: '25.10.2019 07:18',
          stamp: 1559336400, // 2019-06-01 разница > Месяц
          relation: 'Starting seminar - Донецк',
          ticket: 'СТАНДАРТ'
        },
        {
          id: '227792040',
          currency: 'KZT',
          amount: 100,
          date: '28.10.2019 12:38',
          stamp: 1571605200, // 2019-10-21 разница > День
          relation: 'Тестовое событие',
          ticket: 'стандарт'
        },
        {
          id: '227793845',
          currency: 'KZT',
          amount: 100,
          date: '28.10.2019 12:43',
          stamp: 1571605200, // 2019-10-21 разница > День
          relation: 'Тестовое событие',
          ticket: 'стандарт'
        },
        {
          id: '1111',
          currency: 'KZT',
          amount: 100,
          date: '28.10.2019 12:43',
          stamp: 1453323600, // 2016-01-21 разница > День
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
        plotOptions: {
          series: {
            animation: false
          }
        },
        xAxis: {
          type: 'datetime',
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
  },
  methods: {
    setIntervalGraph(e) {
      this.currentTab = e.id
    },
    sortingInterval(tab) {
      let format
      let iterator
      let calendarDate
      if (tab !== 'all') {
        switch (tab) {
          case 'm':
            format = 'D, MMM'
            iterator = this.$moment(this.$moment()).diff(this.$moment().subtract(1, 'month'), 'days')
            calendarDate = 'days'
            break
          case 'y':
            format = 'MMM, Y'
            iterator = 12
            calendarDate = 'month'
            break
        }
        this.getInterval(this.$moment().subtract(iterator, calendarDate).valueOf())
        this.categoryArr = []
        this.ticketsArr = []
        for (let i = 0; i < iterator; i++) {
          this.ticketsArr[i] = 0
          this.categoryArr.unshift({
            time: this.$moment().subtract(i, calendarDate),
            string: this.$moment().subtract(i, calendarDate).format(format)
          })
          this.responseData.forEach(item => {
            if (this.$moment(item.stamp * 1000).isBetween(this.$moment().subtract(i + 1, calendarDate), this.$moment().subtract(i, calendarDate), calendarDate, '(]')) {
              this.ticketsArr[i] += 1
            }
          })
        }
        this.ticketsArr.reverse()
      } else {
        this.getInterval(this.$moment('2019-01-01').valueOf())
        this.categoryArr = []
        this.ticketsArr = []
        let minVal = this.responseData.map(item => {
          return item.stamp * 1000
        })
        let minStamp = Math.min(...minVal)

        let dif = this.differenceAll(minStamp)
        for (let i = 0; i < dif.iterator; i++) {
          this.ticketsArr[i] = 0
          this.categoryArr.unshift({
            time: this.$moment().subtract(i, dif.calendarDate),
            string: this.$moment().subtract(i, dif.calendarDate).format(dif.format)
          })
          this.responseData.forEach(item => {
            if (this.$moment(item.stamp * 1000).isBetween(this.$moment().subtract(i + 1, dif.calendarDate), this.$moment().subtract(i, dif.calendarDate), dif.calendarDate, '(]')) {
              this.ticketsArr[i] += 1
            }
          })
        }
        this.ticketsArr.reverse()
      }

    },
    differenceAll(from) {
      let currentMoment = this.$moment()
      let dif
      if (currentMoment.diff(from, 'year') > 0) {
        dif = {
          format: 'YYYY',
          iterator: currentMoment.diff(from, 'year') + 1,
          calendarDate: 'year'
        }
      } else if (currentMoment.diff(from, 'month') > 0) {
        dif = {
          format: 'MMM, Y',
          iterator: 12,
          calendarDate: 'month'
        }
      } else {
        dif = {
          format: 'D, MMM',
          iterator: 31,
          calendarDate: 'days'
        }
      }
      return dif
    },
    async getInterval(fromTime) {
      await API.statistics.orders({
        from: fromTime / 1000,
        to: this.$moment().valueOf() / 1000
      }).then(response => {
        this.responseData = response
      })
    }
  },
  watch: {
    currentTab(newVal) {
      this.sortingInterval(newVal)
    }
  },
  mounted() {
    if (this.defaultResponse.length > 0) {
      this.sortingInterval('m')
    }
  }
}
</script>

<style scoped lang="less">
  @import '../../../assets/less/_importants';
  .chart {
    margin-bottom: 100px;
    .xs-block({ margin-bottom: 70px; });
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
  .tabs {
    margin-left: auto;
    .md-block({ margin: 0 auto;})
  }
</style>
