import request from './request';

export function getSTS() {
  return request({
    url: '/api/sts',
  });
}