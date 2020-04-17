<template>
  <section class="p-not-found p-default-flex">
    <div class="container">
      <div class="content">
        <strong class="g-caption">Страница не найдена</strong>
        <router-link to="/" class="g-btn g-btn--no-icon">
          <span class="text">Главная</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'The404'
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .g-caption {
      text-align: center;
      margin-bottom: 40px;
    }
  }
</style>
