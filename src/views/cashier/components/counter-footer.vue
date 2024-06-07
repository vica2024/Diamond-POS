<script setup>

</script>

<template>
<div class="footer p-5 shaw-1">
  <div class="count-box flex">
    <div class="cursor-pointer text-base flex-1 leading-6">Vica zhuo <icon-down size="15" /></div>
    <div class="text-xs">
        <span>优惠: $5.32</span>&nbsp;&nbsp;
        <span class="text-blue-600">明细</span>&nbsp;&nbsp;
        <span>实付: <b class="text-base text-rose-600">$500</b></span>
    </div>
  </div>
  <div class="payment-box">
    <a-button type="primary" shape="round" long>立即支付</a-button>
  </div>
</div>
</template>

<style scoped lang="less">
.footer{
  margin-bottom: -10px;
   .count-box{
     padding-bottom: 25px;
   }
  .payment-box{
    padding-top: 15px;
    margin-bottom: 10px;
  }
}
</style>
