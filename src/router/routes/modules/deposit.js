import { DEFAULT_LAYOUT } from '../base';
// import { AppRouteRecordRaw } from '../types';

const DASHBOARD = {
  path: '/deposit',
  name: 'deposit',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.deposit',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  }
};

export default DASHBOARD;
