<template>
  <div class="breadcrumbs">
    <div class="container">
      <ul class="breadcrumbs__list">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" to="/">Главная</router-link>
          <span class="breadcrumbs__arrow">></span>
          <router-link class="breadcrumbs__link" to="/calendar">Мероприятия</router-link>
          <span class="breadcrumbs__arrow">></span>
          <router-link class="breadcrumbs__link" to="/event/qwer">Event</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs'
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .breadcrumbs {
    margin-bottom: 25px;
    &__link {
      font-size: 1.4rem;
      color: @colorSecondFonts;
    }
    &__arrow {
      display: inline-block;
      margin: 0 8px;
    }
  }
</style>
