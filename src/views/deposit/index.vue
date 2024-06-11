<template>
  <div class="pl-5 pr-5 flex">
    <div class="w-2/5 rounded-3xl bg-white overflow-hidden">
      <div>
        <div class="pl-5 pr-5">
          <a-typography-title :heading="5">订金单列表</a-typography-title>
          <div class="mt-5">
            <a-input-search v-model="keyWords" placeholder="输入顾客手机号/店员ID" size="large" search-button/>
          </div>
        </div>
        <div class="mt-5 list-hide" v-if="depositOrderList.length">
          <div :class="['pt-5 pb-5',{'selected': index===getOne }]" v-for="(item, index) in customerList" :key="index"
               @click="getOne = index">
            <div class="flex items-center pl-5 pr-5 cursor-pointer">
              <a-avatar>
                <img alt=""
                     :src="item.avatar ? item.avatar : 'https://multi-store.crmeb.net/view_cashier/img/yonghu.908b01d3.png'"/>
              </a-avatar>
              <div class="pl-3 flex-1">
                <div class="text-base flex justify-between">
                  <span class="text-bold lg:text-lg mr-5 font-bold">{{ item.nickname || "游客" }}</span>
                  <span class="text-sm text-gray-400">{{ item.phone }}asdas</span>
                </div>
                <div class="mt-2 flex justify-between">
                  <span class="mr-2 text-sm lg:text-base">订单金额：<span class="text-amber-700">￥{{ item.price }}</span></span>
                  <div class="text-sm lg:text-base">
                    <span class="mr-2">提单</span>
                    <span class="text-rose-600">删除</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="list-hide flex items-center relative" v-else>
          <div class="w-3/5 m-auto text-center">
            <img alt="" src="../../assets/images/no-cart.png">
            <span class="text-gray-400 text-xs">暂无商品，快去添加吧～</span>
          </div>
        </div>
      </div>
    </div>
    <div class="ml-5 w-3/5">
      <div class="p-5 content-hide overflow-hidden bg-white rounded-3xl">
          <deposit-customer-info :customerInfo ="customerInfo" />
          <deposit-list></deposit-list>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {getHangList, getDataInfo} from '@/api/order.js'
import DepositCustomerInfo from "./components/deposit-customer-info.vue";
import DepositList from "./components/deposit-list.vue";

const getOne = ref(0);
const keyWords = ref('');
const depositOrderList=ref([]);
const customerInfo = ref({
  phone:'游客',
  avatar:'https://multi-store.crmeb.net/uploads/attach/2023/04/20230426/ed8f8cf4cfbd6b46c821b082ce2e4e76.png',
  nickname:'游客',
  now_money:0,
  integral:0
});


const getDepositOrderList = async () => {
  const {data} = await getHangList();
  console.log(data)
}

const getDepositList = async () => {
  const {data} = await getDataInfo(10);

  console.log(data)
}
getDepositList();
getDepositOrderList();
</script>

<style scoped lang="less">

.list-hide {
  height: calc(100vh - 248px);
  overflow: hidden;
  overflow-y: scroll;
}
.content-hide {
  height: calc(100vh - 130px);
}

.selected {
  background: #f3f9ff;
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
