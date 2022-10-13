//createElement返回虚拟DOM

import { REACT_ELEMENT } from "./stants";
import Component from "./component";
import { toObject } from "./util";

//type是标签类型，config是属性，children是子元素
function createElement(type,config,children){
  //处理key ref
  let key,ref;
  if(config){
    key=config.key;
    ref=config.ref;
    delete config.key;
    delete config.ref; 
  }
  //处理children
  let props={...config}
  // if(config){
    //1、没有children
    //2、有一个children (1)文本 (2)元素
    //3、多个儿子
    if(arguments.length>3){//多个儿子
      props.children = Array.prototype.slice.call(arguments,2).map(toObject)
    }else if(arguments.length===3){//只有一个儿子
      props.children = toObject(children);
    }
  // }
  return {//vnode=>react元素 虚拟DOM
    $$typeofs:REACT_ELEMENT,
    key,//后面diff算法
    ref,//获取真实DOM
    type,//标签类型
    props//子元素
  }
}
const MyReact = {
  createElement,
  Component
}
export default MyReact