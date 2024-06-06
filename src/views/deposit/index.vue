<template>
  <div class="content">
    <div class="goodsCard acea-row row-between">
      <div class="conter bg-white">
        <div class="cart">
          <a-input
              search
              enter-button="搜索"
              v-model="lodgeFrom.keyword"
              placeholder="搜索用户/店员手机号或ID"
              @on-search="searchData"
              size="large"
          />
        </div>
     <div class="pending-user" v-if="tableHang.length" @scroll="addPage">-->
          <div
              class="list"
              :class="selIndex === index ? 'bor' : ''"
              v-for="(item, index) in tableHang"
              :key="index"
              @click="selectUser(index, item)"
          >
            <div class="item row-between">
              <div class="left_content acea-row">
                <div class="avatar">
                  <img
                      :src="item.avatar ? item.avatar : defaultAvatar"
                      alt="头像"
                  />
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
                <div class="acea-row row-right">
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
        <div v-else class="no-order">
          <img src="../../assets/images/no-order.png" alt=""/>
          <span class="trip">噢～目前暂无挂单</span>
        </div>
      </div>
      <div class="goods" v-if="cartList.length">
        <div class="sel-user">
          <div class="avatar">
          ff
          </div>
          <div class="item-right">
            <div class="user">
              <div>{{ userData.nickname || "游客" }}</div>
            </div>
            <div class="money" v-if="userData.uid">
              <div>
                <span class="pr20">{{ userInfo.phone || "暂无手机号" }}</span
                >余额 <span class="num">{{ userInfo.now_money || 0 }}</span>
              </div>
              <div>
                积分 <span class="num">{{ userInfo.integral || 0 }}</span>
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
            >{{ priceInfo.payPrice ? priceInfo.payPrice : 0 }}</span
            >
          </div>
        </div>
        <div class="goods-list">
          <goodsList :cartList="cartList"></goodsList>
          <div class="discount-con">
            <div class="item acea-row">
              <div>会员优惠金额：</div>
              <div>{{ priceInfo.vipPrice || 0 }}</div>
            </div>
            <div class="item acea-row">
              <div>优惠券金额：</div>
              <div>{{ priceInfo.couponPrice || 0 }}</div>
            </div>
            <div class="item acea-row">
              <div>积分抵扣：</div>
              <div>{{ priceInfo.deductionPrice || 0 }}</div>
            </div>
            <div
                class="item acea-row"
                v-for="(item, index) in priceInfo.promotionsDetail"
                :key="index"
            >
              <div>{{ item.title }}：</div>
              <div>{{ item.promotions_price || 0 }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-order">
        <span class="trip">噢～目前暂无挂单记录</span>
      </div>
    </div>
    <footer>
      <div class="footer">
        <div class="pay acea-row row-between-wrapper" v-if="cartList.length">
          <div class="bnt" @click="payPrice('cash')">现金收款</div>
          <div class="bnt" @click="payPrice('')">微信/支付宝</div>
          <div class="bnt on" @click="payPrice('yue')" v-if="userInfo.uid && userInfo.now_money >= (priceInfo.payPrice || 0)"
          >
            余额收款
          </div>
          <div class="bnt on bntUid" v-else>余额收款</div>
        </div>
        <div class="pay noCart acea-row row-between-wrapper" v-else>
          <div class="bnt">现金收款</div>
          <div class="bnt">微信/支付宝</div>
          <div class="bnt on">余额收款</div>
        </div>
      </div>
      <div class="right">
        <div v-if="cartList.length" class="rightCon">
          <div class="item" :class="integral ? 'on' : ''" @click="integralTap">
            积分
          </div>
          <div class="item" @click="changePrice">改价</div>
          <div class="item" @click="remarks">备注</div>
        </div>
        <div class="noCart" v-else>
          <div class="item">积分</div>
          <div class="item">改价</div>
          <div class="item">备注</div>
        </div>
      </div>
    </footer>
    <a-modal
        v-model="modalUser"
        scrollable
        footer-hide
        closable
        title="用户列表"
        :mask-closable="false"
        width="900"
    >
      <userList ref="users" @getUserId="getUserId" v-if="modalUser"></userList>
    </a-modal>
    <recharge
        ref="recharge"
        :userInfo="userInfo"
        @getSuccess="getSuccess"
    ></recharge>
    <couponList
        ref="coupon"
        :uid="userInfo.uid"
        :cartList="cartList"
        @getCouponId="getCouponId"
        v-if="userInfo && cartList.length"
    ></couponList>
    <storeList
        ref="store"
        :uid="userInfo ? userInfo.uid : 0"
        @getStoreId="getStoreId"
        @getUserInfo="getUserInfo"
    >
    </storeList>
    <a-modal v-model="modal" title="备注" footer-hide>
      <a-input
          v-model="createOrder.remarks"
          maxlength="200"
          show-word-limit
          :rows="5"
          type="textarea"
          placeholder="订单备注"
          style="width: 100%"
      />
      <a-button class="mt20" type="primary" long @click="onSubmit()">提交</a-button>
    </a-modal>
    <a-modal
        v-model="modal2"
        title="订单改价"
        footer-hide
        @on-cancel="cancelPrice"
    >
      <a-form :model="formItem" :label-width="100">
        <a-form-item label="订单改价：">
          <div class="acea-row">
            <div class="inputNum">
              <a-input-number
                  :min="0"
                  v-model="formItem.price"
                  @on-change="tapPrice"
              />
              元
            </div>
            <div class="inputNum discount">
              <a-input-number
                  :min="0"
                  :max="100"
                  v-model="discountPrice"
                  @on-change="tapDiscount"
              />
              %
            </div>
          </div>
        </a-form-item>
        <a-form-item label="改价后金额：">
          <div class="changePrice">
            ¥<span class="price">{{ formItem.price || 0 }}</span>
          </div>
        </a-form-item>
        <div class="acea-row row-center-wrapper">
          <a-button type="primary" class="buttonPrice" @click="onSubmit2"
          >确认改价
          </a-button>
        </div>
      </a-form>
    </a-modal>
    <a-modal
        v-model="modalPay"
        footer-hide
        width="430px"
        class="modalPay"
        @on-cancel="modalPayCancel"
    >
      <div class="payPage">
        <div class="header acea-row row-center-wrapper">
          <div class="pictrue"><img src="../../assets/images/gold.png"/></div>
          <div class="text">应收金额(元)</div>
        </div>
        <div class="money">
          ¥<span class="num">{{
            priceInfo.payPrice ? priceInfo.payPrice : 0
          }}</span>
        </div>
        <a-input
            ref="focusNum"
            v-model="payNum"
            size="large"
            type="url"
            @input="inputSaoMa"
            placeholder="请点击输入框聚焦扫码或输入编码号"
            style="margin-top: 16px"
        />
        <div class="process">
          <div class="pictrue">
            <img
                src="../../assets/images/process1.png"
                v-if="createOrder.pay_type == 'yue'"
            />
            <img src="../../assets/images/process2.png" v-else/>
          </div>
          <div class="list acea-row row-between-wrapper">
            <div class="item one">
              <div class="name">
                {{
                  createOrder.pay_type == "yue" ? "出示付款码" : "扫描收银码"
                }}
              </div>
              <div>
                {{
                  createOrder.pay_type == "yue"
                      ? "用户打开个人中心"
                      : "引导用户扫描"
                }}
              </div>
            </div>
            <div class="item two">
              <div class="name">
                {{ createOrder.pay_type == "yue" ? "扫描付款码" : "完成支付" }}
              </div>
              <div>
                {{ createOrder.pay_type == "yue" ? "扫码枪" : "用户线上支付" }}
              </div>
            </div>
            <div class="item three">
              <div class="name">确认收款</div>
              <div>收银台点击确认</div>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
    <a-modal
        v-model="modalCash"
        footer-hide
        width="770px"
        class="cash"
        @on-cancel="cancel"
    >
      <div class="cashPage acea-row">
        <div class="left">
          <div class="pictrue">
            <img src="../../assets/images/gold.png"/>
          </div>
          <div class="text">应收金额(元)</div>
          <div class="money">
            ¥<span class="num">{{
              priceInfo.payPrice ? priceInfo.payPrice : 0
            }}</span>
          </div>
        </div>
        <div class="right">
          <div class="rightCon">
            <div class="top acea-row row-between-wrapper">
              <div>实际收款(元)</div>
              <div class="num">{{ collection }}</div>
            </div>
            <div class="center acea-row row-between-wrapper">
              <div>需找零(元)</div>
              <div
                  class="num"
                  v-if="
                  this.$computes.Sub(
                    collection,
                    priceInfo.payPrice ? priceInfo.payPrice : 0
                  ) > 0
                "
              >
                {{
                  this.$computes.Sub(
                      collection,
                      priceInfo.payPrice ? priceInfo.payPrice : 0
                  )
                }}
              </div>
              <div class="num" v-else>0</div>
            </div>
            <div class="bottom acea-row">
              <div
                  class="item acea-row row-center-wrapper"
                  :class="item == '.' ? 'spot' : ''"
                  v-for="(item, index) in numList"
                  :key="index"
                  @click="numTap(item)"
              >
                {{ item }}
              </div>
              <div class="item acea-row row-center-wrapper" @click="delNum">
                <Icon type="ios-backspace"/>
              </div>
            </div>
          </div>
          <a-button type="primary" @click="cashBnt">确认</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
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
const defaultAvatar = ref('');

const handleChange = (column) => {

};

const userInfoData = (data) => {
  // 定义 userInfoData 方法
};

const setUp = (touristId) => {
  // 定义 setUp 方法
};

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

  .goods-list {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}

.conter {
  width: 500px;
  height: 100%;
  padding: 20px;
  box-shadow: 5px 0px 14px 0px rgba(0, 0, 0, 0.04);


  .cart {
    position: relative;
  }

  .pending-user {
    width: 100%;
    height: calc(100% - 50px);
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
