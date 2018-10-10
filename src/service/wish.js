import request from './request';

export function fetchCategories() {
  return request({
    url: '/api/wish/categories',
  });
}

export function addCategory({name, description, status = 1}) {
  return request({
    url: '/api/wish/categories',
    method: 'post',
    data: {
      name, description, status
    }
  })
}

export function updateCategory({id, name, description, status = 1}) {
    return request({
      method: 'put',
      url: `/api/wish/categories/${id}`,
      data: {
        name, description, status,
      }
    })
}

export function deleteCategory(id) {
  return request({
    method: 'delete',
    url: `/api/wish/categories/${id}`,
  })
}

export function fetchThreads() {
  return request({
    url: '/api/wish/threads',
  });
}

export function findThread(id) {
  return request({
    url: `/api/wish/threads/${id}`,
  });
}

export function deleteThread(id) {
  return request({
    url: `/api/wish/threads/${id}`,
    method: 'delete'
  })
}

export function createThread({
  title,
  content,
  bgm,
  background,
  cid,
  status,
  auto_scroll,
  description
}) {
  return request({
    url: '/api/wish/threads',
    method: 'post',
    data: {
      title,
      content,
      bgm,
      background,
      cid,
      status,
      auto_scroll,
      description,
    },
  });
}

export function updateThread(id, {
  title,
  content,
  bgm,
  background,
  cid,
  status,
  auto_scroll,
  description,
}) {
  return request({
    url: `/api/wish/threads/${id}`,
    method: 'put',
    data: {
      title,
      content,
      bgm,
      background,
      cid,
      status,
      auto_scroll,
      description,
    }
  })
}