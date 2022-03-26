import { request } from 'umi';
export async function queryFakeList3(params) {
  return request('/api/fake_list_Detail', {
    params,
  });
}
