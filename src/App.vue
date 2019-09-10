<template>
  <div id="app">
    <app-header/>
    <div id="nav-menu" class="navigation-wrapper">
      <button class="arrow next-slide" ></button>
      <button class="arrow prev-slide"></button>
      <ul id="mainMenu" class="main-nav-menu">
        <li>
          <router-link to="/main" class="dots" active-class="active"  v-tooltip.right="'Главная'"/>
        </li>
        <li>
          <router-link to="/learning-stages" class="dots" active-class="active"  v-tooltip.right="'Этапы обучения'"/>
        </li>
        <li>
          <router-link to="/description" class="dots" active-class="active"  v-tooltip.right="'Описание проекта'"/>
        </li>
        <li>
          <router-link to="/our-coach" class="dots" active-class="active"  v-tooltip.right="'Наши тренеры'"/>
        </li>
        <li>
          <router-link to="/news" class="dots" active-class="active"  v-tooltip.right="'Новости'"/>
        </li>
        <li>
          <router-link to="/photo-gallery" class="dots" active-class="active"  v-tooltip.right="'Фотогалерея'"/>
        </li>
        <li>
          <router-link to="/auth" class="dots" active-class="active"  v-tooltip.right="'Авторизация'"/>
        </li>
        <li>
          <router-link to="/calendar" class="dots" active-class="active"  v-tooltip.right="'Календарь событий'"/>
        </li>
        <li>
          <router-link to="/event/=event" class="dots" active-class="active" v-tooltip.right="'Событие'"/>
        </li>
        <li>
          <router-link to="/event-all-editing" class="dots" active-class="active" v-tooltip.right="'Редактирование всех событий'"/>
        </li>
        <li>
          <router-link to="/event-editing" class="dots" active-class="active" v-tooltip.right="'Редактирование события'"/>
        </li>
        <li>
          <router-link to="/event-control" class="dots" active-class="active" v-tooltip.right="'Управление мероприятиями'"/>
        </li>
        <li>
          <router-link to="/control-ticket" class="dots" active-class="active" v-tooltip.right="'Управление билетом'"/>
        </li>
        <li>
          <router-link to="/statistic" class="dots" active-class="active" v-tooltip.right="'Статистика'"/>
        </li>
      </ul>
    </div>
    <main>
      <transition mode="out-in" name="fade">
        <router-view/>
      </transition>
    </main>
    <app-footer/>
    <modal-ticket-purchase/>
    <modal-access/>
    <modal-ticket-success/>
    <modal-event-edit/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import ModalTicketPurchase from './components/modal/ModalTicketPurchase.vue'
import ModalAccess from './components/modal/ModalAccess.vue'
import ModalTicketSuccess from './components/modal/ModalTicketSuccess.vue'
import ModalEventEdit from './components/modal/ModalEventEdit.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    ModalTicketPurchase,
    ModalAccess,
    ModalTicketSuccess,
    ModalEventEdit
  },
  data () {
    return {
      showMenu: true
    }
  },
  computed: {
    borderClass () {
      return this.$route.name === 'event' || this.$route.name === 'statistic'
    }
  }
}
</script>
<style lang="less">
  @import "./assets/less/main";
  #app {
    position: relative;
  }
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
    .main-nav-menu {
      position: relative;
      display: flex;
      flex-direction: column;
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
  .main-pages-enter-active,
  .main-pages-leave-active {
    transition: all .3s ease;
  }
  .main-pages-enter {
    opacity: 1;
  }
  .main-pages-leave-to {
    opacity: 1;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s linear;
  }
  .fade-enter-to,
  .fade-leave {
    opacity: 1;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>

<!--TODO: - не надо делать
          - сменить фото при наведении
           - блок спикеров
           - попап для их редактирования -->
