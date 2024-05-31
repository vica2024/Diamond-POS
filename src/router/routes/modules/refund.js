import { DEFAULT_LAYOUT } from '../base';
// import { AppRouteRecordRaw } from '../types';

const DASHBOARD = {
  path: '/refund',
  name: 'refund',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.refund',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  }
};

export default DASHBOARD;
