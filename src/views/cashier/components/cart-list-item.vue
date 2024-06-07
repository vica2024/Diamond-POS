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
    <div class="cart-item p-5">
      <div class="picture">
        <a-image width="70" :src="item.cart[0].productInfo.image"/>
      </div>
      <div class="info">
        <div class="title-box">
          <span class="font-500 lg:text-lg md:text-base sm:text-xs pr-1 overflow-hidden text-ellipsis whitespace-nowrap">{{item.cart[0].productInfo.store_name}}</span>
          <span class="right-del">
             <icon-delete class="del" onclick="delCart(index,item)" size="20"/>
          </span>

        </div>
        <div class="sku">
          {{ item.cart[0].productInfo.attrInfo.suk }}
          <icon-down/>
        </div>
        <div class="bottom">
          <span class="left font-bold lg:text-lg md:text-base sm:text-xs"><b>${{ item.cart[0].sum_price }}</b></span>
          <span class="right">
             <a-input-number
                 v-model="item.cart[0].cart_num"
                 :max="item.cart[0].productInfo.attrInfo.stock"
                 :min="1"
                 class="number-input"
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
  &:hover {
    background: rgba(24, 144, 255, 0.05);
  }
}
.cart-item {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
 .title-box {
    display: flex;
    align-items: center;
    span:first-child{
      flex: 1;
    }
    .right-del{
      width: 40px;
      text-align: right;
      .del{
        color: rgb(var(--primary-6)) !important;
        cursor: pointer;
      }
    }
  }
  .bottom {
    display: flex;

    .left {
      flex: 2;
      font-size: 17px;
    }
    .right {
      flex: 1;
    }
  }

  .picture {
    width: 75px;
    height: 75px;
    div {
      border-radius: 5px;
    }
  }

  .info {
    flex: 1;
    padding-left:15px;
    height: 100%;
    overflow: hidden;
    line-height: 21px;
    .sku {
      font-size: 12px;
      color: #999;
      cursor: pointer;
      padding: 5px 0;
    }
  }
}



</style>
