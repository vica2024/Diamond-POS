/**
 * @file: index.js
 * @version: 1.0.0
 * @date: 2024-05-30
 * @auther: Vica Zhuo
 * @email: zhuovica@gmail.com
 * @Blog: https://vicazhuo.tech
 * @lastModified: 2024-05-30 by Vica Zhuo
 */

import auth from './auth/index'
import role from './role/index'
import copy from './copy/index'


export default {
  install (Vue) {
    Vue.directive('auth', auth)
    Vue.directive('role', role)
    Vue.directive('copy', copy)
  }
}
