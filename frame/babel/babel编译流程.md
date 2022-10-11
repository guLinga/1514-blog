### Babel编译流程

Babel是一个转译器。
编译器是指`高级语言`到`低级语言`的转换工具
转译器是指`高级语言`到`高级语言`的转换工具
babel整体转译流程分为三步：
1. parse：通过`parser`把源码转成抽象语法树（AST）（之所以叫抽象语法树是因为省略掉了源码中的分隔符、注释等内容）
2. transform：遍历`AST`调用各种`transform`插件对`AST`进行增删改
3. generate：把转换后的`AST`打印成目标代码，并生成`sourcemap`

babel7把这些功能放入了不同的包里面：

**parse阶段**
- `@babel/parser` 解析源码成 AST

**transform阶段**
- `@babel/traverse` 遍历 AST 并调用 visitor 函数
- `@babel/types` 创建、判断 AST
- `@babel/template` 根据模块批量创建 AST

**generate阶段**
- `@babel/generate` 打印 AST，生成目标代码和 sorucemap


babel整体功能入口是在
- `@babel/core` 解析配置、应用 plugin、preset，整体整体编译流程

插件和插件之间的一些公共函数
- `@babel/helpers` 用于转换 es next 代码需要的通过模板创建的 AST，比如 _typeof、_defineProperties 等

- `@babel/helper-xxx` 其他的插件之间共享的用于操作 AST 的公共函数

运行时的公共函数 
- `@babel/runtime` 主要是包含 corejs、helpers、regenerator 这 3 部分
    1. helper： helper 函数的运行时版本（不是通过 AST 注入了，而是运行时引入代码）
    2. corejs： es next 的 api 的实现，corejs 2 只支持静态方法，corejs 3 还支持实例方法
    3. regenerator：async await 的实现，由 facebook 维护

- `@babel/cli babel` 的命令行工具，支持通过 glob 字符串来编译多个文件
