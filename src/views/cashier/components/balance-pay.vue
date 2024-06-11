<template>
  <div class="p-5 w-full">
    <div class="text-center">
      <div class="text-base">应收金额(元)</div>
      <div class="w-3/4 m-auto p-3 rounded-lg">
        ¥ <span class="text-3xl font-bold">{{ payPrice ? payPrice : 0 }}</span>
      </div>
    </div>
    <div class="p-5 rounded-2xl mt-2" style="background-color: #f3f9ff;">
      <div class="ml-5 mt-3 rounded-lg pl-5 pt-3 pb-3 text-2xl" style="background-color: #FFFFFF; width: 93.6%;">
        {{ state.collectionString }}
      </div>
      <div class="text-left pl-5 mt-5">需要找零： <span class="text-blue-500 text-base">¥ {{ formattedReturnAmount }}</span></div>
      <div class="p-5 flex">
        <div class="grid w-3/4 gap-4 grid-cols-3">
          <a-button v-for="(item, index) in numList" size="large" :key="index"
                    class="pt-4 pb-4 pl-5 pr-5 font-bold text-2xl bg-white" @click="numTap(item)">
            <span class="text-blue-700">{{ item }}</span>
          </a-button>
        </div>
        <div class="w-1/4 pl-4">
          <a-button long size="large" class="mb-4 p-4 bg-white" @click="delNum">
            <icon-arrow-left class="text-blue-700" size="25"/>
          </a-button>
          <a-button long size="large" class="mb-4 p-4 text-2xl font-bold bg-white" @click="clearNumber">
            <span class="text-blue-700">C</span>
          </a-button>
          <a-button long type="primary" size="large" class="confirm-but text-2xl font-bold bg-white" @click="cashBnt">
            <span class="text-cyan-50">确认</span>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, computed, reactive, watchEffect } from 'vue';

const props = defineProps({
  payPrice: {
    type: Number,
    default: 0.1
  }
});

// 使用 reactive 来管理响应式状态
const state = reactive({
  collectionArray: [],  // 存储输入的数字
  collectionString: "",  // 用于输入框显示的字符串
  returnAmount: 0,  // 计算的找零金额
  collection: 0  // 当前的输入
});

const numList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "00", "."];

// 处理数字按钮点击事件
const numTap = (item) => {
  let x = String(state.collection).indexOf(".") + 1;
  let y = String(state.collection).length - x;
  if (x === 0 || y < 2) {
    if (state.collectionArray.join("") <= 9999999) {
      state.collectionArray.push(item);
    }
    state.collection = state.collectionArray.join("") > 99999999 ? 99999999 : state.collectionArray.join("");
  }
};

// 清除所有输入的数字
const clearNumber = () => {
  state.collectionArray = [];
  state.collection = 0;
};

// 删除最后一个输入的数字
const delNum = () => {
  state.collectionArray.pop();
  state.collection = state.collectionArray.length ? state.collectionArray.join("") : 0;
};

// 确认按钮事件（可根据需要实现具体逻辑）
const cashBnt = () => {
  // 在这里添加确认按钮的逻辑
};

// 同步 collectionString 和 collectionArray
watchEffect(() => {
  state.collectionString = state.collectionArray.length === 0 ? 0 : state.collectionArray.join("");
});

watchEffect(() => {
  state.returnAmount = state.collectionArray.length === 0 ? 0 : Number(state.collectionString) - props.payPrice;
});

// 千位数格式化函数
const numberFormatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

const formattedReturnAmount = computed(() => {
  return numberFormatter.format(state.returnAmount);
});
</script>

<style scoped>
.confirm-but {
  height: 135px;
}

.arco-btn-secondary {
  background-color: #FFFFFF !important;
}
</style>
