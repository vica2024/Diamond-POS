<template>
  <a-modal v-model:visible="modalsState.showCustomerModal" title="用户列表" :width="720" :footer="false">
    <div class="w-full">

    </div>
  </a-modal>
</template>

<script setup>
import {defineProps, inject, provide, ref, watch} from 'vue';
const modalsState = inject('modalsState');

</script>

<style scoped lang="less">


</style>
