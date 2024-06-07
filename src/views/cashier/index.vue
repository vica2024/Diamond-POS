<template>
	<div class="page">
    <counter :carts="carts" />
    <goods :goodsList="goodsList" :cateList="cateList"/>
    <modal-goods-attr :product="product"/>
	</div>
</template>

<script setup>
import {ref,provide} from "vue";
import {cashierProduct, cashierCate, cashierProductAttr} from '@/api/product.js';
import Counter from "./components/counter.vue";
import Goods from "./components/goods.vue";
import ModalGoodsAttr from "./components/modal-goods-attr.vue";
import {cashierCartList} from "@/api/order.js";

const conditions=ref({});

const goodsList=ref([]);

const cateList=ref([]);

const product = ref({});

const carts = ref({});

const modalsState = ref({
  showGoodsAttrsModal: false,
  anotherModal: false,
});

const setModalVisibility = (modalName, visible) => {
  modalsState.value[modalName] = visible;
};
const setGoodsToCart = (param)=>{
  console.log(param)
}

provide('modalsState', modalsState);
provide('setModalVisibility', setModalVisibility);
provide('setGoodsToCart', setGoodsToCart);


const fetchCashierProduct = async () => {
  try {
    const {data}  = await cashierProduct(conditions.value);
    goodsList.value= data.list;

  } catch (err) {
    // you can report use errorHandler or other
  } finally {

  }
};

const fetchProductAttr = async () => {
  try {
    const {data}  = await cashierProductAttr(conditions.value);
    product.value = {
      attrs:data.productAttr,
      sizes:data.productValue,
      info:data.storeInfo
    };

  } catch (err) {
    // you can report use errorHandler or other
  } finally {

  }
};

const fetchProductCategory = async () => {
  try {
    const {data}  = await cashierCate(conditions.value);
    cateList.value= data;

  } catch (err) {
    // you can report use errorHandler or other
  } finally {

  }
};

const fetchCashierCartList = async () => {
  try {
    const {data}  = await cashierCartList(conditions.value);
    carts.value= data;
    console.log(data)

  } catch (err) {
    // you can report use errorHandler or other
  } finally {

  }
};
const init= ()=>{

  fetchProductCategory();
  fetchCashierProduct();
  fetchProductAttr();
  fetchCashierCartList();
}
init()

</script>

<style scoped lang="less">
.page {
  flex: 1;
  width: 100%;
  min-width: 700px;
  display: flex;
  flex-wrap: nowrap;
  padding:0 20px;

	:deep(.arco-list-content) {
		overflow-x: hidden;
	}

	:deep(.arco-card-meta-title) {
		font-size: 14px;
	}
}

</style>
