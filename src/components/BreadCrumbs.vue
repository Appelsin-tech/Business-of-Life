<template>
  <div class="breadcrumbs">
    <div class="container">
      <ul class="breadcrumbs__list">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" to="/">Главная</router-link>
          <span class="breadcrumbs__arrow">></span>
        </li>
        <li v-for="(item, index) in arrCrumbs">
          <router-link class="breadcrumbs__link" :to="routePath(item)">
            {{item.title}}
            <span class="breadcrumbs__arrow">></span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  props: {
    arrCrumbs: {
      default: () => []
    },
  },
  computed: {
  },
  methods: {
    routePath(d) {
      if (d.path === '/office/event') {
        return d.path + '/' + this.$route.params.id
      } else {
        return d.path
      }
    }
  },
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .breadcrumbs {
    margin-bottom: 25px;
    &__list {
      display: flex;
      .sm-block({ flex-direction: column;})
    }
    &__link {
      font-size: 1.4rem;
      color: var(--app_font__color);
    }
    &__arrow {
      display: inline-block;
      margin: 0 8px;
      color: var(--app_font__color);
    }
  }
</style>
