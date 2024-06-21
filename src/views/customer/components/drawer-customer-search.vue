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
  userInfoForm:{
    type:Array,
    default:[{
      itemName: 'customer.userInfo',
      list: [{
        label: 'customer.givenName',
        value: '--',
        span: 2,
      }, {
        label: 'customer.lastName',
        value: '--',
        span: 2,
      },{
        label: 'customer.email',
        value: '--',
        is_edit: true,
        span: 2,
      }, {
        label: 'customer.phoneNumber',
        value: '--',
        is_edit: true,
        span: 2,
      }, {
        label: 'customer.birthday',
        value: '--',
      }, {
        label: 'customer.gender',
        value: '--',
      }, {
        label: 'customer.country',
        value: '--',
        span: 2,

      }, {
        label: 'customer.city',
        value: '--',
        span: 1,
      }, {
        label: 'customer.district',
        value: '--',
        span: 1,
      }, {
        label: 'customer.postalCode',
        value: '--',
        span: 2,
      }, {
        label: 'customer.address',
        value: '--',
        span: 3,
      }]
    },{

        itemName: 'customer.overview',
        list:[
          {
            label: 'customer.totalSpendingForYears',
            value: '--',
            span:2
          },
          {
            label: 'customer.totalSpendingForMoths',
            value: '--',
            span:2
          },
          {
            label: 'customer.lastTransactionAmount',
            value: '--',
          },
          {
            label: 'customer.lastTransactionTime',
            value: '--',
          },
          {
            label: 'customer.firstStore',
            value: '--',
          },
          {
            label: 'customer.lastStore',
            value: '--',
          },
          {
            label: 'customer.totalTransactions',
            value: '--',
          },
         {
            label: 'customer.totalSpending',
            value: '--',
            span:2
          },
        ]
    },{
      itemName: 'customer.preference',
      list:[ {
        label: 'customer.colorPreference',
        value: '--',
      },{
        label: 'customer.languagePreference',
        value: '--',
      },{
        label: 'customer.stylePreference',
        value: '--',
      },]
    }]
  }
});

const searchText = ref(null);
const highlightedOptions = ref([]);
const loading = ref(false);

const searchCustomerDetails = ()=>{
    loading.value = true;
}

const handleEdit = () => {


}
const createCustomer = () => {

}

</script>

<template>
  <div class="h-full relative">
    <a-drawer :width="modalWidth" :mask-closable="false" :title="$t('customer.searchCustomer')" v-model:visible="modalsState.showCustomerSearchModal"
              :footer="false">
      <div class="w-2/3 m-auto mt-5 flex items-center">
        <a-auto-complete :model-value="searchText"
                         :data="customerList"
                         @search="handleSearch"
                         :allow-clear="true"
                         :strict="true"
                         placeholder=""
                         class="bg-white border-blue-600 rounded-tl-3xl rounded-bl-3xl pt-1 pb-1">
          <template #option="{ data }">
            <div class="flex text-xs pt-3 pb-3">
              <div class="text-gray-500 flex items-center mr-2">
                <dynamic-icon :type="'user'"/>
                <highlight-words :search-words="[searchText]" :text-to-highlight="data.raw.label"/>
              </div>
              <div class="mr-2 flex items-center">
                <dynamic-icon :type="'phone'"/>
                {{ data.raw.phoneNumber }}
              </div>
              <div class="flex items-center">
                <dynamic-icon :type="'email'"/>
                {{ data.raw.email }}
              </div>
            </div>
          </template>
        </a-auto-complete>
        <a-button type="primary" @click="searchCustomerDetails" class="h-10 rounded-tr-3xl rounded-br-3xl">
          <icon-search/>
        </a-button>
      </div>
      <div class="relative mt-5">
        <span class="flex items-center absolute right-5 text-blue-600 pl-3 cursor-pointer" @click="modalsState.showCustomerCreate=true">
          <icon-plus/> {{ t('customer.createCustomer') }}
        </span>
        <div class="m-5" >
          <a-descriptions size="mini" v-for="row in userInfoForm" style="margin-bottom: 25px;"  :title="t(row.itemName)" :column="{ xs: 2, sm: 4, md: 4, lg: 4 }" layout="inline-vertical" bordered>
            <a-descriptions-item v-for="item of row.list" :label="t(item.label)" :span="item.span">
              <span>
                 <a-typography-text v-if="item.value!=='--' && item.is_edit">
                     {{ item.value }}
                     <icon-edit @click="handleEdit" class="cursor-pointer"/>
                  </a-typography-text>
                <span v-else>{{ item.value }}</span>
              </span>
            </a-descriptions-item>
          </a-descriptions>
        </div>
          <a-spin  dot class="absolute top-56 left-0 right-0 m-auto" style="width: 100px;" v-if="loading" />
      </div>
    </a-drawer>
  </div>
</template>

<style scoped lang="less">

</style>
