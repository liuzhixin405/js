<template>
 <div v-if="book">
    <h2>{{ book.title }}</h2>
    <p><strong>作者:</strong> {{ book.author }}</p>
    <p><strong>出版年份:</strong> {{ book.year }}</p>
    <p><strong>类别:</strong> {{ book.genre }}</p>
    <p><strong>描述:</strong> {{ book.description }}</p>
    <el-button @click="goBack">返回</el-button>
  </div>
  <div v-else>
      <p>Loading...</p>
    </div>
  </template>
<script>
import api from '@/services/api';
import { onMounted, ref } from 'vue';
export default {
    name: 'BookDetail',
    props: ['id'],  // 确保这里使用 'id'
    // data() {
    //   return {
    //     book: null
    //   };
    // },
    // created() {
    //   this.loadBook();
    // },
    // methods: {
    //    async loadBook(){
    //     try
    //         {
    //             const bookId = this.$route.params.id;
              
    //             const response = await api.getBook(bookId);
    //             console.log('加载书籍详情成功:',response.data);
    //             this.book = response.data;
    //         }
    //     catch(error)
    //         {
    //             console.log('加载书籍详情失败:',error);
    //         }
    //     },
    //    goBack() {
    //     this.$router.push('/');
    //     }
    //   },
    setup(props) {
    const book = ref(null);

    const loadBook = async () => {
      try {
        const response = await api.getBook(props.id);
        book.value = response.data;
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    onMounted(() => {
      loadBook();
    });

    return { book };
  },

  methods: {
    goBack() {
      this.$router.push("/");
    }
  }
}
  </script>
  
  <style scoped>
  h2 {
    color: #42b983;
    margin-bottom: 10px;
  }
  p {
    font-size: 16px;
    margin: 5px 0;
  }
  </style>