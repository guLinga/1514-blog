export default {
  '/api':{
    target: 'https://localhost:8000',//代理真实服务器
    https:true,//从http代理到https
    changeOrigin:true,//依赖origin的功能需要这个，比如cookie
    pathRewrite: {'^/api':''},//替换路径
  }
}
