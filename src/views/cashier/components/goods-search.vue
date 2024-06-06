<script setup>
import {defineProps, computed} from 'vue';
const props = defineProps({
  categoryList:{
    type:Array,
    default:[]
  }
});
</script>

<template>
<div class="search bg-white">
  <a-input-group class="search-group">
    <a-select :options="['全部','名称','编号']" :style="{width:'140px'}" placeholder="全部" />
    <a-input-search placeholder="搜索商品名称/ID/唯一码或点击聚焦扫码" search-button/>
  </a-input-group>
  <a-select size="small" class="select-next" :bordered="false"  placeholder="搜索商品名称/点击选择产品类目" multiple>
    <a-option v-for="(option,index) in categoryList">{{ option.cate_name }}</a-option>
  </a-select>
</div>
</template>

<style scoped lang="less">
.search{
  width: 100%;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 20px;
  overflow: hidden;
  .search-group{
     width: 100%;
     margin: 0 auto 15px auto;
  }

}
</style>
