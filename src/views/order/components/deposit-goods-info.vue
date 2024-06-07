<script setup>
import {defineProps, computed} from 'vue';

const props = defineProps({
  cartSum: {
    type: Number,
    default: 0
  },
  payPrice: {
    type: Number,
    default: 0
  }
});

</script>

<template>
  <div>
    <div class="sel-user-group">
      <div class="sel-user p-3">
        <div class="avatar">
          <img src="https://multi-store.crmeb.net/uploads/attach/2023/04/20230426/ed8f8cf4cfbd6b46c821b082ce2e4e76.png"
               alt="头像"></div>
        <div class="item-right pl-3">
          <div class="user">
            <div class="text-base font-bold">186****1234</div>
          </div>
          <div class="money pt-2">
            <div><span class="mr-2">186****1234</span>余额
              <span class="num text-base mr-2">10.00
                <a-button type="text" size="mini" class="btn ml-2">充值</a-button>
              </span></div>
            <div>
              积分 <span class="num text-base">0</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-num">
      <div class="cart-num-left">
        <span>共</span>
        <span class="num">{{ cartSum }}</span>
        <span>件商品</span>
      </div>
      <div>
        <span class="text">实付：</span>
        <span class="money"
        ><span class="rmb">¥</span
        >{{ payPrice ? payPrice : 0 }}</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">

.sel-user-group {
  display: flex;
  flex-wrap: wrap;

  .sel-user {
    position: relative;
    width: calc(50% - 1px);
    display: flex;
    align-items: center;
    background-color: rgba(255, 119, 0, 0.05);
    border-radius: 1px;

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

.cart-num {
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  align-items: flex-end;
  margin: 20px 0;

  .text {
    font-size: 15px;
  }

  .cart-num-left {
    color: #303133;
    font-size: 16px;

    .num {
      color: #FF7700;
    }
  }

  .money {
    color: #F5222D;
    font-size: 24px;
    font-weight: bold;
    line-height: 24px;

    .rmb {
      font-size: 18px;
    }
  }
}
</style>
