<template>
  <div>
    <form class="search-wrapper" @submit.prevent="search" >
      <div class="col search">
        <input class="search__input" type="text" :placeholder="placeholder" v-model="field" @change="changeField">
        <icon-magnify class="g-icon search__icon"/>
      </div>
      <div class="col btn-col">
        <button-app>
          Найти
        </button-app>
      </div>
    </form>
    <div class="error" v-if="notFound && page !== 'member' || showError" >
      <strong>
        <template v-if="page === 'ticket'">Билет не найден</template>
        <template v-else-if="page === 'member'">Участник не найден</template>
      </strong>
    </div>
  </div>
</template>

<script>
import API from '@/api/index'

export default {
  name: 'TicketSearch',
  props: {
    page: {
      required: true
    },
    idEvent: {
      required: false
    },
    showError: {
      required: false,
      default: false
    }
  },
  data() {
    return {
      field: '',
      response: false,
      notFound: false
    }
  },
  computed: {
    placeholder () {
      let search = 'Найти'
      switch (this.page) {
        case 'ticket':
          search = 'Найти билет по номеру'
          break
        case 'member':
          search = 'Найти по имени'
          break
      }
      return search
    }
  },
  methods: {
    search() {
      if(this.page === 'ticket') {
        let data = {
          hash: this.field
        }
        API.search.ticketCheck(data).then(response => {
          this.$router.push({path: `/tickets/${this.field}`})
          this.response = response.data
          this.notFound = false
        }).catch(error => {
          this.notFound = true
          this.$emit('notFound')
          this.$router.push({path: '/tickets'})
        })
      } else if (this.page === 'member') {
        let data = {
          member: this.field
        }
        API.search.participants(data).then(response => {
          console.log(response)
        }).catch(e => console.log(e))
        console.log(data)
      }
    },
    changeField() {
      if (this.notFound) {
        this.notFound = false
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";

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
      /*width: 100%;*/
      .sm-block({ margin-bottom: 20px;});
      &__input {
        padding-left: 50px;
        width: 100%;
        height: 100%;
        background: #fff;
        box-sizing: border-box;
        border: 1px solid transparent;
        transition: 0.3s;
        border-radius: 8px;
        .sm-block({
          height: 42px;});
        .xs-block({ padding-left: 30px;});
        &:hover,
        &:focus {
          border-color: #000;
        }
        &:focus + .search__icon {
          color: #000;
        }
      }
      &__icon {
        position: absolute;
        left: 14px;
        top: calc(~"50% - 14px");
        width: 28px;
        height: 28px;
        color: #000;
        transition: 0.3s;
        .xs-block({ width: 16px; height: 16px; top: calc(~"50% - 8px"); left: 7px;});
      }
    }
    .btn-app {
      min-width: 180px;
      .sm-block({min-width: 130px;});
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
