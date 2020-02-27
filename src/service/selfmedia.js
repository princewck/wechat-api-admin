import request from './request';

export function publish(data) {
  return request({
    method: 'POST',
    url: '/api/selfmedia',
    data,
  });
}

export function update(id, data) {
  return request({
    method: 'PUT',
    url: `/api/selfmedia/:${id}`,
    data,
  });
}

export function fetchList() {
  return request({
    method: 'GET',
    url: '/api/selfmedia',
  });
}