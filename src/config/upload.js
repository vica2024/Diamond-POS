/**
 * @file: upload.js
 * @version: 1.0.0
 * @date: 2024-05-30
 * @auther: Vica Zhuo
 * @email: zhuovica@gmail.com
 * @Blog: https://vicazhuo.tech
 * @lastModified: 2024-05-30 by Vica Zhuo
 */

export default {
  storage: {
    LOCAL: 'http://127.0.0.1:9501',
    OSS: '',
    QINIU: '',
    COS: '',
    FTP: '',
    MEMORY: '',
    S3: '',
    MINIO: ''
  },

  storageMode: {
    '1': 'LOCAL',
    '2': 'OSS',
    '3': 'QINIU',
    '4': 'COS',
    '5': 'FTP',
    '6': 'MEMORY',
    '7': 'S3',
    '8': 'MINIO'
  }
}