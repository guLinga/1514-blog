/**
 * @description 将虚拟 DOM 映射成真实 DOM 插入到页面上
 * @param virtualDom 虚拟 DOM
 * @param container 挂载点
 */
import {REACT_TEXT} from "../constant";

function render(virtualDom, container) {
    //挂载虚拟DOM到挂载点
    mount(virtualDom, container)
}

/**
 * @description 将虚拟 DOM 转换成真实 DOM 并挂载到挂载点上
 * @param virtualDom 虚拟 DOM
 * @param container 挂载点
 */
function mount(virtualDom, container) {
    const realDom = createDom(virtualDom)
    container.appendChild(realDom)
}

/**
 * @description 将虚拟 DOM 转换成真实 DOM
 * @param virtualDom 虚拟 DOM
 */
function createDom(virtualDom) {
    //真实DOM
    let realDom = null
    //type 类型，props 属性和子元素
    const {type, props} = virtualDom
    if(type === REACT_TEXT){//文本节点
        realDom = document.createTextNode(props.children)
    }else{//DOM节点
        realDom = document.createElement(type)
        if (props) {//处理子元素，只有不是文本节点才有子元素
            //更新真实 DOM 上的属性
            updateProps(realDom, null, props)
            //处理 children 子节点
            const children = props.children
            console.log(children, typeof children === 'object')
            if(typeof children === 'object' && children.type){//单个子元素
                mount(children, realDom)
            }else{//多个子元素
                children?.forEach(child => mount(child, realDom))
            }
        }
    }
    //将 真实DOM 挂载到 虚拟DOM 上
    virtualDom.dom = realDom
    return realDom
}

function updateProps(realDom, oldProps, newProps) {
    //将除 children 的属性添加到真实DOM上
    for (const key in newProps) {
        if (key === 'children') {
            continue;
        } else if (key === 'style') {
            //单独处理style对象 循环遍历 style 对象
            const style = newProps[key]
            for(const attr in style){
                realDom.style[attr] = style[attr]
            }
        }else{//剩余的属性
            realDom[key] = newProps[key]
        }
    }

    //操作旧属性，原来有的属性现在没有了需要删除掉
    for(const key in oldProps){
        if(!newProps.hasOwnProperty(key)){
            realDom[key] = null
        }
    }
}

const ReactDom = {
    render
}

export default ReactDom
