<template>
  <a-modal v-model:visible="modalsState.showSalesPerson" :title="modalTitle" :width="modalWidth" :footer="false">
    <div class="w-full">
      <div class="text-center">
        <a-input-search class="w-2/3" :placeholder="$t('searchSalespersonPlaceholder')" size="large" search-button />
      </div>
      <div v-if="staffList.length > 0" class="mt-5 pr-2 flex w-full overflow-hidden overflow-y-auto cursor-pointer">
        <a-row :gutter="24">
          <a-col v-for="staff in staffList" :key="staff.id" :span="12" @click="setNewStaff(staff)">
            <div class="p-3 mb-3 flex items-center rounded-lg bg-gray-100">
              <div class="text-center">
                <a-avatar :size="40">
                  <img alt="" :src="staff.avatar">
                </a-avatar>
              </div>
              <div class="flex-1 pl-1">
                <span class="font-bold flex items-center">
                  {{ staff.staff_name }} <span class="text-xs font-light text-gray-400">（id:{{staff.id}}）</span>
                </span>
                <span class="text-xs text-gray-500">{{ $t('phone') }}：{{ staff.phone }}</span>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div v-else class="text-center p-5">
        <a-spin dot>{{ $t('loading') }}</a-spin>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import {defineProps, inject} from 'vue';
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
    type: String,
    default: '720'
  }
})

const modalsState = inject('modalsState');
const setNewStaff = inject('setNewStaff');

</script>

<style scoped lang="less">


</style>
