## babel实现一个js解析器

### v8的流程

1. parser 负责把源码 parse 成 AST。
2. ignation 解释器负责把 AST 转成字节码，然后解释执行
3. turbofan 可以把代码编译成机器码，直接执行
4. gc 负责堆内存的垃圾回收
   ![v8流程图]()

最早的v8是没有字节码的，parser直接传递给解析器，我们这一届就是要来实现这种js解析器。

### 思路分析

```js
const a = 1 + 2;
```

上面代码对应的AST是

<details>
<summary>AST的json格式，点击查看</summary>
<pre><code>
{
  "type": "File",
  "start": 0,
  "end": 20,
  "loc": {
    "start": {
      "line": 1,
      "column": 0,
      "index": 0
    },
    "end": {
      "line": 1,
      "column": 20,
      "index": 20
    }
  },
  "errors": [],
  "program": {
    "type": "Program",
    "start": 0,
    "end": 20,
    "loc": {
      "start": {
        "line": 1,
        "column": 0,
        "index": 0
      },
      "end": {
        "line": 1,
        "column": 20,
        "index": 20
      }
    },
    "sourceType": "module",
    "interpreter": null,
    "body": [
      {
        "type": "VariableDeclaration",
        "start": 0,
        "end": 20,
        "loc": {
          "start": {
            "line": 1,
            "column": 0,
            "index": 0
          },
          "end": {
            "line": 1,
            "column": 20,
            "index": 20
          }
        },
        "declarations": [
          {
            "type": "VariableDeclarator",
            "start": 6,
            "end": 19,
            "loc": {
              "start": {
                "line": 1,
                "column": 6,
                "index": 6
              },
              "end": {
                "line": 1,
                "column": 19,
                "index": 19
              }
            },
            "id": {
              "type": "Identifier",
              "start": 6,
              "end": 7,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 6,
                  "index": 6
                },
                "end": {
                  "line": 1,
                  "column": 7,
                  "index": 7
                },
                "identifierName": "a"
              },
              "name": "a"
            },
            "init": {
              "type": "BinaryExpression",
              "start": 10,
              "end": 19,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 10,
                  "index": 10
                },
                "end": {
                  "line": 1,
                  "column": 19,
                  "index": 19
                }
              },
              "left": {
                "type": "BinaryExpression",
                "start": 10,
                "end": 15,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 10,
                    "index": 10
                  },
                  "end": {
                    "line": 1,
                    "column": 15,
                    "index": 15
                  }
                },
                "left": {
                  "type": "NumericLiteral",
                  "start": 10,
                  "end": 11,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 10,
                      "index": 10
                    },
                    "end": {
                      "line": 1,
                      "column": 11,
                      "index": 11
                    }
                  },
                  "extra": {
                    "rawValue": 1,
                    "raw": "1"
                  },
                  "value": 1
                },
                "operator": "+",
                "right": {
                  "type": "NumericLiteral",
                  "start": 14,
                  "end": 15,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 14,
                      "index": 14
                    },
                    "end": {
                      "line": 1,
                      "column": 15,
                      "index": 15
                    }
                  },
                  "extra": {
                    "rawValue": 2,
                    "raw": "2"
                  },
                  "value": 2
                }
              },
              "operator": "+",
              "right": {
                "type": "NumericLiteral",
                "start": 18,
                "end": 19,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 18,
                    "index": 18
                  },
                  "end": {
                    "line": 1,
                    "column": 19,
                    "index": 19
                  }
                },
                "extra": {
                  "rawValue": 3,
                  "raw": "3"
                },
                "value": 3
              }
            }
          }
        ],
        "kind": "const"
      }
    ],
    "directives": []
  },
  "comments": []
}
</code></pre>
</details>

下面是解析遍历赋值的完整代码，也可以在[github](../../Test/frameTest/Babel/plugin/v8/index.js)上看完整代码

```js
const  parser = require('@babel/parser');
const { codeFrameColumns } = require('@babel/code-frame');

const sourceCode = `
   const a = 1 + 2;
`;

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous'
});

const evaluator = (function() {

    const astInterpreters = {
        Program (node, scope) {
            node.body.forEach(item => {
                evaluate(item, scope);
            })
        },
        VariableDeclaration(node, scope) {
            node.declarations.forEach((item) => {
                evaluate(item, scope);
            });
        },
        VariableDeclarator(node, scope) {
            const declareName = evaluate(node.id);
            if (scope[declareName]) {
                throw Error('duplicate declare variable：' + declareName);
            } else {
                scope[declareName] = evaluate(node.init, scope);
            }
        },
        ExpressionStatement(node, scope) {
            return evaluate(node.expression, scope);
        },
        BinaryExpression(node, scope) {
            console.log(node.left.type)
            const leftValue = evaluate(node.left, scope);
            const rightValue = evaluate(node.right, scope);;
            switch(node.operator) {
                case '+':
                    return leftValue + rightValue;
                case '-':
                    return leftValue - rightValue;
                case '*':
                    return leftValue * rightValue;
                case '/':
                    return leftValue / rightValue;
                default:
                    throw Error('upsupported operator：' + node.operator);
            }
        },
        Identifier(node, scope) {
            return node.name;
        },
        NumericLiteral(node, scope) {
            return node.value;
        }
    }

    const evaluate = (node, scope) => {
        try {
            return astInterpreters[node.type](node, scope);
        } catch(e) {
            if (e && e.message && e.message.indexOf('astInterpreters[node.type] is not a function') != -1) {
                console.error('unsupported ast type: ' + node.type);
                console.error(codeFrameColumns(sourceCode, node.loc, {
                    highlightCode: true
                }));
            } else {
                console.error(e.message);
                console.error(codeFrameColumns(sourceCode, node.loc, {
                    highlightCode: true
                }));
            }
        }
    }
    return {
        evaluate
    }
})();

const globalScope = {};
evaluator.evaluate(ast.program, globalScope);

console.log(globalScope);
```

我们改进一下，将函数也解析，下面是解析遍历赋值和函数的完整代码，也可以在[github](../../Test/frameTest/Babel/plugin/v8/function.js)上看完整代码
```js
const  parser = require('@babel/parser');
const { codeFrameColumns } = require('@babel/code-frame');
const chalk = require('chalk');

const sourceCode = `
   const  a = 2;
   function add(a, b) {
    return a + b;
   }
   console.log(add(1, 2));
`;

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous'
});

class Scope {
    constructor(parentScope) {
        this.parent = parentScope;
        this.declarations = [];
    }

    set(name, value) {
        this.declarations[name] = value;
    }

    getLocal(name) {
        return this.declarations[name];
    }

    get(name) {
        let res = this.getLocal(name);
        if (res === undefined && this.parent) {
            res = this.parent.get(name);
        }
        return res;
    }

    has(name) {
        return !!this.getLocal(name);
    }
}

function getIdentifierValue(node, scope) {
    if (node.type === 'Identifier') {
        return scope.get(node.name);
    } else {
        return evaluate(node, scope);
    }
}

const evaluator = (function() {

    const astInterpreters = {
        Program (node, scope) {
            node.body.forEach(item => {
                evaluate(item, scope);
            })
        },
        VariableDeclaration(node, scope) {
            node.declarations.forEach((item) => {
                evaluate(item, scope);
            });
        },
        VariableDeclarator(node, scope) {
            const declareName = evaluate(node.id);
            if (scope.get(declareName)) {
                throw Error('duplicate declare variable：' + declareName);
            } else {
                scope.set(declareName, evaluate(node.init, scope));
            }
        },
        ExpressionStatement(node, scope) {
            return evaluate(node.expression, scope);
        },
        MemberExpression(node, scope) {
            const obj = scope.get(evaluate(node.object));
            return obj[evaluate(node.property)]
        },
        FunctionDeclaration(node, scope) {
            const declareName = evaluate(node.id);
            if (scope.get(declareName)) {
                throw Error('duplicate declare variable：' + declareName);
            } else {
                scope.set(declareName, function(...args) {
                    const funcScope = new Scope();
                    funcScope.parent = scope;

                    node.params.forEach((item, index) => {
                        funcScope.set(item.name, args[index]);
                    });
                    funcScope.set('this', this);
                    return evaluate(node.body, funcScope);
                });
            }
        },
        ReturnStatement(node, scope) {
            return evaluate(node.argument, scope);
        },
        BlockStatement(node, scope) {
            for (let i = 0; i< node.body.length; i++) {
                if (node.body[i].type === 'ReturnStatement') {
                    return evaluate(node.body[i], scope);
                }
                evaluate(node.body[i], scope);
            }
        },
        CallExpression(node, scope) {
            const args = node.arguments.map(item => {
                if (item.type === 'Identifier') {
                    return scope.get(item.name);
                }
                return evaluate(item, scope);
            });
            if(node.callee.type === 'MemberExpression') {
                const fn = evaluate(node.callee, scope);
                const obj = evaluate(node.callee.object, scope);
                return fn.apply(obj, args);
            } else {
                const fn = scope.get(evaluate(node.callee, scope));
                return fn.apply(null, args);
            }
        },
        BinaryExpression(node, scope) {
            const leftValue = getIdentifierValue(node.left, scope);
            const rightValue = getIdentifierValue(node.right, scope);;
            switch(node.operator) {
                case '+':
                    return leftValue + rightValue;
                case '-':
                    return leftValue - rightValue;
                case '*':
                    return leftValue * rightValue;
                case '/':
                    return leftValue / rightValue;
                default:
                    throw Error('upsupported operator：' + node.operator);
            }
        },
        Identifier(node, scope) {
            return node.name;
        },
        NumericLiteral(node, scope) {
            return node.value;
        }
    }

    const evaluate = (node, scope) => {
        try {
            return astInterpreters[node.type](node, scope);
        } catch(e) {
            if (e && e.message && e.message.indexOf('astInterpreters[node.type] is not a function') != -1) {
                console.error('unsupported ast type: ' + node.type);
                console.error(codeFrameColumns(sourceCode, node.loc, {
                    highlightCode: true
                }));
            } else {
                console.error(node.type + ':',e.message);
                console.error(codeFrameColumns(sourceCode, node.loc, {
                    highlightCode: true
                }));
            }
        }
    }
    return {
        evaluate
    }
})();

const globalScope = new Scope();
globalScope.set('console', {
    log: function (...args) {
        console.log(chalk.green(...args));
    },
    error: function (...args) {
        console.log(chalk.red(...args));
    },
    error: function (...args) {
        console.log(chalk.orange(...args));
    },
});
evaluator.evaluate(ast.program, globalScope);
```
