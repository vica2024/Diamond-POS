/**
 * @file: login.js
 * @version: 1.0.0
 * @date: 2024-05-30
 * @auther: Vica Zhuo
 * @email: zhuovica@gmail.com
 * @Blog: https://vicazhuo.tech
 * @lastModified: 2024-05-30 by Vica Zhuo
 */

import { request } from '@/utils/request.js'

export default {

  /**
   * get code.
   * @returns
   */
  getCaptch() {
    return request({
      url: 'system/captcha',
      method: 'get'
    })
  },

  /**
   * user login.
   * @param {object} params
   * @returns
   */
  login(params = {}) {
    return request({
      url: 'system/login',
      method: 'post',
      data: params
    })
  },

  /**
   * user logout.
   * @param {object} params
   * @returns
   */
  logout(params = {}) {
    return request({
      url: 'system/logout',
      method: 'post',
      data: params
    })
  },

  /**
   * get user info.
   * @param {object} params
   * @returns
   */
  getInfo(params = {}) {
    return request({
      url: 'system/getInfo',
      method: 'get',
      data: params
    })
  }
}
