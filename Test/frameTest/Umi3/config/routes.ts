export default [
  {
    path: '/',
    component: '@/layouts/base-layouts',
    routes:[
      { path: '/login', component: '@/pages/login' },
      { path: '/index', component: '@/pages/index' },
      { path: '/goods/:id', wrappers: ['@/wrappers/auth'], component: '@/pages/goods' },
      { path: '/good/:id', component: '@/pages/goods' },
      { path: '/dva', component: '@/pages/dva' },
      { path: '/dva-child', component: '@/pages/dva/child' },
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
