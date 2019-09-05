<template>
  <section class="p-auth p-default">
    <div class="container page">
      <div class="row-caption">
        <div class="content">
          <span class="desc-light">База знаний</span>
          <h1 class="g-caption">Доступ к базе знаний</h1>
          <p class="desc desc--bold">Внимание! К этой части имеют доступ только партнеры компании Nayuta</p>
        </div>
      </div>
      <div class="row-form">
        <form @submit.prevent="" class="form">
          <div class="item-form">
            <input type="text" class="input">
          </div>
          <div class="item-form">
            <input type="password" class="input">
          </div>
          <button class="g-btn">
            <span>Войти</span>
            <img svg-inline class="svg-icon" src="../assets/img/icon/right-arrow.svg" alt="">
          </button>
        </form>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'TheAuth'
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .p-auth {
    background: url("../assets/img/bg-auth.jpg") no-repeat center / cover;
    .row-caption {
      position: relative;
      padding-top: 90px;
      padding-left: 90px;
      margin-bottom: 80px;
      .decor-cube(300px, 300px);
      .lg-block({ padding-top: 60px; padding-left: 60px; margin-bottom: 100px; .decor-cube(260px, 260px); });
      .sm-block({ margin-bottom: 90px; .decor-cube(220px, 220px); });
      .xs-block({ padding-left: 0; padding-top: 0; margin-bottom: 25px; .decor-cube(@display: none;); });
      .content {
        display: flex;
        flex-direction: column;
        .g-caption {
          margin-bottom: 20px;
        }
        .desc-light {
          font-size: 1.4rem;
          color: #666666;
          margin-bottom: 10px;
        }
        .desc {
          &--bold {
            max-width: 570px;
            font-weight: 800;
            font-size: 1.8rem;
            line-height: 2.5rem;
            .sm-block({ font-weight: 600; line-height: 2.2rem; font-size: 1.6rem; })
          }
        }
      }
    }
    .row-form {
      padding-left: 90px;
      .lg-block({ padding-left: 60px;});
      .md-block({ padding-left: 0;});
      .form {
        .row-flex();
        align-items: center;
        .md-block({ flex-direction: column;});
        .item-form {
          .col();
          .size(4.5);
          .size-md(6);
          .size-sm(8);
          .size-xs(11);
          height: 78px;
          box-sizing: border-box;
          .md-block({margin-bottom: 30px; height: 60px;});
          .xs-block({ margin-bottom: 20px; });
          .input {
            padding-left: 30px;
            width: 100%;
            height: 100%;
            border: none;
            background: rgba(214,214,214, 0.3);
            box-sizing: border-box;
            .sm-block({ padding-left: 15px;});
          }
        }
        .g-btn {
          .col();
          .size(3);
          .size-md(4);
          .size-sm(6);
          min-width: auto;
          height: 78px;
          padding-top: 0;
          padding-bottom: 0;
          .md-block({max-width: 250px;  height: 60px;});
          .xs-block({ width: 100%; });
        }
      }
    }
  }
</style>
