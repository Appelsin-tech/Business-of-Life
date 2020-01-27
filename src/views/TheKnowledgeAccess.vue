<template>
  <section class="p-auth p-default p-default-inner">
    <bread-crumbs/>
    <div class="container page">
      <h1 class='g-caption-inner'>База знаний</h1>
      <div class="info">
        <div class="message" :class="status[currentStatus.status].classIcon">
          <div class="status_icon">
            <img svg-inline class="icon first" src="../assets/img/icon/time-my.svg" alt="" v-if="currentStatus.status === 0 || currentStatus.status === 2">
            <img svg-inline class="icon open" src="../assets/img/icon/check.svg" alt="" v-else-if="currentStatus.status === 1">
          </div>
          <p class="text">{{status[currentStatus.status].message}} <span v-if="currentStatus.exp !== 0 && currentStatus.status === 1">{{activeDate}}</span></p>
        </div>
        <router-link to="/knowledge" class="g-btn g-btn--no-icon" v-if="currentStatus.status === 1" >
          <span>Продлить доступ</span>
        </router-link>
      </div>
      <p>В ближайшее время Ваша заявка будет обработана и вам на почту будет отправлено письмо с доступом</p>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '../components/BreadCrumbs'

export default {
  name: 'TheKnowledgeAccess',
  components: {
    BreadCrumbs,
  },
  data() {
    return {
      status: [
        {
          classIcon: 'first',
          message: 'Обработка заявки'
        },
        {
          classIcon: 'open',
          message: 'Доступ активен'
        },
        {
          classIcon: 'extension',
          message: 'Обработка заявки'
        }
      ],
    }
  },
  computed: {
    currentStatus() {
      return this.$store.getters['user/access'].knowledge
    },
    activeDate() {
      return this.$moment().to(this.currentStatus.exp, true)
    },
  },
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";

  .info {
    display: flex;
    align-items: center;
    padding: 25px 30px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    margin-bottom: 50px;
    .ss-block({
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 25px;
      padding: 15px 20px;
    });
    .message {
      display: flex;
      align-items: center;
      margin-right: auto;
      &.extension,
      &.first {
        .status_icon {
          border-color: @colorWait;
          .icon {
            width: 40px;
            height: 40px;
            * {
              stroke: @colorWait;
            }
          }
        }
      }
      &.open {
        .status_icon {
          border-color: @colorSuccess;
          .icon {
            * {
              fill: @colorSuccess;
            }
          }
        }
      }
      &.end,
      &.close {
        .ss-block({
          margin-bottom: 20px;
        });
        .status_icon {
          border-color: @colorError;
          .icon {
            * {
              fill: @colorError;
            }
          }
        }
      }
      .status_icon {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 60px;
        width: 44px;
        height: 44px;
        border-width: 1px;
        border-style: solid;
        border-color: #000;
        border-radius: 50%;
        flex-shrink: 0;
        box-sizing: border-box;
        .md-block({
          width: 40px;
          height: 40px;
          margin-right: 45px;
        });
        .sm-block({
          margin-right: 30px;
        });
        .ss-block({
          width: 30px;
          height: 30px;
          margin-right: 15px;
        });
        .icon {
          width: 22px;
          height: 22px;
          .md-block({
            width: 15px;
            height: 15px;
          });
          .ss-block({
            width: 12px;
            height: 12px;
          });
        }
      }
      .text {
        font-size: 2rem;
        text-transform: uppercase;
        font-weight: 800;
      }
    }
  }
</style>
