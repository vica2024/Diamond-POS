<template>
  <a-modal v-model:visible="modalsState.showCustomerModal" title="用户列表" :width="720" :footer="false">
    <div class="w-full">
      <div class="text-center">
        <a-input-search class="w-2/3" placeholder="请输入ID或者手机号" size="large" search-button/>
      </div>
      <div v-if="customerList.length>0"
           class="mt-5 pr-2 flex w-full h-72 overflow-hidden overflow-y-auto cursor-pointer">
        <a-row :gutter="12">
          <a-col v-for="user in customerList" :span="8" @click="chooseOne(user)">
            <div class="p-3 mb-3 flex justify-between rounded-lg bg-gray-100">
              <div class="text-center">
                <a-avatar :style="{ backgroundColor: '#3370ff' }">
                  <IconUser/>
                </a-avatar>
                <div class="mt-2">
                  <a-tag size="mini" color="arcoblue">{{ user.user_type }}</a-tag>
                </div>
              </div>
              <div class="flex-1 pl-1">
                <div class="mb-1 overflow-hidden text-ellipsis whitespace-nowrap w-2/3">
                  <span class="text-base font-bold">{{ user.nickname }} </span>
                </div>
                <div class="text-xs mb-2">手机号：123123123</div>
                <div class="text-xs">余额：{{ user.now_money }}</div>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div v-else class="text-center p-5">
        <a-spin dot/>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import {defineProps, inject, provide, ref, watch} from 'vue';

const props = defineProps({
  customerList: {
    type: Array,
    default: []
  },
});

const modalsState = inject('modalsState');
const setNewCustomer = inject('setNewCustomer');
const chooseOne = (user) => {
  setNewCustomer(user.uid)
}

</script>

<style scoped lang="less">


</style>
