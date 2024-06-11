// src/stores/customerStore.ts
import { defineStore } from 'pinia';

export interface CustomerState {
  phone: string;
  avatar: string;
  nickname: string;
  now_money: number;
  integral: number;
}

export const useCustomerStore = defineStore('customer', {
  state: (): CustomerState => ({
    phone: '',
    avatar: '',
    nickname: '',
    now_money: 0,
    integral: 0,
  }),
  actions: {
    updatePhone(newPhone: string) {
      this.phone = newPhone;
    },
    updateAvatar(newAvatar: string) {
      this.avatar = newAvatar;
    },
    updateNickname(newNickname: string) {
      this.nickname = newNickname;
    },
    updateNowMoney(newNowMoney: number) {
      this.now_money = newNowMoney;
    },
    updateIntegral(newIntegral: number) {
      this.integral = newIntegral;
    },
  },
});
