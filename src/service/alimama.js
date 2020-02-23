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
export function getCategories() {
  return request({
    method: 'get',
    url: '/api/tbk/categories',
  });
}

export function getProductsByCategory(category, page = 1) {
  return request({
    method: 'get',
    url: '/api/tbk/products',
    params: {
      category,
      page
    }
  });
}