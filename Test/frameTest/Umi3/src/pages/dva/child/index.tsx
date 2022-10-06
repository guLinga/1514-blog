import React from 'react';
import {useDispatch,useSelector} from 'umi'

const Child = () => {
  const dispatch = useDispatch();
  const data = useSelector((state:{global:{
    a:string
    login: boolean
    text:string
    title:string
  }}) => state.global);
  return (
    <div>
      child
      <div>{data.text}</div>
      <div>{data.title}</div>
      <button onClick={()=>{
        dispatch({type:'global/setText'});
        dispatch({type:'global/setTitle',payload:1});
      }}>按钮</button>
    </div>
  );
};

export default Child;
