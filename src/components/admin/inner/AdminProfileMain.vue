<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="item-wrapper">
      <p class="g-caption-section">Основные</p>
      <div class="grid-wrapper grid-wrapper--main">
<!--        <download-photo row="3" id="2" :image="form.img" :folderFile="`courses/${this.$route.params.id}/`" class="preview_img" idImage="img" v-on:image-download="imageUpload('img', $event)"/>-->
        <div class="g-item-form">
          <label class="g-item-form__label" for="form-role-title">Логин</label>
          <input class="g-item-form__input" id="form-role-title"  type="text" disabled v-model="login">
        </div>
        <div class="g-item-form">
          <label class="g-item-form__label">Email</label>
          <input class="g-item-form__input"  type="text" disabled v-model="email">
        </div>
        <div class="g-item-form">
          <label class="g-item-form__label">Имя</label>
          <input class="g-item-form__input" type="text" v-model="form.fname">
        </div>
        <div class="g-item-form">
          <label class="g-item-form__label">Фамилия</label>
          <input class="g-item-form__input"  type="text"  v-model="form.lname">
        </div>

        <div class="g-item-form col-grid-12">
          <label class="g-item-form__label">Телефон</label>
          <input class="g-item-form__input" v-mask="maskConfig" type="text" v-model="form.phone">
        </div>
      </div>

    </div>
    <div class="item-wrapper">
      <p class="g-caption-section">Адрес</p>
      <div class="grid-wrapper grid-wrapper--address">
        <div class="g-item-form">
          <label class="g-item-form__label">Страна</label>
          <input class="g-item-form__input" type="text"  v-model="form.country">
        </div>
        <div class="g-item-form">
          <label class="g-item-form__label">Город</label>
          <input class="g-item-form__input" type="text" v-model="form.city">
        </div>
        <div class="g-item-form">
          <label class="g-item-form__label" >Область / регион</label>
          <input class="g-item-form__input"  type="text"  v-model="form.region">
        </div>
        <div class="g-item-form">
          <label class="g-item-form__label">Почтовый индекс</label>
          <input class="g-item-form__input" v-mask="'###########################'" type="text"  v-model="form.postcode">
        </div>
        <div class="g-item-form col-grid-12">
          <label class="g-item-form__label">Адрес</label>
          <input class="g-item-form__input" type="text"  v-model="form.address">
        </div>
      </div>
    </div>
    <button class="g-btn g-btn--no-icon">
      <span class="text">Сохранить</span>
    </button>
  </form>
</template>

<script>
import API from '../../../api'
import {mapState} from 'vuex'
import DownloadPhoto from '../common/DownloadPhoto'

export default {
  name: 'AdminProfileMain',
  components: {
    DownloadPhoto
  },
  data() {
    return {
      form: {
        fname: '',
        lname: '',
        phone: '',
        country: '',
        city: '',
        region: '',
        postcode: '',
        address: ''
      },
      login: '',
      email: '',
      maskConfig: {
        mask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        tokens: {
          X: {
            pattern: /[0-9+]/
          }
        },
        masked: ''
      }
    }
  },
  computed: {
    ...mapState('user', [
      'profile'
    ])
  },
  methods: {
    onSubmit() {
      API.users.edit(this.form).then(response => {
        API.response.success('Данные изменены')
        this.$store.dispatch('user/login')
      }).catch(e => {
        API.response.error(e)
      })

    }
  },
  mounted() {
    this.form.fname = this.profile.contacts.fname
    this.form.lname = this.profile.contacts.lname
    this.form.phone = this.profile.contacts.phone
    this.form.country = this.profile.contacts.country
    this.form.city = this.profile.contacts.city
    this.form.region = this.profile.contacts.region
    this.form.postcode = this.profile.contacts.postcode
    this.form.address = this.profile.contacts.address
    this.login = this.profile.login
    this.email = this.profile.email
  }
}
</script>

<style scoped lang="less">
  @import '../../../assets/less/_importants';
  .form {
    .item-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;
      &:last-of-type {
        margin-bottom: 60px;
        padding-bottom: 30px;
        border-bottom: 1px solid @colorBorder;
        .sm-block({margin-bottom: 40px;
          padding-bottom: 30px;});
      }
    }
    .g-btn {
      min-width: 220px;
      align-self: flex-start;
    }
    .grid-wrapper {
      display: grid;
      grid-column-gap: 100px;
      .lg-block({
        grid-column-gap: 50px;
      });
      .md-block({
        grid-column-gap: 0;
      });
      &--main {
        grid-template-columns: 1fr 1fr;
        .md-block({
          grid-template-columns: 1fr;
        });
      }
      &--address {
        grid-template-columns: 1fr 1fr;
        .md-block({
          grid-template-columns: 1fr;
        });
      }
    }
  }
</style>
