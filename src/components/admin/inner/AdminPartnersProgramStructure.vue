<template>
  <div>
    <div class="ref-link">
      <div class="link-wrapper">
        <a href="#" class="g-caption-section">Первая линия</a>
        <span class="arrow">></span>
      </div>
      <div class="link-wrapper">
        <a href="#" class="g-caption-section">Pelkinn</a>
        <span class="arrow">></span>
      </div>
    </div>
    <div class="ref-user">
      <div class="icon-user">
        <img svg-inline class="svg-icon" src="../../../assets/img/icon/avatar.svg" alt="">
      </div>
      <div class="info-wrapper">
        <div class="info">
          <p class="g-caption-element g-caption-element--static">Mike 007 </p>
          <p class="info-item">
            <img svg-inline class="svg-icon" src="../../../assets/img/icon/location.svg" alt="">
            <span class="text">Михаил Алиакберов</span>
          </p>
          <p class="info-item">
            <img svg-inline class="svg-icon" src="../../../assets/img/icon/earth-globe.svg" alt="">
            <span class="text">Mike@gmail.com</span>
          </p>
          <p class="info-item">
            <img svg-inline class="svg-icon" src="../../../assets/img/icon/avatar.svg" alt="">
            <span class="text">5</span>
          </p>
        </div>
        <button class="message" v-tooltip.bottom="'Отправить сообщение'" @click="">
          <img svg-inline class="svg-icon" src="../../../assets/img/icon/mail.svg" alt="">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPartnersProgramStructure'
}
</script>

<style scoped lang="less">
  @import "../../../assets/less/_importants";

  .ref-link {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .link-wrapper {
      display: flex;
      margin-right: 10px;
      .g-caption-section {
        cursor: pointer;
        text-decoration: underline;
        margin-bottom: 0;
        &:hover {
          text-decoration: none;
        }
      }
      &:last-child {
        .g-caption-section {
          pointer-events: none;
          text-decoration: none;
        }
        .arrow {
          display: none;
        }
      }
      .arrow {
        display: inline-block;
        margin-left: 5px;
        font-size: 2.7rem;
        font-weight: 800;
        color: #000;
        .sm-block({ font-size: 2.4rem; });
        .xs-block({ font-size: 2rem;});
      }
    }
  }
  .ref-user {
    display: flex;
    padding: 35px 55px;
    margin-bottom: 15px;
    box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);
    .md-block({
      padding: 40px 50px;
    });
    .sm-block({
      padding: 30px 30px 30px 20px;
    });
    .xs-block({
      padding: 20px;
    });
    .icon-user {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 60px;
      width: 45px;
      height: 45px;
      border-width: 1px;
      border-style: solid;
      border-color: @colorMainSecondary;
      border-radius: 50%;
      flex-shrink: 0;
      box-sizing: border-box;
      color: @colorMainSecondary;
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
      .svg-icon {
        width: 22px;
        height: 22px;
        path {
          fill: @colorMainSecondary;
        }
        .md-block({
          width: 20px;
          height: 20px;
        });
        .ss-block({
          width: 15px;
          height: 15px;
        });
      }
    }
    .info-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-grow: 1;
      .ss-block({
        flex-direction: column;
        align-items: flex-start;
      });
      .info {
        margin-right: auto;
        padding-right: 50px;
        .sm-block({
          padding-right: 30px;
        });
        .ss-block({
          margin-bottom: 10px;
          padding-right: 0;
        });
        .g-caption-element {
          margin-bottom: 20px;
        }
        &-item {
          margin-bottom: 10px;
          .md-block({
            margin-bottom: 5px;
          });
          .svg-icon {
            margin-right: 15px;
            width: 15px;
            height: 15px;
            path {
              fill: #dedede;
            }
          }
          .text {
            color: @colorSecondFonts;
          }
        }
      }
    }
  }
  .message {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 60px;
    width: 45px;
    height: 45px;
    border-width: 1px;
    border-style: solid;
    border-color: @colorSecondFonts;
    border-radius: 50%;
    flex-shrink: 0;
    box-sizing: border-box;
    color: @colorSecondFonts;
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
    .svg-icon {
      width: 22px;
      height: 22px;
      path {
        fill: @colorSecondFonts;
      }
      .md-block({
        width: 20px;
        height: 20px;
      });
      .ss-block({
        width: 15px;
        height: 15px;
      });
    }
  }
</style>
