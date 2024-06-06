<template>
  <div>
    <a-modal v-model:visible="modalsState.showGoodsAttrsModal" title="商品规格" :footer="false" unmountOnClose
             width="600">
      <div class="productAttr">
        <div>
          <div class="header">
            <div class="pictrue">
              <img alt="" :src="props.product.info.image"/>
            </div>
            <div class='text'>
              <div class="name line1">{{ props.product.info.store_name }}</div>
              <div class="info">库存 {{ props.product.info.stock }}</div>
              <div class="money">¥<span class="num">{{ props.product.info.price }}</span></div>
            </div>
          </div>
          <div class="attr">
            <div class="list" v-for="(item, index) in product.attrs" :key="index">
              <div class="title">{{ item.attr_name }}</div>
              <div class="listn acea-row">
                <a-row :gutter="12">
                  <a-col v-for="(attrName,idx) in item.attr_values" style="margin-top: 10px;"
                         :xs="{ span: 24, offset: 0 }" :md="{ span: 12, offset: 0 }" :lg="{ span: 8, offset: 0 }">
                    <a-button @click="tapAttr(index,idx)" size="mini"
                              :type="`${item.attr_value[idx].check?'primary':'outline'}`">
                      {{ attrName }}
                    </a-button>
                  </a-col>
                </a-row>
              </div>
            </div>
          </div>
        </div>
        <a-button type="primary" size="small" :disabled="disabled" long @click="gotCat">
          {{ isSkill ? '立即购买' : '确定' }}
        </a-button>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import {defineProps, inject, ref, watch} from 'vue';

const props = defineProps({
  product: {
    type: Object,
    default: {
      attrs: [],
      sizes: [],
      info: {}
    }
  },
  isSkill: {
    type: Boolean,
    default: false
  }
});
const attrs = [];
const disabled = ref(false);
const product_attr=ref({
  cartNum: 0,
  new: 0,
  productId: 0,
  seckillId: 0,
  staff_id: 0,
  uniqueId:'',
});
const modalsState = inject('modalsState');
const setModalVisibility = inject('setModalVisibility');
const setGoodsToCart = inject('setGoodsToCart');

watch(() => props.product, () => {
  props.product.attrs[0].attr_value[0].check = true;
  props.product.attrs[1].attr_value[0].check = true;
  attrs[0] = props.product.attrs[0].attr_value[0].attr
  attrs[1] = props.product.attrs[1].attr_value[0].attr
  chooseGoods();
});

const gotCat = () => {
  setModalVisibility('showGoodsAttrsModal', false);
  chooseGoods();
  setGoodsToCart(product_attr.value)
}

const chooseGoods=()=>{
  const key_name = attrs.length > 1 ? attrs.join(',') : attrs[0];
  console.log(key_name)
  product_attr.value.uniqueId=props.product.sizes[key_name].unique;
  product_attr.value.productId=props.product.sizes[key_name].product_id;
  product_attr.value.seckillId=props.product.sizes[key_name].seckillId;
}
const tapAttr = (k1, k2) => {
  const attrByChiose = props.product.attrs[k1];
  attrByChiose.attr_value.forEach((item) => {
    item.check = false;
  })
  attrByChiose.attr_value[k2].check = attrByChiose.attr_value[k2].check ? false : true;
  attrByChiose.attr_value.forEach((item) => {
    item.check ? attrs[k1] = item.attr : null;
  });
  const key_name = attrs.length > 1 ? attrs.join(',') : attrs[0];
  for (const key in props.product.sizes) {
    if (props.product.sizes[key_name]) {
      props.product.info.image = props.product.sizes[key_name].image;
      props.product.info.stock = props.product.sizes[key_name].stock;
      props.product.info.price = props.product.sizes[key_name].price;
      chooseGoods();
    }

  }
}
</script>

<style scoped lang="less">

.productAttr {
  .header {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
  }

  .pictrue {
    width: 116px;
    height: 116px;
    margin-right: 20px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }

  .text {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .bnt {
    width: 100%;
    height: 36px;
    background: #1890FF;
    font-size: 12px;
    color: #fff;
    border-radius: 4px;
    margin: 20px auto 0;
    cursor: pointer;
    border: none;
  }

  .attr {
    height: 300px;
    overflow-x: hidden;
    overflow-y: scroll;

  }

  .list {
    .title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 16px;
      font-weight: bold;
      margin-top: 14px;
    }

    .listn {
      .item {
        min-width: 158px;
        line-height: 20px;
        background: #F5F5F5;
        border-radius: 6px;
        color: #666666;
        font-size: 14px;
        margin-top: 10px;
        margin-right: 10px;
        cursor: pointer;
        padding: 10px 6px;

        &.on {
          background: #1890FF;
          color: #fff;
        }
      }
    }
  }

  .name {
    color: #000;
    font-size: 18px;
    font-weight: 400;
  }

  .info {
    font-size: 13px;
    color: #999999;
    margin: 8px 0 6px 0;
  }

  .money {
    font-size: 18px;
    color: #F5222D;
    width: 100%;
    font-weight: bold;

    .num {
      font-size: 21px;
    }
  }
}

</style>
