<template>
  <div>
    <div class="content" v-if="team.length > 0">
      <div class="ref-link">
        <div class="link-wrapper">
          <span @click="teamClick('')" class="g-caption-section">Первая линия</span>
          <span class="arrow">></span>
        </div>
        <div class="link-wrapper" v-for="user in fullTeam" >
          <span class="g-caption-section"  @click="teamClick(user)">{{user}}</span>
          <span class="arrow">></span>
        </div>
      </div>
      <div class="ref-user" v-for="user in team" :key="user.login">
        <div class="g-icon-circle g-icon-circle--blue g-icon-circle--mr">
          <img svg-inline class="svg-icon" src="../../../assets/img/icon/avatar.svg" alt="">
        </div>
        <div class="info-wrapper">
          <div class="info" >
            <p class="g-caption-element" @click="userClick(user)" :class="[user.invited === 0 ? 'disabled' : '']">{{user.login}}</p>
            <p class="info-item">
              <img svg-inline class="svg-icon" src="../../../assets/img/icon/location.svg" alt="">
              <span class="text">{{user.fname}}</span>
            </p>
            <p class="info-item">
              <img svg-inline class="svg-icon" src="../../../assets/img/icon/earth-globe.svg" alt="">
              <span class="text">{{user.email}}</span>
            </p>
            <p class="info-item">
              <img svg-inline class="svg-icon" src="../../../assets/img/icon/avatar.svg" alt="">
              <span class="text">{{user.invited}}</span>
            </p>
          </div>
          <div class="g-control-icon">
            <button class="g-icon-circle g-icon-circle--control g-icon-circle--control-black" v-tooltip.bottom="'Отправить сообщение'" @click="">
              <img svg-inline class="svg-icon" src="../../../assets/img/icon/mail.svg" alt="">
            </button>
          </div>

        </div>
      </div>
    </div>
    <panel-info v-else>У вас еще нет приглашенных пользователей</panel-info>
  </div>
</template>

<script>
import API from '../../../api/index'
import PanelInfo from '../../ui/PanelInfo'

export default {
  name: 'AdminPartnersProgramStructure',
  components: {
    PanelInfo
  },
  data() {
    return {
      team: [],
      fullTeam: []
    }
  },
  computed: {
  },
  methods: {
    userClick (user) {
      if (user.invited > 0) {
        API.users.tree(user.login).then(response => {
          this.fullTeam.push(user.login)
          this.team = response
        })
      }
    },
    teamClick(user) {
      API.users.tree(user).then(response => {
        if (user === '') {
          this.fullTeam = []
        } else {
          let index = this.fullTeam.indexOf(user)
          if (index < 0) {
            this.fullTeam.push(user)
          } else {
            this.fullTeam.splice(index + 1)
          }
        }
        this.team = response
      })
    }
  },
  mounted() {
    API.users.tree('').then(response => {
      this.team = response
    })
  }
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
    padding: 30px;
    margin-bottom: 15px;
    border-radius: 5px;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.2);
    .sm-block({
      padding: 20px;
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
    });
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
          &.disabled {
            pointer-events: none;
            text-decoration: none;
          }
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
</style>
