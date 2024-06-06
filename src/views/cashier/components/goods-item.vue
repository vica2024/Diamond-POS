<script setup>
import {defineProps,inject} from 'vue';
const props = defineProps({
  items:{
    type:Array,
    default: () => []
  }
});

const setModalVisibility = inject('setModalVisibility');
const showGoodsAttrs = () => {
  setModalVisibility('showGoodsAttrsModal', true);
};

</script>
<template>
  <a-row :gutter="12">
    <a-col v-for="(item,index) in items"  :xs="{ span: 24, offset: 0 }" :lg="{ span: 6, offset: 0 }" :md="{ span: 8, offset: 0 }" >
      <a-card :bordered="false" style="margin-bottom: 12px; border-radius: 15px;" >
        <template #cover>
          <div class="p-10">
            <div style="border-radius: 15px;"><a-image width="100%" :src="item.image"/></div>
          </div>
        </template>
        <div style="position: relative" @click="showGoodsAttrs">
          <a-typography-text class="title" :ellipsis="true">{{item.store_name}}</a-typography-text>
          <a-typography-title :heading="5" class="price" type="success" bold>${{item.price}}</a-typography-title>
          <a-button size="mini" type="primary" shape="circle" style="float: right; margin-top: -25px;">
            <icon-plus />
          </a-button>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped lang="less">
.title{
}
.price{
}
</style>
