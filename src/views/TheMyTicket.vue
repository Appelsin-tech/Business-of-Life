<template>
  <section class="p-my-ticket p-default p-default-inner">
    <bread-crumbs v-if="false"/>
    <div class="container" >
      <h1 class="g-caption g-caption-inner">Мой билет</h1>
      <ticket-info :ticket-number="'WD-234jklnmG23kl234'" :qr-code="'https://i.pravatar.cc/512'"/>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '../components/BreadCrumbs.vue'
import TicketInfo from '../components/TicketInfo.vue'

export default {
  name: 'TheMyTicket',
  components: {BreadCrumbs, TicketInfo}
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";

</style>
