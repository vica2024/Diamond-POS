<script setup>
import {inject, ref} from "vue";
import CreditCard from "@/views/cashier/components/creditCard.vue";
import BalancePay from "@/views/cashier/components/balance-pay.vue";

const modalsState = inject('modalsState');
const setModalVisibility = inject('setModalVisibility');
const payType = ref(0);
const paymentMethods = ['微信/支付宝', '信用卡', '现金收款', '余额支付', '加密货币'];
</script>

<template>
  <div class="relative h-full">
    <a-drawer :width="780" v-model:visible="modalsState.showPayment" :footer="false">
      <template #header>
        <span>请选择收款方式</span>
      </template>
      <div class="payment">
        <div class="flex justify-center items-center">
          <a-button-group shape="round" class="mt-5">
            <a-button :type="index === payType ? 'primary' : 'dashed'"
                      v-for="(item, index) in paymentMethods" :key="index" @click="payType=index">
              <span class="text-base">{{ item }}</span>
            </a-button>
          </a-button-group>
        </div>
        <div class="w-4/5 m-auto">
          <div class="mb-10 mt-14 text-center">
            <a-input v-if="payType===0||payType===3" style="width:430px;" size="large"
                     placeholder="请点击输入框聚焦扫码或输入编码号"/>
          </div>
          <balance-pay v-if="payType===2"/>
          <credit-card v-if="payType===1"/>
          <div v-if="payType===4" style="width: 430px;" class="m-auto">
            <a-tabs type="rounded">
              <a-tab-pane key="1" title="扫码支付">
                <div style="width: 120px;height: 120px;" class="border m-auto mt-20"></div>
                <a-steps class="pt-10">>
                  <a-step description="顾客用手机相机扫描二维码">准备支付</a-step>
                  <a-step description="自动检测是否安装加密货币APP">进入第三方支付APP</a-step>
                  <a-step description="在手机APP上确认订单信息和支付金额">完成支付</a-step>
                </a-steps>
              </a-tab-pane>
              <a-tab-pane key="2" title="发送邮件">
                <a-result status="success" class="mt-20" title="发送成功" >
                  <template #subtitle>
                    <div class="mt-20">加密货币邮件已经发送到zhu****ca@gmail.com</div>
                  </template>
                  <template #extra>
                    <a-space>
                      <a-button type='primary'>重新发送</a-button>
                    </a-space>
                  </template>
                </a-result>
              </a-tab-pane>
            </a-tabs position="left">
          </div>
        </div>
        <div :class="['w-full cashier-bg',{'bg-img':payType===0,'bg-img-1':payType===3}]"
             v-if="[0,3].includes(payType)"></div>
        <div class="w-2/3 m-auto left-0 right-0 absolute bottom-10">
          <a-button type="outline" shape="round" size="large" @click="setModalVisibility('showPayment',false)" long>
            <span class="font-bold text-base">取消支付</span>
          </a-button>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<style scoped lang="less">
.cashier-bg {
  width: 640px;
  height: 235px;
  margin: auto;
  background-repeat: no-repeat;
  background-size: 100%;
}

.bg-img {
  background-image: url("https://multi-store.crmeb.net/view_cashier/img/alipay.d0e0aa1f.png");
}

.bg-img-1 {
  background-image: url("https://multi-store.crmeb.net/view_cashier/img/balance.90215d31.png");
}

.payment {
  .arco-input-wrapper {
    background-color: #FFFFFF !important;
    padding: 5px;
    border: 1px solid #0000ff;
    border-radius: 5px;
  }
}
</style>
