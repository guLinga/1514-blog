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
