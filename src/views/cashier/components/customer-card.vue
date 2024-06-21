<script setup>
import {defineProps, inject, ref} from 'vue';
import {useI18n} from "vue-i18n";
const { t } = useI18n();
const container = ref(null);
defineProps({
  customerInfo: {
    type: Object,
    default: {
      nickname: '--',
      now_money: 0,
      integral: 0
    }
  }
})
const setModalVisibility = inject('setModalVisibility');

</script>

<template>
  <div class="customer-card flex justify-between items-center">
    <a-avatar :size="45">
      <IconUser />
    </a-avatar>
    <div class="info">
      <div class="flex justify-between items-center">
        <span
            class="font-bold text-base pr-1 overflow-hidden text-ellipsis whitespace-nowrap">{{ customerInfo.nickname }}</span>
        <span class="cursor-pointer text-orange-600 hover:text-orange-300"
              @click="setModalVisibility('showCustomerSearchModal', true)"> {{ t('switchCustomer') }}
          <icon-down/>
        </span>
      </div>
      <div class="">
        <span class="text-xs"> {{ t('points') }}: <b class="text-sm">{{ customerInfo.integral }}</b></span>&nbsp;
        <span class="text-xs"> {{ t('balance') }}: <b class="text-sm">{{ customerInfo.now_money }}</b></span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">

.customer-card {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow: hidden;
  margin: 20px;
  padding: 25px 15px;
  border-radius: 12px;
  border: 3px solid #f70;
  flex-shrink: 0;

  .info {
    flex: 1 1 0;
    padding-left: 10px;
    overflow: hidden;

    .title {
      display: flex;
      align-items: center;
    }

    .switch {
      .change-cs {
        color: #ff7700 !important;
      }
    }
  }
}

</style>
