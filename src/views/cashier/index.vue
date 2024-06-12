<template>
  <div ref="container" class="w-full h-full">
    <div class="flex h-full pl-5 pr-5">
      <div class="w-1/2 left-box flex h-full overflow-hidden rounded-3xl bg-white relative">
        <div class="h-full overflow-hidden">
          <div ref="leftContainer">
            <customer-card :customerInfo="customerInfo"/>
            <div class="flex justify-between border-b">
              <span class="ml-5 pb-5">已选购&nbsp;<b class="text-rose-600">{{ cartState.total_cart }}</b>&nbsp;件</span>
              <a-popconfirm content="你确定要清空购物车吗?" okText="Yes" cancelText="No">
                <span class="cursor-pointer mr-5 pb-5 active:text-blue-400">清除</span>
              </a-popconfirm>
            </div>
          </div>
          <div v-if="cartList.length" class="overflow-y-auto" :style="`height:${cartHeight}px;`">
            <div class="pr-5 pl-5 hover:bg-cyan-50" v-for="(item, index) in cartList" :key="index">
              <div class="flex pt-4 pb-4 border-b">
                <div class="w-1/5 overflow-hidden">
                  <img alt="" :src="item.productInfo.image"/>
                </div>
                <div class="w-4/5 flex-col justify-between pl-2">
                  <div class="h-1/3 flex flex-none justify-between">
                    <div class="pr-2 font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                      {{ item.productInfo.store_info }}
                    </div>
                    <a-popconfirm content="你确定要删除这条商品数据吗?" okText="Yes" cancelText="No">
                      <span class="flex whitespace-nowrap cursor-pointer text-blue-600 active:text-blue-400">删除</span>
                    </a-popconfirm>
                  </div>
                  <div class="h-1/3 cursor-pointer lex-grow flex items-center text-gray-400 text-xs">
                    {{ item.productInfo.attrInfo.suk }}
                    <icon-down/>
                  </div>
                  <div class="h-1/3 flex-none flex place-items-end  justify-between">
                          <span class="text-rose-600">
                            <span class="text-xs">¥</span>
                            <b class="text-base">{{ item.productInfo.price }}</b>
                          </span>
                    <div class="flex items-center justify-center cart-item">
                      <a-input-number v-model="item.cart_num" size="mini" mode="button"
                                      class="bg-white text-center" :style="{width:'75px'}"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="counter w-full h-3/4 flex items-center" v-else>
            <div class="w-3/5 m-auto text-center">
              <img alt="" src="../../assets/images/no-cart.png">
              <span class="text-gray-400 text-xs">暂无商品，快去添加吧～</span>
            </div>
          </div>
          <div v-if="cartState.total_cart>0" class="w-full shaw-1" :style="`height:${cartPaymentHeight}px;`">
            <div class="flex justify-between border-b">
              <div class="cursor-pointer font-bold p-4 flex items-center active:text-blue-400" @click="">
                <span class="pr-1 lg:text-base sm:text-md"> Alix </span>
                <icon-down/>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="lg:text-base sm:text-sm">优惠:¥0.0</span>
                <span
                    class="pl-3 pr-3 text-blue-500 cursor-pointer active:text-blue-400 lg:text-base sm:text-sm">明细</span>
                <span class="leading-10 flex items-center lg:text-base sm:text-sm">实付:
                      <span class="text-rose-600">¥</span>
                  <b class="text-rose-600 font-bold lg:text-2xl sm:text-lg">{{ cartState.payPrice }}</b>
                </span>
              </div>
            </div>
            <div v-if="cartState.total_cart>0" class="p-5">
              <a-button long type="primary" shape="round" @click="modalsState.showPayment=true">
                <span class="text-base font-bold">结账</span>
              </a-button>
            </div>
          </div>
        </div>
        <div class="pt-5 pl-3 pr-3 border-l" style="max-width: 100px;">
          <div v-for="item in ['挂单','改价','备注']" class="mb-5 text-center">
            <a-button type="outline" shape="round" long> {{ item }}</a-button>
          </div>
        </div>
      </div>
      <div class="w-1/2 h-full ml-5">
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
            <a-col class="goodsCard" v-for="(item,index) in goodsList" :xs="{ span: 12, offset: 0 }" :lg="{ span: 6, offset: 0 }"
                   :md="{ span: 8, offset: 0 }">
              <a-card class="rounded-2xl overflow-hidden p-3 mb-4 hover:bg-blue-600" :bordered="false">
                <template #cover>
                  <div class="rounded-lg overflow-hidden">
                    <a-image style="width: 100%;" :src="item.image"/>
                    <div v-if="item.stock ===0" class="absolute top-0 left-0 bg-gray-600 text-blue-50 trip text-xs">
                      Sold
                    </div>
                  </div>
                </template>
                <div class="font-500 cursor-pointer lg:text-lg md:text-base sm:text-xs pr-1"
                     @click="modalsState.showGoodsAttrsModal=true">
                  <div class="overflow-hidden text-ellipsis whitespace-nowrap">{{
                      item.store_name
                    }}
                  </div>
                  <div class="text-lg font-bold text-rose-600">${{ item.price }}</div>
                </div>
              </a-card>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
    <drawer-payment/>
    <modal-goods-attr v-if="productAttrs.goodsName" :productAttrs="productAttrs"/>
    <modal-customer-list :customerList="customerList"/>
    <!--    <modal-salesperson />-->
    <!--    <modal-change-price />-->
    <!--    <modal-sales-mark />-->
    <!--    <modal-price-detail />-->
  </div>
</template>
<script setup>
import {ref, provide, watch, reactive, onMounted, nextTick} from "vue";
import {cashierProduct, cashierCate, cashierProductAttr} from '@/api/product.js';
import ModalGoodsAttr from "./components/modal-goods-attr.vue";
import {cashierCartList} from "@/api/order.js";
import CustomerCard from "@/views/cashier/components/customer-card.vue";
import DrawerPayment from "@/views/cashier/components/drawer-payment.vue";
import {getCustomerInfo, getCustomerList} from "@/api/user.js";
import ModalCustomerList from "@/views/cashier/components/modal-customer-list.vue";
import ModalChangePrice from "@/views/cashier/components/modal-change-price.vue";
import ModalSalesMark from "@/views/cashier/components/modal-sales-mark.vue";
import ModalPriceDetail from "@/views/cashier/components/modal-price-detail.vue";
import ModalSalesperson from "@/views/cashier/components/modal-salesperson.vue";

const container = ref(null);

const leftContainer = ref(null);

//查询条件
const conditions = ref({});
//产品列表
const goodsList = ref([]);
//产品类名
const cateList = ref([]);
//购物车列表
const cartList = ref([]);
//顾客列表
const customerList = ref([]);

//当前顾客
const customerInfo = ref({});

//产品sku
const productAttrs = reactive({
  attrs: {},
  stock: 0,
  price: 0,
  imageUrl: null,
  goodsName: null,
  isSkill: false
});
//弹窗管理
const modalsState = reactive({
  showGoodsAttrsModal: false,//弹出商品sku窗口
  showPayment: false,//弹出支付窗口
  showCustomerModal: false,//弹出选择顾客窗口
  showSalesPerson: false,//弹出选择销售人员窗口
  showPriceDetail: false,//弹出价格明细窗口
  showWarm: false,//弹出用户操作的确认窗口
  showChangePrice: false,//弹出改价窗口
  showMark: false,//弹出销售备注窗口
});


//购物车高度
const cartHeight = ref(0);
//底部支付按钮高度
const cartPaymentHeight = ref(140);

const cartState = reactive({
  total_cart: 0,
  payPrice: 0
})


onMounted(async () => {
  await nextTick();
  if (container.value) {
    cartHeight.value = container.value.clientHeight - (leftContainer.value.clientHeight + cartPaymentHeight.value)
    console.log(container.value.clientHeight)
  }
});

watch(
    () => modalsState.showCustomerModal,
    (newVal, oldVal) => {
      if (newVal) {
        fetchCustomerList();
      }
    }
);

const setModalVisibility = (modalName, visible) => {
  modalsState[modalName] = visible;
};
const setGoodsToCart = (param) => {
  console.log(param.value)
}

const setNewCustomer = async (userId) => {
  modalsState.showCustomerModal = false;
  const {data} = await fetchCustomerInfo(conditions.value);
  customerInfo.value = data;
}


const fetchCustomerInfo = async () => {
  try {
    const {data} = await getCustomerInfo(conditions.value);
    customerInfo.value = data;
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
    productAttrs.goodsName = data.storeInfo.store_name;
    productAttrs.imageUrl = data.storeInfo.image;
    productAttrs.price = data.storeInfo.price;
    productAttrs.stock = data.storeInfo.stock;
    productAttrs.attrs = data.productAttr;
    productAttrs.productValue = data.productValue;
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
    cartState.payPrice = data.payPrice;
    cartState.total_cart = data.cartInfo.length;
    console.log(data)

  } catch (err) {
    // you can report use errorHandler or other
  } finally {

  }
};

const fetchCustomerList = async () => {
  try {
    const {data} = await getCustomerList(conditions.value);
    console.log("fetchCustomerList", data)
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
}

.goodsCard{
  :hover {
    color: #FFFFFF !important;
  }
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
