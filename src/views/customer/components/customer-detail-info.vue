<script setup>
import {defineProps, computed} from 'vue';

const props = defineProps({});
const data = [{
  itemName: '用户信息',
  list: [{
    label: '顾客姓名',
    value: '卓尉家先生',
    span: 4,
  }, {
    label: '姓氏',
    value: '卓',
    span: 4,
  }, {
    label: '名字',
    value: '尉家',
    span: 4,
  }, {
    label: '电子邮件',
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
}, {
  itemName: '用户概况',
  list: [{
    label: '总消费金额',
    value: '$9999,888',
  }, {
    label: '总消费次数',
    value: '666',
  }, {
    label: '最后消费金额',
    value: '$888,43.56',
    span: 3,
  }, {
    label: '首次消费时间',
    value: '2024-06-01 10:45:31',
    span: 3,
  }, {
    label: '最后消费时间',
    value: '2024-06-01 10:45:31',
    span: 3,
  }, {
    label: '首次消费店铺',
    value: '天河正假广场店',
    span: 2,
  }, {
    label: '最后消费店铺',
    value: '天河正假广场店',
  }]
}, {
  itemName: '服务备注',
  list: [{
    label: '天环广场店-销售员【Alex】',
    value: '这是卓先生第一次来LV消费，一共购买了两个包，一条女士腰带',
    span: 4,
  }, {
    label: '天环广场店-销售员【Sophia】',
    value: '这是卓先生第一次来LV消费，一共购买了两个包，一条女士腰带',
    span: 4,
  }]
}];
const handleEdit = () => {

}
</script>

<template>
  <div class="m-5" v-for="lump of data">
    <a-descriptions :title="lump.itemName" :column="{xs:1, md:3, lg:4}" layout="inline-vertical" bordered>
      <a-descriptions-item v-for="item of lump.list" :label="item.label" :span="item.span ?? 1">
        <a-typography-text v-if="item.is_edit"> {{ item.value }}
          <icon-edit @click="handleEdit" class="cursor-pointer"/>
        </a-typography-text>
        <span v-else>{{ item.value }}</span>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<style scoped lang="less">

</style>
