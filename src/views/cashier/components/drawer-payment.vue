<script setup>
import {defineProps, inject, ref} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
const props = defineProps({
  staffList:{
    type:Array,
    default:[]
  },
  modalTitle: {
    type: String,
    default: null
  },
  modalWidth: {
    type: Number,
    default: 780
  }
})
import CreditCard from "@/views/cashier/components/creditCard.vue";
import BalancePay from "@/views/cashier/components/balance-pay.vue";

const modalsState = inject('modalsState');
const setModalVisibility = inject('setModalVisibility');
const payType = ref(0);
const paymentMethods = [t('weChatAlipay'), t('creditCard'), t('cash'), t('balancePayment'), t('cryptocurrency')];
</script>

<template>
  <div class="relative h-full">
    <a-drawer :width="modalWidth" :title="$t('modalTitle')" v-model:visible="modalsState.showPayment" :footer="false">
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
                     :placeholder="$t('paymentScanPlaceholder')"/>
          </div>
          <balance-pay v-if="payType===2"/>
          <credit-card v-if="payType===1"/>
          <div v-if="payType===4" style="width: 430px;" class="m-auto">
            <a-tabs type="rounded">
              <a-tab-pane key="1" :title="$t('scanToPay.title')">
                <div style="width: 120px;height: 120px;" class="border m-auto mt-20"></div>
                <a-steps class="pt-10">
                  <a-step :description="$t('scanToPay.steps[0]')">Prepare to Pay</a-step>
                  <a-step :description="$t('scanToPay.steps[1]')">Enter the third-party payment app</a-step>
                  <a-step :description="$t('scanToPay.steps[2]')">Complete Payment</a-step>
                </a-steps>
              </a-tab-pane>
              <a-tab-pane key="2" :title="$t('sendEmail.title')">
                <a-result status="success" class="mt-20" :title="$t('sendEmail.success')">
                  <template #subtitle>
                    <div class="mt-20">{{ $t('sendEmail.subtitle') }}</div>
                  </template>
                  <template #extra>
                    <a-space>
                      <a-button type='primary'>{{ $t('sendEmail.resend') }}</a-button>
                    </a-space>
                  </template>
                </a-result>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
        <div :class="['w-full cashier-bg',{'bg-img':payType===0,'bg-img-1':payType===3}]"
             v-if="[0,3].includes(payType)"></div>
        <div class="w-2/3 m-auto left-0 right-0 absolute bottom-10">
          <a-button type="outline" shape="round" size="large" @click="setModalVisibility('showPayment',false)" long>
            <span class="font-bold text-base">{{ $t('cancelPayment') }}</span>
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
