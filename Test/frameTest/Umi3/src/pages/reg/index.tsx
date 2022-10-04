import React,{useEffect} from 'react'

function Reg() {
  useEffect(()=>{
    return ()=>{
      console.log('卸载');
    }
  },[])
  return (
    <div>
      reg
    </div>
  )
}

export default Reg
