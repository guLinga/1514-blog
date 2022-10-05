import { defineConfig } from 'umi';
import routes from './routes';
import theme from './theme';
import proxy from './proxy';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
  devServer:{
    port: 8000
  },
  title:'1514',
  favicon:'/favicon.ico',
  dynamicImport:{
    loading: '@/components/loading',
  },//首页分包，让开屏更快
  mountElementId:'root',
  theme,
  proxy,//反向代理
});
