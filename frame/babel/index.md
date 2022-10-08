## Babel

### Babel的介绍
用来把代码中的 esnext 的新的语法、typescript 和 flow 的语法转成基于目标环境支持的语法的实现。同时Babel暴露了api让开发者可以进行特定用途的转换。除此以外，还可以做各种静态分析。

### Babel编译流程
Babel是一个转译器。
编译器是指`高级语言`到`低级语言`的转换工具
转译器是指`高级语言`到`高级语言`的转换工具
babel整体转译流程分为三步：
1. parse：通过`parser`把源码转成抽象语法树（AST）（之所以叫抽象语法树是因为省略掉了源码中的分隔符、注释等内容）
2. transform：遍历`AST`调用各种`transform`插件对`AST`进行增删改
3. generate：把转换后的`AST`打印成目标代码，并生成`sourcemap`

### AST
`AST`是对源码的抽象。`字面量、标识符、表达式、语句、模块语法、class语法`都有各自的不同的`AST`。
每种不同的`AST`也有公共的属性：
1. type:AST的节点类型
2. `start、end、loc`：`start`和`end`代表该节点在源码中的开始和结束下标。而`loc`属性是一个对象，有`line`和`column`属性分别记录开始和结束的行列号。
![](../../image/Babel/AST.png)
3. leadingComments、innerComments、trailingComments： 表示开始的注释、中间的注 释、结尾的注释，每个 AST 节点中都可能存在注释，而且可能在开始、中间、结束这三种位置，想拿到某个 AST 的注释就通过这三个属性。
![](../../image/Babel/AST2.png)

### Babel的一些API
1. parse
   - @babel/parser：把源码转成 AST
2. transform
   - @babel/traverse：可以遍历 AST，并调用 visitor 函数修改 AST
   - @babel/types：visitor 函数对 AST 的判断、创建、修改等
   - @babel/template：批量创建 AST
3. generate
   - @babel/generator：把 AST 打印为目标代码字符串，同时生成 sourcemap
4. 其他
   - @babel/code-frame：中途遇到错误想打印代码位置的时候
   
### 插入函数调用参数
**需求一：**
需要将`console.log(1)`转换成`console.log('文件名（行号，列号）：',1)`
```js
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

const sourceCode = `
    console.log(1);

    function func() {
      console.info(2);
    }

    export default class Clazz {
      say() {
        console.debug(3);
      }
      render() {
        return <div>{console.error(4)}</div>
      }
    }
`;

//parser流程，把源码转成抽象语法树AST
const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['jsx'],//开启jsx
});

//traverse流程，遍历AST调用各种transform插件对AST进行增删改
/*
* aim:我们想要把console.log('111')变成console.log('文件名（行号，列号）：','111');
* 这就需要我们在traverse流程中调用各种插件对AST进行修改
* */
//判断是否是console的API
const targetCalleeName = ['log','info','error','debug'].map(item=>`console.${item}`);
traverse(ast, {
    CallExpression(path, state) {
        //使用generate将callee的AST转换成字符串
        // const calleeName = generate(path.code.callee).code;

        //也可以使用path的toString方法将callee的AST转换成字符串
        const calleeName = path.get('callee').toString();

        //检测console的API
        if (targetCalleeName.includes(calleeName)) {
            //获取行和列
            const {line, column} = path.node.loc.start;
            //修改console的API输出
            path.node.arguments.unshift(types.stringLiteral(`filename:(${line},${column})`));
        }
    }
});

//generate流程，把转换后的AST打印成目标代码，并生成sourcemap
const {code, map} = generate(ast);

console.log(code);
```

**需求二：**
将
```js
console.log(1);
```
转换成
```js
console.log('文件名（行号，列号）：');
console.log(1);
```
要注意的点：jsx表达式不是在前面插入一个节点，而是要把整体替换成一个数组表达式，因为jsx中只支持写单个表达式。
```jsx
//将
<div>{console.log(1)}</div>
//转换成
<div>{[console.log('文件名（行号，列号）：'),console.log(1)]}</div>
```
```js
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');
const template = require('@babel/template').default;

const sourceCode = `
    console.log(1);

    function func() {
      console.info(2);
    }

    export default class Clazz {
      say() {
        console.debug(3);
      }
      render() {
        return <div>{console.error(4)}</div>
      }
    }
`;

//parser流程，把源码转成抽象语法树AST
const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['jsx'],//开启jsx
});

//traverse流程，遍历AST调用各种transform插件对AST进行增删改
/*
* aim:我们想要把console.log('111')变成console.log('文件名（行号，列号）：','111');
* 这就需要我们在traverse流程中调用各种插件对AST进行修改
* */
//判断是否是console的API
const targetCalleeName = ['log','info','error','debug'].map(item=>`console.${item}`);
traverse(ast, {
    CallExpression(path, state) {
        if(path.node.isNew)return;

        //使用generate将callee的AST转换成字符串
        // const calleeName = generate(path.code.callee).code;

        //也可以使用path的toString方法将callee的AST转换成字符串
        const calleeName = path.get('callee').toString();

        //检测console的API
        if (targetCalleeName.includes(calleeName)) {
            //获取行和列
            const {line, column} = path.node.loc.start;

            //生成console.log('文件名（行号，列号）：')字符串
            const newNode = template.expression(`console.log("filename: (${line}, ${column})")`)();

            newNode.isNew = true;
            //判断是不是jsx
            if(path.findParent(path => path.isJSXElement())){
                //将console的API转换成数组，替换原来的console的API
                path.replaceWith(types.arrayExpression([newNode,path.node]));
                path.skip();
            } else {
                //在console的API之前插入
                path.insertBefore(newNode);
            }
        }
    }
});

//generate流程，把转换后的AST打印成目标代码，并生成sourcemap
const {code, map} = generate(ast);

console.log(code);
```


