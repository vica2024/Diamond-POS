<script setup>

</script>

<template>
<div class="search bg-white">
  <a-input-group class="search-group">
    <a-select :options="['全部','名称','编号']" :style="{width:'140px'}" placeholder="全部" />
    <a-input-search placeholder="Please enter something" search-button/>
  </a-input-group>
  <a-select size="small" class="select-next" :bordered="false"  placeholder="Please select ..." multiple>
    <a-option>Beijing</a-option>
    <a-option>Shanghai</a-option>
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
