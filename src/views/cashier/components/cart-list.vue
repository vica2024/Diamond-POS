<script setup>
import {defineProps, computed} from 'vue';
import {useI18n} from 'vue-i18n';
import CartListItem from "@/views/cashier/components/cart-list-item.vue";

const props = defineProps({
  cartList:{
    type:Array,
    default:[]
  },
  total:{
    type:Number,
    default:0
  }
});

const emptyCart = (item, proindex, indexs, type) => {
  // 删除购物车项目处理函数
  // ...
};

const changeCart = (event, item) => {
  // 变更购物车项目属性处理函数
  // ...
};

</script>

<template>
  <div>
    <div class="purchase-info border-b-1 p-5">
      <span class="lg:text-base sm:text-sm">已选购<b style="color: #ff7700"> {{total}} </b>件</span>
      <span class="lg:text-base sm:text-sm" onclick="emptyCart">清除</span>
    </div>
    <a-scrollbar v-if="total>0" style="height:55vh;overflow: auto;">
        <cart-list-item v-for="(item,index) in cartList" :item="item" :key="index" :index="index" />
    </a-scrollbar>
    <a-empty v-else style="height:58vh;overflow: auto; ">
      <template #image>
        <icon-empty size="80" style="margin-top: 40%" />
      </template>
      暂无商品，快去添加吧～
    </a-empty>
  </div>
</template>

<style scoped lang="less">
.list-box {

}

.purchase-info {
  display: flex;
  justify-content: space-between;
  span{
    font-size: 13px;
  }
}


</style>
