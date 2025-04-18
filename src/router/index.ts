import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes.ts'
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {   top: 0,
      behavior: 'smooth' }

  }
});

export default router;