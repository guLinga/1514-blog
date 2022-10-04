export default [
  {
    path: '/',
    component: '@/layouts/base-layouts',
    routes:[
      { path: '/login', component: '@/pages/login' },
      { path: '/goods/:id', wrappers: ['@/wrappers/auth'], component: '@/pages/goods' },
      { path: '/good/:id', component: '@/pages/goods' },
      { 
        path: '/reg',
        component: '@/pages/reg'
      },
      { path: '/', redirect: '/login' },
      {component: '@/pages/404' },
    ]
  },
  {component: '@/pages/404' },
]
