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
  staffList: {
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
  }
});

const showDetail = ref(false);

const searchText = ref('');
const options = ref([]);
const isCreate = ref(false);
const highlightedOptions = ref([]);
const userInfoForm = ref({
  itemName: '用户信息',
  list: [{
    label: '姓名',
    value: '卓尉家先生',
    span: 4,
  }, {
    label: '姓氏',
    value: '卓',
    span: 1,
  }, {
    label: '名字',
    value: '尉家',
    span: 1,
  }, {
    label: 'E-mail',
    value: 'zhu****ca@gmail.com',
    is_edit: true,
    span: 3,
  }, {
    label: '手机号码',
    value: '1316****604',
    is_edit: true,
    span: 3,
  }, {
    label: '生日',
    value: '09-20',
    span: 3,
  }, {
    label: '性别',
    value: '男',
    span: 3,
  }, {
    label: '颜色偏好',
    value: '红色',
    span: 3,
  }, {
    label: '国家',
    value: 'China',
    span: 3,
  }, {
    label: '城市',
    value: '广州',
    span: 3,
  }, {
    label: '区/县',
    value: '番禺',
    span: 3,
  }, {
    label: '邮政编码',
    value: '510000',
    span: 3,
  }, {
    label: '邮寄地址',
    value: '广州番禺锦绣香江2座1002',
    span: 3,
  }]
});

watch(options, (newOptions) => {
  highlightedOptions.value = newOptions.map((option) => ({
    value: option.fullName,
    label: option.fullName,
    fullName: option.fullName,
    matchKey: 'fullName',
    phoneNumber: option.phone,
    email: option.email,
  }));
});


const handleSearch = async (value) => {
  searchText.value = value;
  try {
    if (value === '') {
      options.value = [];
    }
    if (value.length < 2) {
      return false
    }
    options.value = await getCustomerList({keywords: value});
  } catch (error) {
    console.error("Failed to fetch customer list:", error);
  }
};


const handleEdit = () => {


}
const createCustomer = () => {
  isCreate.value = !isCreate.value
  for (const k2 in userInfoForm.value.list) {
    userInfoForm.value.list[k2].isCreate = isCreate.value;
  }

}

</script>

<template>
  <div class="h-full">
    <a-drawer :width="modalWidth" :title="$t('searchCustomer')" v-model:visible="modalsState.showCustomerModal"
              :footer="false">
      <div class="w-2/3 m-auto mt-5 flex items-center">
        <a-auto-complete v-model="searchText"
                         :data="highlightedOptions"
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
        <a-button type="primary" class="h-10 rounded-tr-3xl rounded-br-3xl">
          <icon-search/>
        </a-button>
      </div>
      <div class="relative mt-5">
        <!--        <span class="flex items-center absolute right-5 text-blue-600 pl-3 cursor-pointer" @click="createCustomer">-->
        <!--          <icon-plus/> {{ t('createCustomer') }}-->
        <!--        </span>-->
        <div class="m-5" v-if="showDetail">
          <a-descriptions :title="userInfoForm.itemName" :column="{xs:1, md:3, lg:4}" layout="inline-horizontal"
                          bordered>
            <a-descriptions-item v-for="item of userInfoForm.list" :label="item.label" :span="item.span ?? 1">
              <span v-if="item.isCreate">
                <a-input :placeholder="t('placeholderPrefix') + item.label"></a-input>
              </span>
              <span v-else>
                 <a-typography-text v-if="item.isEdit">
                     {{ item.value }}
                     <icon-edit @click="handleEdit" class="cursor-pointer"/>
                  </a-typography-text>
                <span v-else>{{ item.value }}</span>
              </span>
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<style scoped lang="less">

</style>
