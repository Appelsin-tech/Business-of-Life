<template>
  <footer class="s-footer">
    <div class="container">
      <p class="copyright">© Все права принадлежат компании “Business of Life”</p>
      <ul class="list-social">
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
  name: 'AppFooter'
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .s-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding-bottom: 35px;
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .copyright {
        font-size: 1.2rem;
      }
      .list-social {
        display: flex;
        align-items: center;
        > li {
          &:not(:last-child) {
            margin-right: 50px;
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
            &:hover {
              background: rgba(0,0,0,1);
            }
            svg {
              &.vk {
                width: 22px;
                height: 22px;
              }
              &.yt {
                width: 16px;
                height: 16px;
              }
              &.inst {
                width: 20px;
                height: 20px;
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
