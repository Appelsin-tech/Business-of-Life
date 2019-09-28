<template>
  <footer class="s-footer" :class="{'border-class': borderClass}">
    <div class="container">
      <p class="copyright">© Все права принадлежат компании “Business of Life”</p>
      <ul class="list-social" v-if="false">
        <li>
          <a href="#" class="item">
            <img class="vk" svg-inline src="../assets/img/icon/social/vk.svg" alt="">
          </a>
        </li>
        <li>
          <a href="#" class="item">
            <img class="yt" svg-inline src="../assets/img/icon/social/youtube.svg" alt="">
          </a>
        </li>
        <li>
          <a href="#" class="item">
            <img class="inst" svg-inline src="../assets/img/icon/social/instagram.svg" alt="">
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    borderClass () {
      return this.$route.matched.some(item => item.path === '/admin') || this.$route.name === 'my-ticket' || this.$route.name === 'event' || this.$route.name === 'tickets' || this.$route.name === 'tickets-page'
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
      .copyright {
        font-size: 1.2rem;
        .sm-block({order: 2;});
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
