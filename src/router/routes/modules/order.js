import { DEFAULT_LAYOUT } from '../base';
// import { AppRouteRecordRaw } from '../types';

const DASHBOARD = {
  path: '/order',
  name: 'order',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.order',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  }
};

export default DASHBOARD;
