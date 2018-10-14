import request from './request';

export function fetch(type) {
  return request({
    url: '/api/assets',
  });
}

export function create({name, description, url, type}) {
  return request({
    url: '/api/assets',
    method: 'post',
    data: {
      name, description, value: url, type
    },
  });
}

export function remove(id) {
  return request({
    url: `/api/assets/${id}`,
    method: 'delete'
  });
}

export function update(id, {name, description, type}) {
  return request({
    url: `/api/assets/${id}`,
    method: 'put',
    data: {
      name, description, type,
    }
  });
}