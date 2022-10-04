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
      <NavLink to='/login' activeStyle={{color:'red'}}>登录</NavLink>
      <NavLink to='/reg' activeStyle={{color:'red'}}>注册</NavLink>
      <Link to='/login'>登录</Link>
      <Link to='/reg'>注册</Link>
    </div>
  )
}

export default Nav