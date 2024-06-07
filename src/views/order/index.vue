<template>
  <div class="content pl-5">
    <div class="goodsCard row-between">
      <div class="conter bg-white">
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
                    <div class="flex row-right">
                  <span
                      type="text"
                      class="tidan"
                      @click.stop="billHang(item, index)"
                  >提单</span
                  >
                      <span
                          type="text"
                          class="shanchu"
                          @click.stop="hangDel(item, index)"
                      >删除</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-10 pt-7 pl-5 pr-5 shaw-1">
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
        <div class="bg-white pending-user p-5 relative" style="height: 87.7vh; overflow: hidden">
          <div class="">
            <a-tabs type="rounded" default-active-key="1" size="large" lazy-load>
              <a-tab-pane key="1">
                <template #title>
                  <h2 style="font-size: 16px; padding: 5px 10px;">商品信息</h2>
                </template>
                <div>
                  <deposit-goods-info/>
                  <deposit-goods-list/>
                </div>
              </a-tab-pane>
              <a-tab-pane key="2">
                <template #title>
                  <h2 style="font-size: 16px;padding: 5px 10px;">订单详情</h2>
                </template>
                <div>
                  <deposit-order-detail/>
                </div>
              </a-tab-pane>
              <a-tab-pane key="3">
                <template #title>
                  <h2 style="font-size: 16px; padding: 5px 10px;">订单记录</h2>
                </template>
                <div>
                  <order-track-list/>
                </div>
              </a-tab-pane>
            </a-tabs>
            <depost-right-footer/>
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
import CounterTools from "@/views/order/components/counter-tools.vue";
import DepositGoodsInfo from "@/views/order/components/deposit-goods-info.vue";
import DepositGoodsList from "@/views/order/components/deposit-goods-list.vue";
import DepostRightFooter from "@/views/order/components/depost-right-footer.vue";
import DepositOrderDetail from "@/views/order/components/deposit-order-detail.vue";
import OrderTrackList from "@/views/order/components/order-track-list.vue";

const formItem = reactive({
  price: 0,
});
const discountPrice = ref(100);
const loading = ref(false);
const totalHang = ref(0);
const tableHang = ref([]);
const activeHangon = ref(-1);
const hangData = ref([]);
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
const checkOut = ref(0);
const modalUser = ref(false);
const cashBntLoading = ref(false);
const flag = ref(true);
const goodFrom = reactive({
  store_name: "",
  field_key: "",
  cate_id: "",
  page: 1,
  limit: 30,
  uid: 0,
  staff_id: 0,
});
const total = ref(0);
const goodData = ref([]);
const cateData = ref([]);
const currentCate = ref(0); //分类的当前index；
const currentTab = ref("2");
const codeNum = ref("");
const payNum = ref("");
const userInfo = ref({});
const storeInfos = ref({}); //门店店员信息
const storeList = ref([]); //门店列表
const attr = reactive({
  productAttr: [],
  productSelect: {},
});
const storeInfo = ref({}); //商品信息
const productValue = ref([]);
const attrValue = ref(""); //已选属性
const productId = ref(0); //产品id
const cartList = ref([]);
const isCart = ref(0);
const cartInfo = reactive({
  //更改属性所需参数
  cart_id: 0,
  product_id: 0,
  unique: "",
});
const modal = ref(false);
const fapi = ref({});
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
const modal2 = ref(false);
const integral = ref(false); //是否使用积分
const coupon = ref(false); //是否使用优惠券
const couponId = ref(0); //优惠券id
const modalPay = ref(false);
const cartSum = ref(0);
const priceInfo = ref({});
const createOrder = reactive({
  remarks: "",
  change_price: 0,
  cart_id: [], // 购物车id
  userCode: "",
  is_price: 0,
  auth_code: "",
  new: 0,
});
const modalCash = ref(false);
const numList = ref(["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."]);
const collectionArray = ref([]);
const collection = ref(0);
const isOrderCreate = ref(0);
const discount = ref(false);
const payTape = ref(""); // 支付方式
const orderId = ref(""); //订单id
const clientHeight = ref(0);
const cartHeight = ref(0);
const goodsHeight = ref(0);
const invalidList = ref([]);
const defaultcalc = ref(false);
const orderSystem = reactive({
  loadingMsg: null,
  timer: null,
});
const disabled = ref(false); //阻止属性弹窗多次提交
const unchangedPrice = ref(0);
const selIndex = ref(0);
const userData = ref({});
const defaultAvatar = ref('../assets/images/tourist.png');

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

.inputNum {
  width: 210px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.15);

  &.discount {
    width: 130px;
    margin-left: 8px;


  }

}

.changePrice {
  font-size: 12px;
  color: #E93323;

  .price {
    font-size: 17px;
    margin-left: 5px;
  }
}

.buttonPrice {
  width: 460px;
  height: 36px;
  margin-top: 50px;
}

.header .ivu-btn {
  width: 56px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid #FFFFFF;
  background-color: unset !important;
  color: #fff;

  &:hover {
    border-color: #ccc;
    color: #ccc;
  }
}

.headerCard {
  background: #1890FF;
  border-radius: 0 !important;
}

.noCart {
  height: 100%;
  display: flex;

  .tip {
    text-align: center;
    color: #ccc;
  }

  .pictrue {
    width: 308px;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.goodsCard {
  flex: 1;
  max-width: 100%;
  min-width: 1100px;
  height: calc(100vh - 140px);
  display: flex;
  flex-wrap: nowrap;
}


.discount-con {
  background-color: #F5F5F5;
  padding: 0px 25px;
  margin-top: 13px;
  border-radius: 10px;

  .item {
    font-size: 14px;
    font-weight: 400;
    margin: 10px 0;
  }
}

.content {
  height: calc(100vh - 66px);
  overflow: hidden;
}

.cashPage {
  text-align: center;

  .left {
    width: 282px;
    padding: 16px 0 16px 16px;

    .pictrue {
      width: 110px;
      height: 110px;
      margin: 180px auto 0 auto;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .text {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      margin-top: 14px;
    }

    .money {
      color: rgba(0, 0, 0, 0.85);
      font-size: 18px;

      .num {
        font-size: 32px;
        margin-left: 5px;
      }
    }
  }
}

.payPage {
  text-align: center;
  padding: 16px;


  .header {
    margin: 35px 0 3px 0;
  }

  .process {
    width: 394px;
    height: 158px;
    border: 1px dashed #D8D8D8;
    border-top: 1px dashed #fff;
    margin: -1px auto 0 auto;

    &.on {
      border-top: 1px dashed #D8D8D8;
      margin-top: 20px;

      .list {
        padding-left: 14px !important;
      }
    }

    .list {
      padding: 6px 10px 0 3px;

      .item {
        font-size: 12px;
        color: #666;

        .name {
          color: #333;
          font-size: 13px;
          font-weight: bold;
        }
      }
    }

    .pictrue {
      width: 362px;
      height: 68px;
      margin: 24px auto 0 auto;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .pictrue {
    width: 18px;
    height: 18px;

    img {
      width: 100%;
      height: 100%;
    }

    margin-right: 7px;
  }

  .text {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }

  .money {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.85);

    .num {
      font-size: 32px;
      margin-left: 5px;
    }
  }

  .tip {
    width: 310px;
    height: 26px;
    background: rgba(255, 126, 0, 0.1);
    border-radius: 13px;
    font-size: 13px;
    color: #FF7E00;
    margin: 10px auto 0 auto;

    .icon {
      font-size: 16px;
      margin-right: 5px;
    }
  }

  .bnt {
    width: 394px;
    height: 38px;
    margin: 28px 0 15px 0;
  }
}

.goods {
  flex: 1;
  margin: 30px 30px 10px 30px;
  // height: calc(100vh - 188px);
  display: flex;
  overflow-y: scroll;
  flex-direction: column;

  .sel-user {
    display: flex;
    align-items: center;
    background-color: #FFF8F2;
    padding: 18px;

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

    .item-right {
      flex: 1;

      .user {
        font-size: 18px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.85);
      }

      .time {
      }

      .money {
        display: flex;
        align-items: flex-end;
        font-weight: 400;
        color: rgba(51, 51, 51, 0.85);
        font-size: 12px;

        .num {
          font-weight: 600;
          color: #F5222D;
          font-size: 17px;
          padding-right: 20px;
        }

        .pr20 {
          padding-right: 20px;
        }
      }
    }
  }


  .goods-list {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
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

        .tidan {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #1890FF;
          display: block;
          margin-right: 14px;
          position: relative;

          &::after {
            content: "";
            width: 1px;
            height: 12px;
            position: absolute;
            top: 5px;
            right: -14px;
            background: #DDDDDD;
          }
        }

        .shanchu {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #F5222D;
          display: block;
          margin-left: 14px;
        }
      }

      .item-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 46px;

        .money {
          display: flex;
          justify-content: space-between;
          color: #000;
          font-size: 14px;
          line-height: 14px;

          .num {
            color: #F5222D;
          }
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

.header {
  color: #fff;

  .title {
    font-size: 18px;
    font-weight: 500;
  }

  .right {
    .pictrue {
      width: 32px;
      height: 32px;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .storeBnt {
      width: 80px;
      height: 32px;
      background: #FFFFFF;
      border-radius: 1px;
      color: #1890FF;
      font-size: 14px;
      text-align: center;
      line-height: 32px;
      margin-left: 10px;
      cursor: pointer;

      &:hover {
        background-color: rgba(255, 255, 255, 0.9);
      }
    }

    .info {
      font-size: 14px;
      font-weight: 400;
      color: #fff;

      span {
        padding: 0 8px;

        & ~ span {
          border-left: 1px solid #DDDDDD;
        }
      }
    }

    .bnt {
      margin-left: 20px;
    }
  }
}

footer {
  display: flex;

  .footer {
    width: 500px;
    padding: 10px 17px 15px 17px;

    .conInfo {
      font-size: 14px;
      color: #000;

      .detailed {
        color: #999999;
        font-size: 14px;
        cursor: pointer;
      }
    }

    .pay {
      .bnt {
        border-radius: 6px;
        padding: 0 15px;
        width: 30%;
        height: 0.32rem;
        line-height: 0.32rem;
        border: 1px solid #1890FF;
        color: #1890FF;
        font-size: 0.11rem;
        text-align: center;
        font-weight: 500;
        cursor: pointer;

        &.on {
          background: #1890FF;
          color: #fff;
        }

        &.bntUid {
          background: #1890FF;
          color: #fff;
          cursor: unset;

          &.on {
            background: #ccc;
            border: 1px solid #ccc;
            color: #fff;
          }
        }
      }

      &.noCart {
        .bnt {
          border: 1px solid #ccc;
          color: #ccc;
          cursor: unset;

          &.on {
            background: #ccc;
            color: #fff;
          }
        }
      }
    }
  }

  .right {
    padding: 10px 17px 15px 17px;
    border-radius: 0 6px 6px 0;
    display: flex;
    flex: 1;
    box-shadow: 5px 0px 14px 0px rgba(0, 0, 0, 0.06);
    background-color: #fff;

    .rightCon {
      display: flex;
      align-items: center;

      .top {
        height: 80px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 13px;
        padding: 0 20px;

        .num {
          font-size: 42px;
          color: rgba(0, 0, 0, 0.85);
        }
      }

      .center {
        width: 100%;
        height: 46px;
        background-color: #1890FF;
        font-size: 13px;
        color: #fff;
        padding: 0 20px;

        .num {
          font-size: 27px;
        }
      }

      .item {
        width: 80px;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #F2F3F5;
        font-size: 17px;
        border-radius: 4px;
        margin-right: 10px;
        cursor: pointer;
        color: #000000;

        &.on {
          background: #E7F3FF;
          color: #1890FF;
          font-size: 17px;
          font-weight: 400;
        }

        &.spot {
          padding-bottom: 15px;
        }
      }

      .bottom {
        padding: 10px 0 0 8px;
      }
    }

    .noCart {
      display: flex;
      align-items: center;

      .item {
        background: #ccc;
        color: #fff;
        cursor: unset;
        width: 80px;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 14px;
        border-radius: 4px;
        font-size: 16px;

        &:nth-child(3) {
          &:hover {
            background-color: #ccc;
          }
        }

        &:nth-child(4) {
          &:hover {
            background-color: #ccc;
          }
        }

        &:nth-child(5) {
          &:hover {
            background-color: #ccc;
          }
        }

        &.on {
          background-color: #ccc;
        }
      }
    }
  }
}

.cashPage {
  text-align: center;

  .right {
    width: 488px;
    background: #F5F5F5;
    padding: 16px 16px 16px 0;
    border-radius: 0 6px 6px 0;

    .rightCon {
      width: 388px;
      height: 506px;
      margin: 35px auto 20px auto;
      background-color: #fff;
      border-radius: 14px;

      .top {
        height: 80px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 13px;
        padding: 0 20px;

        .num {
          font-size: 42px;
          color: rgba(0, 0, 0, 0.85);
        }
      }

      .center {
        width: 100%;
        height: 46px;
        background-color: #1890FF;
        font-size: 13px;
        color: #fff;
        padding: 0 20px;

        .num {
          font-size: 27px;
        }
      }

      .bottom {
        padding: 10px 0 0 8px;

        .item {
          width: 108px;
          height: 62px;
          background: #FAFAFA;
          border-radius: 9px;
          border: 1px solid rgba(0, 0, 0, 0.15);
          color: #1890FF;
          font-size: 32px;
          margin-left: 12px;
          margin-top: 12px;
          cursor: pointer;

          &.on {
            background: #1890FF;
            color: #FFFFFF;
            font-size: 20px;
          }

          &.spot {
            padding-bottom: 15px;
          }
        }
      }
    }
  }

  .left {
    width: 282px;
    padding: 16px 0 16px 16px;

    .pictrue {
      width: 110px;
      height: 110px;
      margin: 180px auto 0 auto;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .text {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      margin-top: 14px;
    }

    .money {
      color: rgba(0, 0, 0, 0.85);
      font-size: 18px;

      .num {
        font-size: 32px;
        margin-left: 5px;
      }
    }
  }
}

.no-order {
  img {
    margin: 0 160px;
  }
}
</style>
