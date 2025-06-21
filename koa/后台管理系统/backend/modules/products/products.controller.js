import productModel from './products.model.js';

export const getAllProducts = async (ctx) => {
  try {
    const products = await productModel.getProducts();
    ctx.body = products;
  } catch (error) {
    console.error('Failed to get all products:', error);
    ctx.status = 500;
    ctx.body = { message: 'Failed to get products' };
  }
};

export const getProductById = async (ctx) => {
  ctx.status = 501;
  ctx.body = { message: 'Not Implemented' };
};

export const createProduct = async (ctx) => {
  ctx.status = 501;
  ctx.body = { message: 'Not Implemented' };
};

export const updateProduct = async (ctx) => {
  ctx.status = 501;
  ctx.body = { message: 'Not Implemented' };
};

export const deleteProduct = async (ctx) => {
  ctx.status = 501;
  ctx.body = { message: 'Not Implemented' };
};
