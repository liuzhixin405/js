// backend/modules/products/products.router.js

import Router from '@koa/router';
import productsController from './products.controller.js';

const router = new Router({
  prefix: '/products'
});

router.get('/', productsController.get);
router.post('/', productsController.add);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.remove);

export default router;
