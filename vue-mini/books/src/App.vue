<template>
  <div id="app">
    <h1>图书管理系统</h1>
    <BookTable :books="books"></BookTable>
   
    <router-view></router-view>
  </div>
  
</template>

<script>
import BookTable from './components/BookTable.vue'
import BookData from './data/books.json'
export default {
  name: 'App',
  components: {
    BookTable
  },
  data() {
    return {
      books: BookData || [] // 确保 books 被正确初始化
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
