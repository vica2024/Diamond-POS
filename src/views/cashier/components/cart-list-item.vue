<script setup>
import {defineProps, computed} from 'vue';

const props = defineProps({
  item:{
    type:Object,
    default:{}
  },
  index:{
    type:Number,
    default:0
  }
});
const delCart = (index, item) => {
  // 删除购物车项目处理函数
  // ...
};
const changeCart=(index, item) => {
  // ...
};
</script>

<template>
  <div class="hover">
    <div class="cart-item p-15">
      <div class="picture">
        <a-image width="60" :src="item.cart[0].productInfo.image"/>
      </div>
      <div class="info">
        <div class="title-box">
          <a-typography-text class="text-15" style="margin-bottom: 2px; flex: 1;" :ellipsis="true">{{item.cart[0].productInfo.store_name}}</a-typography-text>
          <span class="right-del">
             <icon-delete class="del" onclick="delCart(index,item)" size="15"/>
          </span>

        </div>
        <div class="sku">
          {{ item.cart[0].productInfo.attrInfo.suk }}
          <icon-down/>
        </div>
        <div class="bottom">
          <span class="left"><b>${{ item.cart[0].sum_price }}</b></span>
          <span class="right">
             <a-input-number
                 v-model="item.cart[0].cart_num"
                 :max="item.cart[0].productInfo.attrInfo.stock"
                 :min="1"
                 @on-blur="(e) => {changeCart(e, item);}"
                 @change="changeCart"
                 size="mini" mode="button" min="1"/>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.hover{
  :hover {
    background-color: #E5E5E5;
  }
}
.cart-item {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
 .title-box {
    display: flex;
    .right-del{
      width: 30px;
      text-align: right;
    }
  }
  .bottom {
    display: flex;

    .left {
      flex: 2;
    }
    .right {
      flex: 1;
    }
  }

  .picture {
    width: 60px;
    height: 60px;
  }

  .info {
    flex: 1;
    padding-left:15px;
    height: 100%;
    overflow: hidden;

    .sku {
      font-size: 11px;
      color: #999;
      padding: 5px 0;
    }
  }
}

</style>
