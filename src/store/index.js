import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';

const stores = createPinia();

export { useAppStore, useUserStore, useTabBarStore };
export default stores;
