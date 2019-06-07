<template>
  <header class="s-header">
    <div class="container">
      <img class="logo" src="../assets/img/logo.png" alt="Business of Life">
      <div class="icon-wrapper">
        <a href="#" class="icon--red">
          <img svg-inline src="../assets/img/icon/calendar.svg" alt="">
          <span>Календарь</span>
        </a>
        <a href="#" class="icon--red">
          <img svg-inline src="../assets/img/icon/info.svg" alt="">
          <span>Информация</span>
        </a>
        <button class="burger" @click="">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <ul class="menu-list">
        <li class="item">
          <a href="#main" class="link" >Главная</a>
        </li>
        <li class="item">
          <a href="#learning-stages" class="link">Этапы обучения</a>
        </li>
        <li class="item">
          <a href="#description" class="link" >Об академии</a>
        </li>
        <li class="item">
          <a href="#our-coach" class="link">Наши тренеры</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .s-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding-top: 30px;
    z-index: 9999;
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon-wrapper {
        display: flex;
        align-items: center;
        .icon--red {
          display: flex;
          align-items: center;
          margin-right: 80px;
          &:hover {
            span {
              color: #666666;
              border-bottom-color: #666666;
            }
          }
          svg {
            margin-right: 20px;
            width: 35px;
            height: 35px;
            path {
              fill: @colorMainRed;
            }
          }
          span {
            font-size: 1.4rem;
            color: #000;
            border-bottom: 1px solid transparent;
            transition: 0.3s;
          }
        }
      }
      .burger {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        cursor: pointer;
        .xs-block({ order: 2; });
        span {
          display: block;
          height: 3px;
          width: 32px;
          background-color: @colorBlue;
          transition: all 0.2s ease 0.1s;
          &:not(:last-child) {
            margin-bottom: 8px;
          }
        }
      }
      .menu-list {
        position: absolute;
        display: none;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        flex-direction: column;
        align-items: center;
        .item {
          margin-bottom: 25px;
          text-align: center;
          opacity: 0;
          transform: translateX(50px);
          .sm-block({ margin-bottom: 17px;});
          &:last-child {
            margin-bottom: 0;
          }
          &--submit {
            display: none;
            .sm-block({ display: block;});
          }
          .link {
            font-size: 3rem;
            letter-spacing: 0.8rem;
            font-weight: bold;
            color: #000;
            text-transform: uppercase;
            transition: 0.3s;
            .sm-block({font-size: 2.4rem;
              letter-spacing: 0.6rem;});
          }
        }
      }
      @keyframes fadeItemMenu {
        0% {
          opacity: 0;
          transform: translateX(50px);
        }
        100% {
          opacity: 1;
          transform: translateX(0px);
        }
      }
    }
  }
</style>
