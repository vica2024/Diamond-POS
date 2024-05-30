/**
 * @file: role.js
 * @version: 1.0.0
 * @date: 2024-05-30
 * @auther: Vica Zhuo
 * @email: zhuovica@gmail.com
 * @Blog: https://vicazhuo.tech
 * @lastModified: 2024-05-30 by Vica Zhuo
 */

import { useUserStore } from '@/store'

const role = name => {
  const userStore = useUserStore()
  return (userStore.roles && userStore.roles.includes(name)) || (userStore.roles && userStore.roles.includes('superAdmin'))
}

export default role