<template>
  <a-modal v-model:visible="modalsState.showMark" :title="modalTitle" :width="modalWidth" :footer="false">
    <div class="w-full">
      <a-textarea class="bg-white border border-blue-300 shadow-md rounded-lg hover:bg-white hover:border-blue-300" style="height: 260px;" placeholder="销售订单备注" :max-length="300" allow-clear show-word-limit auto-size />
      <div class="pt-5 text-center">
        <a-button type="primary"  class="h-12 pl-20 pr-20" shape="round" @click="doneMark"><b>确认</b></a-button>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import {defineProps, inject, provide, ref, watch} from 'vue';

const modalsState = inject('modalsState');
const props = defineProps({
  modalTitle: {
    type: String,
    default: '备注'
  },
  modalWidth: {
    type: String,
    default: '700'
  }
});

const doneMark = ()=>{

}
</script>

<style scoped lang="less">


</style>
