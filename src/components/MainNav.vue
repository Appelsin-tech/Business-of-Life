<template>
  <div id="nav-menu" class="navigation-wrapper" v-if="$route.meta.navDots">
    <!--<div class="nav-wrapper">
      <button class="arrow arrow&#45;&#45;prev" @click="prevPage" :class="{disabled: disabledPrev}">
        <img class="arrow__svg" svg-inline src="../assets/img/icon/arrow-slider.svg" alt="">
      </button>
      <button class="arrow arrow&#45;&#45;next" @click="nextPage" :class="{disabled: disabledNext}">
        <img class="arrow__svg" svg-inline src="../assets/img/icon/arrow-slider.svg" alt="">
      </button>
    </div>-->

    <ul id="mainMenu" class="main-nav-menu">
      <li v-for="(item, index) in routeArr" :key="index">
        <router-link :to="item.path" class="dots" exact active-class="active"  v-tooltip.right="item.tooltip"/>
      </li>
      <!--<li>-->
      <!--<router-link to="/admin" class="dots" active-class="active"  v-tooltip.right="'ADMIN'"/>-->
      <!--</li>-->
      <!--<li>-->
      <!--<router-link to="/learning-stages" class="dots" active-class="active"  v-tooltip.right="'Этапы обучения'"/>-->
      <!--</li>-->
      <!--<li>-->
      <!--<router-link to="/our-coach" class="dots" active-class="active"  v-tooltip.right="'Наши тренеры'"/>-->
      <!--</li>-->
      <!--<li>-->
      <!--<router-link to="/news" class="dots" active-class="active"  v-tooltip.right="'Новости'"/>-->
      <!--</li>-->
      <!--<li>-->
      <!--<router-link to="/photo-gallery" class="dots" active-class="active"  v-tooltip.right="'Фотогалерея'"/>-->
      <!--</li>-->
      <!--<li>-->
      <!--<router-link to="/auth" class="dots" active-class="active"  v-tooltip.right="'Авторизация'"/>-->
      <!--</li>-->
      <!--<li>-->
      <!--<router-link to="/event/3" class="dots" active-class="active" v-tooltip.right="'Событие'"/>-->
      <!--</li>-->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MainNav',
  data() {
    return {
      disabledPrev: false,
      disabledNext: false,
      routeArr: [
        {
          path: '/',
          tooltip: 'Главная'
        },
        {
          path: '/description',
          tooltip: 'Описание проекта'
        },
        {
          path: '/calendar',
          tooltip: 'Календарь событий'
        },
        {
          path: '/news',
          tooltip: 'Новости'
        },
        {
          path: '/news/123',
          tooltip: 'Страница новости'
        },
        {
          path: '/pricing',
          tooltip: 'Подписки'
        },
      ]
    }
  },
  methods: {
    prevPage() {
      let currentRoute = this.$route.path
      let index = this.routeArr.findIndex((item) => {
        return currentRoute === item.path
      })
      if(index !== 0) {
        this.$router.push({ path: this.routeArr[index - 1].path })
        this.disabledNext = false
        if (index - 1 === 0) {
          this.disabledPrev = true
        }
      }
    },
    nextPage() {
      let currentRoute = this.$route.path
      let index = this.routeArr.findIndex((item) => {
        return currentRoute === item.path
      })
      if(index !== this.routeArr.length - 1) {
        this.$router.push({ path: this.routeArr[index + 1].path })
        this.disabledPrev = false
        if (index + 1 === this.routeArr.length - 1) {
          this.disabledNext = true
        }
      }
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";

  .navigation-wrapper {
    position: fixed;
    right: 80px;
    top: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(-50%);
    z-index: 9999;
    .to(1700px, { right: 30px;});
    .to(1600px, { display: none;});
    .lg-block({ display: none;});
    .nav-wrapper {
      position: absolute;
      top: -130px;
      display: flex;
      flex-direction: column;
      .arrow {
        width: 30px;
        height: 30px;
        cursor: pointer;
        &.disabled {
          opacity: 0.6;
          pointer-events: none;
        }
        &--prev {
          margin-bottom: 10px;
          transform: rotate(-90deg);
        }
        &--next {
          transform: rotate(90deg);
        }
        &__svg {
          width: 100%;
          height: 100%;
          path {
            fill: @colorBlue;
          }
        }
      }
    }

    .main-nav-menu {
      position: relative;
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      > li {
        &:not(&:last-child) {
          margin-bottom: 20px;
        }
        .dots {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          background-size: 15px 15px;
          &::after {
            content: '';
            display: inline-block;
            position: absolute;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #bebebe;
          }
          &.active {
            &::after {
              background: @colorMainRed;
            }
          }
        }
      }
    }
  }
</style>
