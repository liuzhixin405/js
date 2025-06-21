import { createRouter, createWebHistory } from 'vue-router';

// 导入布局和页面组件
// 我们稍后会创建这些文件
import Layout from '../layout/Layout.vue';
import Login from '../pages/login/Login.vue';
import Products from '../modules/products/Products.vue';
import Users from '../modules/users/Users.vue';
import Menus from '../modules/menus/Menus.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/product/list', // 默认重定向到产品列表
    children: [
      {
        path: 'product/list',
        name: 'Products',
        component: Products,
        meta: { title: '商品列表' }
      },
      {
        path: 'system/user',
        name: 'Users',
        component: Users,
        meta: { title: '用户管理' }
      },
      {
        path: 'system/menu',
        name: 'Menus',
        component: Menus,
        meta: { title: '菜单管理' }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 简单的路由守卫
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.name !== 'Login' && !token) {
        next({ name: 'Login' });
    } else {
        next();
    }
});


export default router; 