
const routes = [

  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'), 
  },
  {
    path: '/products',
    name: 'AllProduct',
    component: () => import('@/pages/PageAllProducts.vue'), 
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('@/pages/PageProduct.vue')
  }
  
];


export default routes;