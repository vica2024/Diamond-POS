<script setup>
import GoodsSearch from "./goods-search.vue";
import GoodsItem from "./goods-item.vue";
import {defineProps, computed} from 'vue';

const props = defineProps({
  goodsList: {
    type: Array,
    default: []
  },
  cateList: {
    type: Array,
    default: []
  }

});

</script>

<template>
  <div class="goods">
    <goods-search :categoryList="cateList"></goods-search>
    <a-scrollbar style="height:72vh;overflow-y: auto;overflow-x: hidden">
      <goods-item :items="goodsList"/>
    </a-scrollbar>
  </div>
</template>

<style scoped lang="less">
.goods {
  flex: 1;
  min-height: 20px;
  padding: 0 0 15px 20px;
}
</style>
