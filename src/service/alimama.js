import request from './request';

export function getXPKList() {
  return request({
    method: 'get',
    url: '/api/xpk/list',
  });
}

export function getXPKDetail(page, favoritesId) {
  return request({
    method: 'get',
    url: '/api/xpk/detail',
    params: {
      favoritesId,
      page
    }
  });
}