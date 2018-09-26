import request from './request';

export const register = (data) => {
  return request({
    method: 'post',
    url: '/api/register',
    data,
  });
}

export const login = (data) => {
  return request({
    method: 'post',
    url: '/api/login',
    data,
  })
}

export const logout = () => {
  return request({
    method: 'post',
    url: '/api/logout',
  })
}