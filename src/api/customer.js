import axios from 'axios';

/**
 *To search customer list data
 */
export function customerListSearch(params) {
  return axios({
    url: 'customer-list/search',
    method: 'post',
    data:params
  });
}
