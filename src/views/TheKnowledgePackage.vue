<template>
  <section class="p-knowledge-package p-default-block">
    <div class="container page">
      <div class="content">
        <p class="desc-light">База знаний</p>
        <h1 class="g-caption">Доступ к базе знаний</h1>
        <p class="desc-bold">Приобретите пакет, чтобы получить доступ к базе знаний Business of Life</p>
      </div>
      <div class="package-wrapper">
       <knowledge-package v-for="(item, index) in bonusFilter" :key="item.price_kzt" :item="item"></knowledge-package>
      </div>
      <router-link to="/knowledge/menu" class="g-btn g-btn--no-icon" v-if="statusDev">
        <span class="text">База знаний</span>
      </router-link>
    </div>
  </section>
</template>

<script>
import API from '../api/index'
import { mapGetters } from 'vuex'
import KnowledgePackage from '../components/KnowledgePackage'

export default {
  name: 'TheKnowledgePackage',
  components: {
    KnowledgePackage
  },
  data() {
    return {
      bonus: {},
      bonusOptions: [],
    }
  },
  computed: {
    ...mapGetters('user', [
      'status',
      'statusDev'
    ]),
    bonusFilter() {
      if (this.status >= 2) {
        return this.bonusOptions
      } else {
        let newArr = this.bonusOptions
        let removed = newArr.splice(0, 1)
        return newArr
      }
    }
  },
  async mounted() {
    await API.store.items('knowledge').then(response => {
      this.bonusOptions = response
    })
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .p-knowledge-package {
    background: #0f1d5f;
    .container {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .content {
        position: relative;
        margin-bottom: 100px;
        padding-top: 90px;
        padding-left: 90px;
        box-sizing: border-box;
        .decor-cube(290px, 290px);
        .lg-block({
          padding-top: 60px;
          padding-left: 60px;
          .decor-cube(240px, 240px);
        });
        .md-block({
          margin-bottom: 60px;
          width: 80%;
        });
        .sm-block({
          width: 100%;
          max-width: 570px;
          .decor-cube(200px, 200px);
        });
        .xs-block({
          margin-bottom: 40px;
          padding-left: 0;
          padding-top: 0;
          .decor-cube(@display: none;);
        });
        .g-caption {
          color: #fff;
        }
        .desc-light {
          margin-bottom: 10px;
          font-size: 1.4rem;
          color: #fff;
        }
        .desc-bold {
          max-width: 550px;
          font-size: 1.8rem;
          font-weight: 800;
          line-height: 2.5rem;
          color: #fff;
          .sm-block({
            line-height: 2.2rem;
            font-weight: 600;
            font-size: 1.6rem;
          });
        }
      }
      .package-wrapper {
        .row-flex();
        padding-left: 90px;
        justify-content: center;
        .xxl-block({
          padding-left: 0px;
        });

      }
      >.g-btn {
        margin-top: 50px;
        align-self: center;
      }
    }
  }
</style>
