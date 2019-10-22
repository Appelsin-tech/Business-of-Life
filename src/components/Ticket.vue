<template>
  <div class="ticket">
    <h3 class="title">Стандарт</h3>
    <div class="description editor">
      <p>Стартовые семинары</p>
      <p>большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил</p>
      <p>го популяризации в новое время</p>
    </div>
    <p class="price">1.5 <span class="currency">KZT</span>
    </p>
    <a href="#" class="g-btn g-btn--no-icon" v-if="btn"
       @click.prevent="$modal.show('modal-ticket-purchase', {price: activeEvent.tickets.price, currency: activeEvent.tickets.currency, event_id: activeEvent.id})">
      <span>Купить билет</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Ticket',
  props: ['btn']
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";

.ticket {
  .col();
  .size(3);
  .size-lg(4);
  .size-md(5);
  .size-sm(6);
  .size-ss(10);
  .size-xs(12);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 30px;
  margin-bottom: 25px;
  box-shadow: 0 0 30px 0 rgba(0,0,0,0.2);
  .sm-block({padding: 30px 20px; box-shadow: 0 0 20px 0 rgba(0,0,0,0.2);});
  .title {
    margin-bottom: 30px;
    font-size: 3rem;
    font-weight: 800;
    color: #000;
    text-transform: lowercase;
    .lg-block({ font-size: 2.4rem; });
    .sm-block({ font-size: 2rem; margin-bottom: 20px;});
    .xs-block({ font-size: 1.6rem;  margin-bottom: 10px;});
  }
  .description {
    margin-bottom: 40px;
    .sm-block({ margin-bottom: 25px;});
    .xs-block({ margin-bottom: 15px;});
  }
  .price {
    display: flex;
    align-items: baseline;
    flex-shrink: 0;
    font-size: 5rem;
    font-weight: 800;
    color: @colorBlue;
    .xs-block({ font-size: 3.5rem; });
    .currency {
      margin-left: 10px;
      font-size: 2rem;
      color: #000;
      .xs-block({ font-size: 1.6rem; })
    }
  }
  .g-btn {
    margin-top: 30px;
  }
}
</style>
