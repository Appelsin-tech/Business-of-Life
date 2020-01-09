<template>
  <div>
    <form class="search-wrapper" @submit.prevent="searchTicket" >
      <div class="col search">
        <input class="search__input" type="text" placeholder="Найти билет по номеру" v-model="hash">
        <img svg-inline class="search__icon svg-inline" src="../assets/img/icon/search.svg" alt="">
      </div>
      <div class="col btn-col">
        <button class="g-btn g-btn--no-icon ">
          <span>Найти</span>
        </button>
      </div>
    </form>
    <div class="error" v-if="notFound">
      <strong>Билет не найден</strong>
    </div>
  </div>
</template>

<script>
import API from '../api/index'

export default {
  name: 'TicketSearch',
  data() {
    return {
      hash: '',
      response: false,
      notFound: false
    }
  },
  methods: {
    searchTicket() {
      API.tickets.check({hash: this.hash}).then(response => {
        this.$router.push({path: `/tickets/${this.hash}`})
        this.response = response.data
        this.notFound = false
      }).catch(error => {
        this.notFound = true
        this.$emit('notFound')
        this.$router.push({path: '/tickets'})
        console.log(error)
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";

  .search-wrapper {
    .row-flex();
    margin-bottom: 40px;
    .sm-block({ flex-direction: column; align-items: flex-start;});
    .col {
      .col();
      &.btn-col {
        .size(4);
        .shift(0.25);
        .shift-sm(0);
        .size-xs(12);
        .shift-xs(0);
      }
    }
    .search {
      .size(3.75);
      .size-lg(5.5);
      .size-sm(8);
      .size-ss(12);
      position: relative;
      height: 72px;
      /*width: 100%;*/
      .md-block({ height: 60px;});
      .sm-block({ margin-bottom: 20px;});
      .xs-block({ height: 50px;});
      &__input {
        padding-left: 50px;
        width: 100%;
        height: 100%;
        background: @colorBgGray;
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
    .g-btn {
      min-width: 180px;
      padding: 24px 28px;
      .md-block({ padding: 19px 28px;})
    }
  }
  .error {
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
</style>
