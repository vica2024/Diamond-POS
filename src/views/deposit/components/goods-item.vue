<script setup>

</script>

<template>
  <a-row :gutter="8">
    <a-col :xs="{ span: 24, offset: 0 }" :md="{ span: 12, offset: 0 }" :lg="{ span: 8, offset: 0 }">
      <a-card :bordered="false">
        <template #cover>
          <div :style="{height: '204px',overflow: 'hidden'}">
            <img
                :style="{ width: '100%', transform: 'translateY(-20px)' }"
                alt="dessert"
                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
            />
          </div>
        </template>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped lang="less">

</style>
