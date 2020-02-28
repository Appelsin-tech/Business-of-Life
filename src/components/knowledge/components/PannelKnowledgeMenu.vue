<template>
  <router-link :to="item.url" class="menu-item">
    <div class="img-wrapper">
      <div class="img" :style="{backgroundImage: `url(${item.img})`}"></div>
      <h3 class="g-caption-element">{{item.title}}</h3>
    </div>
    <p class="lesson">
      <img class="svg-icon" svg-inline src="@/assets/img/icon/book.svg" alt="">
      <span>уроков:</span>
      {{item.lessons}}
    </p>
    <p class="description">
      {{item.snippet}}
    </p>
    <div class="author">
      <div class="g-icon-circle">
        BoL
      </div>
<!--      <div class="img"></div>-->
      <span class="name">Business of Life</span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'PannelAdminKnowledgeMenu',
  props: ['item']
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";
  .menu-item {
    display: flex;
    flex-direction: column;
    transition: 0.3s;
    color: #000;
    flex-grow: 1;
    &:hover {
      .g-caption-element {
        text-decoration: none;
      }
    }
    .img-wrapper {
      display: flex;
      flex-direction: column;
      .sm-block({flex-direction: row;
        margin-bottom: 15px;});
      .img {
        position: relative;
        margin-bottom: 40px;
        height: 240px;
        width: 240px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-color: @colorBgGray;
        .to(1430px, {
          width: auto;
        });
        .lg-block({
          height: 220px;
          margin-bottom: 30px;
        });
        .md-block({
          height: 210px;
        });
        .sm-block({
          width: 70px;
          height: 70px;
          margin-bottom: 0;
          flex-shrink: 0
        });
        .xs-block({
          width: 40px;
          height: 40px;
        });
        /*.xs-block({ height: 250px; margin-bottom: 20px; });*/
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
      .g-caption-element {
        margin-bottom: 25px;
        .sm-block({margin-bottom: 0; margin-left: 20px; padding-top: 5px});
      }
    }
    .lesson {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      .sm-block({margin-bottom: 10px;});
      .svg-icon {
        width: 30px;
        height: 30px;
        .sm-block({
          width: 20px;
          height: 20px;});
        * {
          fill: @colorMain;
        }
      }
      span {
        margin: 0 15px;
      }
    }
    .description {
      margin-bottom: 15px;
      line-height: 1.4;
    }
    .author {
      display: flex;
      align-items: center;
      margin-top: auto;
      .g-icon-circle {
        .xs-block({
          font-size: 1.2rem;});
      }
    }
  }
</style>
