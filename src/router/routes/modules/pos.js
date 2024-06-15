import { DEFAULT_LAYOUT } from '../base';
// import { AppRouteRecordRaw } from '../types';

export default {
  path: '/',
  name: '',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.profile',
    requiresAuth: true,
    icon: 'icon-file',
    order: 4,
  },
  children: [
    {
      path: 'cashier',
      name: 'menu.cashier',
      component: () => import('@/views/cashier/index.vue'),
      meta: {
        locale: 'menu.cashier',
        icon: 'icon-gift',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'deposit',
      name: 'menu.deposit',
      component: () => import('@/views/deposit/index.vue'),
      meta: {
        locale: 'menu.deposit',
        icon: 'icon-drive-file',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'order',
      name: 'menu.order',
      component: () => import('@/views/order/index.vue'),
      meta: {
        locale: 'menu.order',
        icon: 'icon-bookmark',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'redeem-coupon',
      name: 'menu.redeem-coupon',
      component: () => import('@/views/write-off/index.vue'),
      meta: {
        locale: 'menu.redeem-coupon',
        icon: 'icon-check-square',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'refund',
      name: 'menu.refund',
      component: () => import('@/views/refund/index.vue'),
      meta: {
        locale: 'menu.refund',
        icon: 'icon-rotate-left',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: '/customer',
      name: 'menu.customer',
      component: () => import('@/views/customer/index.vue'),
      meta: {
        locale: 'menu.customer',
        icon: 'icon-user-group',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

