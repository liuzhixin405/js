import Koa from 'koa';
import Router from '@koa/router';
import jwt from 'jsonwebtoken';
import BodyParser from '@koa/bodyparser';
import Cors from '@koa/cors';
import productsRouter from './modules/products/products.router.js'; // 注意：加 `.js`

const app = new Koa();
const router = new Router();
const secret = '1234567890';

app.use(Cors());
app.use(BodyParser());

router.get('/', async (ctx) => {
  ctx.body = "isok!";
});

router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body;
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
    ctx.body = {
      token,
      message: '登录成功'
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      message: '用户名或密码错误'
    };
  }
});

router.get('/protected', async (ctx) => {
  const token = ctx.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token, secret);
      ctx.body = {
        message: `欢迎 ${decoded.username}，访问受保护的接口`
      };
    } catch (err) {
      ctx.status = 401;
      ctx.body = { message: '无效的 Token' };
    }
  } else {
    ctx.status = 401;
    ctx.body = { message: '请提供 Token' };
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(productsRouter.routes())
  .use(productsRouter.allowedMethods());

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
