<template>
  <div class='chart'>
    <div class='chart__wrapper-text'>
      <h2 class='chart__title'>География</h2>
      <div class='chart__wrapper-filters chart__wrapper-filters--btn'>
        <button-filters :button="dataLocation" v-on:location="setLocation"/>
        <tabs class='tabs' :dataTabs='dataTabs' v-on:interval='setIntervalGraph'/>
      </div>
    </div>
    <highcharts class="hc" :options="chartOptions" :updateArgs="updateArgs"></highcharts>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
import API from '../api/index'
import ButtonFilters from './ButtonFilters'
import Tabs from './Tabs'
export default {
  name: 'AdminStatisticChartLocation',
  props: ['defaultResponse'],
  components: { ButtonFilters, Tabs, highcharts: Chart },
  data () {
    return {
      currentTab: 'm',
      currentLocation: 'country',
      locationArr: [],
      activePie: 'Страна',
      updateArgs: [true, true, true],
      responseData: this.defaultResponse,
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
      dataLocation: [
        {
          name: 'Страна',
          id: 'country'
        },
        {
          name: 'Город',
          id: 'city'
        }
      ],
      testStatistic: [
        {
          id: '2222',
          currency: 'KZT',
          amount: 1000,
          city: 'Moscow',
          country: 'Russia',
          date: '24.10.2019 11:52',
          stamp: 1453323600, // 2018-01-01 разница > ГОД
          relation: 'Тестовое событие',
          ticket: 'Премиум билет'
        },
        {
          id: '225706779',
          currency: 'KZT',
          amount: 1000,
          city: 'Moscow',
          country: 'Russia',
          date: '24.10.2019 11:52',
          stamp: 1453323600, // 2018-01-01 разница > ГОД
          relation: 'Тестовое событие',
          ticket: 'Премиум билет'
        },
        {
          id: '226089131',
          currency: 'KZT',
          amount: 5000,
          city: 'Ivanovo',
          country: 'Russia',
          date: '25.10.2019 07:18',
          stamp: 1453323600, // 2019-06-01 разница > Месяц
          relation: 'Starting seminar - Донецк',
          ticket: 'СТАНДАРТ'
        },
        {
          id: '227792040',
          currency: 'KZT',
          amount: 100,
          city: 'Rostov',
          country: 'Russia',
          date: '28.10.2019 12:38',
          stamp: 1453323600, // 2019-10-21 разница > День
          relation: 'Тестовое событие',
          ticket: 'стандарт'
        },
        {
          id: '227793845',
          currency: 'KZT',
          amount: 100,
          city: 'Нурсултан',
          country: 'Казахстан',
          date: '28.10.2019 12:43',
          stamp: 1453323600, // 2019-10-21 разница > День
          relation: 'Тестовое событие',
          ticket: 'стандарт'
        },
        {
          id: '1111',
          currency: 'KZT',
          amount: 100,
          city: 'Нурсултан',
          country: 'Казахстан',
          date: '28.10.2019 12:43',
          stamp: 1453323600, // 2016-01-21 разница > День
          relation: 'Тестовое событие',
          ticket: 'стандарт'
        }
      ]
    }
  },
  computed: {
    tickets () {
      return [{
        colorByPoint: true,
        name: 'Билеты',
        data: this.filterLocation // sample data
      }]
    },
    chartOptions () {
      return {
        title: false,
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          }
        },
        series: this.tickets
      }
    },
    filterLocation () {
      let newArr = []
      let filterArr
      if (this.currentLocation === 'country') {
        filterArr = this.locationArr.map(item => {
          return { name: item.name.country, y: 1 }
        })
      } else {
        filterArr = this.locationArr.map(item => {
          return { name: item.name.city, y: 1 }
        })
      }
      filterArr.forEach((item) => {
        if (newArr.length === 0) {
          newArr.push(item)
        } else {
          if (newArr.find(c => c.name === item.name)) {
            newArr.forEach(t => {
              if (t.name === item.name) {
                t.y += 1
              }
            })
          } else {
            newArr.push(item)
          }
        }
      })
      return newArr
    }
  },
  methods: {
    setIntervalGraph (e) {
      this.currentTab = e.id
    },
    setLocation (e) {
      this.currentLocation = e.id
    },
    sortingInterval (tab) {
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
        this.locationArr = []
        this.responseData.forEach(item => {
          this.locationArr.push({
            name: item,
            y: 1
          })
        })
      } else {
        this.getInterval(this.$moment('2019-01-01').valueOf())
        this.locationArr = []
        this.responseData.forEach(item => {
          this.locationArr.push({
            name: item,
            y: 1
          })
        })
      }
    },
    async getInterval (fromTime) {
      await API.statistics.orders({
        from: fromTime / 1000,
        to: this.$moment().valueOf() / 1000
      }).then(response => {
        this.responseData = response
      })
    }
  },
  watch: {
    currentTab (newVal) {
      this.sortingInterval(newVal)
    }
  },
  mounted () {
    if (this.defaultResponse.length > 0) {
      this.sortingInterval('m')
    }
  }
}
</script>

<style scoped lang="less">
  @import '../assets/less/_importants';
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
</style>
