import { createRouter, createWebHistory } from 'vue-router';
import ArticleList from './pages/articles/ArticleList.vue';
import ArticleDetail from './pages/articles/ArticleDetail.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/articles',
    },
    {
      path: '/articles',
      component: ArticleList,
    },
    {
      path: '/articles/:id',
      component: ArticleDetail,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

export default router;
