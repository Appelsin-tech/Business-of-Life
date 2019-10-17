<template>
  <footer class="s-footer" :class="{'border-class': borderClass}">
    <div class="container">
      <div class="copyright-wrapper">
        <p class="copyright">TОО "Business of Life"</p>
        <p class="copyright">Казахстан, г. Алматы, Алмалинский р-н, ул. Айтиева зд. 96</p>
        <a href="mailto:info@businessof.life" class="copyright copyright--link">info@businessof.life</a>
        <a href="tel:+77072350307" class="copyright copyright--tel">+7 (707) 235-03-07</a>
        <p class="copyright">(с) Все права защищены</p>
      </div>
      <!--<ul class="list-social">-->
        <!--<li>-->
          <!--<a href="#" class="item">-->
            <!--<img class="vk" svg-inline src="../assets/img/icon/social/vk.svg" alt="">-->
          <!--</a>-->
        <!--</li>-->
        <!--<li>-->
          <!--<a href="#" class="item">-->
            <!--<img class="yt" svg-inline src="../assets/img/icon/social/youtube.svg" alt="">-->
          <!--</a>-->
        <!--</li>-->
        <!--<li>-->
          <!--<a href="#" class="item">-->
            <!--<img class="inst" svg-inline src="../assets/img/icon/social/instagram.svg" alt="">-->
          <!--</a>-->
        <!--</li>-->
      <!--</ul>-->
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    borderClass () {
      return this.$route.matched.some(item => item.path === '/admin') || this.$route.name === 'my-ticket' || this.$route.name === 'event' || this.$route.name === 'tickets' || this.$route.name === 'tickets-page' || this.$route.name === 'faq'
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .s-footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding-bottom: 35px;
    z-index: 10;
    .lg-block({ padding-bottom: 15px;});
    &.border-class {
      padding-top: 40px;
      border-top: 1px solid @colorBorder;
    }
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .sm-block({ flex-direction: column;});
      .copyright-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .sm-block({ align-items: center;});
      }
      .copyright {
        display: inline-block;
        font-size: 1.4rem;
        .sm-block({order: 2;});
        &:not(:last-child) {
          margin-bottom: 10px;
        }
        &--link {
          color: @colorBlue;
          border-bottom: 1px solid @colorBlue;
          transition: 0.3s;
          &:hover {
            border-bottom-color: transparent;
          }
        }
        &--tel {
          color: @colorBlue;
        }
      }
      .list-social {
        display: flex;
        align-items: center;
        .sm-block({order: 1; margin-bottom: 15px;});
        > li {
          &:not(:last-child) {
            margin-right: 50px;
            .sm-block({ margin-right: 20px;})
          }
          .item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: rgba(0,0,0,0.2);
            transition: 0.3s;
            .sm-block({ width: 35px; height: 35px;});
            &:hover {
              background: rgba(0,0,0,1);
            }
            svg {
              &.vk {
                width: 22px;
                height: 22px;
                .sm-block({ width: 18px; height: 18px;});
              }
              &.yt {
                margin-left: 2px;
                width: 16px;
                height: 16px;
                .sm-block({ width: 13px; height: 13px;});
              }
              &.inst {
                width: 20px;
                height: 20px;
                .sm-block({ width: 16px; height: 16px;});
              }
              path {
                fill: #fff;
              }
            }
          }
        }
      }
    }
  }
</style>
