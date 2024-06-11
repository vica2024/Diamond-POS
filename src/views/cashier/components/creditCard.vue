<script setup>
import {defineProps, ref} from 'vue';
import Computes from '@/utils/computes.js';
const prop =  defineProps({
  payPrice:{
    type:Number,
    default:0
  }
});

</script>

<template>
  <div class="p-5 w-full">
    <div class="text-center">
      <div class="mb-10 text-rose-600">
        ¥ <span class="text-2xl font-bold">{{payPrice.toFixed(2)}}</span>
      </div>
      <div class="mb-20 text-base">等待订单支付结果....</div>
         <a-spin dot size="15" />
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
