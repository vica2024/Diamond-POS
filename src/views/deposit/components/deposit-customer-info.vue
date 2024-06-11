<script setup>
import {defineProps, computed} from 'vue';

const props = defineProps({
  customerInfo: {
    type: Object,
    default: {}
  }
});

</script>

<template>
  <div class="w-full">
    <div class="sel-user-group">
      <div class="sel-user p-5">
        <div class="avatar">
          <a-avatar :size="48">
            <img alt="avatar" :src="customerInfo.avatar"/>
          </a-avatar>
        </div>
        <div class="item-right pl-3">
          <div class="user">
            <div class="text-base font-bold">{{ customerInfo.nickname }}</div>
          </div>
          <div class="money pt-2">
            <div>
              <span class="mr-2">{{ customerInfo.phone }}</span>
              余额
              <span class="num text-base mr-2">{{ customerInfo.now_money }}</span>
            </div>
            <div>积分 <span class="num text-base">{{ customerInfo.integral }}</span></div>
          </div>
        </div>
      </div>
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
