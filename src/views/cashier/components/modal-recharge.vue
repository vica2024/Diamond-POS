<template>
  <a-modal v-model:visible="modalsState.showRecharge" :title="modalTitle" :width="modalWidth" :footer="false">
    <div class="w-full">
      <!-- 头部顾客信息-->
      <div class="flex items-center mb-5">
        <div class="">
          <a-avatar :size="60">NO</a-avatar>
        </div>
        <div class="flex-1 pl-2">
          <div class="text-base font-bold">131****0604</div>
          <div class="flex items-center text-xs">
            <span class="mr-5">余额：<b class="text-red-600 text-base">0.00</b></span>
            <span class="mr-5">积分：<b class="text-red-600 text-base">0.00</b></span>
            <span>付费会员到期：<span class="text-blue-600">2029-11-04 20:20:00</span></span>
          </div>
        </div>
      </div>
      <!--充值区域-->
      <div>
        <div class="flex">
          <span class="mt-2">充值方式：</span>
          <div>
            <a-tabs v-model:active-key="setIndex" type="rounded">
              <a-tab-pane key="0" title="充值套餐">
              </a-tab-pane>
              <a-tab-pane key="1" title="自定义充值">
              </a-tab-pane>
            </a-tabs>
            <div class="pl-0 pr-4 flex items-center" style="width: 540px; min-height: 230px;">
              <a-row v-if="setIndex==='0'" :gutter="24">
                <a-col :span="8" v-for="item in recharges" class="mb-6">
                  <div class="p-5 text-white rounded-lg bg-blue-600 shadow-md">
                    <span>¥<b>{{item.price}}</b></span>
                    <div>额外赠送：¥ {{item.give_money}}</div>
                  </div>
                </a-col>
              </a-row>
              <div class="w-3/4" v-if="setIndex==='1'">
                <a-input-number :model-value="recharge_value" class="bg-white border border-blue-400 pt-2 pb-2" :min="0.1"></a-input-number>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-2 text-center">
        <a-button type="primary" class="h-10 pl-20 pr-20" shape="round" @click="doneMark"><b>确认充值</b></a-button>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import {defineProps, inject, provide, ref, watch} from 'vue';

const modalsState = inject('modalsState');
const props = defineProps({
  recharges:{
    type:Array,
    default:[]
  },
  modalTitle: {
    type: String,
    default: '顾客充值'
  },
  modalWidth: {
    type: Number,
    default: 680
  }
});
const setIndex = ref('0');

const recharge_value =ref(0.1);
const doneMark = () => {

}
</script>

<style scoped lang="less">


</style>
