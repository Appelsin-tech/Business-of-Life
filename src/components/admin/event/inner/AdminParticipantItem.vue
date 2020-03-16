<template>
  <div class="item-member">
    <div class="name-wrapper">
      <p class="name g-caption-element g-caption-element--static">{{member.name}}</p>
      <div class="arrow-wrapper" @click="collapsed" :class="{'active': collapse}">
        <span class="arrow"></span>
      </div>
    </div>
    <div class="content-wrapper">
      <p class="item">email: {{member.email}}</p>
      <p class="item">Квалификация: {{member.qual}}</p>
      <p class="item">Дата регистрации в компании: {{member.reg}}</p>
      <p class="item">Билет: {{member.ticket}}</p>
    </div>
    <hr class="line">
  </div>
</template>

<script>
export default {
  name: 'AdminParticipantItem',
  props: ['member'],
  data() {
    return {
      collapse: false
    }
  },
  methods: {
    collapsed (event) {
      this.collapse = !this.collapse
      let c = event.currentTarget.parentNode.nextElementSibling
      if (c.style.maxHeight) {
        c.style.maxHeight = null
      } else {
        c.style.maxHeight = c.scrollHeight + 'px'
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";

  .item-member {
    .default-panel-style();
    margin-bottom: 20px;
    .sm-block({
      margin-bottom: 15px;});
    .name-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .arrow-wrapper {
        padding: 10px;
        transition: 0.3s;
        cursor: pointer;
        .xs-block({padding: 5px;});
        &.active {
          transform: rotate(180deg);
        }
        .arrow {
          display: block;
          position: relative;
          border-top: 8px solid  @colorMainSecondary;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          font-size: 0;
          line-height: 0;
        }
      }
    }
    .content-wrapper {
      overflow: hidden;
      max-height: 0;
      transition: max-height 0.2s ease-out;
      .item {
        margin-bottom: 15px;
        .md-block({
          margin-bottom: 7px;
        });
        &:first-child {
          margin-top: 15px;
          .md-block({
            margin-top: 7px;
          });
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .line {
      display: none;
    }
  }
</style>
