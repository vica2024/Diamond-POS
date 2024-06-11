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
export function login(data) {
  return axios.post('/api/user/login', data);
}

export function logout() {
  return axios.post('/api/user/logout');
}

export function getUserInfo() {
  return axios.post('/api/user/info');
}

export function getMenuList() {
  return axios.post('/api/user/menu');
}


/**
 *收银台-添加购物车
 */
export function getCustomerList(data) {
  return axios({
    url: '/user/get_list',
    method: 'get',
    data
  });
}

/**
 *收银台-添加购物车
 */
export function getCustomerInfo(data) {
  return axios({
    url: '/user/user_Info',
    method: 'get',
    data
  });
}
