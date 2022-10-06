import {history} from 'umi'
import {ReactNode} from "react";

interface Routes{
  routes:{
    exact:boolean
    component:string
  }[]
}


let routesData = []

export function patchRoutes({routes}:Routes){

  //添加一条
  routes.push({exact:true,component:require('@/pages/404').default})
}

export const render = async (oldRender: (()=>ReactNode)) => {
  //oldRender   需要至少调用一次
  // history.push('/login')//这里判断一下是否登录，并且是否是个人中心什么的，如果没登录则无法进入。
  let isLogin = true
  if(isLogin){
    history.push('/login')
  }else{
    //获取路由数据
    // routesData = await request('/')
  }
  oldRender()
};

export function onRouteChange({matchedRoutes,location,routes,action}:any){
  //添加标题
  document.title = matchedRoutes[matchedRoutes.length-1].route.title||'heheda'
}




export const request = {
  // timeout: 1000,//延时
  // errorConfig: {},//错误处理
  // middlewares: [],//使用中间件
  //请求拦截
  requestInterceptors: [
    (url:any,options:any)=>{
      options.headers = {token:'123456'}
      return {url,options}
    }
  ],

  responseInterceptors: [
    (response:any,options:any)=>{
      return response;
    }
  ]
};
