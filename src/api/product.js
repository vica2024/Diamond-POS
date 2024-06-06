import axios from 'axios';
// import type { RouteRecordNormalized } from 'vue-router';
// import { UserState } from '@/store/modules/user/types';

// export interface LoginData {
//   username: string;
//   password: string;
// }

// export interface LoginRes {
//   token: string;
// }

/**
 *收银台-获取收银台商品信息
 */
export function cashierProduct(data) {
    return axios.get('/api/product/get_list');
}

/**
 *收银台-获取收银台商品分类信息
 */
export function cashierCate() {
    return axios({
        url: 'product/get_one_category',
        method: 'get'
    });
}

/**
 *收银台-获取收银台商品属性信息
 */
export function cashierProductAttr() {
    return axios({
        url: 'product/get_info',
        method: 'get'
    });
}






