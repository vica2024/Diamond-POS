<script setup>
import {defineProps, computed} from 'vue';


</script>

<template>
  <div class="customer-card p-20">
    <div class="picture">
      <a-avatar :size="40">Arco</a-avatar>
    </div>
    <div class="switch">
      <a-select size="small" :style="{width:'90px'}" :bordered="false"  placeholder="切换会员">
        <a-option>选择顾客</a-option>
        <a-option>散客</a-option>
      </a-select>
    </div>
    <div class="info">
      <div style="width: 65%;">
        <a-typography-title :heading="6" class="name" :ellipsis="true">蕾遇潮牌
          <span class="phone">13168320604</span>
        </a-typography-title>
      </div>
      <div class="accout">
        <span>积分 <b>20</b></span>&nbsp;
        <span>余额 <b>20</b></span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.customer-card {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  border-radius: .064725rem;
  .name{
    margin: 0px;
    font-size: 13px;
    .phone{
      font-size: 12px;
      margin-left: 10px;
    }
  }
  .switch {
    position: absolute;
    font-size: 14px;
    right: 10px;
    top: 12px;
  }

  .picture {
    width: 40px;
    height: 40px;
  }

  .info {
    flex: 1;
    padding: 0 15px 0 15px;
    height: 100%;
    overflow: hidden;
    .accout{
      font-size: 12px;
      padding: 5px 0;
      b{
        font-size: 13px;
      }
    }
  }
}

</style>
