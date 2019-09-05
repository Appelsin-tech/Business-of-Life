<template>
  <section class="p-statistic p-default p-default--statistic">
    <bread-crumbs/>
    <div class="container page">
      <h1 class="g-caption g-caption--event">Статистика</h1>
      <div class="chart">
        <div class="chart__wrapper-text">
          <h2 class="chart__title">Статистика продаж</h2>
          <div class="chart__wrapper-filters">
            <span class="chart__date">Февраль 2019 - Июль 2019</span>
            <tabs :dataTabs="dataTabs" v-on:interval="setIntervalGraph"/>
          </div>
        </div>
        <line-sale-statistic :chart-data="dataLineSales" :options="optionsLine" :class="'chart-container'"/>
      </div>
      <div class="chart">
        <div class="chart__wrapper-text">
          <h2 class="chart__title">Статистика посещений</h2>
          <div class="chart__wrapper-filters">
            <span class="chart__date">Февраль 2019 - Июль 2019</span>
            <tabs :dataTabs="dataTabs" v-on:interval="setIntervalGraph"/>
          </div>
        </div>
        <line-sale-statistic :chart-data="dataLineVisits" :options="optionsLine" :class="'chart-container'"/>
      </div>
      <div class="chart chart--inner">
        <div class="chart__wrapper-text">
          <h2 class="chart__title">География</h2>
          <div class="chart__wrapper-filters chart__wrapper-filters--btn">
            <button-filters :button="['Продажи', 'Посещения']"/>
            <tabs :dataTabs="dataTabs" v-on:interval="setIntervalGraph"/>
          </div>
        </div>
        <div class="chart__pie-wrapper chart-pie">
          <div class="chart-pie__data">
            <strong class="chart-pie__label">Города</strong>
            <ul class="chart-pie__list" v-if="dataPieSales.labels">
              <li class="chart-pie__item item" v-for="(item, index) in labelPieCity" :key="index">
                <span class="item__dots" :style="{backgroundColor: item.color}"></span>
                <span class="item__label">{{item.label}}</span>
                <span class="item__value">{{item.data}}</span>
              </li>
            </ul>
          </div>
          <div class="chart-pie__col-pie">
            <pie-sale-statistic :chart-data="dataPieSales" :options="optionsPie" :class="'chart-container-pie'"/>
          </div>
        </div>
        <button class="test-btn" @click="pieDataCity">RANDOM VAL</button>
      </div>
      <div class="chart chart--inner">
        <div class="chart__wrapper-text">
          <div class="chart__wrapper-filters chart__wrapper-filters--btn">
            <tabs :dataTabs="dataTabs" v-on:interval="setIntervalGraph"/>
          </div>
        </div>
        <div class="chart__pie-wrapper chart-pie">
          <div class="chart-pie__data">
            <strong class="chart-pie__label">Страна</strong>
            <ul class="chart-pie__list" v-if="dataPieSales.labels">
              <li class="chart-pie__item item" v-for="(item, index) in labelPieCountry" :key="index">
                <span class="item__dots" :style="{backgroundColor: item.color}"></span>
                <span class="item__label">{{item.label}}</span>
                <span class="item__value">{{item.data}}</span>
              </li>
            </ul>
          </div>
          <div class="chart-pie__col-pie">
            <pie-sale-statistic :chart-data="dataPieSales" :options="optionsPie" :class="'chart-container-pie'"/>
          </div>
        </div>
        <button class="test-btn" @click="pieDataCountry">RANDOM VAL</button>
      </div>
    </div>
  </section>
</template>

<script>
import LineSaleStatistic from '../components/chart/LineSalesStatistic.js'
import PieSaleStatistic from '../components/chart/PieSalesStatistic.js'
import BreadCrumbs from '../components/BreadCrumbs.vue'
import Tabs from '../components/Tabs'
import ButtonFilters from '../components/ButtonFilters'

export default {
  name: 'TheStatistic',
  components: { LineSaleStatistic, PieSaleStatistic, BreadCrumbs, Tabs, ButtonFilters },
  data() {
    return {
      dataPie: [
        {
          color: '#4e6186',
          label: 'Moscow',
          value: 10
        },
        {
          color: '#ffac2a',
          label: 'SpB',
          value: 20
        },
        {
          color: '#cc4a4a',
          label: 'Ivanovo',
          value: 3
        },
        {
          color: '#43b8bf',
          label: 'Rostov',
          value: 6
        }
      ],
      dataLineSales: {
        datasets: [
          {
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#fe8028',
            data: [{
              x: '1AM', y: 5
            }, {
              x: '2AM', y: 9
            }, {
              x: '15AM', y: 4
            }, {
              x: '21AM', y: 19
            }]
          }
        ]
      },
      dataLineVisits: {
        datasets: [
          {
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#adfec3',
            data: [{
              x: '1AM', y: 18
            }, {
              x: '2AM', y: 9
            }, {
              x: '15AM', y: 15
            }, {
              x: '21AM', y: 2
            }]
          }
        ]
      },
      dataPieSales: {},
      dataTabs: [
        {
          name: 'За сегодня',
          id: 'd'
        },
        {
          name: 'За месяц',
          id: 'm'
        },
        {
          name: 'За полгода',
          id: 'hy'
        },
        {
          name: 'За год',
          id: 'y'
        },
        {
          name: 'За все время',
          id: 'all'
        }
      ]
    }
  },
  computed: {
    optionsLine() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        steppedLine: true,
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              format: 'hour',
              tooltipFormat: 'll'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: false
            }
          }]
        }
      }
    },
    optionsPie() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
      }
    },
    labelPieCity () {
      let arr = []
      this.dataPieSales.labels.forEach((item, i) => {
        arr.push({
          label: item,
          color: this.dataPieSales.datasets[0].backgroundColor[i],
          data: this.dataPieSales.datasets[0].data[i]
        })
      })
      return arr
    },
    labelPieCountry () {
      let arr = []
      this.dataPieSales.labels.forEach((item, i) => {
        arr.push({
          label: item,
          color: this.dataPieSales.datasets[0].backgroundColor[i],
          data: this.dataPieSales.datasets[0].data[i]
        })
      })
      return arr
    }
  },
  mounted() {
    this.pieDataCity()
    this.pieDataCountry()
  },
  methods: {
    setIntervalGraph(e) {
      console.log(e)
    },
    randomVal () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    randomColor() {
      let letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    pieDataCity () {
      this.dataPieSales = {
        labels: ['Moscow', 'SpB', 'Ivanovo', 'Rostov'],
        datasets: [
          {
            backgroundColor: [this.randomColor(), this.randomColor(), this.randomColor(), this.randomColor()],
            data: [this.randomVal(), this.randomVal(), this.randomVal(), this.randomVal()]
          }
        ]
      }
    },
    pieDataCountry () {
      this.dataPieSales = {
        labels: ['Russia', 'Georgia', 'China', 'Germany'],
        datasets: [
          {
            backgroundColor: [this.randomColor(), this.randomColor(), this.randomColor(), this.randomColor()],
            data: [this.randomVal(), this.randomVal(), this.randomVal(), this.randomVal()]
          }
        ]
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .p-statistic {
    display: block;
  }
  .chart {
    margin-bottom: 100px;
    .xs-block({ margin-bottom: 70px;});
    &--inner {
      margin-bottom: 70px;
      .xs-block({ margin-bottom: 50px;});
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
</style>
