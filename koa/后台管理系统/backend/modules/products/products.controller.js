import productsModel from './products.model.js';

async function get(ctx) {
    try {
        const products = await productsModel.getProducts();
        ctx.body = products;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { message: error.message };
    }
}

async function add(ctx) {
    try {
        const newProduct = await productsModel.addProduct(ctx.request.body);
        ctx.status = 201;
        ctx.body = newProduct;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { message: error.message };
    }
}

async function update(ctx) {
    try {
        const result = await productsModel.updateProduct(ctx.params.id, ctx.request.body);
        if (result.affectedRows > 0) {
            ctx.body = { message: '更新成功' };
        } else {
            ctx.status = 404;
            ctx.body = { message: '商品不存在' };
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { message: error.message };
    }
}

async function remove(ctx) {
    try {
        const result = await productsModel.deleteProduct(ctx.params.id);
        if (result.affectedRows > 0) {
            ctx.body = { message: '删除成功' };
        } else {
            ctx.status = 404;
            ctx.body = { message: '商品不存在' };
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { message: error.message };
    }
}

export default { get, add, update, remove };
