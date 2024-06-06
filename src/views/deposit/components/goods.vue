<script setup>

import GoodsSearch from "@/views/cashier/components/goods-search.vue";
import CounterTools from "@/views/cashier/components/counter-tools.vue";
import CustomerCard from "@/views/cashier/components/customer-card.vue";
import CounterFooter from "@/views/cashier/components/counter-footer.vue";
import GoodsItem from "@/views/cashier/components/goods-item.vue";
</script>

<template>
  <div class="goods">
      <goods-search></goods-search>
      <goods-item></goods-item>
  </div>
</template>

<style scoped lang="less">
.goods{
  flex: 1;
  min-height: 20px;
  padding: 0 0 15px 20px;
}
</style>
