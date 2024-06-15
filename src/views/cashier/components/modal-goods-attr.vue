<script setup>
import {defineProps, inject, onMounted, reactive, nextTick} from 'vue';

const props = defineProps({
  productAttrs: {
    type: Object,
    default: {}
  },
  isSkill: {
    type: Boolean,
    default: false
  },
  modalTitle: {
    type: String,
    default: '商品规格'
  },
  modalWidth: {
    type: String,
    default: '700'
  }
});

const modalsState = inject('modalsState');
const setModalVisibility = inject('setModalVisibility');
const addCart = inject('addCart');


const pickUpAttr = reactive({
  goodsId: 0,
  skuIds: [],
  skuName: null,
  stock: 0,
  skuPrice: 0,
  image: null,
});

const params = reactive({
  cartNum: 1,
  new: 0,
  productId: 0,
  seckillId: 0,
  uniqueId: ""
});

onMounted(async () => {
  await nextTick();
  //默认选择首个sku
  await setSku(0, 0)
  await setSku(1, 0)

});

//选择一个商品sku
const setSku = async (k, k1) => {
  if (props.productAttrs && props.productAttrs.attrs) {
    const sku = props.productAttrs.attrs;
    //重置sku状态
    for (const i in sku[k].attr_value) {
      sku[k].attr_value[i].check = false;
    }
    pickUpAttr.goodsId = sku[k].product_id;
    pickUpAttr.skuIds[k] = sku[k].attr_value[k1].attr
    sku[k].attr_value[k1].check = true;
    if (pickUpAttr.skuIds.length === props.productAttrs.attrs.length) {
      const keyName = pickUpAttr.skuIds.join(',');
      const {suk, stock, price, image,unique} = props.productAttrs.productValue[keyName];
      pickUpAttr.skuName = suk;
      pickUpAttr.stock = stock;
      pickUpAttr.price = price;
      pickUpAttr.image = image;
      //console.log(props.productAttrs)
      //组装数据回调
      params.productId = pickUpAttr.goodsId;
      //params.seckillId = props.productAttrs.isSkill;
      params.uniqueId = unique;
    }
  }
}

/**
 * 完成当前商品属性选择
 */
const donePickUp = () => {
  //关闭商品属性窗口
  setModalVisibility('showGoodsAttrsModal', false);

  //调用父级组件完成商品属性选择
  addCart(params)

}

</script>

<template>
  <a-modal v-model:visible="modalsState.showGoodsAttrsModal" :title="modalTitle" :footer="false" unmountOnClose
           :width="modalWidth">
    <div class="container">
      <div class="flex items-center mb-5">
        <!-- Product Image -->
        <div class="w-1/4 bg-gray-300 rounded-md">
          <img :src="pickUpAttr.image" alt="Product Image" class="w-full h-auto rounded-lg">
        </div>
        <!-- Product Details -->
        <div class="w-3/4 pl-4">
          <h2 class="font-bold mb-2">{{ productAttrs.goodsName }}</h2>
          <p class="text-gray-700 text-xs mb-1">SKU: {{ pickUpAttr.skuName }}</p>
          <p class="text-xs mb-1">库存: {{ pickUpAttr.stock }}</p>
          <p class="text-green-500 text-2xl font-semibold">${{ pickUpAttr.price }}</p>
        </div>
      </div>
      <div class="" v-for="(attr,k1) in productAttrs.attrs">
        <h3 class="text-sm font-bold tex rounded">{{ attr.attr_name }}</h3>
        <div class="pt-3 pb-5 pl-5">
          <a-tag
                 :class="['mr-3 mb-3 cursor-pointer rounded-md hover:bg-blue-600 hover:text-blue-50',{'bg-blue-600 text-blue-50':value.check}]"
                 v-for="(value,k2) in attr.attr_value" @click="setSku(k1,k2)">
            {{ value.attr }}
          </a-tag>

        </div>
      </div>
      <div class="pt-2 text-center">
        <a-button type="primary" class="h-12 pl-20 pr-20" shape="round" @click="donePickUp"><b>确认</b></a-button>
      </div>
    </div>
  </a-modal>
</template>


<style scoped lang="less">


</style>
