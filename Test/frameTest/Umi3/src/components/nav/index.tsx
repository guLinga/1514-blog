import React from 'react'
import { NavLink,Link,history } from 'umi'
import { Button } from 'antd';

function Nav() {
  function fn(){
    console.log(111);
    // history.push('/login');
  }
  return (
    <div>
      <Button onClick={fn}>跳转</Button>
      <NavLink to={{pathname:'/good/1',query:{a:1}}} activeStyle={{color:'red'}}>商品</NavLink>
      <NavLink to={{pathname:'/good/1',search:'?a=1'}} activeStyle={{color:'red'}}>商品</NavLink>
      <Link to='/login'>登录</Link>
      <Link to='/reg'>注册</Link>
    </div>
  )
}

export default Nav