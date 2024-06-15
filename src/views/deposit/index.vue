<template>
  <div class="pl-5 pr-5 flex">
    <div class="w-2/5 rounded-3xl bg-white overflow-hidden">
      <div>
        <div class="pl-5 pr-5 mb-5">
          <a-typography-title :heading="5">订金单列表</a-typography-title>
          <div class="mt-5">
            <a-input-search v-model="keyWords" placeholder="输入顾客手机号/店员ID" size="large" search-button/>
          </div>
        </div>
        <div class="list-hide overflow-hidden overflow-y-auto" v-if="depositOrderCount > 0">
          <div :class="['pt-5 pb-5',{'selected': setIndex===index }]" v-for="(item, index) in depositOrderList" :key="index"
               @click="getOne(index,item)">
            <p class="pl-5 pb-2 font-bold text-sm text-gray-500">订金单号：LV-20240610095033{{index}}</p>
            <div class="flex items-center pl-5 pr-5 cursor-pointer">
              <a-avatar size="40">
                <img alt="" :src="item.avatar ? item.avatar : 'https://multi-store.crmeb.net/view_cashier/img/yonghu.908b01d3.png'"/>
              </a-avatar>
              <div class="pl-3 flex-1">
                <div class="text-base flex justify-between">
                  <span class="mr-5 w-1/3 text-sm font-bold overflow-hidden text-ellipsis whitespace-nowrap">{{ item.nickname || "No Body" }}</span>
                  <span class="text-sm text-gray-400">{{ item._add_time }}</span>
                </div>
                <div class="mt-2 flex justify-between">
                  <span class="mr-2 text-sm">订单金额：
                    <span class="text-amber-700">￥{{ item.price }}</span>
                  </span>
                  <div class="text-sm flex">
                    <span class="mr-3 flex text-blue-500 border-r pr-3">提单</span>
                    <span class="text-rose-600">删除</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="list-hide flex items-center relative" v-else>
          <div class="w-3/5 m-auto text-center">
            <img alt="" src="../../assets/images/no-order.png">
            <span class="text-gray-400 text-xs">暂无定金单，快去添加吧～</span>
          </div>
        </div>
      </div>
    </div>
    <div class="ml-5 w-3/5">
      <div class="p-5 content-hide overflow-hidden bg-white rounded-3xl">
        <deposit-customer-info :customerInfo="customerInfo"/>
        <deposit-list :payPrice="payPrice" :cartList="cartInfo"></deposit-list>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue';
import {getHangList, getDataInfo,cashierCartList} from '@/api/order.js'
import DepositCustomerInfo from "./components/deposit-customer-info.vue";
import DepositList from "./components/deposit-list.vue";

const setIndex = ref(null);
const keyWords = ref('');
const depositOrderCount = ref(0);
const depositOrderList = ref([]);
const customerInfo = reactive({
  phone: '--',
  avatar: 'https://multi-store.crmeb.net/uploads/attach/2023/04/20230426/ed8f8cf4cfbd6b46c821b082ce2e4e76.png',
  nickname: '--',
  now_money: 0,
  integral: 0
});
// 当前订单价格
const payPrice = ref(0);
//当前顾客的商品明细
const cartInfo = ref([]);

const getOne= async (index,customer)=>{
  setIndex.value = index;
  const {data} =await cashierCartList(0,10);
  customerInfo.nickname = customer.nickname;
  cartInfo.value = data.cartInfo;
  payPrice.value = data.payPrice;

}

const fetchDepositOrderList = async () => {
  const {data} = await getHangList();
  depositOrderCount.value = data.count;
  depositOrderList.value = data.list;
}


fetchDepositOrderList();
</script>

<style scoped lang="less">

.list-hide {
  height: calc(100vh - 225px);
}

.content-hide {
  height: calc(100vh - 100px);
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
