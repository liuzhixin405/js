import mysql from 'mysql2/promise.js';

const dbConfig = {
  host: '127.0.0.1',
  port: 3307,
  user: 'root',
  password: '123456',
  database: 'koa_admin'
};

async function getProducts() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Database connection established'); // 添加连接成功日志
    const [rows] = await connection.execute('SELECT id, name,description, price, imageUrl,createdAt FROM products');
    await connection.end();
    console.log('Database query result:', rows); // 添加查询结果日志
    return rows;
  } catch (error) {
    console.error('Database operation failed:', error.message); // 显示更详细的错误信息
    throw error;
  }
}

export default {getProducts}  ;
