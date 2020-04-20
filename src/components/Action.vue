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
    <div class="g-wrapper-btn-f" v-if="controlBtn">
      <button-app-function icon="icon-lead-pencil" v-tooltip.bottom="'Редактировать'" @click.native="$modal.show('modal-actions-create', {relation_id: relationId, listTickets: listTickets, action: action})"></button-app-function>
      <button-app-function icon="icon-delete" v-tooltip.bottom="'Удалить'" @click.native="deleteAction"></button-app-function>
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
    .g-wrapper-btn-f {
      .ss-block({
        margin-top: 30px;});
    }
  }
</style>
