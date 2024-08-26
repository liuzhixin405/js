<template>
    <div>
      <h1>Home Page</h1>
      <p>欢迎来到首页！</p>
      <button @click="goToAboutPage">跳转到 About 页面</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    methods: {
    goToAboutPage() {
      this.$router.push({ name: 'AboutPage' })
    }
  }
  }
  </script>
  