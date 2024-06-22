<script setup>
import {defineProps, inject, reactive, ref, watch} from "vue";
import HighlightWords from 'vue-highlight-words';
import {useI18n} from "vue-i18n";
import dynamicIcon from "@/components/custom/DynamicIcon.vue";


const modalsState = inject('modalsState');
const setNewCustomer = inject('setNewCustomer');
const getCustomerList = inject('getCustomerList');

const {t} = useI18n();
const props = defineProps({
  customerList: {
    type: Array,
    default: []
  },
  modalTitle: {
    type: String,
    default: null
  },
  modalWidth: {
    type: Number,
    default: 760
  },
  customerInfoForm: {
    type: Array,
    default: [{
      itemName: 'customer.userInfo',
      list: [{
        label: 'customer.givenName',
        value: '--',
        span: 2,
        type: 'text'
      }, {
        label: 'customer.lastName',
        value: '--',
        span: 2,
        type: 'text'
      }, {
        label: 'customer.email',
        value: '--',
        span: 2,
        type: 'text'
      }, {
        label: 'customer.phoneNumber',
        value: '--',
        span: 2,
        type: 'phone'
      }, {
        label: 'customer.birthday',
        value: '--',
        span: 2,
        type: 'date'
      }, {
        label: 'customer.gender',
        value: '--',
        span: 2,
        type: 'radio',
      }, {
        label: 'customer.country',
        value: '--',
        span: 2,
        type: 'select',
      }, {
        label: 'customer.city',
        value: '--',
        span: 2,
        type: 'select',
      }, {
        label: 'customer.district',
        value: '--',
        span: 3,
        type: 'select',
      }, {
        label: 'customer.postalCode',
        value: '--',
        span: 3,
        type: 'text',
      }, {
        label: 'customer.address',
        value: '--',
        span: 3,
        type: 'text',
      }]
    }]
  }
});

const customerInfo = ref({
  customerCountCode: 1
});

const loading = ref(false);

const options = [
  {label: 'customer.female', value: '1'},
  {label: 'customer.male', value: '2'},
  {label: 'customer.sexSecret', value: '3'},
];

const createCustomer = () => {
  loading.value = true;
}

</script>

<template>
  <div class="h-full relative">
    <a-drawer :width="modalWidth" :mask-closable="false" :title="$t('customer.createCustomer')"
              v-model:visible="modalsState.showCustomerCreate"
              :footer="false">
      <div class="relative mt-5">
        <div class="m-5">
          <a-descriptions v-for="row in customerInfoForm" style="margin-bottom: 25px;" :title="t(row.itemName)"
                          :column="{ xs: 2, sm: 4, md: 4, lg: 4 }" layout="inline-vertical" bordered>
            <a-descriptions-item v-for="item of row.list" :label="t(item.label)" :span="item.span">
              <span class="customer-create-item flex items-center">
                <a-select v-if="['phone'].includes(item.type)" default-value="+86" :style="{width:'80px'}" size="small"
                          class="bg-white mr-1 hover:bg-white">
                 <a-option :value="1">+86</a-option>
                </a-select>
                <a-input v-if="['phone','text'].includes(item.type)"
                         :placeholder="t('placeholder.prefix')+t(item.label)" class="bg-white hover:bg-white border-0"/>
                <a-radio-group v-if="['radio'].includes(item.type)" :options="options">
                    <template #label="{ data }">
                      <span>{{ t(data.label) }}</span>
                    </template>
                </a-radio-group>
                <a-select v-if="['select'].includes(item.type)" size="small"
                          :placeholder="t('placeholder.prefix')+t(item.label)" class="bg-white  mr-1 hover:bg-white"/>
                <a-date-picker v-if="['date'].includes(item.type)" class="bg-white hover:bg-white border-0"/>
              </span>
            </a-descriptions-item>
          </a-descriptions>

          <div class="p-5 w-2/3 m-auto">
            <div class="mb-5 text-center">
              <a-checkbox value="1">
                <a href="" class="border-b border-gray-500">{{ t('customer.policy') }}</a>
              </a-checkbox>
            </div>
            <a-button type="primary" class="h-12 font-bold text-lg" shape="round" @click="createCustomer" long>{{
                t('modal.footer.create')
              }}
            </a-button>
          </div>
        </div>
        <a-spin dot class="absolute top-56 left-0 right-0 m-auto" style="width: 100px;" v-if="loading"/>
      </div>
    </a-drawer>
  </div>
</template>

<style scoped lang="less">


</style>
