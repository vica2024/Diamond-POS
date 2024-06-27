<script setup>
import {defineProps, inject, reactive, ref, watch} from "vue";
import HighlightWords from 'vue-highlight-words';
import {useI18n} from "vue-i18n";
import dynamicIcon from "@/components/custom/DynamicIcon.vue";
import {Message} from '@arco-design/web-vue';

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
        key: 'real_name',
        span: 2,
        type: 'text'
      }, {
        label: 'customer.lastName',
        value: '--',
        key: 'last_name',
        span: 2,
        type: 'text'
      }, {
        label: 'customer.email',
        value: '--',
        key: 'email',
        span: 2,
        type: 'text'
      }, {
        label: 'customer.phoneNumber',
        value: '--',
        key: 'phone',
        span: 2,
        type: 'phone'
      }, {
        label: 'customer.birthday',
        value: '--',
        key: 'birthday',
        span: 2,
        type: 'date'
      }, {
        label: 'customer.gender',
        value: '--',
        key: 'sex',
        span: 2,
        type: 'radio',
      }, {
        label: 'customer.country',
        key: 'country',
        value: '--',
        span: 2,
        type: 'select',
      }, {
        label: 'customer.city',
        value: '--',
        key: 'city',
        span: 2,
        type: 'select',
      }, {
        label: 'customer.district',
        value: '--',
        key: 'area',
        span: 3,
        type: 'select',
      }, {
        label: 'customer.postalCode',
        key: 'postal_code',
        value: '--',
        span: 3,
        type: 'text',
      }, {
        label: 'customer.address',
        key: 'address',
        value: '--',
        span: 3,
        type: 'text',
      }]
    }]
  }
});

const customerInfo = reactive({
  countCode: 1,
  country: '',
  city: null,
  area: null,
  province: null,
  address: null,
  email: null,
  phone: null,
  real_name: null,
  last_name: null,
  sex: '0',
  birthday: null,
  postal_code: null
});

const customerInfoFrom = reactive({
  countCode: true,
  country: true,
  city: true,
  area: true,
  province: true,
  address: true,
  email: true,
  phone: true,
  real_name: true,
  last_name: true,
  sex: true,
  birthday: true,
  postal_code: true,
  agree: true
});

const loading = ref(false);

const options = [
  {label: 'customer.female', value: '0'},
  {label: 'customer.male', value: '1'},
  {label: 'customer.sexSecret', value: '2'},
];


const handleBlur = (key) => {

  customerInfoFrom[key] = customerInfo[key];

}

const createCustomer = () => {
  let isValid = true;
  for (const k in customerInfoFrom) {
    handleBlur(k)
    if (!customerInfoFrom[k]) {
      isValid = false;
    }
  }
  if (!isValid) {
    // 如果验证不通过，可以在这里进行相应处理，例如设置错误状态等
    Message.error("Please check if the customer information is complete.")
  } else {
    //提交到后台

  }
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
              <span class="customer-create-item flex items-center relative">
                <a-input-group v-if="['phone'].includes(item.type)">
                  <a-select :options="['+86','+1','+65']" size="small" :style="{width:'80px'}" class="border-0" style="border-right: none;padding-left: 10px;" />
                  <a-input class="bg-white hover:bg-white border-0" style="padding-left: 5px;" :placeholder="t('placeholder.prefix')+t(item.label)" v-model="customerInfo[item.key]" @blur="handleBlur(item.key)" />
                </a-input-group>
                <a-input v-if="['text'].includes(item.type)"
                         :placeholder="t('placeholder.prefix')+t(item.label)" v-model="customerInfo[item.key]"
                         class="bg-white hover:bg-white border-0" @blur="handleBlur(item.key)">
                </a-input>
                <a-radio-group v-if="['radio'].includes(item.type)" v-model="customerInfo[item.key]" :options="options">
                    <template #label="{ data }">
                      <span>{{ t(data.label) }}</span>
                    </template>
                </a-radio-group>
                <a-select v-if="['select'].includes(item.type)" size="small" v-model="customerInfo[item.key]"
                          :placeholder="t('placeholder.prefix')+t(item.label)"  @change="handleBlur(item.key)" @popup-visible-change="handleBlur(item.key)" class="bg-white  mr-1 hover:bg-white"/>
                <a-date-picker v-if="['date'].includes(item.type)" v-model="customerInfo[item.key]" @change="handleBlur(item.key)" @popup-visible-change="handleBlur(item.key)"
                               class="bg-white hover:bg-white border-0">
                </a-date-picker>
                <icon-close-circle class="text-red-600 absolute right-0" v-if="!customerInfoFrom[item.key]"/>
              </span>
            </a-descriptions-item>
          </a-descriptions>

          <div class="p-5 w-2/3 m-auto">
            <div class="mb-5 text-center">
              <a-checkbox value="1">
                <a href="" :class="['border-b border-gray-500',{'text-red-500':customerInfoFrom.agree===false}]">{{
                    t('customer.policy')
                  }}</a>
              </a-checkbox>
            </div>
            <a-button type="primary" class="h-12 font-bold text-lg" shape="round" @click="createCustomer" long>
              {{
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
