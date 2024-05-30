/**
 * @file: auth.js
 * @version: 1.0.0
 * @date: 2024-05-30
 * @auther: Vica Zhuo
 * @email: zhuovica@gmail.com
 * @Blog: https://vicazhuo.tech
 * @lastModified: 2024-05-30 by Vica Zhuo
 */

import { useUserStore } from '@/store'

const auth = name => {
  const userStore = useUserStore()
  return (userStore.codes && userStore.codes.includes(name)) || (userStore.codes && userStore.codes.includes('*'))
}

export default auth