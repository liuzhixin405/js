import products from './products.model.js';

// 自动递增 id 模拟数据库主键
let nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

export const getAllProducts = async (ctx) => {
  ctx.body = products;
};

export const getProductById = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const product = products.find(p => p.id === id);
  if (!product) {
    ctx.status = 404;
    ctx.body = { message: 'Product not found' };
    return;
  }
  ctx.body = product;
};

export const createProduct = async (ctx) => {
  const data = ctx.request.body;
  if (!data.name || !data.price) {
    ctx.status = 400;
    ctx.body = { message: 'Missing required fields: name or price' };
    return;
  }

  const newProduct = {
    id: nextId++,
    name: data.name,
    description: data.description || '',
    price: data.price,
    imageUrl: data.imageUrl || '',
    createdAt: new Date(),
  };

  products.push(newProduct);
  ctx.status = 201;
  ctx.body = newProduct;
};

export const updateProduct = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = { message: 'Product not found' };
    return;
  }

  const data = ctx.request.body;
  products[index] = {
    ...products[index],
    ...data,
    id, // 保证 id 不变
  };

  ctx.body = products[index];
};

export const deleteProduct = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = { message: 'Product not found' };
    return;
  }

  products.splice(index, 1);
  ctx.status = 204; // No Content
};
