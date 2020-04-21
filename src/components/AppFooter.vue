<template>
  <footer class="s-footer" :class="[($route.name === 'knowledge-package') ? 'white' : '', {'border-class': !borderClass}]" >
    <div class="container">
      <div class="copyright-wrapper">
        <p class="copyright">TОО "Business of Life"</p>
        <p class="copyright">Казахстан, г. Алматы, Алмалинский р-н, ул. Айтиева зд. 96</p>
        <a href="mailto:info@businessof.life" class="copyright copyright--link">info@businessof.life</a>
        <a href="tel:+77072350307" class="copyright copyright--tel">+7 (707) 235-03-07</a>
        <router-link to="/public_offer" alt="Публичная оферта" class="copyright copyright--link">Публичная оферта</router-link>
        <p class="copyright">(с) Все права защищены</p>
        <p class="copyright">
          <router-link class="copyright--link" to="/payment_policy">Оплата и возврат</router-link>
        </p>
      </div>
      <!--<ul class="list-social">-->
        <!--<li>-->
          <!--<a href="#" class="item">-->
<!--      <icon-vk class="g-icon vk"/>-->
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
      let rout = false
      switch (this.$route.name) {
        case 'main':
          rout = true
          break
        case 'main-r':
          rout = true
          break
        case 'description':
          rout = true
          break
        case 'calendar':
          rout = true
          break
        case 'knowledge-package':
          rout = true
          break
        case 'auth':
          rout = true
          break
        case 'registration':
          rout = true
          break
        case 'registration-referal':
          rout = true
          break
        case 'forgot':
          rout = true
          break
        case 'marathon':
          rout = true
          break
      }
      return rout
    },
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
    z-index: 7;
    .lg-block({ padding-bottom: 15px;});
    &.border-class {
      padding-top: 40px;
      border-top: 1px solid var(--app_element-border__color);
    }
    &.white {
      .container {
        .copyright-wrapper {
          .copyright {
            color: #fff;
            &--link {
              color: #fff;
              border-bottom: 1px solid #fff;
              &:hover {
                border-bottom-color: transparent;
              }
            }
            &--tel {
              color: #fff;
            }
          }
        }
      }
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
        .sm-block({order: 2; text-align: center;});
        &:not(:last-child) {
          margin-bottom: 10px;
        }
        &--link {
          color: var(--app_emphasis__color);
          border-bottom: 1px solid var(--app_emphasis__color);
          transition: 0.3s;
          &:hover {
            border-bottom-color: transparent;
          }
        }
        &--tel {
          color: var(--app_emphasis__color);
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
            .g-icon {
              color: #fff;
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
            }
          }
        }
      }
    }
  }
</style>
