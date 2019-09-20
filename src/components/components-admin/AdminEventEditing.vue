<template>
  <section class="p-event-editing p-default p-default-inner">
    <bread-crumbs/>
    <div class="container page">
      <h1 class="g-caption g-caption-inner">Редактирование события</h1>
      <h2 class="g-caption g-caption-section">Общая информация</h2>
      <form class="edit-form">
        <div class="edit-grid">
          <div class="edit-grid__item item item--col-8">
            <label class="item__label" for="form-title">Название</label>
            <input class="item__input" type="text" id="form-title" v-model="form.title">
          </div>
          <div class="edit-grid__item item item--col-8 textarea">
            <label class="item__label" for="form-description">Описание</label>
            <textarea-resize>
                <textarea class="item__input item__input--textarea"
                          id="form-description" rows="1" v-model="form.description"></textarea>
            </textarea-resize>
          </div>
          <div class="edit-grid__item item item--col-4 photo">
            <span class="item__label">Фото</span>
            <div class="photo__wrapper">
              <input type="file" class="visually-hidden" id="form__file">
              <label class="photo__link photo__link--add" for="form__file">
                <img svg-inline class="photo__icon" src="../../assets/img/icon/camera.svg" alt="">
                <span class="photo__text">Загрузить фото</span>
              </label>
            </div>
          </div>
          <div class="edit-grid__item item item--col-4">
            <span class="item__label">Страна</span>
            <v-select :multiple="false" :class="['v-select__modal']" :searchable="false" label="label" :options="selectCountry" v-model="form.country"></v-select>
          </div>
          <div class="edit-grid__item item item--col-4">
            <span class="item__label">Город</span>
            <v-select :multiple="false" :class="['v-select__modal']" :searchable="false" label="label" :options="selectCity" v-model="form.city"></v-select>
          </div>
          <div class="edit-grid__item item item--col-4">
            <label class="item__label" for="form__address">Адрес</label>
            <input class="item__input" type="text" id="form__address" v-model="form.address">
          </div>
          <div class="edit-grid__item item item--col-4">
            <label class="item__label" for="form__date">Дата</label>
            <input class="item__input" type="text" id="form__date" v-mask="'##.##.####'" v-model="form.date">
          </div>
          <div class="edit-grid__item item item--col-4">
            <label class="item__label" for="form__time">Время</label>
            <input class="item__input" type="text" id="form__time" v-mask="'##:##'" v-model="form.time">
          </div>
          <div class="edit-grid__item item item--col-4">
            <label class="item__label" for="form__price">Стоимость билета ($)</label>
            <currency-input class="item__input" id="form__price" currency="USD" v-model="form.price"/>
          </div>
        </div>
        <div class="btn-wrapper">
          <button class="g-btn g-btn--no-icon g-btn--white g-btn--border">
            <span>Сохранить</span>
          </button>
          <button class="g-btn g-btn--no-icon">
            <span>Опубликовать</span>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '../BreadCrumbs.vue'
import TextareaResize from '../textareaResize'
import { CurrencyInput } from 'vue-currency-input'

export default {
  name: 'AdminEventEditing',
  components: { BreadCrumbs, TextareaResize, CurrencyInput },
  data() {
    return {
      resize: true,
      form: {
        title: '',
        description: '',
        photo: '',
        country: '',
        city: '',
        address: '',
        date: '',
        time: '',
        price: 0
      },
      errorSelect: {
        selectedCountry: false,
        selectedCity: false
      },
      selectCity: [
        {
          val: 'Москва',
          label: 'Москва'
        },
        {
          val: 'Ростов',
          label: 'Ростов'
        },
        {
          val: 'Иваново',
          label: 'Иваново'
        }
      ],
      selectCountry: [
        {
          val: 'Россия',
          label: 'Россия'
        },
        {
          val: 'Казахстан',
          label: 'Казахстан'
        },
        {
          val: 'Украина',
          label: 'Украина'
        }
      ],
    }
  },
}
</script>

<style scoped lang="less">
  @import "../../assets/less/_importants";
  .edit-form {
    padding-left: 50px;
    .lg-block({ padding-left: 0; });
    .btn-wrapper {
      display: flex;
      justify-content: flex-start;
      .sm-block({ margin-left: 0; margin-bottom: 40px;});
      .ss-block({ flex-direction: column; align-items: center;});
      .g-btn {
        min-width: 250px;
        .sm-block({ min-width: 220px;});
        .ss-block({ min-width: 200px;});
        &:first-child {
          margin-right: 20px;
          .ss-block({ margin-right: 0; margin-bottom: 20px;});
        }
      }
    }
  }
  .edit-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: max-content;
    grid-column-gap: 100px;
    grid-row-gap: 50px;
    margin-bottom: 50px;
    .lg-block({ grid-column-gap: 50px; grid-row-gap: 30px; });
    .md-block({ grid-template-columns: 1fr 1fr; });
    .ss-block({ grid-template-columns: 1fr; grid-row-gap: 20px; });
    .photo {
      display: flex;
      flex-direction: column;
      position: relative;
      height: 400px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      transition: 0.3s;
      .to(1400px, { height: 350px; });
      .md-block({ height: 300px; });
      .xs-block({ height: 200px; margin-bottom: 0; });
      &:hover {
        .photo-link--change {
          opacity: 1;
        }
        .photo__link--add {
          border-color: #000;
          .photo__icon {
            path {
              fill: #000;
            }
          }
          .photo__text {
            color: #000;
          }
        }
      }
      &__wrapper {
        position: relative;
        flex-grow: 2;
      }
      &__link {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: 0.3s;
        cursor: pointer;
        &--add {
          z-index: 1;
          border: 1px solid #d7d7d7;
          .photo__icon {
            path {
              fill: #d7d7d7;
            }
          }
          .photo__text {
            color: #d7d7d7;
          }
        }
        &--change {
          opacity: 0;
          background: rgba(226, 58, 58, 0.8);
          .photo__icon {
            path {
              fill: #fff;
            }
          }
          .photo__text {
            color: #fff;
          }
        }
      }
      &__icon {
        margin-bottom: 15px;
        width: 50px;
        height: 50px;
        path {
          transition: 0.3s;
        }
      }
      &__text {
        font-size: 1.6rem;
        font-weight: 400;
        text-decoration: underline;
        transition: 0.3s;
      }
    }
    .item {
      &--col-8 {
        grid-column: ~"1 / 3";
        .ss-block({ grid-column: ~"1 / 2"; });
        &.textarea {
          grid-row: ~"2 / 4";
          .md-block({ grid-row: ~"3 / 4"; });
        }
      }
      &--col-4 {
        &.photo {
          grid-column: ~"3 / 4";
          grid-row: ~"1 / 4";
          .md-block({ grid-row: ~"1 / 2"; grid-column: ~"1 / 3"; });
          .ss-block({ grid-column: ~"1 / 2"; });
        }
      }
      &.textarea {
        display: flex;
        flex-direction: column;
        .item__input--textarea {
          flex-grow: 1;
          padding-top: 25px;
          padding-bottom: 20px;
          height: auto;
          resize: none;
          outline: none;
          min-height: 75px;
          .lg-block({ min-height: 65px; });
          .xs-block({ min-height: 40px; padding-top: 12px; padding-bottom: 12px; });
        }
      }
      &__label {
        display: inline-block;
        margin-bottom: 20px;
        font-weight: 800;
        font-size: 1.8rem;
        .ss-block({ margin-bottom: 12px; });
      }
      &__input {
        padding-left: 25px;
        padding-right: 15px;
        width: 100%;
        height: 75px;
        background: #f3f3f3;
        border: 1px solid #fff;
        box-sizing: border-box;
        .lg-block({ padding-left: 18px; height: 65px; });
        .xs-block({ padding-left: 10px; height: 40px; });
        &.error {
          border: 1px solid @colorMainRed;
        }
      }
    }
  }
</style>
