## React源码学习

### React源码学习流程


### babel

在react中，react会使用babel将jsx转换。然后在转换成虚拟DOM。

```jsx
import React from "react";
import ReactDOM from "react-dom";
let element = <h1 className="class" style={{color:'red'}}>React</h1>
console.log(element);
ReactDOM.render(element,document.getElementById('root'));
```

我们打印的element为：

```
React.createElement("h1", {
  className: "class",
  style: {
    color: 'red'
  }
}, "React");
```

为什么会这样呢？这就是React内部帮我们将jsx语法通过babel转换了。转换后React.createElement()函数就是返回的虚拟DOM。[你可以在这里尝试babel转换](https://www.babeljs.cn/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2&prettier=false&targets=&version=7.19.2&externalPlugins=&assumptions=%7B%7D)。

### React.createElement函数
React.createElement函数的作用就返回虚拟DOM。
React中的虚拟DOM中的属性：

1. $$typeof: REACT_ELEMENT
2. type是标签，例如div标签，但是我们这里做了一层处理，如果是文本的话是没有标签的，我们给其加上了`Symbol(react.text)`标签，方便以后的处理。
3. ref
4. key
5. props是React元素上面的属性，例如有的div上面会有style属性

```js
//src->react->index.js
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
```

```js
//src->utils->wrap2VirtualDom.js
import {REACT_ELEMENT, REACT_TEXT} from "../constant";

const wrap2VirtualDom = (element) => {
    return (typeof element === 'string' || typeof element === 'number') ? {
        $$typeof: REACT_ELEMENT,
        type: REACT_TEXT,
        props: {
            children: element
        }
    } : element
}

export default wrap2VirtualDom
```
