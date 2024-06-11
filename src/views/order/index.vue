<template>
  <div class="flex h-full">
    <div class="w-2/5 h-full rounded-3xl bg-white">
      <div class="flex justify-between p-5">
        <div class="flex-1 flex">
          <span class="leading-7 cursor-pointer" @click="openVerify=false"><icon-left/> 返回</span>
          <span class="leading-7 ml-3 mr-3">|</span>
          <a-typography-title style="margin-top: 0;" :heading="5">核销订单</a-typography-title>
        </div>
        <span class="leading-7 cursor-pointer">筛选</span>
      </div>
      <div class="p-5">
        <a-input-search v-model="keyWords" placeholder="搜索订单号" size="large" search-button/>
      </div>
      <div class="overflow-hidden overflow-y-auto" style="height: 74vh">
        <div class="mb-5" v-if="customerList.length">
          <div :class="['pt-5 pb-5',{'selected': index===getOne }]" v-for="(item, index) in customerList"
               :key="index" @click="getOne = index">
            <div class="flex items-center pl-5 pr-5 cursor-pointer">
              <div class="flex-1">
                <div class="text-base flex justify-between">
                  <span class="text-bold">订单号 wx2342342334</span>
                  <span class="text-sm text-gray-400">{{ item.phone }}13168320604</span>
                </div>
                <div class="flex justify-between mt-1">
                  <a-avatar>
                    <img alt="avatar"
                         :src="item.avatar ? item.avatar : 'https://multi-store.crmeb.net/view_cashier/img/yonghu.908b01d3.png'"/>
                  </a-avatar>
                  <div class="text-sm">
                    <span class="text-base text-bold text-rose-600 block">￥{{ item.price }}</span>
                    <span class="text-gray-400">共2件商品</span>
                  </div>
                </div>
                <div class="mt-5 flex justify-between">
                  <span class="mr-5">待评价</span>
                  <span class="text-sm text-gray-400">收银员：CRMEB官方自营店</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ml-5 w-3/5 rounded-3xl">
      <div class="flex text-lg rounded-tl-3xl bg-white tabs">
        <div v-for="(tab, index) in tabs" :key="index" :class="`cursor-pointer bg-gray none-${selIndex}`">
          <div :class="['p-5 pl-8 pr-8', { 'active': selIndex === index }]" @click="selIndex = index">
            {{ tab }}
          </div>
        </div>
        <div :class="`bg-gray-100 flex-1 ${selIndex === 2?'none-2':''}`"></div>
      </div>
      <div
          :class="`flex p-5 content-hide overflow-hidden bg-white ${selIndex===0?'rounded-bl-3xl rounded-br-3xl':'rounded-3xl'}`">
        <div class="w-full relative">
          <customer-info v-if="selIndex===0" :customerInfo="customerInfo"/>
          <order-details v-if="selIndex===1"/>
          <div class="w-full shaw-1 h-16 p-5 flex justify-between absolute bottom-0">
            <div>实际支付：<span class="text-amber-700"> ¥ </span><span class="text-lg text-amber-700">{{ orderPrice }}</span></div>
            <a-button type="outline" shape="round">订单备注</a-button>
            <a-button type="outline" shape="round">答应小票</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue';
import {getDataInfo, getHangList} from "@/api/order.js";
import CustomerInfo from "@/views/order/components/customer-info.vue";
import OrderDetails from "@/views/order/components/order-details.vue";

const openVerify = ref(false);
const keyWords = ref('');
const userInfo = ref({});
const customerList = ref([]);
const getOne = ref(0);
const selIndex = ref(0);
const tabs = ['商品信息', '订单详情', '订单记录'];
const customerInfo = ref({
  phone: '游客',
  avatar: 'https://multi-store.crmeb.net/uploads/attach/2023/04/20230426/ed8f8cf4cfbd6b46c821b082ce2e4e76.png',
  nickname: '游客',
  now_money: 0,
  integral: 0
});
const orderPrice = ref(0);

const getDepositOrderList = async () => {
  const {data} = await getHangList();
  console.log(data)
  customerList.value = data.list
}

const getDepositList = async () => {
  const {data} = await getDataInfo(10);
  userInfo.value = data.userInfo;
  console.log(data)
}
getDepositList();
getDepositOrderList();

</script>

<style scoped lang="less">

.selected {
  background: #f3f9ff;
}

.content-hide {
  height: calc(100vh - 195px);
}

.tabs {
  .bg-gray {
    background-color: #f2f3f5;
  }

  .none-0:nth-child(1) {
    border-bottom-right-radius: 18px;
  }

  .none-0:nth-child(2) {
    border-bottom-left-radius: 18px;
  }

  .none-1:nth-child(1) {
    border-bottom-right-radius: 18px;
  }

  .none-1:nth-child(3) {
    border-bottom-left-radius: 18px;
  }

  .none-2:nth-child(2) {
    border-bottom-right-radius: 18px;
  }

  .none-2:nth-child(4) {
    border-bottom-left-radius: 18px;
  }

  .active {
    /* 选中状态的样式 */
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
    background-color: #FFFFFF;
    font-weight: bold;
  }
}


</style>
