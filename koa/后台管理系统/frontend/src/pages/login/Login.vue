<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Admin Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="login-button">Login</button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../../api/user';

const username = ref('admin');
const password = ref('admin');
const error = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await login({ username: username.value, password: password.value });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      router.push('/');
    } else {
      error.value = 'Login failed: No token received.';
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'An error occurred during login.';
    console.error(err);
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f6f8;
}

.login-box {
  padding: 40px;
  width: 350px;
  background-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
}

h1 {
  margin-bottom: 24px;
  color: #333;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box; /* important */
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #2980b9;
}

.error-message {
  margin-top: 16px;
  color: #e74c3c;
}
</style> 