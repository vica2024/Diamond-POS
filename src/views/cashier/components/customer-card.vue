<script setup>
import {defineProps, computed} from 'vue';


</script>

<template>
  <div class="customer-card p-15">
    <div class="picture">
      <a-avatar :size="42">A</a-avatar>
    </div>
    <div class="switch">
      <a-dropdown :popup-max-height="false">
        <a-button type="text" class="change-cs" size="small">切换会员 <icon-down/></a-button>
        <template #content>
          <a-doption>选择会员</a-doption>
          <a-doption>散客</a-doption>
        </template>
      </a-dropdown>
    </div>
    <div class="info">
      <div class="title">
        <a-typography-title :heading="6" class="name" :ellipsis="true">蕾遇潮牌
        </a-typography-title>
        <span class="phone">13168320604</span>
      </div>
      <div class="account">
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
  width: 90%;
  margin: 20px auto 15px;
  border-radius: 12px;
  border: 3px solid #f70;

  .title {
    width: 70%;
    display: flex;
    .name {
      margin: 0;
      font-size: 14px;
    }
    .phone {
      line-height: 21px;
      padding-left: 10px;
      font-size: 12px;
      color: #999;
    }
  }

  .switch {
    position: absolute;
    font-size: 14px;
    right: 0;
    top: 5px;
    .change-cs{
      color: #ff7700 !important;
    }
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

    .account {
      font-size: 11px;
      padding: 5px 0;

      b {
        font-size: 13px;
      }
    }
  }
}

</style>
