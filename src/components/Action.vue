<template>
  <div class="action-item">
    <div class="action-info">
      <h3 class="g-caption-element g-caption-element--static">{{action.title}} </h3>
      <div class="info-item">
        <div class="text editor" v-html="action.desc"></div>
      </div>
      <div class="info-item">
        <p class="text">осталось <span class="g-price-main g-price--mb">{{action.residue}}</span> билетов  "{{action.ticket.title}}"</p>
      </div>
      <div class="info-item" v-if="controlBtn">
        <p class="text">всего билетов: {{action.amount}} шт</p>
      </div>
    </div>
    <div class="g-control-icon" v-if="controlBtn">
      <button class="g-icon-circle g-icon-circle--control g-icon-circle--control-green" v-tooltip.bottom="'Редактировать'" @click="$modal.show('modal-actions-create', {relation_id: relationId, listTickets: listTickets, action: action})">
        <icon-lead-pencil class="g-icon"/>
      </button>
      <button class="g-icon-circle g-icon-circle--control g-icon-circle--control-red" v-tooltip.bottom="'Удалить'" @click="deleteAction">
        <icon-delete class="g-icon"/>
      </button>
    </div>
</div>
</template>

<script>
import API from '@/api/index'
export default {
  name: 'Action',
  props: {
    action: {
      required: true
    },
    relationId: {
      required: true
    },
    listTickets: {
      required: false
    },
    controlBtn: {
      required: false,
      default: false
    }
  },
  methods: {
    deleteAction () {
      API.actions.delete({id: this.action.id}).then(() => {
        API.response.success('Акция удалена')
        this.$root.$emit('actions-edit')
      })
    },
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";

  .action-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    .default-panel-style();
    .sm-block({
      margin-bottom: 15px;
    });
    .ss-block({
      flex-direction: column;
      align-items: flex-start;
    });
    .action-info {
      display: flex;
      flex-direction: column;
      .g-caption-element {
        text-transform: none;
      }
      .info-item {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .md-block({
          margin-bottom: 7px;
        });
        &:last-of-type {
          margin-bottom: 0;
        }
        .info-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: @colorBorder;
          border: 1px solid @colorBorder;
          border-radius: 50%;
          font-size: 1.4rem;
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          margin-right: 15px;
        }
        .svg-icon {
          margin-right: 15px;
          width: 15px;
          height: 15px;
          path {
            fill: #dedede;
          }
        }
        .text {
          .g-price-main {
            display: inline-block;
            margin: 0 10px;
          }
        }
      }
    }
    .g-caption-element {
      margin-bottom: 25px;
      .md-block({
        margin-bottom: 15px;
      });
    }
    .g-control-icon {
      .ss-block({
        margin-top: 30px;});
    }
  }
</style>
