import { createMemoryHistory,createRouter} from 'vue-router'
import BookTable from '../components/BookTable.vue'
import BookDetail from '../components/BookDetail.vue'
import AboutMe from '../components/AboutMe.vue'; // 导入 About 组件

const routes = [
    {
        path: '/',
        name: 'list',
        component: BookTable
    },
    {
        path: '/book/:id',
        name: 'detail',
        component: BookDetail,
        //component: () => import('./components/BookDetail.vue'), // 组件懒加载
        props: true
    },
    {
        path: '/about',
        name: 'about',
        component: AboutMe // 添加 About 路由
      }

];

const router = createRouter({
    history: createMemoryHistory(process.env.BASE_URL),
    routes
});

export default router;