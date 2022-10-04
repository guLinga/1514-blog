import React from 'react'
import {useEffect} from 'react';

function Login() {
  useEffect(()=>{
    return ()=>{
      console.log('卸载');
    }
  },[])
  return (
    <div>Login</div>
  )
}

export default Login