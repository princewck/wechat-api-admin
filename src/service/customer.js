import request from './request';

export const fetchUsers = () => {
  return request({
    url: '/api/users',
  })
};