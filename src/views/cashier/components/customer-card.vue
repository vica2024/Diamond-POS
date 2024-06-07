<script setup>
import {defineProps, computed} from 'vue';


</script>

<template>
  <div class="customer-card">
    <div class="picture">
      <a-avatar :size="45">A</a-avatar>
    </div>
    <div class="info">
      <div class="title">
        <span class="font-bold lg:text-lg md:text-base sm:text-xs pr-1 overflow-hidden text-ellipsis whitespace-nowrap">蕾遇潮牌</span>
        <span class="font-extralight text-gray-600 lg:text-sm sm:text-xs overflow-hidden text-ellipsis whitespace-nowrap">手机号码：13168320604</span>
        <div class="switch">
          <a-dropdown :popup-max-height="false">
            <a-button type="text" class="change-cs" size="small">切换会员 <icon-down /></a-button>
            <template #content>
              <a-doption>选择会员</a-doption>
              <a-doption>散客</a-doption>
            </template>
          </a-dropdown>
        </div>
      </div>
      <div class="account">
        <span class="lg:text-sm sm:text-xs">积分 <b>20</b></span>&nbsp;
        <span class="lg:text-sm sm:text-xs">余额 <b>20</b></span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.customer-card {
  display: flex;
  width: 90%;
  align-items: center;
  flex-wrap: nowrap;
  overflow: hidden;
  margin: 20px auto 15px;
  padding: 25px 15px;
  border-radius: 12px;
  border: 3px solid #f70;
  flex-shrink: 0;
  .picture {
    width: 50px;
    height: 50px;
  }
  .info {
    flex: 1 1 0;
    padding-left: 10px;
    overflow: hidden;
    .title {
      display: flex;
      align-items: center;
    }
    .switch {
      .change-cs{
        color: #ff7700 !important;
      }
    }
    .account {
      padding: 5px 0;
    }
  }
}

</style>
