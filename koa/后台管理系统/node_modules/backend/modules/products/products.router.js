// backend/modules/products/products.router.js

import Router from '@koa/router';

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from './products.controller.js';

const router = new Router({
  prefix: '/products'
});

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
