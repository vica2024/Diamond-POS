<template>
  <div class="content pl-5">
    <div class="goodsCard row-between">
      <div class="conter bg-white rounded-3xl">
        <div class="cart pt-5 pl-5 pr-5">
          <a-input-search v-model="lodgeFrom.keyword" placeholder="搜索用户/店员手机号或ID" size="large" search-button/>
        </div>
        <div class="flex">
          <div class="flex-1 border-r-1" style="height: 82vh;" v-if="tableHang.length">
            <div class="pending-user">
              <div
                  class="list"
                  :class="selIndex === index ? 'bor' : ''"
                  v-for="(item, index) in tableHang"
                  :key="index"
                  @click="selectUser(index, item)"
              >
                <div class="item row-between">
                  <div class="left_content flex">
                    <div class="avatar">
                      <img
                          :src="item.avatar ? item.avatar : 'https://multi-store.crmeb.net/view_cashier/img/yonghu.908b01d3.png'"
                          alt="头像"/>
                    </div>
                    <div class="user">
                      <div class="name">{{ item.nickname || "游客" }}</div>
                      <div class="order-price">
                        订单金额：
                        <span class="price-num">￥{{ item.price }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="right_content">
                    <div class="time">{{ item._add_time }}</div>
                    <div class="flex w-1/2 justify-between" style="float: right;">
                      <span class="text-sm text-blue-600" @click.stop="billHang(item, index)">提单</span>
                      <span class="text-sm text-rose-600" @click.stop="hangDel(item, index)">删除</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-7 pl-5 pr-5 shaw-1">
              <a-button shape="round" type="primary" long>结账 1000</a-button>
            </div>
          </div>
          <div v-else class="no-order">
            <img src="../../assets/images/no-order.png" alt=""/>
            <span class="trip">噢～目前暂无挂单</span>
          </div>
          <div class="pt-5 pl-3 pr-5 w-1/5">
            <counter-tools></counter-tools>
          </div>
        </div>
      </div>
      <div class="flex-1 pl-5 pr-5">
        <div class="bg-white rounded-3xl pending-user p-5 relative" style="height: 87.7vh; overflow: hidden">
          <div class="">
            <deposit-goods-info/>
            <deposit-goods-list/>
          </div>

          <div v-if="cartList.length" class="no-order">
            <span class="trip">噢～目前暂无挂单记录</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue';
import {getHangList, getDataInfo} from '@/api/order.js'
import CounterTools from "@/views/deposit/components/counter-tools.vue";
import DepositGoodsInfo from "@/views/deposit/components/deposit-goods-info.vue";
import DepositGoodsList from "@/views/deposit/components/deposit-goods-list.vue";


const loading = ref(false);
const tableHang = ref([]);
const activeHangon = ref(-1);
const lodgeFrom = reactive({
  keyword: "",
  page: 1,
  limit: 10,
});
const currentid = ref("");
const columns = ref([
  {
    title: "选择",
    key: "chose",
    width: 60,
    align: "center",
    render: (h, params) => {
      let id = params.row.id;
      let flag = false;
      if (currentid.value === id) {
        flag = true;
      } else {
        flag = false;
      }
      return h("div", [
        h(Radio, {
          props: {
            value: flag,
          },
          on: {
            "on-change": () => {
              currentid.value = id;
              activeHangon.value = params.index;
              let data = {
                uid: params.row.uid,
              };
              let touristId = params.row.tourist_uid;
              if (params.row.uid) {
                userInfoData(data);
              } else {
                setUp(touristId);
              }
            },
          },
        }),
      ]);
    },
  },
  {
    title: "用户",
    slot: "nickname",
    minWidth: 70,
  },
  {
    title: "订单金额",
    key: "price",
    minWidth: 70,
  },
  {
    title: "时间",
    key: "_add_time",
    minWidth: 70,
  },
  {
    title: "操作",
    slot: "action",
    minWidth: 100,
    align: "center",
  },
]);

const total = ref(0);
const userInfo = ref({});
const attr = reactive({
  productAttr: [],
  productSelect: {},
});
const cartList = ref([]);
const modal = ref(false);
const rule = reactive([
  {
    type: "input",
    field: "remarks",
    title: "备注",
    props: {
      type: "textarea",
      maxlength: 100,
      "show-word-limit": true,
    },
  },
]);

const clientHeight = ref(0);
const disabled = ref(false); //阻止属性弹窗多次提交
const selIndex = ref(0);

const handleChange = (column) => {

};

const userInfoData = (data) => {
  // 定义 userInfoData 方法
};

const setUp = (touristId) => {
  // 定义 setUp 方法
};

const getDepositOrderList = async () => {
  const {data} = await getHangList();
  tableHang.value = data.list
}

const getDepositList = async () => {
  const {data} = await getDataInfo(10);
  userInfo.value = data.userInfo;
  console.log(data)
}
getDepositList();
getDepositOrderList();
</script>

<style scoped lang="less">
.goodsCard {
  flex: 1;
  height: calc(100vh - 140px);
  display: flex;
  flex-wrap: nowrap;
}

.conter {
  width: 550px;
  box-shadow: 5px 0 14px 0 rgba(0, 0, 0, 0.04);

  .cart {
    position: relative;
  }

  .pending-user {
    width: 100%;
    height: calc(100% - 130px);
    margin-top: 20px;
    overflow: hidden;
    overflow-y: scroll;

    .list {
      padding: 20px 16px;
      border-bottom: 1px solid #EEEEEE;
      cursor: pointer;
    }

    .bor {
      background: #F3F9FF;
      border: none;
      border-radius: 6px;
    }

    .item {
      display: flex;
      justify-content: space-between;

      .avatar {
        width: 46px;
        height: 46px;
        margin-right: 16px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .user {
        .name {
          font-weight: bold;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.85);
          margin-bottom: 5px;
        }

        .order-price {
          font-size: 14px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.85);
        }

        .price-num {
          color: #F5222D;
        }
      }

      .right_content {
        .time {
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 0.85);
          margin-bottom: 9px;
        }

      }
    }

    .right-btn {
      display: flex;
      flex-direction: row-reverse;
      max-height: 34px;
      overflow: hidden;
      transition: max-height 0.3s;
      font-size: 14px;
    }

    .element {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s;
    }

    .btn {
      width: 58px;
      height: 34px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      margin-left: 5px;
      cursor: pointer;
    }

    .suc {
      background: #1890FF;
    }

    .del {
      background: #F5222D;
    }
  }
}

</style>
