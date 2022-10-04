import Nav from '@/components/nav'
import React, { ReactNode } from 'react'

function AsideLayouts(props:{children:ReactNode}) {
  return (
    <>
      <div>BaseLayouts</div>
      <Nav></Nav>
      { props.children }
    </>
  )
}

export default AsideLayouts