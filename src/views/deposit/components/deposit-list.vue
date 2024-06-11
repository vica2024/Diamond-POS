<script setup>
import {defineProps} from 'vue';
const props = defineProps({
  cartList:{
    type:Array,
    default:[]
  },
  total:{
    type:Number,
    default:0
  },
  payPrice:{
    type:Number,
    default:0
  }
});
const headers= [
  {
    name: '商品',
    width:60,
    align:'left'
  },
  {
    name: '单价',
    width:15,
    align:'center'
  },
  {
    name: '数量',
    width:10,
    align:'center',
  },
  {
    name: '金额',
    width:15,
    align:'center'
  }
];
</script>

<template>
  <div class="w-full">
    <div class="p-5 flex justify-between">
      <span class="text-base">共 <b class="text-lg text-amber-700">{{total}}</b> 件商品</span>
      <span class="text-base">实际支付:<span class="text-amber-700"> ¥ </span><b class="text-lg text-amber-700">{{ payPrice }}</b></span>
    </div>
    <div class="flex p-4 bg-gray-100 rounded-tl-md rounded-tr-md justify-between">
      <div v-for="(header,index) in headers" :key="index" :style="{ width: header.width + '%', textAlign: header.align }">
        {{ header.name }}
      </div>
    </div>
    <div class="list" v-for="(l,index) in cartList" :key="index">
      <div class="activity" v-for="(p,pIndex) in  l.promotions" :key="pIndex">
        <div class="activity-type">
          {{ p.title }}
        </div>
        <div class="desc">
          {{ p.desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
</style>
