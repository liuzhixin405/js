import mysql from 'mysql2/promise.js';
import dbConfig from '../../database.js'; // Correct path

async function getProducts() {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [rows] = await connection.execute('SELECT id, name, description, price, imageUrl, createdAt FROM products');
    return rows;
  } finally {
    await connection.end();
  }
}

async function addProduct(product) {
    const connection = await mysql.createConnection(dbConfig);
    try {
        const { name, description, price, imageUrl } = product;
        const sql = `INSERT INTO products (name, description, price, imageUrl) VALUES (?, ?, ?, ?)`;
        const [result] = await connection.execute(sql, [name, description, price, imageUrl]);
        return { id: result.insertId, ...product };
    } finally {
        await connection.end();
    }
}

async function updateProduct(id, product) {
    const connection = await mysql.createConnection(dbConfig);
    try {
        const { name, description, price, imageUrl } = product;
        const sql = `UPDATE products SET name = ?, description = ?, price = ?, imageUrl = ? WHERE id = ?`;
        const [result] = await connection.execute(sql, [name, description, price, imageUrl, id]);
        return result;
    } finally {
        await connection.end();
    }
}

async function deleteProduct(id) {
    const connection = await mysql.createConnection(dbConfig);
    try {
        const [result] = await connection.execute('DELETE FROM products WHERE id = ?', [id]);
        return result;
    } finally {
        await connection.end();
    }
}

export default { 
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
};
