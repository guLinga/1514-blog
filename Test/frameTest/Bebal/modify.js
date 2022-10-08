const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');
const path = require('path')

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
