<template>
  <section class="ticket">
    <div class="ticket__wrapper">
      <div class="ticket__number">
        <span class="ticket__number-text--light">Номер вашего билета</span>
        <strong class="ticket__number-text--bold">{{ticketNumber}}</strong>
      </div>
      <div class="ticket__qr-code" :style="{backgroundImage: `url(${qrCode})`}"></div>
    </div>
    <div class="btn-wrapper">
      <a href="#" class="g-btn g-btn--icon-left" download="#">
            <span>
              <img svg-inline class="svg-icon svg-icon--download" src="../assets/img/icon/download.svg" alt="">
              Скачать билет
            </span>
      </a>
      <a href="#" class="btn">
        <img svg-inline class="btn__icon" src="../assets/img/icon/telegram.svg" alt="">
        <span class="btn__text">Отправить билет на почту</span>
      </a>
      <a href="#" class="btn">
        <img svg-inline class="btn__icon" src="../assets/img/icon/printer.svg" alt="">
        <span class="btn__text">Распечатать билет</span>
      </a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TicketInfo',
  props: ['ticketNumber', 'qrCode']
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .ticket {
    &__wrapper {
      display: flex;
      margin-bottom: 70px;
      max-width: 900px;
      .sm-block({ flex-direction: column; align-items: center; margin-bottom: 40px; });
    }
    &__number {
      padding: 40px;
      margin-right: 40px;
      flex-grow: 1;
      background: #fff3f3;
      .sm-block({ margin-right: 0; margin-bottom: 20px; padding: 25px; width: 100%; box-sizing: border-box; });
      &-text--light {
        display: block;
        margin-bottom: 10px;
      }
      &-text--bold {
        font-size: 4rem;
        font-weight: 800;
        text-transform: uppercase;
        .sm-block({ font-size: 3rem; })
      }
    }
    &__qr-code {
      width: 280px;
      height: 280px;
      flex-shrink: 0;
      background-size: contain;
      background-repeat: no-repeat;
      .lg-block({ width: 240px; height: 240px; });
      .sm-block({ width: 200px; height: 200px; })
    }
    .btn-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 900px;
      .sm-block({ flex-direction: column;});
      .btn {
        display: flex;
        align-items: center;
        padding-left: 20px;
        color: #000;
        .sm-block({ padding-left: 0; padding-top: 20px;});
        &:hover,
        &:focus {
          color: #000;
        }
        &__icon {
          width: 25px;
          height: 25px;
          margin-right: 10px;
          path {
            fill: @colorMainRed;
          }
        }
        &__text {
          font-weight: 800;
          text-transform: uppercase;
        }
      }
    }
  }
</style>
