import React, { ReactNode } from 'react'
import { Redirect } from 'umi'

function Auth(props:{children:ReactNode}) {
  if(Math.random() < .5){
    return (
      <>{props.children}</>
    )
  }else{
    return <Redirect to='/login' />
  }
}

export default Auth