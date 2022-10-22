import { REACT_TEXT } from "./stants";

//初始化react元素
function render(vdom,container){
  //1、将虚拟DOM转换成真实DOM
  let newDom = creatDom(vdom);
  //2、将真实DOM放到对应的位置
  container.appendChild(newDom);
}

function creatDom(vdom){
  if(typeof vdom === 'string' || typeof vdom === 'number'){
    vdom = {type:REACT_TEXT,content:vdom};
  }
  let {type,props,content} = vdom;
  let dom;//真实DOM
  //判断创建元素还是创建文本
  if(type===REACT_TEXT){//文本
    dom = document.createTextNode(content);
  }else if(typeof type==='function'){//区分是函数组件还是class组件
    if(type.isReactComponent){//class组件
      return mountClassComponent(vdom);
    }
    //函数组件
    return mountFunctionComponent(vdom);
  }else{//元素
    dom = document.createElement(type);
  }
  //处理属性，需要注意children和style
  if(props){
    //处理属性，并为以后更新做准备
    updataProps(dom,{},props);//dom:真实DOM，{}:旧的属性，初始化时候没有旧的属性，props:新的属性
    //处理子元素
    let children = props.children;
    if(children){
      changeChildren(children,dom);
    }
  }
  vdom.dom = dom//保存真实DOM
  return dom;
}

//处理class组件
function mountClassComponent(vdom){
  let {type,props} = vdom;
  //注意type是一个class，我们需要type中render的返回值
  let classInstance = new type(props);
  let classVnode = classInstance.render();
  classInstance.oldReaderVnode = classVnode;
  return creatDom(classVnode);//真实DOM
}

//处理函数组件
function mountFunctionComponent(vdom){
  let {type,props} = vdom;
  let functionVdom = type(props);//获取到函数的虚拟DOM
  return creatDom(functionVdom);//真实DOM
}

//处理子元素
function changeChildren(children,dom){
  //处理一下children是字符串的情况
  if(typeof children === 'string' || typeof children === 'number'){
    children = {type:REACT_TEXT,content:children}
    render(children,dom);
  }else if(typeof children === 'object' && children.type){//1、有一个子元素
    render(children,dom);
  }else if(Array.isArray(children)){//2、有多个子元素
    children.forEach((item)=>render(item,dom));
  }
}

//更新属性
function updataProps(dom,oldProps,newProps){
  if(newProps){
    // 处理属性，需要注意children和style
    for(let key in newProps){//跳过children属性
      if(key==="children"){
        continue;
      }else if(key==="style"){//循环遍历style属性对象
        let styleObjext = newProps[key];
        for(let arr in styleObjext){
          dom.style[arr] = styleObjext[arr];
        }
      }else if(key.startsWith('on')){//事件
        dom[key.toLocaleLowerCase()] = newProps[key];
      }else{//其他属性
        dom[key] = newProps[key];
      }
    }
  }
  //更新处理
  if(oldProps){
    //旧的属性中没有-删除
    for(let key in oldProps){
      if(!newProps[key]){
        dom[key] = null;
      }
    }
  }
}

//实现更新
export function twoVnode(partentDom,oldVnode,newVnode){
  //获取真实DOM
  let newdom = creatDom(newVnode);
  let olddom = oldVnode.dom;
  //更新
  partentDom.replaceChild(newdom,olddom);
}

const MyReactDom = {
  render
}

export default MyReactDom;
