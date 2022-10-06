import React, {JSXElementConstructor, useEffect} from 'react';
import {connect} from 'umi'
interface Props{
  dispatch:({})=>{},
  [key:string]:string|(({})=>{})
}
const Dva:JSXElementConstructor<never> = (props:Props) => {
  return (
    <div>
      Dva
      <h1>获取全局数据</h1>
      <div>text:{props.text}</div>
      <div>title:{props.title}</div>
      <div>A:{props.A}</div>
      {props.isLogin ? <div>已登录</div> : <div>未登录</div>}
      <div>我是组件变量：{props.test}</div>
      <button onClick={() => props.dispatch({
        type: 'global/setText'
      })}>按钮
      </button>

      <h1>发送异步请求，登录</h1>
      <button onClick={()=>{
        props.dispatch({
          type: 'global/login'
        })
      }}>异步登录测试</button>
    </div>
  );
};



export default connect((state:{
  global:{[key:string]:string},
  test:{[key:string]:string},
})=>({
  //抓取全局，重命名
  text: state.global.text,
  title: state.global.title,
  A: state.global.a,
  isLogin: state.global.login,
  //抓取页面级别的数据
  test: state.test.test
}))(Dva)
