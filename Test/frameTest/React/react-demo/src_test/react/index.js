import {REACT_ELEMENT} from "../constant";
import wrap2VirtualDom from "../utils/wrap2VirtualDom";

function createElement(type, config, children) {
    //定义 ref 和 key
    let ref = null, key = null;
    //config 不是 null
    if (config) {
        ref = config.ref || null
        key = config.key || null
        delete config.ref
        delete config.key
        delete config.__source
        delete config.__self
    }
    const props = {
        ...config
    }
    //判断子元素有多少个
    if (arguments.length > 3) {
        //子元素有多个
        props.children = Array.prototype.slice.call(arguments, 2).map(wrap2VirtualDom);
    } else if(arguments.length === 3) {
        //子元素只有一个
        props.children = wrap2VirtualDom(children);
    }
    return {
        $$typeof: REACT_ELEMENT,
        type,
        ref,
        key,
        props
    }
}

const React = {
    createElement
}

export default React;
