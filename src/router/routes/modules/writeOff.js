import { DEFAULT_LAYOUT } from '../base';
// import { AppRouteRecordRaw } from '../types';

const DASHBOARD = {
  path: '/write-off',
  name: 'write-off',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.write-off',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  }
};

export default DASHBOARD;
