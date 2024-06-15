<template>
  <a-modal v-model:visible="modalsState.showModifyPrice" :title="modalTitle" :width="modalWidth" :footer="false">
    <div class="w-full">

    </div>
  </a-modal>
</template>

<script setup>
import {defineProps, inject, provide, ref, watch} from 'vue';

const modalsState = inject('modalsState');
const props = defineProps({
  modalTitle: {
    type: String,
    default: '顾客充值'
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
