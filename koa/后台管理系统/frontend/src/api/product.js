import axios from 'axios';

const API_URL = 'http://localhost:3000'; // 后端 API 地址

// 获取商品列表
export function getProducts() {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/products`, {
    headers: { Authorization: token }
  });
}

// 新增商品 (假设存在此接口)
export function addProduct(product) {
  const token = localStorage.getItem('token');
  return axios.post(`${API_URL}/products`, product, {
    headers: { Authorization: token }
  });
}

// 更新商品 (假设存在此接口)
export function updateProduct(id, product) {
  const token = localStorage.getItem('token');
  return axios.put(`${API_URL}/products/${id}`, product, {
    headers: { Authorization: token }
  });
}

// 删除商品 (假设存在此接口)
export function deleteProduct(id) {
  const token = localStorage.getItem('token');
  return axios.delete(`${API_URL}/products/${id}`, {
    headers: { Authorization: token }
  });
} 