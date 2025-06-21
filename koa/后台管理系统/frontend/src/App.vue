<template>
  <div id="app">
    <div v-if="!token">
      <h1>登录</h1>
      <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="用户名" required />
        <input type="password" v-model="password" placeholder="密码" required />
        <button type="submit" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
      <!-- 错误提示 -->
      <div v-if="errorMessage" style="color: red; margin-top: 10px;">
        {{ errorMessage }}
      </div>
    </div>
    <div v-else>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h1>欢迎</h1>
        <button @click="logout" style="margin-right: 0;">退出登录</button>
      </div>
      <p>{{ message }}</p>
    </div>
    <Products :products="products" />
  </div>
</template>

<script>
import axios from 'axios';
import Products from './modules/products/Products.vue';

export default {
  components: {
    Products
  },
  data() {
    return {
      username: localStorage.getItem('username') || '',
      password: '',
      token: localStorage.getItem('token') || null,
      message: '',
      errorMessage: '',
      loading: false,
      products: []
    };
  },
  methods: {
    async login() {
      // 清除之前的错误消息
      this.errorMessage = '';
      this.loading = true;
      
      try {
        const response = await axios.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password
        });
        
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        this.message = '登录成功';
        
        // 立即更新 localStorage 中的 token 值
        localStorage.setItem('token', this.token);
        localStorage.setItem('username', this.username);
        console.log('token in localStorage:', localStorage.getItem('token'));

        // 获取产品数据
        this.getProducts();
        console.log('login success, calling getProducts');
        
        // 强制组件重新渲染
        this.$forceUpdate();

        // 清空输入框
        // this.username = '';
        this.password = '';
        
      } catch (error) {
        // 根据不同的错误类型显示不同的提示
        if (error.response) {
          // 服务器返回了错误响应
          if (error.response.status === 401) {
            this.errorMessage = '账号或密码不正确，请重新输入';
          } else {
            this.errorMessage = '登录失败：' + (error.response.data.message || '服务器错误');
          }
        } else if (error.request) {
          // 请求发送了但没有收到响应（网络问题）
          this.errorMessage = '网络连接失败，请检查网络或服务器是否启动';
        } else {
          // 其他错误
          this.errorMessage = '登录过程中发生错误，请重试';
        }
        
        // 清空密码框
        this.password = '';
      } finally {
        this.loading = false;
      }
    },
    
    logout() {
      this.token = null;
      localStorage.removeItem('token');
      this.message = '';
      this.errorMessage = ''; // 清除错误消息
      // this.username = '';
      this.password = '';
      this.products = [];
    },
    
    async getProducts() {
      try {
        console.log('获取产品数据...');
        const response = await axios.get('http://localhost:3000/products', {
          headers: {
            Authorization: this.token
          }
        });
        this.products = response.data;
        console.log('产品数据:', response.data);
      } catch (error) {
        console.error('获取产品数据失败:', error);
      }
    }
  },
  provide() {
    return {
      isLoggedIn: !!this.token
    };
  },

  async mounted() { // 添加async关键字
    const token = localStorage.getItem('token');
    console.log('Mounted, token:', token);
    if (token) {
      this.token = token; // 将从localStorage中获取的token赋值给this.token
      try {
        const response = await axios.get('http://localhost:3000/protected', {
          headers: {
            Authorization: token
          }
        });
        this.message = response.data.message;
        console.log('protected接口调用成功');
        this.getProducts();
        console.log('mounted, calling getProducts');
      } catch (error) {
        this.errorMessage = 'Token 已过期，请重新登录';
        this.token = null;
        localStorage.removeItem('token');
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

h1 {
  text-align: center;
  color: #333;
}

/* 调整退出登录按钮样式 */
#app > div:nth-child(2) > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#app > div:nth-child(2) > div > h1 {
  margin: 0; /* 移除 h1 默认的外边距 */
}

#app > div:nth-child(2) > div > button {
  width: auto; /* 调整按钮宽度为自适应 */
  padding: 5px 10px; /* 调整按钮内边距 */
  font-size: 14px; /* 调整按钮字体大小 */
}
</style>
