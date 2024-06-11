import Mock from 'mockjs';

import './user';
import '@/views/cashier/mock';
import '@/views/deposit/mock';

Mock.setup({
  timeout: '600-1000',
});
