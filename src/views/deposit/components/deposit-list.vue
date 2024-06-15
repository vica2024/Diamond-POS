<script setup>
import {defineProps, ref} from 'vue';

const props = defineProps({
  cartList: {
    type: Array,
    default: []
  },
  total: {
    type: Number,
    default: 0
  },
  payPrice: {
    type: Number,
    default: 0
  }
});
const headers = [
  {
    name: '商品',
    width: 50,
    align: 'center',
    key:'productInfo.store_name'
  },
  {
    name: '单价',
    width: 15,
    align: 'center',
    key:'productInfo.price',
  },
  {
    name: '数量',
    align: 'center',
    key:'cart_num',
  },
  {
    name: '金额',
    width: 15,
    align: 'center',
    key:'productInfo.price',
  }
];

const purchaseCount = ref(0);

props.cartList.forEach(() => {

})
const getItemValue = (item, key) => {
  return key.split('.').reduce((acc, part) => acc && acc[part], item);
};

</script>

<template>
  <div class="w-full">
    <div class="p-5 flex justify-between">
      <span class="text-base">共 <b class="text-lg text-amber-700">{{ total }}</b> 件商品</span>
      <span class="text-base">实际支付 <span v-if="total>0" class="text-xs text-gray-400">(含税:¥10.00)</span>:<span class="text-amber-700"> ¥ </span><b
          class="text-lg text-amber-700">{{ payPrice }}</b></span>
    </div>
    <div class="flex p-4 bg-gray-100 rounded-tl-md rounded-tr-md justify-between">
      <div v-for="(header, index) in headers" :key="index"
           :style="{ width: header.width + '%', textAlign: header.align }">
        {{ header.name }}
      </div>
    </div>
    <div class="p-4 overflow-hidden overflow-y-auto" style="height: 65vh;">
      <div class="flex pb-4 items-center justify-between"
           v-for="(item, index) in cartList" :key="index">
        <div v-for="(header, hIndex) in headers" :key="hIndex"
             :style="{ width: header.width + '%', textAlign: header.align }">
          <div :class="['',{'flex items-center text-left':hIndex===0}]">
            <div v-if="hIndex===0" class="overflow-hidden rounded-lg" style="max-width: 80px;">
              <img style="width: 100%;" :src="item.productInfo.image" alt=""/>
            </div>
            <div :class="['',{'pl-2 truncate-multiline':hIndex===0}]">{{ getItemValue(item, header.key) }}</div>
          </div>
        </div>
      </div>
      <div v-if="total>0" class="border-t text-xs pt-4">
        <div class="flex justify-end p-1">
          <span class="mr-1">订单原价: </span><span> ¥ 80.00</span>
        </div>
        <div class="flex justify-end p-1">
          <span class="mr-1">会员优惠金额: </span><span> ¥ -4.90</span>
        </div>
        <div class="flex justify-end p-1">
          <span class="mr-1">优惠券金额: </span><span> ¥ -0.00</span>
        </div>
        <div class="flex justify-end p-1">
          <span class="mr-1">积分抵扣: </span><span> ¥ -1.00</span>
        </div>
        <div class="flex justify-end p-1">
          <span class="mr-1">限时折扣: </span><span> ¥ -0.00</span>
        </div>
        <div class="flex justify-end p-1">
          <span class="mr-1">税费: </span><span> ¥ 10.00</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.truncate-multiline {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
