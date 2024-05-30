/**
 * @file: indexv2.js
 * @version: 1.0.0
 * @date: 2024-05-30
 * @auther: Vica Zhuo
 * @email: zhuovica@gmail.com
 * @Blog: https://vicazhuo.tech
 * @lastModified: 2024-05-30 by Vica Zhuo
 */

/**
 * @Description:
 * @author Awin Zhuo <azhuo@apm.mc>
 * @date
 */
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Layout.vue'; // 导入你的组件

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;