<template>
  <div class="breadcrumbs">
    <div class="container">
      <ul class="breadcrumbs__list">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" to="/">Главная</router-link>
          <span class="breadcrumbs__arrow">></span>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" to="/admin/me">Личный кабинет</router-link>
          <span class="breadcrumbs__arrow" v-if="$route.meta.breadCrumbs">></span>
        </li>
        <li v-for="(item, index) in $route.matched">
          <router-link class="breadcrumbs__link" :to="item.path" v-if="!item.meta.auth && item.meta.breadCrumbs">{{item.meta.breadCrumbs}} <span class="breadcrumbs__arrow" v-if="item === $route.meta.breadCrumbs[index]">></span></router-link>
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
    &__list {
      display: flex;
    }
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
