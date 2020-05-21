<template>
  <section class="ticket">
    <div class="ticket__wrapper">
      <div class="ticket__number">
        <p class="info-text info-text--num" >
          <span class="ticket__number-text--light">Номер вашего билета</span>
          <strong class="ticket__number-text--bold">{{ticketArr[0].hash}}</strong>
        </p>
        <p class="info-text">
          <span class="info-text__regular">Событие:</span>
          <router-link :to="`/event/${ticketArr[0].event.relation_id}`" class="info-text__strong link">{{ticketArr[0].event.title}}</router-link>
        </p>
        <p class="info-text">
          <span class="info-text__regular">Дата и время:</span>
          <strong class="info-text__strong">{{parseDate}}</strong>
        </p>
        <p class="info-text">
          <span class="info-text__regular">Билет:</span>
          <strong class="info-text__strong">{{ticketArr[0].title}}</strong>
        </p>
      </div>
      <div class="ticket__qr-code" v-if="ticketArr[0].event.type !== 2" :style="{backgroundImage: `url(https://api.businessof.life/tickets/show?hash=${ticketArr[0].hash})`}"></div>
    </div>
    <!--<div class="btn-wrapper">-->
      <!--<a href="#" class="g-btn g-btn&#45;&#45;icon-left" download="#">-->
            <!--<span>-->
<!--    <icon-download class="g-icon"/>-->
              <!--Скачать билет-->
            <!--</span>-->
      <!--</a>-->
      <!--<a href="#" class="btn">-->
<!--    <icon-telegram class="g-icon btn__icon"/>-->
        <!--<span class="btn__text">Отправить билет на почту</span>-->
      <!--</a>-->
      <!--<a href="#" class="btn">-->
<!--    <icon-printer class="g-icon btn__icon"/>-->
        <!--<span class="btn__text">Распечатать билет</span>-->
      <!--</a>-->
    <!--</div>-->
  </section>
</template>

<script>
export default {
  name: 'TicketInfo',
  props: ['ticketArr'],
  computed: {
    parseDate() {
      if (this.ticketArr[0].event.date) {
        let onlyDate = this.ticketArr[0].event.date.split(' ')
        let [day, month, year] = onlyDate[0].split('.')
        let da = new Date(year, month - 1, day)
        return da.toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric' }) + ' ' + onlyDate[1]
      } else {
        return '00'
      }
    }
  }
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
      display: flex;
      flex-direction: column;
      padding: 40px;
      margin-right: 40px;
      flex-grow: 1;
      background: #f4f8ef;
      .sm-block({ margin-right: 0; margin-bottom: 20px; padding: 25px; width: 100%; box-sizing: border-box; });
      &-text--light {
        display: block;
        margin-bottom: 10px;
      }
      &-text--bold {
        font-size: 3rem;
        font-weight: 800;
        text-transform: uppercase;
        .sm-block({ font-size: 2.5rem; })
      }
      .info-text {
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
        &--num {
          margin-bottom: auto;
          padding-bottom: 30px;
        }
        &__regular {
          margin-right: 20px;
          font-weight: 400;
        }
        &__strong {
          font-weight: 800;
          &.link {
            text-transform: uppercase;
            color: #000;
            text-decoration: underline;
            &:hover {
              text-decoration: none;
            }
          }
        }
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
          color: @colorMain;
        }
        &__text {
          font-weight: 800;
          text-transform: uppercase;
        }
      }
    }
  }
</style>
