<template>
  <div class="pl-5 pr-5 flex">
    <div class="w-2/5 rounded-3xl bg-white overflow-hidden">
      <div>
        <div class="pl-5 pr-5">
          <a-typography-title :heading="5">顾客列表</a-typography-title>
          <div class="mt-5">
            <a-input-search v-model="keyWords" placeholder="搜索手机号/Email/ID" size="large" search-button/>
          </div>
        </div>
        <div class="mt-5 list-hide" v-if="customerList.length">
          <div :class="['pt-5 pb-5',{'selected': index===getOne }]" v-for="(item, index) in customerList" :key="index" @click="getOne = index" >
            <div class="flex items-center pl-5 pr-5 cursor-pointer">
              <a-avatar>
                <img alt="avatar"
                     :src="item.avatar ? item.avatar : 'https://multi-store.crmeb.net/view_cashier/img/yonghu.908b01d3.png'"/>
              </a-avatar>
              <div class="pl-3 flex-1">
                <div class="text-base flex justify-between">
                  <span class="text-bold mr-5">{{ item.nickname || "游客" }} (ID:213123)</span>
                  <span class="text-sm text-gray-400">{{ item.phone }}13168320604</span>
                </div>
                <div class="text-sm mt-2">
                  积分:<span class="text-rose-600 mr-2">￥{{ item.price }}</span>
                  余额:<span class="text-rose-600">￥{{ item.price }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-order">
          <img src="../../assets/images/no-order.png" alt=""/>
          <span class="trip">噢～目前暂无挂单</span>
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
      <div class="flex p-5 content-hide overflow-hidden bg-white rounded-bl-3xl rounded-br-3xl">
        <customer-details v-if="selIndex === 0"/>
        <customer-vip v-if="selIndex === 1"/>
        <customer-recharge-history v-if="selIndex === 2"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {getHangList, getDataInfo} from '@/api/order.js'
import CustomerDetails from "@/views/customer/components/customer-details.vue";
import CustomerVip from "@/views/customer/components/customer-vip.vue";
import CustomerRechargeHistory from "@/views/customer/components/customer-recharge-history.vue";

const keyWords = ref('');
const userInfo = ref({});
const customerList = ref([]);
const getOne = ref(0);
const selIndex = ref(0);
const tabs = ['顾客详情', '顾客关系', '余额充值'];

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
.list-hide {
  height: calc(100vh - 248px);
  overflow: hidden;
  overflow-y: scroll;
}

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
