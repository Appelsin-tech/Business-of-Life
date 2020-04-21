<template>
  <router-link :to="`/admin/event-editing/${item.id}`" class="menu-item g-panel--img">
    <div class="menu-item__img" :style="{backgroundImage: `url(${item.img})`}"></div>
    <div class="content">
      <p class="g-caption-element">{{item.title}}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'PanelEventMenu',
  props: ['item']
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .menu-item {
    display: flex;
    flex-direction: column;
    transition: 0.3s;
    overflow: hidden;
    .xxl-block({max-width: 95%;});
    .lg-block({max-width: 100%;});
    .sm-block({
      flex-direction: row;
      align-items: center;
      padding-bottom: 0;
    });
    &:hover {
      .g-caption-element {
        text-decoration: none;
      }
    }
    &__img {
      position: relative;
      height: 240px;
      width: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: var(--app_image-bg__color);
      .lg-block({
        height: 220px;
      });
      .md-block({
        height: 210px;
      });
      .sm-block({
        width: 70px;
        height: 70px;
        margin-bottom: 0;
        margin-right: 20px;
        flex-shrink: 0
      });
      .xs-block({
        width: 40px;
        min-height: 40px;
        height: 100%;
      });
      .img-link {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
