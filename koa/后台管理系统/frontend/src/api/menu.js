import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // 假设后端地址为 http://localhost:3000

// 获取菜单列表 (树形结构)
export function getMenuTree() {
  return axios.get(`${API_URL}/menus?type=tree`);
}

// 获取菜单列表 (平铺)
export function getMenus() {
    return axios.get(`${API_URL}/menus`);
}

// 新增菜单
export function addMenu(menu) {
  return axios.post(`${API_URL}/menus`, menu);
}

// 更新菜单
export function updateMenu(id, menu) {
  return axios.put(`${API_URL}/menus/${id}`, menu);
}

// 删除菜单
export function deleteMenu(id) {
  return axios.delete(`${API_URL}/menus/${id}`);
} 