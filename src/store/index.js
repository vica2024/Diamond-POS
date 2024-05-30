/**
 * @file: index.js
 * @version: 1.0.0
 * @date: 2024-05-30
 * @auther: Vica Zhuo
 * @email: zhuovica@gmail.com
 * @Blog: https://vicazhuo.tech
 * @lastModified: 2024-05-30 by Vica Zhuo
 */

import { createPinia } from 'pinia'
import useUserStore from './modules/user'
import useAppStore from './modules/app'
import useTagStore from './modules/tag'
import useKeepAliveStore from './modules/keepAlive'
import useIframeStore from './modules/iframe'
import useConfigStore from './modules/config'
import useMessageStore from './modules/message'
import useDocStore from './modules/doc'
import useFormStore from './modules/form'

const pinia = createPinia()

export {
  useUserStore,
  useAppStore,
  useTagStore,
  useKeepAliveStore,
  useIframeStore,
  useConfigStore,
  useMessageStore,
  useDocStore,
  useFormStore,
}
export default pinia
