<script setup>
import {useI18n} from "vue-i18n";
import {defineProps, inject} from "vue";

const props = defineProps({
  stages: {
    type: Object,
    default: {}
  }
});
const modalsState = inject('modalsState');
const {t} = useI18n();
</script>

<template>
<div class="tools w-full">
  <a-button type="outline" shape="round" :disabled="stages.pendingOrder" long>{{ t('hangOrder') }}</a-button>
  <a-button type="outline" shape="round" :disabled="stages.recharge" @click="modalsState.showRecharge=true" long>{{ t('recharge') }}</a-button>
  <a-button type="outline" shape="round" :disabled="stages.points" long>{{ t('points') }}</a-button>
  <a-button type="outline" shape="round" :disabled="stages.coupon" long>{{ t('eCoupon') }}</a-button>
  <a-button type="outline" shape="round" :disabled="stages.changePrice" @click="modalsState.showRecharge=true" long>{{ t('changePrice') }}</a-button>
  <a-button type="outline" shape="round" :disabled="stages.mark" @click="modalsState.showMark=true" long>{{ t('remark') }}</a-button>
</div>
</template>

<style scoped lang="less">
.tools{
  text-align: center;
  button{
    margin-bottom: 30px;
  }
}
</style>
