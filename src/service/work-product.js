import request from './request';

export function fetchCategories() {
  return request({
    url: '/api/work_product/categories',
  });
}

export function addCategory({name, description, status = 1}) {
  return request({
    url: '/api/work_product/categories',
    method: 'post',
    data: {
      name, description, status
    }
  })
}

export function updateCategory({id, name, description, status = 1}) {
    return request({
      method: 'put',
      url: `/api/work_product/categories/${id}`,
      data: {
        name, description, status,
      }
    })
}

export function deleteCategory(id) {
  return request({
    method: 'delete',
    url: `/api/work_product/categories/${id}`,
  })
}


export function fetchProducts() {
  return request({
    url: '/api/work_product/products',
  });
}

export function findProduct(id) {
  return request({
    url: `/api/work_product/products/${id}`,
  });
}

export function deleteProduct(id) {
  return request({
    url: `/api/work_product/products/${id}`,
    method: 'delete'
  })
}

export function createProduct({
  title,
  content,
  cid,
  status,
  cover,
  price,
  origin_price,
  require_bp,
}) {
  return request({
    url: '/api/work_product/products',
    method: 'post',
    data: {
      title,
      content,
      cid,
      status,
      cover,
      price,
      origin_price,
      require_bp,
    },
  });
}

export function updateProduct(id, {
  title,
  content,
  cid,
  status,
  cover,
  price,
  origin_price,
  require_bp,
}) {
  return request({
    url: `/api/work_product/products/${id}`,
    method: 'put',
    data: {
      title,
      content,
      cid,
      status,
      cover,
      price,
      origin_price,
      require_bp,
    }
  })
}