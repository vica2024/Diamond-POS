<script setup>
import {defineProps, computed} from 'vue';
import {useI18n} from 'vue-i18n';
import CartListItem from "@/views/cashier/components/cart-list-item.vue";

const props = defineProps({
  cartList: Array
});

const {t} = useI18n({useScope: 'local'});

const collectOrder = (pro) => {
  // 点击收藏/订单处理函数
  // ...
};

const cartAttr = (item) => {
  // 购物车属性处理函数
  // ...
};

const delCart = (item, proindex, indexs, type) => {
  // 删除购物车项目处理函数
  // ...
};

const calculate = (item, operation) => {
  // 计算项目数量处理函数
  // ...
};

const changeCart = (event, item) => {
  // 变更购物车项目属性处理函数
  // ...
};

</script>

<template>
  <div>
    <div class="purchase-info border-b-1 p-10">
      <span>已选购1件</span>
      <span>清除</span>
    </div>
    <a-scrollbar style="height:53vh;overflow: auto;">
      <div class="list-box">
        <cart-list-item />
      </div>
    </a-scrollbar>
    <a-empty>
      <template #image>
        <icon-exclamation-circle-fill/>
      </template>
      No data, please reload!
    </a-empty>
  </div>
</template>

<style scoped lang="less">
.list-box {

}

.purchase-info {
  display: flex;
  justify-content: space-between;
}

</style>
