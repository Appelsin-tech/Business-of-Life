<template>
  <section class="p-control-ticket p-default p-default-inner">
    <bread-crumbs/>
    <div class="container page">
      <h1 class="g-caption g-caption-inner">Управление билетом</h1>
      <div class="wrapper-control" v-if="response">
        <div class="wrapper-control__col wrapper-control__col--number">
          <div class="info-number">
            <span class="info-number__small-text">Номер вашего билета</span>
            <strong class="info-number__number">T-798jkhk2343</strong>
          </div>
          <a href="#" class="g-btn g-btn--no-icon">
            <span>Использовать билет</span>
          </a>
        </div>
        <div class="wrapper-control__col wrapper-control__col--search">
          <div class="info-status">
            <div class="info-status__status info-status__status--green">
              <span class="info-status__text-small">Статус</span>
              <p class="info-status__text-strong strong-icon">
                <span class="strong-icon__text">Использован</span>
                <span class="strong-icon__icon">
                  <img class="strong-icon__svg" svg-inline src="../../assets/img/icon/check.svg" alt="">
                </span>
              </p>
            </div>
            <div class="info-status__search search">
              <input class="search__input" type="text">
              <img svg-inline class="search__icon svg-inline" src="../../assets/img/icon/search.svg" alt="">
            </div>
          </div>
        </div>
        <div class="wrapper-control__col wrapper-control__col--date">
          <div class="info-date">
            <p class="info-text info-date__date">
              <span class="info-text__regular">Дата покупки:</span>
              <strong class="info-text__strong">13.06.2019</strong>
            </p>
            <p class="info-text info-date__price">
              <span class="info-text__regular">Стоимость билета:</span>
              <strong class="info-text__strong">3000 ₽</strong>
            </p>
          </div>
        </div>
      </div>
      <div class="wrapper-control error" v-else>
        <strong>{{errorTicket}}</strong>
      </div>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '../BreadCrumbs.vue'
import API from '../../api/index'

export default {
  name: 'AdminControlTicket',
  components: { BreadCrumbs },
  data() {
    return {
      response: false,
      errorTicket: 'Билет не найден'
    }
  },
  mounted() {
    API.tickets.check({hash: this.$route.hash}).then(response => {
      this.response = response
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/_importants";
  .wrapper-control {
    .row-flex();
    justify-content: space-between;
    .lg-block({ justify-content: flex-start;});
    &.error {
      padding: 30px;
      border-radius: 6px;
      background: @colorError;
      .lg-block({ padding: 22px;});
      strong {
        font-size: 2rem;
        color: #fff;
        font-weight: 400;
        .sm-block({ font-size: 1.6rem;});
      }
    }
    &__col {
      .col();
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .lg-block({ margin-bottom: 30px;});
      &--number {
        .size(3.5);
        .size-lg(5);
        .size-md(6);
        .size-sm(10);
        .size-xs(12);
      }
      &--search {
        .size(4);
        .size-lg(5);
        .size-md(6);
        .size-sm(10);
        .size-xs(12);
      }
      &--date {
        .size(3.5);
        .size-lg(12);
      }
      .info-number {
        display: flex;
        flex-direction: column;
        margin-bottom: auto;
        .sm-block({ margin-bottom: 40px;});
        &__small-text {
          margin-bottom: 15px;
        }
        &__number {
          font-size: 4rem;
          font-weight: 800;
          .md-block({ font-size: 3rem;});
        }
      }
      .g-btn {
        height: 72px;
        padding-top: 0;
        padding-bottom: 0;
        box-sizing: border-box;
        .md-block({ height: 60px;});
      }
      .info-status {
        display: flex;
        flex-direction: column;
        width: 100%;
        &__status {
          padding: 30px 10px 60px 50px;
          margin-bottom: 45px;
          .sm-block({ margin-bottom: 20px;});
          .xs-block({ padding-left: 30px; padding-bottom: 40px;});
          &--green {
            background: #f2fff3;
          }
        }
        &__text-small {
          display: inline-block;
          margin-bottom: 20px;
          .xs-block({ margin-bottom: 12px;});
        }
        .strong-icon {
          display: flex;
          align-items: center;
          &__text {
            margin-right: 4vw;
            font-size: 2.4rem;
            font-weight: 800;
            text-transform: uppercase;
            .md-block({ font-size: 2rem;});
          }
          &__icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border: 2px solid #5ddc69;
            border-radius: 50%;
            box-sizing: border-box;
            flex-shrink: 0;
            .md-block({ width: 33px; height: 33px;});
            .xs-block({border-width: 1px; width: 28px; height: 28px;})
          }
          &__svg {
            width: 20px;
            height: 20px;
            .md-block({ width: 13px; height: 13px;});
            path {
              fill: #5ddc69;
            }
          }
        }
        .search {
          position: relative;
          height: 72px;
          .md-block({ height: 60px;});
          .xs-block({ height: 50px;});
          &__input {
            padding-left: 50px;
            width: 100%;
            height: 100%;
            background: #f3f3f3;
            box-sizing: border-box;
            border: 1px solid transparent;
            transition: 0.3s;
            .xs-block({ padding-left: 30px;});
            &:focus {
              border-color: #000;
              background: #fff;
            }
            &:focus + .search__icon {
              path {
                fill: #000;
              }
            }
          }
          &__icon {
            position: absolute;
            left: 14px;
            top: calc(~"50% - 14px");
            width: 28px;
            height: 28px;
            .xs-block({ width: 16px; height: 16px; top: calc(~"50% - 8px"); left: 7px;});
            path {
              fill: #fff;
              transition: 0.3s;
            }
          }
        }
      }
      .info-date {
        padding: 30px;
        .sm-block({ padding-left: 50px;});
        .xs-block({ padding-top: 0; padding-left: 30px;});
        &__date {
          margin-bottom: 30px;
        }
        .info-text {
          &__regular {
            margin-right: 20px;
            font-weight: 400;
          }
          &__strong {
            font-weight: 800;
          }
        }
      }
    }
  }
</style>
