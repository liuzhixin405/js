const express = require('express');
const cors = require('cors'); // 导入 CORS 中间件
const app = express();
app.use(cors()); // 使用 CORS 中间件
const port = 3000;

// 模拟的书籍数据
const books = [
    {
      "id": 1,
      "title": "Vue.js Guide",
      "author": "Evan You",
      "year": 2019,
      "genre": "Programming"
    },
    {
      "id": 2,
      "title": "JavaScript: The Good Parts",
      "author": "Douglas Crockford",
      "year": 2008,
      "genre": "Programming"
    },
    {
      "id": 3,
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "year": 2008,
      "genre": "Programming"
    },
    {
      "id": 4,
      "title": "The Pragmatic Programmer",
      "author": "Andrew Hunt",
      "year": 1999,
      "genre": "Programming"
    },
    {
      "id": 5,
      "title": "You Don't Know JS",
      "author": "Kyle Simpson",
      "year": 2014,
      "genre": "Programming"
    }
  ];

// 解析 JSON 请求体
app.use(express.json());

// 获取所有书籍
app.get('/api/books', (req, res) => {
    res.json(books);
});

// 根据 ID 获取单本书籍
app.get('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// 启动服务
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
