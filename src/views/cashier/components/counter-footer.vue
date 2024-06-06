<script setup>

</script>

<template>
<div class="footer p-20 shaw-1">
  <div class="count-box">
    <div class="left">Vica zhuo <icon-down size="15" /></div>
    <div class="right">
        <span>优惠: <b>$5</b></span>&nbsp;&nbsp;
        <span>明细</span>&nbsp;&nbsp;
        <span>实付: <b>$500</b></span>
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
     padding-top: 10px;
     padding-bottom: 25px;
     .left{
       font-size: 14px;
       font-weight: bold;
     }
     .right{
       font-size: 13px;
     }
   }
  .payment-box{
    padding-top: 15px;
    margin-bottom: 10px;
  }
}
</style>
