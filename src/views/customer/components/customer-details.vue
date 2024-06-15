<script setup>
import {defineProps, computed} from 'vue';
import CustomerDetailInfo from "@/views/customer/components/customer-detail-info.vue";

const props = defineProps({});
const tabs_title = [{
  label: '顾客信息'
}, {
  label: '消费记录',
}, {
  label: '积分明细',
}, {
  label: '持有优惠券',
}, {
  label: '余额变动',
}, {
  label: '顾客足迹',
}, {
  label: '导购员变更',
}];
</script>

<template>
  <div class="w-full">
    <div class="sel-user-group mt-5 mb-10">
      <div class="sel-user p-5">
        <div class="avatar">
          <img src="https://multi-store.crmeb.net/uploads/attach/2023/04/20230426/ed8f8cf4cfbd6b46c821b082ce2e4e76.png"
               alt="头像"></div>
        <div class="item-right pl-3">
          <div class="user">
            <div class="text-base font-bold">卓先生</div>
          </div>
          <div class="money pt-2">
            <div>
              <span class="mr-2">131****0604</span>余额
              <span class="num text-base mr-2">10.00</span>
            </div>
            <div>积分 <span class="num text-base">0</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <a-tabs type="rounded" :justify="true" :destroy-on-hide="true" :default-active-key="0" lazy-load>
        <a-tab-pane v-for="(tabs,index) in tabs_title" :key="index" :title="tabs.label">
          <div class="view-height overflow-hidden overflow-y-auto">
            <customer-detail-info v-if="index === 0"/>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<style scoped lang="less">
.view-height {
  height: 61vh;
}
/* 针对屏幕（平板） */
@media (min-width: 1024px) and (max-width: 1180px) {
  .view-height {
    height: 53vh;
  }
}

.sel-user-group {
  display: flex;
  flex-wrap: wrap;

  .sel-user {
    position: relative;
    display: flex;
    align-items: center;
    background: rgba(24, 144, 255, .05);
    border-radius: 14px;

    &:only-child {
      width: 100%;
    }

    .iconfont {
      position: absolute;
      top: 1px;
      right: 1px;
      font-size: 2px;
      color: #f70;
    }

    .avatar {
      width: 55px;
      height: 55px;
      margin-right: 1px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .item-right {
      flex: 1;

      .user {
        color: rgba(0, 0, 0, 0.85);
      }

      .money {
        display: flex;
        align-items: flex-end;
        color: rgba(51, 51, 51, 0.85);

        .num {
          font-weight: 600;
          color: #f5222d;

          .btn {
            border: 1px solid #1890ff;
            border-radius: 1px;
            text-align: center;
            font-weight: 400;
            line-height: 1px;
            color: #1890ff;
          }
        }

      }
    }
  }
}
</style>
