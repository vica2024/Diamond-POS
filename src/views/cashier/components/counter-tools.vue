<script setup>
import {useI18n} from "vue-i18n";
import {inject} from "vue";

const modalsState = inject('modalsState');
const {t} = useI18n();

</script>

<template>
<div class="tools w-full">
  <a-button type="outline" shape="round" long>{{ t('hangOrder') }}</a-button>
  <a-button type="outline" shape="round" @click="modalsState.showRecharge=true" long>{{ t('recharge') }}</a-button>
  <a-button type="outline" shape="round" disabled long>{{ t('points') }}</a-button>
  <a-button type="outline" shape="round" disabled long>{{ t('eCoupon') }}</a-button>
  <a-button type="outline" shape="round" @click="modalsState.showRecharge=true" disabled long>{{ t('changePrice') }}</a-button>
  <a-button type="outline" shape="round" @click="modalsState.showMark=true" long>{{ t('remark') }}</a-button>
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
