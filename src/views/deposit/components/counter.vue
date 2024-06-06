<script setup>
import CustomerCard from "@/views/cashier/components/customer-card.vue";
import CounterFooter from "@/views/cashier/components/counter-footer.vue";
import CounterTools from "@/views/cashier/components/counter-tools.vue";
import CartList from "@/views/cashier/components/cart-list.vue";


</script>

<template>
   <div class="counter bg-white">
     <a-row  class="counter-separate bg-white">
       <a-col :span="19" class="border-r-1">
           <customer-card></customer-card>
           <cart-list></cart-list>
           <counter-footer></counter-footer>
       </a-col>
       <a-col :span="5">
         <counter-tools></counter-tools>
       </a-col>
     </a-row>
   </div>
</template>

<style scoped lang="less">
.counter{
   width: 45%;
   min-width: 500px;
  max-width: 560px;
   height: 100%;
   padding:0 0 7px 0;
   border-radius:20px;
   overflow: hidden;
}
</style>
