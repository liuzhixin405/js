# Koa + Vue 全栈项目搭建指南

本文档将详细介绍如何从零开始创建一个使用 Koa.js 作为后端、Vue.js 作为前端的全栈项目。

## 项目结构

```
project-root/
├── backend/          # 后端目录
│   ├── package.json
│   ├── server.js
│   └── node_modules/
└── frontend/         # 前端目录
    ├── package.json
    ├── vite.config.js
    ├── index.html
    ├── src/
    │   ├── main.js
    │   └── App.vue
    └── node_modules/
```

## 一、创建项目目录

```bash
mkdir 后台管理系统
cd 后台管理系统
mkdir backend frontend
```

## 二、后端（Koa.js）搭建

### 1. 进入后端目录

```bash
cd backend
```

### 2. 初始化 npm 项目

```bash
npm init -y
```

### 3. 安装后端依赖

```bash
# 核心依赖
npm install koa @koa/router @koa/bodyparser @koa/cors jsonwebtoken

# 开发依赖（可选）
npm install -D nodemon
```

### 4. 修改 package.json

在 `backend/package.json` 中添加：

```json
{
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### 5. 创建后端服务器文件

创建 `backend/server.js`：

```javascript
import Koa from 'koa'
import Router from '@koa/router'
import JWT from 'jsonwebtoken'  
import BodyParser from '@koa/bodyparser'
import cors from '@koa/cors'

const app = new Koa();
const router = new Router();

// JWT 密钥
const secret = 'your-secret-key';

// 添加 CORS 中间件
app.use(cors({
  origin: 'http://localhost:5173', // 前端地址
  credentials: true
}));

app.use(BodyParser());

// 根路由
router.get('/', async (ctx) => {
  ctx.body = "API Server is running!"; 
});

// 登录接口
router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body;
  
  // 简单验证（实际项目中应该查询数据库）
  if (username === 'admin' && password === 'admin') {
    const token = JWT.sign({ username }, secret, { expiresIn: '1h' });
    ctx.body = {
      token,
      message: '登录成功'
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      message: '用户名或密码错误'
    };
  }
});

// 受保护的接口
router.get('/protected', async (ctx) => {
  const token = ctx.headers.authorization;
  if (token) {
    try {
      const decoded = JWT.verify(token, secret);
      ctx.body = {
        message: `欢迎 ${decoded.username}，访问受保护的接口`
      };
    } catch (err) {
      ctx.status = 401;
      ctx.body = {
        message: '无效的 Token'
      };
    }
  } else {
    ctx.status = 401;
    ctx.body = {
      message: '请提供 Token'
    };
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Backend server started on http://localhost:3000');
});
```

### 6. 启动后端服务器

```bash
# 生产模式
npm start

# 开发模式（自动重启）
npm run dev
```

## 三、前端（Vue.js）搭建

### 1. 进入前端目录

```bash
cd ../frontend
```

### 2. 初始化 npm 项目

```bash
npm init -y
```

### 3. 安装前端依赖

```bash
# 生产依赖
npm install vue axios

# 开发依赖
npm install -D vite @vitejs/plugin-vue
```

### 4. 修改 package.json

在 `frontend/package.json` 中添加：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 5. 创建 Vite 配置文件

创建 `frontend/vite.config.js`：

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})
```

### 6. 创建 HTML 入口文件

创建 `frontend/index.html`：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue Login App</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

### 7. 创建 JavaScript 入口文件

创建 `frontend/src/main.js`：

```javascript
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### 8. 创建 Vue 组件

创建 `frontend/src/App.vue`：

```vue
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
      <div v-if="errorMessage" style="color: red; margin-top: 10px;">
        {{ errorMessage }}
      </div>
    </div>
    <div v-else>
      <h1>欢迎</h1>
      <button @click="logout">退出登录</button>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      token: localStorage.getItem('token'),
      message: '',
      errorMessage: '',
      loading: false
    };
  },
  methods: {
    async login() {
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
        this.username = '';
        this.password = '';
      
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.errorMessage = '账号或密码不正确，请重新输入';
        } else {
          this.errorMessage = '登录失败，请检查网络连接';
        }
        this.password = '';
      } finally {
        this.loading = false;
      }
    },
  
    logout() {
      this.token = null;
      localStorage.removeItem('token');
      this.message = '';
      this.errorMessage = '';
    }
  },
  
  async mounted() {
    if (this.token) {
      try {
        const response = await axios.get('http://localhost:3000/protected', {
          headers: {
            Authorization: this.token
          }
        });
        this.message = response.data.message;
      } catch (error) {
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

input, button {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>
```

### 9. 启动前端服务器

```bash
npm run dev
```

## 四、运行项目

### 1. 启动后端服务器

```bash
cd backend
npm run dev
```

后端将运行在：`http://localhost:3000`

### 2. 启动前端服务器

打开新的终端窗口：

```bash
cd frontend
npm run dev
```

前端将运行在：`http://localhost:5173`

### 3. 测试登录

* 访问：`http://localhost:5173`
* 测试账号：用户名 `admin`，密码 `admin`

## 五、依赖说明

### 后端依赖

| 包名                | 用途                 |
| ------------------- | -------------------- |
| `koa`             | Koa.js 框架核心      |
| `@koa/router`     | 路由中间件           |
| `@koa/bodyparser` | 请求体解析中间件     |
| `@koa/cors`       | 跨域资源共享中间件   |
| `jsonwebtoken`    | JWT 令牌生成和验证   |
| `nodemon`         | 开发时自动重启服务器 |

### 前端依赖

| 包名                   | 用途             |
| ---------------------- | ---------------- |
| `vue`                | Vue.js 框架核心  |
| `axios`              | HTTP 客户端库    |
| `vite`               | 前端构建工具     |
| `@vitejs/plugin-vue` | Vite 的 Vue 插件 |

## 六、常见问题

### 1. CORS 跨域问题

确保后端安装了 `@koa/cors` 并正确配置前端域名。

### 2. 端口冲突

如果端口被占用，可以修改端口号：

* 后端：修改 `server.js` 中的端口号
* 前端：在 `package.json` 中使用 `vite --port 端口号`

### 3. ES6 模块问题

确保后端 `package.json` 中设置了 `"type": "module"`。

### 4. 依赖安装失败

删除 `node_modules` 和 `package-lock.json`，重新安装：

```bash
rm -rf node_modules package-lock.json
npm install
```


这个基础架构可以作为更复杂应用的起点，根据具体需求进行扩展和优化。
