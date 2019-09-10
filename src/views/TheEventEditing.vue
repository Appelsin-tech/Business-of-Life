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
            <input class="item__input" type="text" id="form-title">
          </div>
          <div class="edit-grid__item item item--col-8 textarea">
            <label class="item__label" for="form-description">Описание</label>
            <textarea-resize>
                <textarea class="item__input item__input--textarea"
                          id="form-description" rows="1" ref="mi"></textarea>
            </textarea-resize>
          </div>
          <div class="edit-grid__item item item--col-4 photo">
            <span class="item__label">Фото</span>
            <div class="photo__wrapper">
              <a href="#" class="photo__link photo__link--add">
                <img svg-inline class="photo__icon" src="../assets/img/icon/camera.svg" alt="">
                <span class="photo__text">Загрузить фото</span>
              </a>
            </div>
          </div>
          <div class="edit-grid__item item item--col-4">
            <label class="item__label" for="form">Страна</label>
            <v-select :multiple="false" :class="['v-select__modal']" :searchable="false" label="qualName" :options="qualification"></v-select>
          </div>
          <div class="edit-grid__item item item--col-4">
            <label class="item__label" for="form">Город</label>
            <v-select :multiple="false" :class="['v-select__modal']" :searchable="false" label="qualName" :options="qualification"></v-select>
          </div>
          <div class="edit-grid__item item item--col-4">
            <label class="item__label" for="form">Адрес</label>
            <input class="item__input" type="text" id="form">
          </div>
          <div class="edit-grid__item item item--col-4">
            <label class="item__label" for="form">Дата</label>
            <input class="item__input" type="text" id="form">
          </div>
          <div class="edit-grid__item item item--col-4">
            <label class="item__label" for="form">Время</label>
            <input class="item__input" type="text" id="form">
          </div>
          <div class="edit-grid__item item item--col-4">
            <label class="item__label" for="form">Стоимость билета ($)</label>
            <input class="item__input" type="text" id="form">
          </div>
        </div>
        <div class="btn-wrapper">
          <a href="#" class="g-btn g-btn--no-arrow g-btn--white g-btn--border">
            <span>Сохранить</span>
          </a>
          <a href="#" class="g-btn g-btn--no-arrow">
            <span>Опубликовать</span>
          </a>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import BreadCrumbs from '../components/BreadCrumbs.vue'
import TextareaResize from '../components/textareaResize'

export default {
  name: 'TheEventEditing',
  components: { BreadCrumbs, TextareaResize },
  data() {
    return {
      resize: true,
      errorSelect: {
        selectedQualification: false,
        selectedPayment: false
      },
      qualification: [
        {
          qualVal: 'Москва',
          qualName: 'Москва'
        },
        {
          qualVal: 'Москва',
          qualName: 'Rostov'
        },
        {
          qualVal: 'Москва',
          qualName: 'Kazan'
        }
      ],
    }
  },
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
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
