import request from './request';

export const fetchUsers = (page, appName) => {
  return request({
    url: '/api/users',
    params: { page, appName },
  })
};