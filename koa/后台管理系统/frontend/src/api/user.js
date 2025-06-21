import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// 登录
export function login(credentials) {
    return axios.post('http://localhost:3000/login', credentials);
}

// 获取用户列表
export function getUsers(params) {
  return axios.get(`${API_URL}/users`, { params });
}

// 获取单个用户
export function getUser(id) {
    return axios.get(`${API_URL}/users/${id}`);
}

// 新增用户
export function addUser(user) {
  return axios.post(`${API_URL}/users`, user);
}

// 更新用户
export function updateUser(id, user) {
  return axios.put(`${API_URL}/users/${id}`, user);
}

// 删除用户
export function deleteUser(id) {
  return axios.delete(`${API_URL}/users/${id}`);
} 