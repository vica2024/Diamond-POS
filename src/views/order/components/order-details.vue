<script setup>
import {defineProps, computed} from 'vue';

const props = defineProps({});
const deliveryInfo = [{
  label: '收货人:',
  value: '',
}, {
  label: '收货电话:',
  value: '',
}, {
  label: '收货电话:',
  value: ''
}];
const userInfo = [{
  label: '用户昵称:',
  value: '',
}, {
  label: '绑定电话:',
  value: '',
}];
const orderInfo = [{
  label: '创建时间:',
  value: '',
}, {
  label: '商品总数:',
  value: '',
}, {
  label: '商品总价:',
  value: ''
},{
  label: '优惠券金额:',
  value: '',
}, {
  label: '积分抵扣:',
  value: '',
}, {
  label: '会员商品优惠:',
  value: ''
}, {
  label: '推广人:',
  value: '',
}, {
  label: '支付时间:',
  value: ''
}, {
  label: '支付方式:',
  value: ''
}];
</script>

<template>
  <div>
    <a-descriptions title="收货信息" style="margin-top: 20px" :data="deliveryInfo" />
    <a-descriptions title="用户信息" style="margin-top: 30px" :data="userInfo" />
    <a-descriptions title="订单信息" style="margin-top: 30px" :data="orderInfo" />
  </div>
</template>

<style scoped lang="less">

</style>
