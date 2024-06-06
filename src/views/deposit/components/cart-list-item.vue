<script setup>
import {defineProps, computed} from 'vue';
</script>

<template>
  <div class="hover">
    <div class="cart-item p-15">
      <div class="picture">
        <a-image width="60"
                 src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"/>
      </div>
      <div class="info">
        <div class="title-box">
          <a-typography-text class="text-15" style="margin-bottom: 2px;" :ellipsis="true">蕾遇潮牌女装雪纺连衣裙女中长款碎中长款碎中长款碎
          </a-typography-text>
          <span class="right-del">
             <icon-delete class="del" size="15"/>
          </span>

        </div>
        <div class="sku">S（100斤以内）
          <icon-down/>
        </div>
        <div class="bottom">
          <span class="left"><b>$1400</b></span>
          <span class="right">
             <a-input-number size="mini" mode="button" min="1"/>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.hover{
  :hover {
    background-color: #999;
    z-index: 999!important;
  }
}
.cart-item {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
 .title-box {
    display: flex;
    .right-del{
      padding-left: 10px;
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
