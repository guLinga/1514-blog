//自动埋点插件
const { declare } = require('@babel/helper-plugin-utils');
const importModule = require('@babel/helper-module-imports');

const plugin = declare((api, options, dirname) => {
    api.assertVersion(7);

    return {
        visitor: {
            Program: {
                enter (path, state) {
                    //遍历ImportDeclaration，寻找是否引入了tracker模块。
                    //引入：记录id到state，path.stop();停止遍历
                    //没引入：用generateUid 生成唯一 id，然后放到 state。
                    path.traverse({//遍历当前节点的子节点
                        ImportDeclaration (curPath) {//如果是import则进入函数
                            const requirePath = curPath.get('source').node.value;//获取import引入的名称
                            //options.trackerPath 是index.js引用插件的时候传入的值，也就是埋点函数的名称

                            //如果已经导入了 埋点函数 则将id传入 state.trackerImportId
                            if (requirePath === options.trackerPath) {
                                const specifierPath = curPath.get('specifiers.0');
                                //下面的判断好像是区别 default import 和 namespace import 的，我还不太清除
                                if (specifierPath.isImportSpecifier()) {
                                    state.trackerImportId = specifierPath.toString();
                                } else if(specifierPath.isImportNamespaceSpecifier()) {
                                    state.trackerImportId = specifierPath.get('local').toString();
                                }
                                //停止遍历
                                curPath.stop();
                            }
                        }
                    });
                    //判断state中是否有id
                    if (!state.trackerImportId) {
                        state.trackerImportId  = importModule.addDefault(path, 'tracker',{
                            nameHint: path.scope.generateUid('tracker')
                        }).name;
                        state.trackerAST = api.template.statement(`${state.trackerImportId}()`)();
                    }
                }
            },
            //函数插桩，向函数里面添加埋点函数
            'ClassMethod|ArrowFunctionExpression|FunctionExpression|FunctionDeclaration'(path, state) {
                const bodyPath = path.get('body');
                //有函数体直接插入
                if (bodyPath.isBlockStatement()) {
                    bodyPath.node.body.unshift(state.trackerAST);
                } else {//没有函数体，包装一下再插入
                    const ast = api.template.statement(`{${state.trackerImportId}();return PREV_BODY;}`)({PREV_BODY: bodyPath.node});
                    bodyPath.replaceWith(ast);
                }
            }
        }
    }
});
module.exports = plugin;
