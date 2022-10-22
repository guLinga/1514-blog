## React.createElement

### React.createElement函数的作用。
React.createElement函数的作用无非就是返回虚拟DOM。

React.createElement(type,config,children);
type：标签类型，例如div标签。
config：元素上面带的属性，例如className属性。
children：子元素。

我们看下面的代码：
```tsx
/**
 * react.js
 */
//createElement返回虚拟DOM

import { REACT_ELEMENT } from "./stants";
import Component from "./component";
import { toObject } from "./util";

//type是标签类型，config是属性，children是子元素
function createElement(type,config,children){
  //处理key ref
  let key,ref;
  if(config){
    //将属性上的key和ref提取出来
    key=config.key;
    ref=config.ref;
    delete config.key;
    delete config.ref; 
  }
  //处理children
  let props={...config}
  //1、没有children
  //2、有一个children (1)文本 (2)元素
  //3、多个儿子
  if(arguments.length>3){//多个儿子
    props.children = Array.prototype.slice.call(arguments,2).map(toObject)
  }else if(arguments.length===3){//只有一个儿子
    props.children = toObject(children);
  }
  return {//vnode=>react元素 虚拟DOM
    $$typeofs:REACT_ELEMENT,
    key,//后面用于diff算法
    ref,//获取真实DOM
    type,//标签类型
    props//子元素
  }
}
const MyReact = {
  createElement
}
export default MyReact
```

```tsx
/**
 * stants.js
 */
//标识是元素还是文本
export const REACT_ELEMENT = Symbol("react.element");

export const REACT_TEXT = Symbol("react.text")
```

**注意：React中没有这一部分的转换，我们转换知识为了方便判断是文本几点还是元素节点**
```tsx
/**
 * util.js
 */
//判断节点是数字或文本，则将节点转换成对象的形式。
import { REACT_TEXT } from "./stants";

export function toObject(element){
  return typeof element === "string"||typeof element === "number"?
  {type:REACT_TEXT,content:element}:element;
}
```

上面就是React.createElement函数的代码，还是比较简单的，就是将一些属性转换一下，然后就成了虚拟Dom，返回虚拟Dom。