<template>
  <div class="w-full h-full pl-5 pr-5 overflow-hidden">
    <div class="h-full">
      <div class="flex h-full">
        <div class="w-2/5 left-box flex h-full rounded-3xl bg-white">
          <div class="flex-1 border-r">
            <customer-card :currentUser="currentUser"/>
            <div class="p-5 flex justify-between border-b total-box">
              <span>已选购&nbsp;<b class="text-rose-600">{{total_cart}}</b>&nbsp;件</span>
              <span class="cursor-pointer">清除</span>
            </div>
            <div class="w-full">
              <div v-if="cartList.length" class="counter overflow-hidden overflow-y-auto">
                <div class="pb-5 hover:bg-cyan-50 pt-5" v-for="(item, index) in cartList" :key="index">
                  <div class="pl-5 pr-5">
                    <div class="flex text-sm items-center">
                      <div class="rounded-2xl">
                        <img width="60" alt="" height="60" :src="item.productInfo.image"/>
                      </div>
                      <div class="flex-1 text-sm pl-2">
                        <div class="flex justify-between">
                          <a-typography-title class="flex-1 pr-2" :heading="6" ellipsis style="margin: 0">
                            <span class="sm:text-sm">{{ item.productInfo.store_info }}</span>
                          </a-typography-title>
                          <span><icon-delete size="18" class="text-blue-400 cursor-pointer"/></span>
                        </div>
                        <div class="cursor-pointer text-gray-400 text-xs mb-2">{{item.productInfo.attrInfo.suk}}
                          <icon-down/>
                        </div>
                        <div class="h-4 flex items-center justify-between">
                          <span class="text-lg font-bold text-rose-600 sm:text-sm">$ {{
                              item.productInfo.price
                            }}</span>
                          <div class="flex items-center justify-center cart-item">
                            <a-input-number v-model="item.cart_num" size="mini" mode="button"
                                            class="bg-white text-center" :style="{width:'75px'}"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="counter flex items-center relative" v-else>
                <div class="w-3/5 m-auto text-center">
                  <img alt="" src="../../assets/images/no-cart.png">
                  <span class="text-gray-400 text-xs">暂无商品，快去添加吧～</span>
                </div>
              </div>
              <div class="border-shaw">
                <div class="pl-5 pr-5 pt-3 text-base flex justify-between">
                  <div class="cursor-pointer pr-3 leading-10">Alix
                    <icon-down/>
                  </div>
                  <div class="flex justify-between items-center text-sm">
                    <span>优惠:$0.0</span>
                    <span class="pl-3 pr-3 text-blue-500 cursor-pointer">明细</span>
                    <span class="leading-10">实付:
                  <span class="text-rose-600">¥</span>
                  <b class="text-2xl text-rose-600 font-bold">84.1</b>
                </span>
                  </div>
                </div>
                <div class="flex justify-between pl-5 pr-5 pt-6 pb-8 border-t mt-2">
                  <a-button long type="primary" shape="round" @click="modalsState.showPayment=true"> 结账</a-button>
                </div>
              </div>
            </div>
          </div>
          <div class="p-5 tools">
            <a-button v-for="item in ['挂单','改价','备注']" type="outline" class="mb-10" shape="round"> {{ item }}</a-button>
          </div>
        </div>
        <div class="w-3/5 h-full ml-5">
          <div class="w-full bg-white p-5 rounded-3xl">
            <a-input-group class="w-full">
              <a-select size="large" :options="['全部','名称','编号']" :style="{width:'140px'}" placeholder="全部"/>
              <a-input-search size="large" placeholder="搜索商品名称/ID/唯一码或点击聚焦扫码" search-button/>
            </a-input-group>
            <div class="w-full mt-3 flex">
              <a-select :bordered="false" placeholder="产品类目">
                <a-option v-for="(option,index) in cateList">{{ option.cate_name }}</a-option>
              </a-select>
              <a-select :bordered="false" placeholder="周/月/年度热销款">
                <a-option>周热销</a-option>
                <a-option>月热销</a-option>
                <a-option>年度热销</a-option>
              </a-select>
            </div>
          </div>
          <div class="mt-5 overflow-y-auto overflow-hidden" style="height: 79vh;">
            <a-row :gutter="12">
              <a-col v-for="(item,index) in goodsList" :xs="{ span: 12, offset: 0 }" :lg="{ span: 6, offset: 0 }"
                     :md="{ span: 8, offset: 0 }">
                <a-card class="rounded-2xl overflow-hidden p-3 mb-4" :bordered="false">
                  <template #cover>
                    <div class="rounded-2xl relative">
                      <a-image :src="item.image"/>
                      <div v-if="item.stock ===0" class="absolute top-0 left-0 bg-gray-600 text-blue-50 trip text-xs">
                        Sold
                      </div>
                    </div>
                  </template>
                  <div class="font-500 lg:text-lg md:text-base sm:text-xs pr-1">
                    <div class="overflow-hidden text-ellipsis whitespace-nowrap">{{ item.store_name }}</div>
                    <div class="text-lg font-bold text-rose-600">${{ item.price }}</div>
                  </div>
                </a-card>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
    </div>
    <modal-goods-attr :product="product"/>
    <drawer-payment></drawer-payment>
    <modal-customer-list :customerList="customerList" />
  </div>
</template>

<script setup>
import {ref, provide,watch,reactive} from "vue";
import {cashierProduct, cashierCate, cashierProductAttr} from '@/api/product.js';
import ModalGoodsAttr from "./components/modal-goods-attr.vue";
import {cashierCartList} from "@/api/order.js";
import CustomerCard from "@/views/cashier/components/customer-card.vue";
import DrawerPayment from "@/views/cashier/components/drawer-payment.vue";
import {getCustomerInfo, getCustomerList} from "@/api/user.js";
import ModalCustomerList from "@/views/cashier/components/modal-customer-list.vue";

const currentUser = ref({
  phone:'',
  avatar:'',
  nickname:'',
  now_money:0,
  integral:0
});

const total_cart=ref(6);

const payPrice = ref(0);

const conditions = ref({});

const goodsList = ref([]);

const cateList = ref([]);

const product = ref({});

const cartList = ref([]);

const customerList = ref([]);

const modalsState = ref({
  showGoodsAttrsModal: false,
  showPayment: false,
  showCustomerModal:false
});

watch(
    () => modalsState.value.showCustomerModal,
    (newVal, oldVal) => {
      if(newVal){
        fetchCustomerList();
      }
    }
);

const setModalVisibility = (modalName, visible) => {
  modalsState.value[modalName] = visible;
};
const setGoodsToCart = (param) => {
  console.log(param.value)
}

const setNewCustomer =  async (userId)=>{
  modalsState.value['showCustomerModal'] = false;
  const {data} =  await fetchCustomerInfo(conditions.value);
  currentUser.value = data;
}


const fetchCustomerInfo = async () => {
  try {
    const {data} =  await getCustomerInfo(conditions.value);
    currentUser.value = data;

  } catch (err) {
    // you can report use errorHandler or other
  } finally {

  }
};

const fetchCashierProduct = async () => {
  try {
    const {data} = await cashierProduct(conditions.value);
    goodsList.value = data.list;
    console.log(data.list)

  } catch (err) {
    // you can report use errorHandler or other
  } finally {

  }
};

const fetchProductAttr = async () => {
  try {
    const {data} = await cashierProductAttr(conditions.value);
    product.value = {
      attrs: data.productAttr,
      sizes: data.productValue,
      info: data.storeInfo
    };

  } catch (err) {
    // you can report use errorHandler or other
  } finally {

  }
};

const fetchProductCategory = async () => {
  try {
    const {data} = await cashierCate(conditions.value);
    cateList.value = data;

  } catch (err) {
    // you can report use errorHandler or other
  } finally {

  }
};

const fetchCashierCartList = async () => {
  try {
    const {data} = await cashierCartList(conditions.value);
    cartList.value = data.cartInfo;
    payPrice.value = data.payPrice
    console.log(data)

  } catch (err) {
    // you can report use errorHandler or other
  } finally {

  }
};

const fetchCustomerList = async () => {
  try {
    const {data} = await getCustomerList(conditions.value);
    console.log("fetchCustomerList",data)
    customerList.value = data.list;

  } catch (err) {
    // you can report use errorHandler or other
  } finally {

  }
};
fetchCustomerInfo();
fetchProductCategory();
fetchCashierProduct();
fetchProductAttr();
fetchCashierCartList();

provide('modalsState', modalsState);
provide('setModalVisibility', setModalVisibility);
provide('setGoodsToCart', setGoodsToCart);

provide('setNewCustomer', setNewCustomer);

</script>

<style scoped lang="less">
.left-box {
  min-width: 380px;
  .counter {
    height: 56vh;
  }

  .tools {
    width: 100px;
  }
}
/* 针对屏幕（平板） */
@media (max-width: 1024px) {
  .counter {
    height: 44.6vh;
  }
}
.border-shaw{
  box-shadow: 0 -2px 2rem 0 rgba(0, 0, 0, .06);
}
.trip {
  display: flex;
  padding: 5px 10px;
  align-items: center;
  border-radius: 0 0 10px 0;
  flex-direction: column;
  justify-content: center;
}

</style>
