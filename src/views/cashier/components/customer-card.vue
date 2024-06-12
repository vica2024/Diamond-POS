<script setup>
import {defineProps, inject} from 'vue';

defineProps({
  customerInfo:{
    type:Object,
    default:{
      nickname:'--',
      now_money:0,
      integral:0
    }
  }
})
const setModalVisibility = inject('setModalVisibility');
const getType = (P) => {
  P == 0 ? setModalVisibility('showCustomerModal', true) : null;
}
</script>

<template>
  <div class="customer-card flex justify-between items-center">
    <a-avatar :size="45">A</a-avatar>
    <div class="info">
      <div class="flex justify-between items-center">
        <span class="font-bold text-base pr-1 overflow-hidden text-ellipsis whitespace-nowrap">{{customerInfo.nickname}}</span>
        <a-dropdown @select="getType" :popup-max-height="false">
          <a-button type="text" class="change-cs" style="margin-right: -12px;" size="small">切换会员
            <icon-down/>
          </a-button>
          <template #content>
            <a-doption value="0">选择会员</a-doption>
            <a-doption value="1">散客</a-doption>
          </template>
        </a-dropdown>
      </div>
      <div class="">
        <span class="text-xs">积分 <b>{{customerInfo.integral}}</b></span>&nbsp;
        <span class="text-xs">余额 <b>{{customerInfo.now_money}}</b></span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">

.customer-card {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow: hidden;
  margin: 20px;
  padding: 25px 15px;
  border-radius: 12px;
  border: 3px solid #f70;
  flex-shrink: 0;

  .info {
    flex: 1 1 0;
    padding-left: 10px;
    overflow: hidden;

    .title {
      display: flex;
      align-items: center;
    }

    .switch {
      .change-cs {
        color: #ff7700 !important;
      }
    }
  }
}

</style>
