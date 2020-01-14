<template>
  <div class="stock-item">
    <div class="stock-info">
      <h3 class="g-caption-element g-caption-element--static">{{stock.title}} </h3>
      <p class="info-item">
        <img svg-inline class="svg-icon" src="../../assets/img/icon/location.svg" alt="">
        <span class="text">Первые билеты: {{stock.tickets}}</span>
      </p>
      <p class="info-item ">
        <img svg-inline class="svg-icon" src="../../assets/img/icon/timetable.svg" alt="">
        <span class="text">Билет: {{stock.ticket_name}}</span>
      </p>
    </div>
    <div class="g-control-icon">
      <button class="g-icon-circle g-icon-circle--control g-icon-circle--control-green" v-tooltip.bottom="'Редактировать'" @click="">
        <img svg-inline class="svg-icon" src="../../assets/img/icon/pencil.svg" alt="">
      </button>
      <button class="g-icon-circle g-icon-circle--control g-icon-circle--control-red" v-tooltip.bottom="'Удалить'" @click="">
        <img svg-inline class="svg-icon" src="../../assets/img/icon/basket.svg" alt="">
      </button>
    </div>
</div>
</template>

<script>
export default {
  name: 'StockAdmin',
  props: ['stock']
}
</script>

<style scoped lang="less">
  @import "../../assets/less/_importants";

  .stock-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 30px 30px 50px;
    margin-bottom: 20px;
    box-shadow: 0 0 30px 0 rgba(0,0,0,0.2);
    border-radius: 5px;
    .sm-block({
      margin-bottom: 15px;
      padding: 20px 20px 20px 30px;
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
    });
    .ss-block({
      flex-direction: column;
      align-items: flex-start;
    });
    .xs-block({
      padding: 20px;
    });
    .stock-info {
      display: flex;
      flex-direction: column;
      .ss-block({
        margin-bottom: 30px;});
      .info-item {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .md-block({
          margin-bottom: 7px;
        });
        &:last-of-type {
          margin-bottom: 0;
        }
        .svg-icon {
          margin-right: 15px;
          width: 15px;
          height: 15px;
          path {
            fill: #dedede;
          }
        }
        .text {
          color: @colorSecondFonts;
        }
      }
    }
    .g-caption-element {
      margin-bottom: 25px;
      .md-block({
        margin-bottom: 15px;
      });
    }
  }
</style>
