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
    url: `/api/selfmedia/${id}`,
    data,
  });
}

export function fetchList(page = 1) {
  return request({
    method: 'GET',
    url: '/api/selfmedia',
    params: { page },
  });
}

export function getById(id) {
  return request({
    method: 'GET',
    url: `/api/selfmedia/${id}`,
  });
}

export function remove(id) {
  return request({
    method: 'DELETE',
    url: `/api/selfmedia/${id}`,
  });
}

export function createAccount(data) {
  return request({
    method: 'POST',
    url: '/api/selfmedia_account',
    data,
  });
}

export function fetchAccounts(page) {
  return request({
    method: 'GET',
    url: '/api/selfmedia_accounts',
    params: { page },
  });
}

export function getAccountById(id) {
  return request({
    url: `/api/selfmedia_account/${id}`,
  });
}

export function updateAccount(id, data) {
  return request({
    method: 'PUT',
    url: `/api/selfmedia_account/${id}`,
    data,
  });
}

export function removeAccount(id) {
  return request({
    method: 'DELETE',
    url: `/api/selfmedia_account/${id}`,
  });
}