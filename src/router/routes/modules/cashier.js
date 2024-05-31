import { DEFAULT_LAYOUT } from '../base';
// import { AppRouteRecordRaw } from '../types';

const DASHBOARD = {
  path: '/cashier',
  name: 'cashier',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.cashier',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  }
};

export default DASHBOARD;
