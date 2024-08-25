<template>
    <div>
      <!-- 搜索输入框 -->
      <el-input
        v-model="searchQuery"
        placeholder="搜索书名或作者"
        style="margin-bottom: 20px; width: 300px"
      ></el-input>
      <br>
      <el-button @click="gotoAbout">关于我们</el-button>
      <!-- 书籍列表表格 -->
      <el-table :data="filteredBooks" style="width: 100%">
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="title" label="书名"></el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column prop="year" label="出版年份"></el-table-column>
        <el-table-column prop="genre" label="类别"></el-table-column>
        <el-table-column>
          <template v-slot="scope">
            <el-button @click.stop="gotoDetail(scope.row.id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BookTable',
    props: {
      books: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        searchQuery: ''
      };
    },
    computed: {
      filteredBooks() {
        if (!Array.isArray(this.books)) {
        console.error('Books is not an array:', this.books);
        return [];
      }
      return this.books.filter(book => {
        return book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
               book.author.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
      }
    },
    methods: {
      gotoDetail(id) {
        console.log("gotoDetail:", id);
        this.$router.push({ name: 'detail', params: { id } }); // 确保路由名称匹配
      },
      gotoAbout() {
      this.$router.push({ name: 'about' });
    }
    }
  };
  </script>
  
  <style scoped>
  /* 样式 */
  </style>
  