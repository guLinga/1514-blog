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
